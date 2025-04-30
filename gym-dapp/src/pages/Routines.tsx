import React from 'react'
import { Container } from '@mantine/core'
import { ExerciseProp,  } from './Exercises';
import { exercises } from './Exercises';
import RoutineContainer from './new-routine/RoutineContainer';
import { useUser } from "../context/UserContext";
import * as anchor from "@coral-xyz/anchor";
import * as idl from "../api/gym-dapp_be.json"
import { GymDappBe } from '@/api/gym_dapp_be';
import { PublicKey } from '@solana/web3.js';
export interface RoutineExerciseProp extends ExerciseProp {
  inRoutine: boolean;
}
export interface RoutineProp {
  routineid: string;
  name: string;
  exercises: RoutineExerciseProp[];
}

export const exercisesForRoutine: RoutineExerciseProp[] = exercises.map( (exercise: ExerciseProp) =>  {
  return { ...exercise, inRoutine: false}
})

export interface RoutinesB {
  userid: string;
  routines: RoutineB[];
}
export interface RoutineB {
  routineid: string; // ID-ul rutinei
  name: string; // Numele rutinei
  exercises: RoutineExerciseB[]; // Lista de exerciții din rutină
}

export interface RoutineExerciseB {
  id: string; // ID-ul exercițiului
  name: string; // Numele exercițiului
  muscleGroup: string; // Grupul muscular vizat
  sets: RoutineSetB[]; // Lista de seturi pentru exercițiu
}

export interface RoutineSetB {
  setNumber: number; // Numărul setului
  kg: number; // Greutatea utilizată
  reps: number; // Numărul de repetări
  previous: string; // Greutatea utilizată anterior
  done: boolean; // Dacă setul a fost finalizat
}


const Routines = () => {
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
    <Container w={'100%'} h={'100%'}>
      <h1 className='text-2xl text-black dark:text-white'> My Routines </h1>
      <br />
      <div className='py-[2rem] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center text-black dark:text-white  dark:border-neutral-700'>
        <RoutineContainer 
          routinesList={routinesList}
          setRoutinesList={setRoutinesList}
        />   
      </div>
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Routines