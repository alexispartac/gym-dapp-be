import { Button } from "@mantine/core";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { WorkoutExercisesProp } from "../Workout";
import { addVolume, removeVolume } from "./volumeSlice";
import { addOneSet, removeOneSet } from "./setsSlice";
import { addSetToWorkout, removeSetToWorkout } from "./workoutSlice";
import { AppDispatch } from "./store";

export interface SetProp {
  set_number: number;
  kg: number;
  reps: number;
  previous?: string;
  done: boolean;
}

const Exercise = ({
  exercise,
  handleDeleteExercises,
}: {
  exercise: WorkoutExercisesProp;
  handleDeleteExercises: (exercise: WorkoutExercisesProp) => void;
}) => {
  const [sets, setSets] = React.useState<SetProp[]>(exercise.sets);
  const dispatch = useDispatch<AppDispatch>();

  const addSet = useCallback(() => {
    const newSet = {
      set_number: sets.length + 1,
      kg: 0,
      reps: 0,
      done: false,
    };
    setSets([...sets, newSet]);
  }, [sets]);

  const deleteSet = useCallback(
    (set_number: number) => {
      if (sets[set_number - 1].done) {
        dispatch(removeOneSet());
        dispatch(removeVolume(sets[set_number - 1].kg * sets[set_number - 1].reps));
      }
      
      const findSet = sets.find((set) => set.set_number === set_number);
      if (findSet) {
        dispatch(removeSetToWorkout({ id: exercise.id, set_number: findSet.set_number }));
      }
      
      const updatedSets = sets.filter((set) => set.set_number !== set_number);
      setSets(updatedSets.map((set, index) => ({ ...set, set_number: index + 1 })));
    },
    [dispatch, exercise.id, sets]
  );

  const doneSet = useCallback(
    (set_number: number) => {
      const targetSet = sets[set_number - 1];
      let updatedSets;

      if (targetSet.done) {

        updatedSets = sets.map((set) =>
          set.set_number === set_number ? { ...set, done: false } : set
        );
        
        dispatch(removeVolume(targetSet.kg * targetSet.reps));
        dispatch(removeOneSet());
        
        const findSet = updatedSets.find((set) => set.set_number === set_number);
        if (findSet) {
          dispatch(removeSetToWorkout({ set_number: findSet.set_number, id: exercise.id }));
        }
      } else {
        updatedSets = sets.map((set) =>
          set.set_number === set_number ? { ...set, done: true } : set
        );
        
        dispatch(addVolume(targetSet.kg * targetSet.reps));
        dispatch(addOneSet());
        
        const findSet = updatedSets.find((set) => set.set_number === set_number);
        if (findSet) {
          dispatch(addSetToWorkout({ id: exercise.id, set: findSet }));
        }
      }
      
      setSets(updatedSets);
    },
    [dispatch, exercise.id, sets]
  );

  const handleInputChange = useCallback(
    (e: any, set_number: number) => {
      if (e.target.value > 100) {
        e.target.value = 100;
      }
      setSets(
        sets.map((set) =>
          set.set_number === set_number
            ? { ...set, [e.target.name]: parseInt(e.target.value) }
            : set
        )
      );
    },
    [sets]
  );

  const handleDelete = useCallback(
    (exercise: WorkoutExercisesProp) => {
      sets.forEach((set) => {
        if (set.done) {
          dispatch(removeVolume(set.kg * set.reps));
          dispatch(removeOneSet());
        }
      });
      handleDeleteExercises(exercise);
    },
    [dispatch, sets, handleDeleteExercises]
  );

  const renderSetRow = useMemo(
    () =>
      sets.map((set) => (
        <div
          className={`flex flex-row ${
            set.set_number % 2 === 1 && !set.done ? "bg-gray-300 dark:bg-neutral-600" : ""
          } ${set.done ? "bg-green-300 dark:bg-green-600" : ""}`}
          key={set.set_number}
        >
          <p className="flex justify-start indent-2 w-[50px] p-[10px]">{set.set_number}</p>
          <p className="flex justify-start indent-1 w-[100px] p-[10px]">{set.previous}</p>
          <p className="w-[40px] p-[10px] px-[4px] indent-1">
            <input
              name="kg"
              disabled={set.done}
              className="w-[42px] bg-transparent"
              placeholder={`${set.kg}`}
              type="number"
              value={set.kg}
              min={0}
              max={100}
              maxLength={3}
              onChange={(e) => handleInputChange(e, set.set_number)}
            />
          </p>
          <p className="w-[60px] p-[10px] px-[4px] indent-2">
            <input
              name="reps"
              disabled={set.done}
              type="number"
              min={0}
              max={100}
              maxLength={3}
              value={set.reps}
              className="w-[42px] bg-transparent"
              placeholder={`${set.reps}`}
              onChange={(e) => handleInputChange(e, set.set_number)}
            />
          </p>
          <Button
            disabled={set.kg === 0 || set.reps === 0}
            className="my-auto w-[42px] p-[10px] mr-1 bg-green-200 dark:bg-green-600 dark:hover:bg-green-300"
            onClick={() => doneSet(set.set_number)}
          >
            ✔️
          </Button>
          <Button
            className="my-auto w-[42px] p-[10px] bg-red-200 dark:bg-red-600 dark:hover:bg-red-300"
            onClick={() => deleteSet(set.set_number)}
          >
            ❌
          </Button>
        </div>
      )),
    [deleteSet, doneSet, handleInputChange, sets]
  );

  return (
    <div className="py-[10px]">
      <div>
        <h3 className="text-xl"> {exercise.name} </h3>
        <input
          placeholder="Add notes here..."
          className="font-serif italic color-#aaa p-1 my-1 dark:bg-neutral-800"
        />
      </div>
      <div className="w-full">
        <div className="flex flex-row">
          <p className="flex justify-center w-[50px] p-[10px]">SET</p>
          <p className="flex justify-center w-[100px] p-[10px]">PREVIOUS</p>
          <p className="flex justify-center w-[40px] p-[10px]">KG</p>
          <p className="flex justify-center w-[60px] p-[10px]">REPS</p>
          <p className="flex justify-center w-[45px] p-[10px]">✔️</p>
          <p className="flex justify-center w-[42px] p-[10px]">❌</p>
        </div>
        <div className="w-full">
          {renderSetRow}
        </div>
      </div>
      <Button
        variant="outline"
        color="gray"
        className="flex w-full align-start md:pl-[50px] my-[10px] dark:bg-neutral-500 shadow-sm shadow-gray-50 dark:text-white"
        onClick={addSet}
      >
        + Add Set
      </Button>

      <Button
        variant="outline"
        color="red"
        className="flex w-full align-start md:pl-[50px] my-[10px] text-white dark:bg-red-700"
        onClick={() => handleDelete(exercise)}
      >
        - Delete Exercise
      </Button>
    </div>
  );
};

export default Exercise;