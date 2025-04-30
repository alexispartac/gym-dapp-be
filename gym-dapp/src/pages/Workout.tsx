import React from 'react'
import { Container, Stack } from '@mantine/core'
import { ExerciseProp } from './Exercises';
import NewWorkout from './new-workout/NewWorkout';
import { SetProp } from './new-workout/Exercise';
import RoutineContainer from './new-routine/RoutineContainer';
import { RoutineB, RoutineProp } from './Routines';
import { useUser } from '../context/UserContext';
import * as anchor from "@coral-xyz/anchor";
import * as idl from "../api/gym-dapp_be.json"
import { GymDappBe } from '@/api/gym_dapp_be';
import { PublicKey } from '@solana/web3.js';

export interface WorkoutExercisesProp extends ExerciseProp {
  inWorkout: boolean;
  sets: SetProp[];
}
 
export interface WorkoutsB {
  userid: string; // ID-ul utilizatorului
  workouts: WorkoutB[]; // Lista de antrenamente
}

export interface WorkoutB {
  workoutid: string; // ID-ul antrenamentului
  exercises: ExerciseB[]; // Lista de exerciții
  date: number; // Data (timestamp UNIX)
  duration: number; // Durata în minute
  volume: number; // Volumul total (kg * reps)
  sets: number; // Numărul total de seturi
  rewards: number; // Recompense obținute
}

export interface ExerciseB {
  id: string; // ID-ul exercițiului
  name: string; // Numele exercițiului
  muscleGroup: string; // Grupul muscular vizat
  sets: SetB[]; // Lista de seturi
}

export interface SetB {
  setNumber: number; // Numărul setului
  kg: number; // Greutatea utilizată
  reps: number; // Numărul de repetări
  previous: string; // Informații despre setul anterior (opțional)
  done: boolean; // Dacă setul a fost finalizat
}


const Workout = () => {
  const [routinesList, setRoutinesList] = React.useState<RoutineProp[]>([]);
  const { user } = useUser();
  

    React.useEffect(() => {
      const fetchRoutines = async () => {
        if (!user || !user.userInfo || !user.userInfo.userId) {
          return;
        }

        const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "processed");
        const wallet = (window as any).solana;

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
          const response: RoutineB[] = (await program.account.routines.fetch(routinesAccountPda)).routines;

          const updatedRoutines = response.reverse().map((routine) => ({
            routineid: routine.routineid, 
            name: routine.name,
            exercises: routine.exercises.map(exercise => ({
              ...exercise,
              inRoutine: false, 
            })),
          }));

          console.log("Routines", updatedRoutines);
          setRoutinesList(updatedRoutines);
        } catch (error) {
          console.error("Failed to fetch routines:", error);
          console.error("Failed to fetch routines. Please try again.");
        }
      }  
      fetchRoutines();
    }, [user]);


  return (
    <Container w={'100%'} h={'100%'} className='dark:bg-neutral-900'>
      <Stack>
        <h1 className='text-2xl dark:text-white'> Quick Start </h1>
      </Stack>
      <br />
      <NewWorkout />
      <br />
      <h1 className='my-[5px] text-2xl dark:text-white'> Start a Routine</h1>
      <br />
      <Container m={0} className='py-[1rem] px-[1rem] rounded-md shadow-md border-[1px] dark:border-neutral-700 flex-col items-center text-black dark:text-white'>
      <RoutineContainer 
          routinesList={routinesList}
          setRoutinesList={setRoutinesList}
        />  
      </Container>
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Workout