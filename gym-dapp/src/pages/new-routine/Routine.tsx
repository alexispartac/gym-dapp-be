import * as anchor from "@coral-xyz/anchor";
import * as idl from "../../api/gym-dapp_be.json"
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Group, Modal, Stack } from "@mantine/core";
import WorkoutExercises, { userExercises }  from "../new-workout/WorkoutExercises";
import { Sets, Timer, Volume } from "../new-workout/NewWorkout";
import { addExercise, clearExercises } from "../new-workout/workoutSlice";
import { RoutineB, RoutineExerciseProp, RoutineProp } from "../Routines";
import { AppDispatch, RootState } from "../new-workout/store";
import { modals } from "@mantine/modals";
import { GymDappBe } from '@/api/gym_dapp_be';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useUser } from '../../context/UserContext';

const InfoRoutine = ({ routine, openInfoRoutine, close }: { routine: RoutineProp; openInfoRoutine: boolean; close: () => void }) => {
    return (
        <Container>
            <Modal 
                opened={openInfoRoutine} 
                onClose={close} 
                title={routine.name}
                classNames={{
                    content: "bg-neutral-800 text-white", 
                    header: "bg-neutral-800 text-white",
                    title: "text-white",
                    close: "text-white bg-neutral-800 hover:bg-neutral-700",
                }}
                >
                {routine.exercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className="flex flex-row my-[7px] mx-[2px] dark:bg-neutral-700 dark:text-white"
                    >
                        <h1 className="w-[80%] flex justify-start p-[10px]">
                            {exercise.name}
                        </h1>
                    </div>
                ))}
            </Modal>
        </Container>
    );
};

const StartRoutine = ({
    openStartRoutine,
    close,
    setOpenStartRoutine,
    elapsedTimeRef,
    handleStop
}: {
    openStartRoutine: boolean;
    close: () => void;
    setOpenStartRoutine: (value: boolean) => void;
    elapsedTimeRef: React.MutableRefObject<number>;
    handleStop: () => void;
}) => {
    const isMobile = useMediaQuery("(max-width: 50em)");
    const exercises = useSelector((state: RootState) => state.workout.exercises);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Container>
            {openStartRoutine ? (
                <Modal
                    opened={openStartRoutine}
                    withCloseButton={false}
                    onClose={() => {
                        close();
                        dispatch(clearExercises());
                    }} 
                    fullScreen={isMobile}
                    transitionProps={{ transition: "fade-up", duration: 700 }}
                    title="Log Workout"
                    padding={7}
                    classNames={{
                        content: "bg-neutral-800 text-white", 
                        header: "bg-neutral-800 text-white",
                        title: "text-white",
                        close: "text-white bg-neutral-800 hover:bg-neutral-700",
                      }}
                >
                    <Container className="w-full bg-gray-100 py-[10px] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center dark:bg-neutral-800 dark:border-neutral-700 ">
                        <Group className="grid grid-cols-3 gap-4 py-[5px] font-light">
                            <Stack gap={0}>
                                <Timer />
                            </Stack>
                            <Stack gap={0}>
                                <Volume />
                            </Stack>
                            <Stack gap={0}>
                                <Sets />
                            </Stack>
                        </Group>
                        <br />
                        <WorkoutExercises 
                            workoutExercises={exercises} 
                            setStatusWorkout={setOpenStartRoutine}
                            elapsedTimeRef={elapsedTimeRef}
                            handleStop={handleStop}
                            />
                        <br />
                    </Container>
                </Modal>
            ) : null}
        </Container>
    );
};

