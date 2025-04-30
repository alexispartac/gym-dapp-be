import React, { useState } from 'react';
import { Container, Group, Skeleton, Stack } from '@mantine/core';
import { useUser } from '../context/UserContext';
import { WorkoutB, WorkoutsB } from './Workout';
import { modals } from '@mantine/modals';
import { SkeletonText } from '@chakra-ui/react';
import { motion } from "framer-motion";
import * as anchor from "@coral-xyz/anchor";
import * as idl from "../api/gym-dapp_be.json"
import { GymDappBe } from '@/api/gym_dapp_be';
import { PublicKey } from '@solana/web3.js';



const Balance = () => {
  const { balance } = useUser();
  const [showAnimation, setShowAnimation] = useState(true);
  const [activeCoin, setActiveCoin] = useState(0); 
  const [newCoins, setNewCoins] = useState<{ x: number; y: number; z: number; target: { x: number; y: number; z: number } }[]>([]);
  const numCoins = 200;

  const coinVariants = {
    hidden: () => ({
      x: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 10000, 
      y: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 10000, 
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 2, 
        ease: "easeOut",
      },
    },
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveCoin((prev) => (prev + 1) % numCoins);
    }, 200); 
    return () => clearInterval(interval);
  }, [numCoins]);

  const coins = Array.from({ length: numCoins }).map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / numCoins); 
    const theta = Math.sqrt(numCoins * Math.PI) * phi; 
    const x = Math.sin(phi) * Math.cos(theta) * 380; 
    const y = Math.sin(phi) * Math.sin(theta) * 380; 
    const z = Math.cos(phi) * 380;
    return { x, y, z };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomCoin = {
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000, 
        z: Math.random() * 2000 - 1000, 
        target: coins[Math.floor(Math.random() * coins.length)], 
      };
      setNewCoins((prev) => [...prev, randomCoin]);
    }, 20); 

    return () => clearInterval(interval);
  }, [coins]);

  const sphereAnimation = {
    rotateY: [0, 360], 
    rotateX: [], 
    transition: {
      repeat: Infinity, 
      duration: 15, 
      ease: "linear", 
    },
  };

  return (
    <div className="relative flex h-screen overflow-hidden w-full m-auto justify-center text-3xl items-center flex-col dark:text-white">
      {showAnimation &&
        [...Array(100)].map((_, i) => (
          <motion.img
            key={i}
            src="/solana-logo.png"
            alt="solana-logo"
            className="absolute h-10 w-10"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={coinVariants}
            onAnimationComplete={() => {
              if (i === 99) {
                setShowAnimation(false);
              }
            }}
          />
        ))}

      {!showAnimation && (
        <div>
          <div className="relative flex h-[30px] flex-row text-xl md:h-[50px] md:text-5xl z-20 text-white">
            {balance}{" "}
            <img
              src="/solana-logo.png"
              alt="solana-logo"
              className="flex h-[100%] pl-[3px] pt-[3px]"
            />
          </div>
          <motion.div
            className="relative flex items-center z-10 justify-center w-full h-full"
            animate={sphereAnimation}
            style={{
              perspective: 1500,
            }}
          >
            {coins.map((coin, i) => (
              <motion.img
                key={i}
                src="/solana-logo.png"
                alt="solana-logo"
                className="absolute h-10 w-10"
                animate={i === activeCoin ? "toSphere" : "hidden"}
                style={{
                  transform: `translate3d(${coin.x}px, ${coin.y}px, ${coin.z}px)`,
                }}
              />
            ))}
            {newCoins.map((coin, i) => (
              <motion.img
                key={`new-${i}`}
                src="/solana-logo.png"
                alt="solana-logo"
                className="absolute h-10 w-10"
                initial={{
                  x: coin.x,
                  y: coin.y,
                  z: coin.z,
                  opacity: 0,
                }}
                animate={{
                  x: coin.target.x,
                  y: coin.target.y,
                  z: coin.target.z,
                  opacity: 1,
                  transition: {
                    duration: 6,
                    ease: "easeOut",
                  },
                }}
                onAnimationComplete={() => {
                  setNewCoins((prev) => prev.filter((_, index) => index !== i));
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

const SkeletonPost = () => {
  return (
    <Stack gap="6" maw="3xl" w="full">
      <Group w="full">
        <SkeletonText noOfLines={2} className=' dark:bg-neutral-800 after:bg-neutral-800' />
        <br />
      </Group>
      <Skeleton height="200px" className=' dark:bg-neutral-800' />
      <br />
    </Stack>
  );
};

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const Post = ({ workout, onDelete }: { workout: WorkoutB, onDelete: (id: string) => void }) => {
 
  const { user } = useUser();
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your workout',
      centered: true,
      children: (
        <h1>
          Are you sure you want to delete? This action is destructive.
        </h1>
      ),
      classNames: {
        content: "bg-neutral-800 text-white",
        header: "bg-neutral-800 text-white",
        title: "text-white",
        close: "text-white bg-neutral-800 hover:bg-neutral-700",
      },
      labels: { confirm: 'Delete workout', cancel: "No don't delete it" },
      confirmProps: { color: 'red', variant: 'outline' },
      cancelProps: { color: 'gray', variant: 'outline' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => onDelete(workout.workoutid),
    });

  return (
    <div className="w-[100%] p-6 my-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-neutral-800 dark:border-neutral-700 ">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.userInfo.username}</h2>
        <span className="text-sm text-gray-500">
          {new Date(workout.date).toLocaleDateString()}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700  dark:text-white">Exercises:</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600  dark:text-white">
          {workout.exercises.map((exercise, index) => (
            index < 3 && (
              <li key={exercise.id}>
                <span className="font-medium">{exercise.name}</span> - {exercise.muscleGroup}
              </li>
            )
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-gray-700  dark:text-white">
          <p>
            <span className="font-semibold">Duration:</span> {formatDuration(workout.duration)}
          </p>
          <p>
            <span className="font-semibold">Volume:</span> {workout.volume} kg
          </p>
        </div>
        <div className="text-gray-700  dark:text-white">
          <p>
            <span className="font-semibold">Sets:</span> {workout.sets}
          </p>
          <p>
            <span className="font-semibold">Rewards:</span> {workout.rewards / 100000000} SOL
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          onClick={openDeleteModal}
        >
          Delete Workout
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [workouts, setWorkouts] = React.useState<WorkoutB[]>([]);
  const { user } = useUser();


  React.useEffect(() => {
    const fetchWorkouts = async () => {
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
        const workoutsAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("workouts"), new PublicKey(user.userInfo.publicKey).toBuffer()],
            program.programId
        )

        const workoutsAccountPda = workoutsAccountPdaAndBump[0];
        const response = await program.account.workouts.fetch(workoutsAccountPda);

        const reversedWorkouts: WorkoutB[] = response.workouts
          .map((workout: any) => ({
            ...workout,
            date: workout.date.toNumber(),
          }))
          .reverse();
  
        console.log("Workouts", reversedWorkouts);

        setWorkouts(reversedWorkouts);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
        console.error("Failed to fetch workouts. Please try again.");
      }
    };

    fetchWorkouts();
  }, [user]);

  async function DeleteWorkout(workoutid: string) {
    if (!user || !user.userInfo || !user.userInfo.userId || !user.userInfo.username) {
        console.error("User information is missing");
        return;
    }
    const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "processed");
    const wallet = (window as any).solana;
    await wallet.connect();
    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });

    anchor.setProvider(provider);
    const program: anchor.Program<GymDappBe> = new anchor.Program(idl as GymDappBe, provider);

    try {
      const workoutsAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("workouts"), new PublicKey(user.userInfo.publicKey).toBuffer()],
        program.programId
      )

      const workoutsAccountPda = workoutsAccountPdaAndBump[0];

      await program.methods
        .removeWorkout(workoutid)
        .accountsPartial(
          {
            user: new PublicKey(user.userInfo.publicKey),
            workouts: workoutsAccountPda,
            systemProgram: anchor.web3.SystemProgram.programId,
          }
        )
        .rpc();
      console.log("Workout remove successfully!")

      const updatedWorkouts: WorkoutB[] = (await program.account.workouts.fetch(workoutsAccountPda)).workouts.map((workout: any) => ({
        ...workout,
        date: workout.date.toNumber(),
      }));


      console.log("Workouts", updatedWorkouts);

      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.workoutid !== workoutid));
    } catch (error) {
      console.error("Failed to delete workout:", error);
      console.error("Failed to delete workout. Please try again.");
    }
  };

  return (
    <Container w={"100%"} size={'lg'}>
      <Balance />
      <Container w={"100%"}>
        {workouts.length > 0 ? (
          workouts.map((workout: WorkoutB) => (
            <Post key={workout.workoutid} workout={workout} onDelete={DeleteWorkout} />
          ))
        ) : (
          workouts.length === 0 ?
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-2xl dark:text-white">No workouts yet</h1>
            </div>
            :
          <Stack my={"2rem"} gap="6" maw="3xl" w="full">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </Stack>
        )}
      </Container>
      <br />
    </Container>
  );
};

export default Home;