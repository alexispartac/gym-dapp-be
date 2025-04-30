import { useState } from 'react';
import { Stack, TextInput, Group, Button, Alert } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useUser } from '../../context/UserContext';
import * as anchor from "@coral-xyz/anchor";
import idl from "../../api/gym-dapp_be.json"
import { useCookies } from 'react-cookie';
import { GymDappBe } from '../../api/gym_dapp_be'

export interface LoginProp {
    username: string;
    password: string;
};

export const LoginModal = ({ context, id }: { context: { closeModal: (id: string) => void }; id: string }) => {
    const [login, setLogin] = useState({ username: '', password: '' }); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const { setUser } = useUser();
    const [, setCookie] = useCookies(['login']);

    const handleChange = (e : any) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleSubmit = async() => {
        if (!login.username || login.username.length < 8) {
            setErrorMessage('Username trebuie să aibă cel puțin 8 caractere.');
            return;
        }

        if (!login.password || login.password.length < 8) {
            setErrorMessage('Parola trebuie să aibă cel puțin 8 caractere.');
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

            try {
                const userAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
                    [Buffer.from("useraccount"), wallet.publicKey.toBuffer()],
                    program.programId
                );

                const userAccountPda = userAccountPdaAndBump[0];
                console.log("User Account PDA:", userAccountPda.toString());
                const dataFromPda: {
                    userid: string;
                    username: string;
                    email: string;
                    password: string;
                } = await program.account.user.fetch(userAccountPda);
                console.log("Data from PDA:", dataFromPda);

                if (!dataFromPda || dataFromPda.username !== login.username
                    || dataFromPda.password !== login.password)
                    setErrorMessage("Username or password is incorrect!");
                else {
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
            } catch (error: any) {
                if (error.message === 'Invalid account discriminator')
                    setErrorMessage("Username or password is incorrect!");
            }      
            setLoading(false);
        } catch (error : any) {
            console.error("Error logging in user:", error);
            setErrorMessage(error.message || "Failed to log in. Please try again.");
            setLoading(false);
        }
    };

    return (
        <Stack>
            {errorMessage && (
                <Alert title="Eroare" color="red" variant="filled">
                    {errorMessage}
                </Alert>
            )}

            <TextInput
                name="username"
                label="Username"
                placeholder="Your username"
                data-autofocus
                onChange={handleChange}
                classNames={
                    {
                        input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                        label: "text-white",
                        error: "text-red-500",
                    }
                }
            />

            <TextInput
                name="password"
                label="Password"
                placeholder="Your password"
                type="password"
                onChange={handleChange}
                classNames={
                    {
                        input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                        label: "text-white",
                        error: "text-red-500",
                    }
                }
            />

            <Group justify="flex-end" mt="md">
                <Button
                    type="button"
                    color="blue"
                    variant="outline"
                    onClick={() => {
                        context.closeModal(id);
                        modals.openContextModal({
                            modal: 'signup',
                            title: 'SignUp',
                            centered: true,
                            innerProps: undefined,
                            classNames: {
                                content: "bg-neutral-800 text-white",
                                header: "bg-neutral-800 text-white",
                                title: "text-white",
                                close: "text-white bg-neutral-800 hover:bg-neutral-700",
                            },
                        });
                    }}
                >
                    SignIn
                </Button>

                <Button
                    type="button"
                    disabled={loading || login.username === '' || login.password === ''}
                    color="white"
                    bg="blue"
                    variant="outline"
                    onClick={handleSubmit}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </Group>
        </Stack>
    );
};