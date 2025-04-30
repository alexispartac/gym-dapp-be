'use client'
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js";


export async function CheckBalance( { pubkey } : {  pubkey : string } ) {
    if (!pubkey)
    {
        return 0;
    }
    const pubkeyObject = new PublicKey(pubkey);
    const connection = new Connection(clusterApiUrl("devnet")); 
    const balanceInLamports = await connection.getBalance(pubkeyObject);

    return balanceInLamports / LAMPORTS_PER_SOL;
}