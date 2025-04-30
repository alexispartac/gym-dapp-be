import {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Keypair,
  PublicKey,
} from "@solana/web3.js";


const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');


export const performAirdrop = async (
    connection: Connection,
    recipientPubKey: PublicKey,
    amountInSol: number
): Promise<boolean> => {
    try {
        console.log(`🚀 Începem airdrop-ul...`);
        const signature = await connection.requestAirdrop(
            new PublicKey(recipientPubKey),
            amountInSol * LAMPORTS_PER_SOL 
        );

        console.log(`✅ Airdrop reușit! Semnătura tranzacției: ${signature}`);
        return true;
    } catch (error) {
        console.error(`❌ Eroare la realizarea airdrop-ului:`, error);
        return false;
    }
};

const GenerateKepair = async() : Promise<Keypair> => {
    const keypair : Keypair = Keypair.generate(); 
    
        const airdropSuccess = await performAirdrop(connection, keypair.publicKey, 1); // Trimit 1 SOL
        if (airdropSuccess) {
            console.log(`🎉 Airdrop finalizat cu succes!`);
        } else {
            console.log(`⚠️ Airdrop-ul a eșuat.`);
        }
        const balanceInLamports = await connection.getBalance(keypair.publicKey);
        console.log(`${keypair.publicKey.toString()} has balance ${balanceInLamports / LAMPORTS_PER_SOL} SOL`);

    console.log("🎉 Keypair generated successfully!!");
    console.log("🔑 PublicKey", keypair.publicKey.toBase58()); 
    return keypair;
}

export default GenerateKepair;