const Routine = ({ routine, setRoutinesList }: { routine: RoutineProp, setRoutinesList : React.Dispatch<React.SetStateAction<RoutineProp[]>> }) => {
    const [openInfoRoutine, setOpenInfoRoutine] = React.useState<boolean>(false);
    const [openStartRoutine, setOpenStartRoutine] = React.useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const startTimeRef = React.useRef<number | null>(null); 
    const elapsedTimeRef = React.useRef(0); 
    const { user } = useUser();

    const handleStart= () => {
    startTimeRef.current = Date.now(); 
    };

    const handleStop = () => {
    if (startTimeRef.current) {
        const timePressed = Date.now() - startTimeRef.current; 
        elapsedTimeRef.current = timePressed; 
        startTimeRef.current = null; 
    }
    };

    const handleAddWorkout = () => {
        routine.exercises.forEach((routineExercise: RoutineExerciseProp) => {
            const { inRoutine, ...rest } = routineExercise; 
            const userExercise = userExercises.find((exercise) => exercise.name === routineExercise.name);
            if(userExercise)
            dispatch(addExercise({...rest, inWorkout: true, sets: userExercise.sets}));
        });
    }
    async function DeleteRoutine(routineid: string){
        const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "processed");
        const wallet = (window as any).solana;
        await wallet.connect()
        const provider = new anchor.AnchorProvider(connection, wallet, {
            preflightCommitment: "processed",
        });

        anchor.setProvider(provider);
        const program: anchor.Program<GymDappBe> = new anchor.Program(idl as GymDappBe, provider);
        
        try {
            const routinesAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
                [Buffer.from("routines"), new PublicKey(user.userInfo.publicKey).toBuffer()],
                program.programId
            )

            const routinesAccountPda = routinesAccountPdaAndBump[0];

            await program.methods
                .removeRoutine(routineid)
                .accountsPartial(
                    {
                      user: new PublicKey(user.userInfo.publicKey),
                      routines: routinesAccountPda,
                      systemProgram: SystemProgram.programId
                    }
                )
                .rpc();
            console.log("Routine deleted successfully!")

            const updatedRoutines: RoutineB[] = (await program.account.routines.fetch(routinesAccountPda)).routines;

            console.log("Routines", updatedRoutines);
        } catch (error: any) {
            console.error("Failed to delete routine:", error);
        }
    };

    const handleDeleteRoutine = () => {
        modals.openConfirmModal({
            title: "Delete Routine",
            centered: true,
            children: (
                <p>Are you sure you want to delete this routine? This action cannot be undone.</p>
            ),
            classNames: {
                content: "bg-neutral-800 text-white",
                header: "bg-neutral-800 text-white",
                title: "text-white",
                close: "text-white bg-neutral-800 hover:bg-neutral-700",
            },
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: 'red', variant: 'outline' },
            cancelProps: { color: 'gray', variant: 'outline' },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => DeleteRoutine(routine.routineid),
        });
    };

    return (
        <Container className="w-full bg-gray-100 py-[10px] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center dark:bg-neutral-800 dark:border-neutral-700 ">
            <Group>
                <Stack gap={0.5} className="w-[45%]">
                    <h1 className="font-medium">{routine.name}</h1>
                    <Group>
                        <Stack gap={0} pl={5} className="w-[110px]">
                            {routine.exercises.map((exercise, index) => {
                                if (index < 3) {
                                    return (
                                        <h1 key={index} className="truncate">
                                            {exercise.name}
                                        </h1>
                                    );
                                }
                                return null;
                            })}
                        </Stack>
                    </Group>
                </Stack>
                <Stack gap={1} className="w-[45%]">
                    <Button
                        variant="outline"
                        color="blue"
                        className="w-full my-[5px]"
                        onClick={() => setOpenInfoRoutine(true)}
                    >
                        VIEW
                    </Button>
                    <Button
                        variant="outline"
                        color="blue"
                        className="bg-blue-500 text-white w-full my-[5px]"
                        onClick={() => {
                            setOpenStartRoutine(true);
                            handleAddWorkout();
                            handleStart();
                        }}
                    >
                        START
                    </Button>
                    <Button
                        variant="outline"
                        color="red"
                        className="bg-red-500 text-white w-full my-[5px]"
                        onClick={() => {
                            handleDeleteRoutine();
                        }}
                    >
                        DELETE
                    </Button>
                </Stack>
                <InfoRoutine routine={routine} openInfoRoutine={openInfoRoutine} close={() => setOpenInfoRoutine(false)} />
                <StartRoutine 
                    openStartRoutine={openStartRoutine} 
                    setOpenStartRoutine={setOpenStartRoutine} 
                    close={() => setOpenStartRoutine(false)} 
                    elapsedTimeRef={elapsedTimeRef}
                    handleStop={handleStop}
                />
            </Group>
        </Container>
    );
};

export default Routine;