import * as React from "react";
import * as anchor from "@coral-xyz/anchor";
import * as idl from "../../api/gym-dapp_be.json"
import ListOfExercises from "./ListOfExercises";
import TransferSolana from "../solana/transfer-sol";
import Reward from "./Reward";
import Exercise, { SetProp } from "./Exercise";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Button, Container, Group, Modal, MultiSelect, Stack } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useDispatch, useSelector } from "react-redux";
import { IconPlus } from "@tabler/icons-react";
import { AppDispatch, RootState } from "./store";
import { addExercise, clearExercises, removeExercise } from "./workoutSlice";
import { resetVolume } from "./volumeSlice";
import { resetSets } from "./setsSlice";
import { ExerciseProp, exercises, ExerciseCategory } from "../Exercises";
import { WorkoutB, WorkoutExercisesProp } from "../Workout";
import { DiscardWorkoutModal, FinishWorkoutModal } from "./WorkoutModals";
import { SECRET_KEY } from '../../constants'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../context/UserContext';
import { GymDappBe } from "../../api/gym_dapp_be";

const exercisesWorkout = exercises.map(
    (exercise: ExerciseProp) => {
        return {
            ...exercise,
            inWorkout: false,
            sets: []
        }
    }
)
// toate exercitiile disponibile
export const userExercises = exercises.map(
    (exercise: ExerciseProp) => {
        return {
            ...exercise,
            sets: [
                { set_number: 1, kg: 5, reps: 20, previous: "3kg x 15", done: false },
                { set_number: 2, kg: 6, reps: 18, previous: "3kg x 15", done: false },
                { set_number: 3, kg: 7, reps: 15, previous: "3kg x 15", done: false }
            ]
        }
    }

)

