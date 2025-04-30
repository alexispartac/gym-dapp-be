import { Container } from '@mantine/core'
import allExercises  from '../assets/userExercises';
import CardsCarousel from './exercises/CardsCarousel';

export interface ExerciseProp {
  name: string;
  muscleGroup: string;
  id: string;
  description?: string;
  execution?: string[];
  advice?: string;
};

export const ExerciseCategory = ['All Muscles', 'Legs', 'Back', 'Abdominals', 'Abductors', 'Biceps', 'Calves', 'Cardio', 'Chest', 'Full Body', 'Glutes', 'Lats', 'Neck', 'Shoulders', 'Traps', 'Triceps', 'Upper Back'];

export const exercises = allExercises;

const getExercisesByCategory = (category: string) => {
  return exercises.filter((exercise) => exercise.muscleGroup === category);
};

const Exercises = () => {
  return (
    <Container className='w-screen' size='lg' px={0} py={0}>
      <br />
      <h1 className='text-3xl dark:text-white'> Exercises </h1>
      <br />
      <Container className='w-screen' size='lg' px={0} py={0}>
        {
          ExerciseCategory.map((category, index) => (
            index > 0 && (
            <div key={index} className='border-[1px] border-gray p-[2rem] rounded-[2rem] mb-5 mx-[1rem]'>
              <h2 className='text-xl dark:text-white'> {category} </h2>
              <CardsCarousel exercises={getExercisesByCategory(category)} />
            </div>
          )))
        }
      </Container>
      <br />
    </Container>
  )
}

export default Exercises