import { Badge, HStack } from "@chakra-ui/react";
import { Button } from "@mantine/core";
import { ExerciseProp } from "../Exercises";
import React from "react";
import ExerciseDescription from "./ExerciseDescription";


const Exercise = ({ exercise }: { exercise: ExerciseProp }) => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className='flex w-[210px] h-[150px] rounded-md border-[1px] shadow-md flex-row my-2 bg-white dark:bg-transparent dark:border-gray dark:text-white'>
      <div className='flex flex-col px-3 py-4 w-full'>
        {isModalOpen && <ExerciseDescription exercise={exercise} key={exercise.id} onClose={handleModalClose} />}
        <div>
          <p className='h-[24px]'>{exercise.name}</p>
        </div>
        <HStack>
          <Badge className="dark:bg-gray-400">{exercise.muscleGroup}</Badge>
        </HStack>
        <br />
        <div className='flex flex-row justify-between pt-1'>
          <Button
            variant='outline'
            color='blue'
            className='flex justify-center w-[100%]'
            onClick={handleModalOpen}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
