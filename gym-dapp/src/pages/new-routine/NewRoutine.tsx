import React from "react";
import * as anchor from "@coral-xyz/anchor";
import * as idl from "../../api/gym-dapp_be.json"
import { Button, Container, Input, Modal, MultiSelect } from "@mantine/core";
import Exercise from "./Exercise";
import { exercisesForRoutine, RoutineB, RoutineExerciseProp, RoutineProp } from "../Routines";
 import ListOfExercises from "./ListOfExercises";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useUser } from "../../context/UserContext";
import { v4 as uuidv4 } from 'uuid'
import { GymDappBe } from "../../api/gym_dapp_be";
import { PublicKey, SystemProgram } from "@solana/web3.js";



const NewRoutine = ( 
  { exercises, handleClose, routinesList, setRoutinesList } : 
  { exercises : RoutineExerciseProp[], handleClose: () => void, routinesList : RoutineProp[], setRoutinesList: React.Dispatch<React.SetStateAction<RoutineProp[]>> } ) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [routineExercises, setRoutineExercises] = React.useState<RoutineExerciseProp[]>([]);
  const [name, setName] = React.useState<string>('');
  const [selectedExercises, setSelectedExercises] = React.useState<string[]>(['All Muscles']);  // categoriile de exercitii
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useUser();
  const handleAddExercise = ( exercise : RoutineExerciseProp ) => { 
    setRoutineExercises([...routineExercises, { ...exercise, inRoutine: true}]); 
    exercises.map((ex: RoutineExerciseProp) => ex.id === exercise.id ? ex.inRoutine = true : null );
  }

  const handleDeleteExercise = ( exercise : RoutineExerciseProp ) => {
    setRoutineExercises(routineExercises.filter((ex: RoutineExerciseProp) => ex.id !== exercise.id));
    exercises.map((ex: RoutineExerciseProp) => ex.id === exercise.id ? ex.inRoutine = false : null );
  }

  const handleSaveRoutine = async(routineExercises: RoutineExerciseProp[]) => {
    if (name === '') {
      modals.openContextModal({
        modal: 'expected',
        title: 'Save routine',
        centered: true,
        withCloseButton: false,
        size: 'sm',
        radius: 'md',
        classNames: {
          content: "bg-neutral-800 text-white",
          header: "bg-neutral-800 text-white",
          title: "text-white",
          close: "text-white bg-neutral-800 hover:bg-neutral-700",
        },
        innerProps: {
          modalBody: 'You have to give a name to the routine!',
        },
      });
      return;
    } else if (routineExercises.length === 0) {
      modals.openContextModal({
        modal: 'expected',
        title: 'Save routine',
        centered: true,
        withCloseButton: false,
        size: 'sm',
        radius: 'md',
        classNames: {
          content: "bg-neutral-800 text-white",
          header: "bg-neutral-800 text-white",
          title: "text-white",
          close: "text-white bg-neutral-800 hover:bg-neutral-700",
        },
        innerProps: {
          modalBody: 'You have to add at least one exercise to create a routine!',
        },
      });
      return;
    } else if (routinesList.find((routine: RoutineProp) => routine.name === name)) {
      modals.openContextModal({
        modal: 'expected',
        title: 'Save routine',
        centered: true,
        withCloseButton: false,
        size: 'sm',
        radius: 'md',
        classNames: {
          content: "bg-neutral-800 text-white",
          header: "bg-neutral-800 text-white",
          title: "text-white",
          close: "text-white bg-neutral-800 hover:bg-neutral-700",
        },
        innerProps: {
          modalBody: 'You already have a routine with this name!',
        },
        
      });
      return;
    } else {
      setLoading(true);
      // adaugare pe blockchain
      if (!user || !user.userInfo || !user.userInfo.userId || !user.userInfo.username) {
        console.error("User information is missing");
        return;
      }

      const routinePost: RoutineB = {
        routineid: uuidv4(),
        name: name,
        exercises: routineExercises.map(exercise => {
          const { id, name, muscleGroup } = exercise;
          return { id, name, muscleGroup, sets: [] }
        })
      } 

      console.log("Routine to be saved:", routinePost)

      const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "processed");
      const wallet = (window as any).solana;
      await wallet.connect();
      console.log("Wallet:", wallet);
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
          .addRoutine(routinePost)
          .accountsPartial(
            {
              user: new PublicKey(user.userInfo.publicKey),
              routines: routinesAccountPda,
              systemProgram: SystemProgram.programId
            }
          )
          .signers([])
          .rpc();
        console.log("Routine added successfully!");


        const updatedRoutines: RoutineB[] = (await program.account.routines.fetch(routinesAccountPda)).routines;

        console.log("Routines", updatedRoutines);

        setLoading(false);
        exercisesForRoutine.map((ex: RoutineExerciseProp) => ex.inRoutine = false);
        setName('');
        setRoutineExercises([]);
        handleClose();

        modals.openContextModal({
          modal: 'expected',
          title: 'Save routine',
          centered: true,
          withCloseButton: false,
          size: 'sm',
          radius: 'md',
          classNames: {
            content: "bg-neutral-800 text-white",
            header: "bg-neutral-800 text-white",
            title: "text-white",
            close: "text-white bg-neutral-800 hover:bg-neutral-700",
          },
          innerProps: {
            modalBody: 'Routine saved successfully!',
          },
        });
      } catch (error: any) {
        setLoading(false);
        console.error("Failed to save routine:", error);
      }

    }
  }

  const handleChangeNameRutine = ( e: any ) => {
      setName(e.target.value);
  }

  return (
    <Container>
      <Modal
        opened={opened}
        onClose={close}
        title='Exercises'
        classNames={{
          content: "bg-neutral-800 text-white", 
          header: "bg-neutral-800 text-white",
          title: "text-white",
          close: "text-white bg-neutral-800 hover:bg-neutral-700",
        }}
        closeOnClickOutside={false}
      >
        <MultiSelect
            placeholder="Select the muscle group"
            clearable
            searchable={true}
            nothingFoundMessage="No options"
            defaultValue={['All Muscles']}
            onChange={setSelectedExercises}
            data={
                ['All Muscles', 'Legs', 'Back', 'Abdominals', 'Abductors', 'Biceps', 'Calves', 'Cardio', 'Chest', 'Full Body', 'Glutes', 'Lats', 'Neck', 'Shoulders', 'Traps', 'Triceps', 'Upper Back']
            }
            classNames={{
                input: 'bg-neutral-800 text-white',
                dropdown: 'bg-neutral-800 text-white',
                label: 'text-white',
                option: 'bg-neutral-800 text-white hover:bg-neutral-700',
                inputField: 'bg-neutral-800 text-white',
            }}
        />
        <ListOfExercises 
          selectedExercises={selectedExercises} 
          handleAddExercise={handleAddExercise}
          handleDeleteExercise={handleDeleteExercise}
          exercises={exercises}
          />
      </Modal>
      <Input 
        placeholder='Routine Name' 
        maxLength={12} 
        onChange={ e => handleChangeNameRutine(e)}
        classNames={{
          input: 'bg-neutral-800 text-white',
        }}
        /> 
      <br />
      <h1 className='text-xl font-bold'>Exercises</h1>
      {
        routineExercises.map( (exercise : RoutineExerciseProp) => {
          return (
            <Exercise key={exercise.id} exercise={exercise} handleDeleteExercise={handleDeleteExercise}/>
          )
        })
      }
      <Button variant='outline' color='gray' className='w-[100%] my-[10px]' onClick={open}>
        Add a exercise
      </Button>
      <Button variant='outline' color='green' className='w-[100%] my-[10px] text-white bg-green-600' onClick={() => handleSaveRoutine(routineExercises)}>
          {loading ? 'Create...' : 'Save'}
      </Button>
    </Container>
  );
}


export default NewRoutine;