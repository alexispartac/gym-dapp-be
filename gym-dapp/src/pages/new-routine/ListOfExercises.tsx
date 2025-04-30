import { Container } from "@mantine/core";
import { RoutineExerciseProp } from "../Routines";
import React from "react";
import ExerciseDescription from "../exercises/ExerciseDescription";

const ListOfExercises = (
    { exercises, handleAddExercise, handleDeleteExercise, selectedExercises }:
        {
            selectedExercises: string[];
            exercises: RoutineExerciseProp[];
            handleAddExercise: (exercise: RoutineExerciseProp) => void;
            handleDeleteExercise: (exercise: RoutineExerciseProp) => void;
        }) => {

    const filterCategoryExercises = selectedExercises.map(
        (muscleGroup: string) => {
            if (muscleGroup === "All Muscles" && selectedExercises.length === 1)
                return exercises;

            return exercises.filter((exercise: RoutineExerciseProp) => exercise.muscleGroup === muscleGroup);
        }
    );

    const Exercise = ({ exercise }: { exercise: RoutineExerciseProp }) => {
        const [isIn, setIsIn] = React.useState<boolean>(exercise.inRoutine);
        const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
        const handleModalOpen = () => setModalOpen(true);
        const handleModalClose = () => setModalOpen(false);

        const addExercise = () => {
            setIsIn(true);
            handleAddExercise(exercise);
        }

        const deleteExercises = () => {
            setIsIn(false);
            handleDeleteExercise(exercise);
        }

        return (
            <div>
                <div>
                    {isModalOpen && <ExerciseDescription exercise={exercise} key={exercise.id} onClose={handleModalClose} />}
                </div>
                <div className='flex flex-row my-[7px] scrollbar-hide mx-[2px] shadow-gray-400 dark:bg-neutral-700 dark:text-white'>
                    {
                        isIn ?
                            <div className='h-[50px] w-[5px] bg-blue-700'></div>
                            :
                            null
                    }
                    <h1 className='w-[80%] flex justify-start p-[10px]' onClick={handleModalOpen}> {exercise.name}</h1>
                    <button disabled={isIn} className='flex justify-center w-[45px] p-[10px]' onClick={addExercise}> ✔️ </button>
                    <button disabled={!isIn} className='flex justify-center w-[42px] p-[10px]' onClick={deleteExercises}> ❌ </button>
                </div>
            </div>
        );
    }

    return (
        <Container className="overflow-y-auto">
            {
                filterCategoryExercises.flat().map((exercise: RoutineExerciseProp) => (
                  <Exercise key={exercise.id} exercise={exercise} />
                ))
            }
        </Container>
    );
}

export default ListOfExercises;
