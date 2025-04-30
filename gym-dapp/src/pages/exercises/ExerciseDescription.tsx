import { Container, Modal, Stack } from "@mantine/core";
import { ExerciseProp } from "../Exercises";

const ExerciseDescription = ({ exercise, onClose }: { exercise: ExerciseProp; onClose: () => void }) => {
    return (
      <Container>
        <Modal 
          opened={true} 
          onClose={onClose} 
          title={exercise.name} 
          centered
          classNames={
            {
              title: 'text-white',
              close: 'text-white bg-neutral-800 hover:bg-neutral-700',
              header: 'bg-neutral-800 text-white indent-1',
              body: 'bg-neutral-800 text-white',
            }
          }
          >
          {
            exercise.description ?
              <Container>
                <p className='indent-2 text-blue-700 text-[18px]'>Descriere:</p>
                <p className='indent-2'>{exercise.description}</p>
                <Stack>
                  <p className='indent-2 text-blue-700 text-[18px]'>Executie:</p>
                  {
                    exercise.execution ?
                      exercise.execution.map((execution, index) => (
                        <p className='indent-2' key={index}>{index + 1}. {execution}</p>
                      )) : null
                  }
                </Stack>
                <p className='indent-2 text-blue-700 text-[18px]'>Sfat:</p>
                <p className='indent-2'>-{exercise.advice}</p>
              </Container> : <p className='indent-2'> Ne pare rau! Momentan nu avem o descriere a exercitiului. </p>
          }
        </Modal>
      </Container>
    );
  };
  
export default ExerciseDescription;