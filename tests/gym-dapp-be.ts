import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GymDappBe } from "../target/types/gym_dapp_be";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { assert, expect } from "chai";
import { describe, it } from "mocha";
import { BN } from "bn.js";

describe("gym-dapp-be", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const user = (provider.wallet as anchor.Wallet).payer;

  const program = anchor.workspace.GymDappBe as Program<GymDappBe>;

  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSOL = balance / anchor.web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSOL);
    console.log(`Balance: ${formattedBalance} SOL`);
  });

  // it("Initialize an user account", async () => {
  
  //   const userid = "1";
  //   const username = "testuser";
  //   const email = "testuser@example.com";
  //   const password = "securepassword";

  //   await program.methods
  //     .initializeUserAccount(userid, username, email, password)
  //     .signers([user])
  //     .rpc();
  //   console.log("User account initialized");

  //   const userAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("useraccount"), user.publicKey.toBuffer()],
  //     program.programId
  //   );

  //   const userAccountPda = userAccountPdaAndBump[0]; 
  //   const dataFromPda = await program.account.user.fetch(userAccountPda);
  //   assert.equal(
  //     dataFromPda.username,
  //     username,
  //     "Username should match the initialized value"
  //   );
  //   assert.equal(
  //     dataFromPda.email,
  //     email,
  //     "Email should match the initialized value"
  //   );
  //   assert.equal(
  //     dataFromPda.password,
  //     password,
  //     "Password should match the initialized value"
  //   );

  // });
  console.log(" ");

  // it("Initialize an user workouts account", async () => {

  //   const userid = '1';
    
  //   await program.methods
  //     .initializeUserWorkouts(userid)
  //     .signers([user])
  //     .rpc();
  //   console.log("User workouts account initialized");

  //   const userWorkoutsAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("workouts"), user.publicKey.toBuffer()],
  //     program.programId
  //   );

  //   const userWorkoutsAccountPda = userWorkoutsAccountPdaAndBump[0]; 
  //   const dataFromPda = await program.account.workouts.fetch(userWorkoutsAccountPda);


  //   console.log(dataFromPda);

  // });
  console.log(" ");

  // it("Add workout to workouts user account", async () => {
  //   // Define test data
  //   const workout = {
  //     workoutid: "workout1",
  //     exercises: [
  //       {
  //         id: "exercise1",
  //         name: "Bench Press",
  //         muscleGroup: "Chest",
  //         sets: [
  //           { setNumber: 1, kg: 100, reps: 10, previous: "90kg", done: true },
  //           { setNumber: 2, kg: 100, reps: 8, previous: "90kg", done: true },
  //         ],
  //       },
  //     ],
  //     date: new BN(Math.floor(Date.now() / 1000)), // Current timestamp in seconds
  //     duration: 60, // Duration in minutes
  //     volume: 1000, // Total volume (kg * reps)
  //     sets: 2, // Total sets
  //     rewards: 0.001, // Rewards points
  //   };
  
  //   // Calculate the PDA for the user workouts account
  //   const [userWorkoutsAccountPda, _] = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("workouts"), user.publicKey.toBuffer()],
  //     program.programId
  //   );
  
  //   // Call the add_user_workout function
  //   await program.methods
  //     .addWorkout(workout)
  //     .signers([user])
  //     .rpc();
  
  //   console.log("Workout added to user workouts account");
  
  //   // Fetch the updated user workouts account data
  //   const dataFromPda = await program.account.workouts.fetch(userWorkoutsAccountPda);
  
  //   // Assertions to verify the workout was added
  //   console.log("Updated User Workouts Data:", dataFromPda);
  // });
  console.log(" ");

  // it("Remove workout from workouts user account by workoutid", async () => {
  //   // Define the workout ID to remove
  //   const workoutid = "workout1";
  
  //   // Calculate the PDA for the user workouts account
  //   const [userWorkoutsAccountPda, _] = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("workouts"), user.publicKey.toBuffer()],
  //     program.programId
  //   );
  
  //   // Call the remove_user_workout function
  //   await program.methods
  //     .removeWorkout(workoutid)
  //     .signers([user])
  //     .rpc();
  
  //   console.log(`Workout with ID ${workoutid} removed from user workouts account`);
  
  //   // Fetch the updated user workouts account data
  //   const dataFromPda = await program.account.workouts.fetch(userWorkoutsAccountPda);
  
  //   // Assertions to verify the workout was removed
  //   console.log("Updated User Workouts Data:", dataFromPda);
  //   const removedWorkout = dataFromPda.workouts.find((w: any) => w.workoutid === workoutid);
  //   assert.isUndefined(removedWorkout, "Workout should be removed from the workouts list");
  // });

  console.log(" ");
  // it("Initialize an user routines account", async () => {

  //   const userid = '1';
    
  //   await program.methods
  //     .initializeUserRoutine(userid)
  //     .signers([user])
  //     .rpc();
  //   console.log("User routines account initialized");

  //   const userRoutinesAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("routines"), user.publicKey.toBuffer()],
  //     program.programId
  //   );

  //   const userRoutinesAccountPda = userRoutinesAccountPdaAndBump[0]; 
  //   const dataFromPda = await program.account.routines.fetch(userRoutinesAccountPda);


  //   console.log(dataFromPda);

  // });
  
  console.log(" ");
  // it("Add routine to routines user account", async () => {
  //     // Define test data
  //     const routine = {
  //         routineid: "routine2",
  //         name: "SecondRoutine",
  //         exercises: [
  //           {
  //             id: "exercise1",
  //             name: "Bench Press",
  //             muscleGroup: "Chest",
  //             sets: [
  //               { setNumber: 1, kg: 100, reps: 10, previous: "90kg", done: true },
  //               { setNumber: 2, kg: 100, reps: 8, previous: "90kg", done: true },
  //             ],
  //           },
  //         ],
  //     };

  //     const [userRoutinesAccountPda, _] = await anchor.web3.PublicKey.findProgramAddress(
  //       [Buffer.from("routines"), user.publicKey.toBuffer()],
  //       program.programId
  //     );
    
  //     await program.methods
  //       .addRoutine(routine)
  //       .signers([user])
  //       .rpc();

  //     console.log("Routine added to user routines account");
    

  //     const dataFromPda = await program.account.routines.fetch(userRoutinesAccountPda);
    
  //     // Assertions to verify the workout was added
  //     console.log("Updated User Routines Data:", dataFromPda);
  //   });

  console.log(" ");
  // it("Remove routine from routines user account by routineid", async () => {

  //   const routineid = "routine2";

  //   const [userRoutinesAccountPda, _] = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("routines"), user.publicKey.toBuffer()],
  //     program.programId
  //   );
  
  //   await program.methods
  //     .removeRoutine(routineid)
  //     .signers([user])
  //     .rpc();
  
  //   console.log(`Routine with ID ${routineid} removed from user routines account`);
  
  //   const dataFromPda = await program.account.routines.fetch(userRoutinesAccountPda);
  
  //   console.log("Updated User Routines Data:", dataFromPda);
  //   const removeRoutines = dataFromPda.routines.find((r: any) => r.routineid === routineid);
  //   assert.isUndefined(removeRoutines, "Routine should be removed from the routines list");
  // });

  console.log("");
  // it("Initialize an user exercises account", async () => {
  //   const userid = '1';
    
  //   await program.methods
  //     .initializeUserExercises(userid)
  //     .signers([user])
  //     .rpc();
  //   console.log("User exercises account initialized");

  //   const userExercisesAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from("exercises"), user.publicKey.toBuffer()],
  //     program.programId
  //   );

  //   const userExercisesAccountPda = userExercisesAccountPdaAndBump[0]; 
  //   const dataFromPda = await program.account.exercises.fetch(userExercisesAccountPda);


  //   console.log(dataFromPda);
  // })

  console.log("");
  // it("Add exercise to exercises user account", async () => {
  //     const exercise = {
  //       id: "exercise1",
  //       name: "Bench Press",
  //       muscleGroup: "Chest",
  //       sets: [
  //         { setNumber: 1, kg: 100, reps: 10, previous: "90kg", done: true },
  //         { setNumber: 2, kg: 100, reps: 8, previous: "90kg", done: true },
  //       ],
  //     }

  //     const [userExercisesAccountPda, _] = await anchor.web3.PublicKey.findProgramAddress(
  //       [Buffer.from("exercises"), user.publicKey.toBuffer()],
  //       program.programId
  //     );
    
  //     await program.methods
  //       .addExercise(exercise)
  //       .signers([user])
  //       .rpc();

  //     console.log("Exercise add to exercises user account");
    

  //     const dataFromPda = await program.account.exercises.fetch(userExercisesAccountPda);

  //     console.log("Updated User Exercises Data:", dataFromPda);
  // })

  console.log("");
  // it("Update exercise from exercises user account", async () => {
  //   const exercise = {
  //           id: "exercise1",
  //           name: "Bench Press",
  //           muscleGroup: "Chest",
  //           sets: [
  //             { setNumber: 1, kg: 100, reps: 10, previous: "100kg", done: true },
  //             { setNumber: 2, kg: 100, reps: 10, previous: "100kg", done: true },
  //           ],
  //         }
    
  //   const [userExercisesAccountPda, _] = await anchor.web3.PublicKey.findProgramAddress(
  //           [Buffer.from("exercises"), user.publicKey.toBuffer()],
  //           program.programId
  //         );
        
  //   await program.methods
  //     .updateExercises(exercise)
  //     .signers([user])
  //     .rpc();

  //   console.log("Exercise updated successfully");
  

  //   const dataFromPda = await program.account.exercises.fetch(userExercisesAccountPda);

  //   console.log("Updated User Exercises Data:", dataFromPda);
    
  // })
});
