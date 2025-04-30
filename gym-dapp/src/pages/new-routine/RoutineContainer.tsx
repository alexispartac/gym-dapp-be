import { useRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Container, Group, Modal } from "@mantine/core";
import { IconLibrary, IconSearch } from "@tabler/icons-react";
import { exercisesForRoutine, RoutineExerciseProp, RoutineProp } from "../Routines";
import NewRoutine from "./NewRoutine";
import RoutinesElements from "./RoutinesElements";


const RoutineContainer = (
  { routinesList, setRoutinesList } :
  { routinesList: RoutineProp[], setRoutinesList: React.Dispatch<React.SetStateAction<RoutineProp[]>> }
) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const routinesRef = useRef<{ open: () => void; close: () => void }>(null);
  const exercisesForRoutineFalse: RoutineExerciseProp[] = exercisesForRoutine.map( (exercise) =>  {
    return { ...exercise, inRoutine: false}
  })

  const handleOpenModal = () => {
    if (routinesRef.current) {
      routinesRef.current.open(); 
    }
  };

  return (
    <Container p={0}>
      <h1 className="text-xl font-medium pb-[20px]">Routines</h1>
      <RoutinesElements 
        ref={routinesRef} 
        routinesList={routinesList}
        setRoutinesList={setRoutinesList}
      />

      <Group className="flex justify-between my-[10px]">
        <Modal
          opened={opened}
          onClose={closeModal}
          title="Create a Routine"
          classNames={{
            content: "bg-neutral-800 text-white", 
            header: "bg-neutral-800 text-white",
            title: "text-white",
            close: "text-white bg-neutral-800 hover:bg-neutral-700",
          }}
          closeOnClickOutside={false}
          >
            <NewRoutine 
              exercises={exercisesForRoutineFalse} 
              handleClose={closeModal} 
              routinesList={routinesList}
              setRoutinesList={setRoutinesList}
            />
        </Modal>
        <Button
          variant="outline"
          color="gray "
          className="w-[50%]"
          onClick={openModal}
        >
          <IconLibrary className="mr-2" />
          New Routine
        </Button>
        <Button
          variant="outline"
          color="gray"
          className="w-[42%]"
          onClick={handleOpenModal} 
        >
          <IconSearch className="p-1" />
          Explore
        </Button>
      </Group>
    </Container>
  );
};

export default RoutineContainer;