const WorkoutExercises = (
    { workoutExercises, setStatusWorkout, elapsedTimeRef, handleStop }:
    { 
        workoutExercises: WorkoutExercisesProp[]; 
        setStatusWorkout: (status: boolean) => void;
        elapsedTimeRef: React.MutableRefObject<number>;
        handleStop: () => void; 
    }
) => {
    const [selectedExercises, setSelectedExercises] = React.useState<string[]>(['All Muscles']);  // categoriile de exercitii
    const [exerciseKeys] = React.useState(() => new Map());
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = React.useState(false);
    const isMobile = useMediaQuery('(max-width: 50em)');
    const dispatch = useDispatch<AppDispatch>();
    const sets = useSelector((state: RootState) => state.sets.count);
    const volume = useSelector((state: RootState) => state.volume.count);
    const { user } = useUser();

    // lista de exercitii disponibile pentru workout, in care am evidentiat cele care sunt deja in workout
    const [listOfExercisesForWorkout, setListOfExercisesForWorkout] = React.useState<WorkoutExercisesProp[]>(
        exercisesWorkout.map((exerciseWorkout: WorkoutExercisesProp) => {
            if (workoutExercises.find((exercise: WorkoutExercisesProp) => exercise.id === exerciseWorkout.id))
                return {
                    ...exerciseWorkout,
                    inWorkout: true,
                }
            else {
                return {
                    ...exerciseWorkout,
                    inWorkout: false
                }
            }
        }
        )
    )

    // adaugam exercitii in workout si evidentiam in lista de exercitii disponibile
    const handleAddExercise = (exercise: WorkoutExercisesProp) => {
        // am cautat in in lists de exercitii a utilizatorului daca exercitiul a mai fost facut, daca ad am luat seturile efectuate
        const sets = userExercises.find((ex) => ex.id === exercise.id)?.sets || [];

        if (!exercise.inWorkout) {
            setListOfExercisesForWorkout(listOfExercisesForWorkout.map((exerciseForWorkout: WorkoutExercisesProp) => {
                if (exerciseForWorkout.id === exercise.id) {
                    return {
                        ...exerciseForWorkout,
                        sets: sets,
                        inWorkout: true
                    }
                }
                return exerciseForWorkout;
            }))
            dispatch(addExercise(
                {
                    ...exercise,
                    sets: sets,
                    inWorkout: true
                }
            ));
        }
    };

    // stergem din lista de exercitii aflate in antrenament si setam in lista de exercitii disponibile ca nu se mai afla in new workout
    const handleDeleteExercises = (exercise: WorkoutExercisesProp) => {
        setListOfExercisesForWorkout((prevExercises) => {
            return prevExercises.map((prevExercise) => {
                if (prevExercise.id === exercise.id) {
                    return { ...prevExercise, inWorkout: false };
                }
                return prevExercise;
            });
        });
        dispatch(removeExercise({ id: exercise.id }));
    }

    // stergem toate exercitiile din workout si evidentierea din lista de exercitii disponibile
    const handleDiscardWorkout = () => {
        setListOfExercisesForWorkout(listOfExercisesForWorkout.map((exerciseForWorkout: WorkoutExercisesProp) => {
            return {
                ...exerciseForWorkout,
                inWorkout: false
            }
        }))
        dispatch(resetVolume());
        dispatch(resetSets());
        dispatch(clearExercises());
        setStatusWorkout(false);
    };

    // am creiat o cheie pentru a mentine identitatea unica fiecarei componente
    const getExerciseKey = (exerciseId: string) => {
        if (!exerciseKeys.has(exerciseId)) {
            exerciseKeys.set(exerciseId, Math.random().toString(36));
        }
        return exerciseKeys.get(exerciseId);
    };

    //
    const handleSaveWorkoutInDB = async (exercisesWorkout: WorkoutExercisesProp[]) => {
        if (!user || !user.userInfo || !user.userInfo.userId || !user.userInfo.username) {
            console.error("User information is missing");
            return;
        }

        const workoutPost = {
            workoutid: uuidv4(),
            exercises: exercisesWorkout.map((exercise: WorkoutExercisesProp) => ({
              id: exercise.id,
              name: exercise.name,
              muscleGroup: exercise.muscleGroup,
              sets: exercise.sets.map((set: SetProp) => ({
                setNumber: set.set_number,
                kg: set.kg,
                reps: set.reps,
                previous: set.previous || "",
                done: set.done,
              })),
            })),
            date: new anchor.BN(Math.floor(Date.now())), 
            duration: Math.round(elapsedTimeRef.current),
            volume: volume,
            sets: sets,
            rewards: Reward({ sets, volume }),
        };
        console.log("Workout to be saved:", workoutPost)

        const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "processed");
        const wallet = (window as any).solana;
        await wallet.connect();
        const provider = new anchor.AnchorProvider(connection, wallet, {
            preflightCommitment: "processed",
        });
        
        anchor.setProvider(provider);
        const program: anchor.Program<GymDappBe> = new anchor.Program(idl as GymDappBe, provider);
   
        try {
            const amount = Reward({ sets, volume });
            const senderKeypair: Keypair = Keypair.fromSecretKey(SECRET_KEY);
            await TransferSolana({ senderKeypair, recipientPubKey: new PublicKey(user.userInfo.publicKey), amountToSend: amount })
            setLoading(false);

            const workoutsAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
                [Buffer.from("workouts"), new PublicKey(user.userInfo.publicKey).toBuffer()],
                program.programId
            )
                
            const workoutsAccountPda = workoutsAccountPdaAndBump[0];

            await program.methods
                .addWorkout(workoutPost)
                .accountsPartial(
                    {
                      user: new PublicKey(user.userInfo.publicKey),
                      workouts: workoutsAccountPda,
                      systemProgram: anchor.web3.SystemProgram.programId,
                    }
                )
                .rpc();
            console.log("Workout add successfully!")
                
            const updatedWorkouts: WorkoutB[] = (await program.account.workouts.fetch(workoutsAccountPda)).workouts.map((workout: any) => ({
                ...workout,
                date: workout.date.toNumber(), 
            }));

            console.log("Workouts", updatedWorkouts);
        } catch (error: any) {
            console.error("Failed to save workout:", error);
        }
    };

    const handleFinishWorkout = async (exercisesWorkout: WorkoutExercisesProp[]) => {
        let flag = true;
        setLoading(true);
        handleStop();

        if (exercisesWorkout.length === 0) {
            setLoading(false);
            modals.openContextModal({
                modal: 'expected',
                title: 'Finish workout',
                centered: true,
                withCloseButton: false,
                size: 'sm',
                radius: 'md',
                classNames: {
                    content: 'bg-neutral-800 text-white',
                    header: 'bg-neutral-800 text-white indent-1',
                    title: 'text-white',
                    close: 'text-white bg-neutral-800 hover:bg-neutral-700',
                },
                innerProps: {
                    modalBody: 'You have to add at least one exercise to finish the workout!',
                },
            });
            return;
        }

        exercisesWorkout.forEach((exercise: WorkoutExercisesProp) => {
            const setIsNotFinish = exercise.sets.find((set: SetProp) => set.done === false)
            if (setIsNotFinish !== undefined)
                flag = false;
        }
        )

        if (!flag) {
            setLoading(false);
            modals.openContextModal({
                modal: 'expected',
                title: 'Finish workout',
                centered: true,
                withCloseButton: false,
                size: 'sm',
                radius: 'md',
                classNames: {
                    content: 'bg-neutral-800 text-white',
                    header: 'bg-neutral-800 text-white indent-1',
                    title: 'text-white',
                    close: 'text-white bg-neutral-800 hover:bg-neutral-700',
                },
                innerProps: {
                    modalBody: 'You have to finish all sets to finish the workout!',
                },
            });
        } else {
            // modifica seturile pentru urmatoarele antrenamente
            handleDiscardWorkout();
            handleSaveWorkoutInDB(exercisesWorkout).finally(
                () => FinishWorkoutModal()
            );
            console.log("Congrats! Finish workout!", exercisesWorkout);
        }
    }

    return (
        <Container p={0} className='flex flex-col border-t-[1px] border-black bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700'>
            {
                workoutExercises.length === 0 ?
                    <Stack className='flex flex-col items-center justify-center border-t-[1px] border-black'>
                        <IconPlus size={120} color='gray' />
                        <h1 className='text-2xl font-bold text-gray-800 dark:text-white' > Get Started </h1>
                        <p> Add a exercise to start your workout </p>
                    </Stack>
                    :
                    workoutExercises.map((exercise: WorkoutExercisesProp, index: number) => (
                        <Exercise
                            key={getExerciseKey(exercise.id)}
                            exercise={exercise}
                            handleDeleteExercises={handleDeleteExercises}
                        />
                    ))
            }

            {/* lista cu exercitii  */}
            <Container>
                <Modal
                    opened={opened}
                    onClose={close}
                    fullScreen={isMobile}
                    transitionProps={{ transition: 'fade-up', duration: 700 }}
                    title='Exercises' // ﹀
                    padding={20}
                    classNames={{
                        content: "bg-neutral-800 text-white", 
                        header: "bg-neutral-800 text-white",
                        title: "text-white",
                        close: "text-white bg-neutral-800 hover:bg-neutral-700",
                      }}
                    closeOnClickOutside={false}
                >
                    <Container>
                        <Stack>
                            <MultiSelect
                                placeholder="Select the muscle group"
                                defaultValue={['All Muscles']}
                                onChange={setSelectedExercises}
                                data={ExerciseCategory}
                                clearable
                                searchable={true}
                                nothingFoundMessage="No options"
                                classNames={{
                                    input: 'bg-neutral-800 text-white',
                                    dropdown: 'bg-neutral-800 text-white',
                                    label: 'text-white',
                                    option: 'bg-neutral-800 text-white hover:bg-neutral-700',
                                    inputField: 'bg-neutral-800 text-white',
                                }}
                            />
                        </Stack>
                    </Container>
                    <ListOfExercises
                        selectedExercises={selectedExercises}
                        exercises={listOfExercisesForWorkout}
                        handleAddExercise={handleAddExercise}
                        handleDeleteExercise={handleDeleteExercises}
                    />
                </Modal>
            </Container>

            {/* buton de adaugare exercitiu */}
            <Button
                variant='outline'
                color='blue'
                className='flex w-full align-start md:pl-[50px] my-[10px] bg-blue-700 text-white'
                onClick={open}
            >
                + Add Exercise
            </Button>

            <Group>

                <Button
                    variant='outline'
                    color='green'
                    className='flex w-[47.5%] align-start md:pl-[20px] my-[10px] bg-green-700 text-white'
                    onClick={() => handleFinishWorkout(workoutExercises)}
                >
                    {loading ? 'Se procesează...' : 'Finish Workout'}
                </Button>

                <Button
                    variant='outline'
                    color='red'
                    className='flex w-[47.5%] align-start md:pl-[20px] my-[10px] bg-red-700 text-white'
                    onClick={() => DiscardWorkoutModal({ handleDiscardWorkout })}
                >
                    Discard Workout
                </Button>
            </Group>
        </Container>
    );
}

export default WorkoutExercises;