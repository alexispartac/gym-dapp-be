import { Container } from "@mantine/core";
import { WorkoutExercisesProp } from "../Workout";
import React from "react";
import ExerciseDescription from "../exercises/ExerciseDescription";

const Exercise = (
    { exercise, handleAddExercise, handleDeleteExercise } : 
    { 
        exercise: WorkoutExercisesProp 
        handleAddExercise: (exercise: WorkoutExercisesProp) => void;
        handleDeleteExercise: (exercise: WorkoutExercisesProp) => void;
    }) => {
    const [isIn, setIsIn] = React.useState<boolean>(exercise.inWorkout);
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
            <div className='flex flex-row my-[7px] mx-[2px] dark:bg-neutral-700 dark:text-white'>
                {
                    isIn ?
                        <div className='h-[50px] w-[5px] bg-blue-700'></div>
                        :
                        null
                }
                <h1 className='w-[80%] flex justify-start p-[10px] cursor-help' onClick={handleModalOpen}> {exercise.name}</h1>
                <p className='flex justify-center w-[45px] p-[10px] cursor-pointer' onClick={addExercise}> ✔️ </p>
                <p className='flex justify-center w-[42px] p-[10px] cursor-pointer' onClick={deleteExercises}> ❌ </p>
            </div>
        </div>
    );
}



const ListOfExercises = (
    { exercises, handleAddExercise, handleDeleteExercise, selectedExercises }:
        {
            selectedExercises: string[];
            exercises: WorkoutExercisesProp[];
            handleAddExercise: (exercise: WorkoutExercisesProp) => void;
            handleDeleteExercise: (exercise: WorkoutExercisesProp) => void;
        }) => {

    const filterCategoryExercises = selectedExercises.map(
        (muscleGroup: string) => {
            if (muscleGroup === "All Muscles" && selectedExercises.length === 1)
                return exercises;

            return exercises.filter((exercise: WorkoutExercisesProp) => exercise.muscleGroup === muscleGroup);
        }
    );

    return (
        <Container>
            {
                filterCategoryExercises.flat().map((exercise: WorkoutExercisesProp) => (
                    <Exercise 
                        key={exercise.id} 
                        exercise={exercise} 
                        handleAddExercise={handleAddExercise} 
                        handleDeleteExercise={handleDeleteExercise} 
                    />
                ))
            }
        </Container>
    );
}

export default ListOfExercises;