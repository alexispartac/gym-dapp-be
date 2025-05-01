import React, { useState } from 'react';
import { Button, Checkbox, Group, Stack, TextInput, Text, Alert } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import * as anchor from "@coral-xyz/anchor";
import * as idl from "../../api/gym-dapp_be.json"
import { useUser } from '../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import { GymDappBe } from '@/api/gym_dapp_be';

export interface SigninProp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUpModal = ({ context, id }: ContextModalProps) => {
    const [signUp, setSignUp] = useState<SigninProp>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [checked, setChecked] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { setUser } = useUser();
    const [, setCookie] = useCookies(['login']);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!signUp.username || signUp.username.length < 4) {
            setErrorMessage('Username must be at least 4 characters long.');
            return;
        }

        if (!signUp.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUp.email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (!signUp.password || signUp.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        if (signUp.password !== signUp.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!checked) {
            setErrorMessage('You must agree to the terms and conditions.');
            return;
        }

        setErrorMessage('');
        setLoading(true);

        try {
            const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "processed");
            const wallet = (window as any).solana;

            if (!wallet || !wallet.isPhantom) {
                throw new Error("Phantom Wallet is not available");
            }

            if (!wallet.publicKey) {
                throw new Error("Wallet is not connected. Please connect your Phantom Wallet.");
            }

            const provider = new anchor.AnchorProvider(connection, wallet, {
                preflightCommitment: "processed",
            });
            anchor.setProvider(provider);
            const program: anchor.Program<GymDappBe> = new anchor.Program(idl as GymDappBe, provider);

            const userid = uuidv4();
            try {
                // * initialized account
                await program.methods
                    .initializeUserAccount(userid, signUp.username, signUp.email, signUp.password)
                    .rpc();
                console.log("User account initialized");
                await program.methods
                    .initializeUserWorkouts(userid)
                    .rpc();
                console.log("User workouts account initialized")
                await program.methods
                    .initializeUserRoutine(userid)
                    .rpc();
                console.log("User routines account initialized")
                await program.methods
                    .initializeUserExercises(userid)
                    .rpc();
                console.log("User exercises account initialized")
                //*

                //* accounts pda
                const userAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
                    [Buffer.from("useraccount"), wallet.publicKey.toBuffer()],
                    program.programId
                );

                const userAccountPda = userAccountPdaAndBump[0];
                console.log("User Account PDA:", userAccountPda.toString());

                const workoutsAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
                    [Buffer.from("workouts"), wallet.publicKey.toBuffer()],
                    program.programId
                )

                const workoutsAccountPda = workoutsAccountPdaAndBump[0];
                console.log("User Workouts Account PDA:", workoutsAccountPda.toString());

                const routinesAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
                    [Buffer.from("routines"), wallet.publicKey.toBuffer()],
                    program.programId
                )

                const routinesAccountPda = routinesAccountPdaAndBump[0];
                console.log("User Routines Account PDA:", routinesAccountPda.toString());

                const exercisesAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
                    [Buffer.from("exercises"), wallet.publicKey.toBuffer()],
                    program.programId
                )

                const exercisesAccountPda = exercisesAccountPdaAndBump[0];
                console.log("User Exercises Account PDA:", exercisesAccountPda.toString());
                //*
            
                const dataFromPda: {
                    userid: string;
                    username: string;
                    email: string;
                    password: string;
                } = await program.account.user.fetch(userAccountPda);

                if (dataFromPda.userid === userid) {
                    const userInfo = {
                        username: dataFromPda.username,
                        userId: dataFromPda.userid,
                        publicKey: wallet.publicKey.toString(),
                        email: dataFromPda.email,
                    }
                    setUser({
                        userInfo: userInfo,
                        isAuthenticated: true,
                    });
                    setCookie('login', { userInfo: userInfo }, { path: '/' });
                    context.closeModal(id);
                }
                else {
                    setErrorMessage("You have an account. Please LogIn");
                }
            } catch (error: any) {
                console.log(error.message);
                setErrorMessage("Failed to create user account. Please try again.")
            }
            setLoading(false);
        } catch (error: any) {
            console.error("Error initializing user account:", error);
            setErrorMessage("Failed to create user account. Please try again.");
            setLoading(false);
        }
    };

    return (
        <Stack>
            {errorMessage && (
                <Alert title="Error" color="red" variant="filled" mb="xs">
                    {errorMessage}
                </Alert>
            )}

            <TextInput
                name="username"
                label="Username"
                placeholder="Username"
                data-autofocus
                onChange={handleChange}
                classNames={{
                    input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                    label: "text-white",
                    error: "text-red-500",
                }}
            />

            <TextInput
                name="email"
                label="Email"
                placeholder="Email"
                onChange={handleChange}
                classNames={{
                    input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                    label: "text-white",
                    error: "text-red-500",
                }}
            />

            <TextInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                classNames={{
                    input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                    label: "text-white",
                    error: "text-red-500",
                }}
            />

            <TextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
                classNames={{
                    input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                    label: "text-white",
                    error: "text-red-500",
                }}
            />

            <Checkbox
                onChange={(e) => setChecked(e.target.checked)}
                py="3px"
                label="By signing up you agree to our terms and conditions"
                classNames={{
                    input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                    label: "text-white",
                    error: "text-red-500",
                }}
            />

            <Text>
                Already have an account?{' '}
                <Button
                    variant="outline"
                    color="blue"
                    className="h-[20px]"
                    onClick={() => {
                        context.closeModal(id);
                        modals.openContextModal({
                            modal: 'login',
                            title: 'LogIn',
                            innerProps: undefined,
                            centered: true,
                            padding: 'xl',
                            classNames: {
                                content: "bg-neutral-800 text-white",
                                header: "bg-neutral-800 text-white",
                                title: "text-white",
                                close: "text-white bg-neutral-800 hover:bg-neutral-700",
                            },
                        });
                    }}
                >
                    LogIn
                </Button>
            </Text>

            <Group justify="flex-end" mt="md">
                <Button
                    type="submit"
                    disabled={loading}
                    color="white"
                    bg="blue"
                    variant="outline"
                    onClick={handleSubmit}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Group>
        </Stack>
    );
};