import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutExercisesProp } from '../Workout';
import { SetProp } from './Exercise';

interface WorkoutState {
  exercises: WorkoutExercisesProp[];
}

const initialState: WorkoutState = {
  exercises: [],
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    // adauga un exercitiu nou
    addExercise(state, action: PayloadAction<{ name: string; muscleGroup: string; id: string, inWorkout: boolean, sets: SetProp[] }>) {
      state.exercises.push({
        ...action.payload,
        inWorkout: true
      });
    },

    // adauga set la un exercitiu
    addSetToWorkout(state, action: PayloadAction<{ set: SetProp, id: string }>) {
      const indexExercise = state.exercises.findIndex(exercise => exercise.id === action.payload.id);

      if (indexExercise !== -1) {
        const exercise = state.exercises[indexExercise];
        const indexSet = exercise.sets.findIndex(set => set.set_number === action.payload.set.set_number);
        if (indexSet !== -1) {
          exercise.sets[indexSet] = action.payload.set;
        } else {
          exercise.sets.push(action.payload.set);
        }
        state.exercises[indexExercise] = exercise;
      }
    },

    removeSetToWorkout(state, action: PayloadAction<{ set_number: number; id: string }>) {
      const { set_number, id } = action.payload;
      const indexExercise = state.exercises.findIndex((exercise) => exercise.id === id);
      const exercise = state.exercises[indexExercise];

      if (exercise) {
        exercise.sets = exercise.sets.filter((set) => set.set_number !== set_number);
        exercise.sets = exercise.sets.map((set, index) => ({
          ...set,
          set_number: index + 1,
        }));
        state.exercises[indexExercise] = exercise;
      }
    },

    // sterge un exercitiu dupa id

    removeExercise(state, action: PayloadAction<{ id: string }>) {
      const index = state.exercises.findIndex(exercise => exercise.id === action.payload.id);
      if (index !== -1) {
        state.exercises.splice(index, 1);
      }
    },
    // sterge toate exercitiile
    clearExercises(state) {
      state.exercises = [];
    },

  },
});

export const { addExercise, removeExercise, clearExercises, addSetToWorkout, removeSetToWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;
