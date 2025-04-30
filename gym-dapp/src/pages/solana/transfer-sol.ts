import {
    Connection,
    LAMPORTS_PER_SOL,
    Transaction,
    PublicKey,
    SystemProgram,
    sendAndConfirmTransaction,
    clusterApiUrl,
    Keypair,
  } from "@solana/web3.js";
  

  const sendSol = async (
    connection: Connection,
    senderKeypair: Keypair,
    recipientPubKey: PublicKey,
    amountInLamports: number
  ): Promise<boolean> => {
    try {

      let totalAmountToSend = amountInLamports;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: recipientPubKey,
          lamports: totalAmountToSend,
        })
      );

      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair],
        { commitment: "confirmed" }
      );
  
      console.log(`✅ Transaction successful! Signature: ${signature}`);
      return true;
    } catch (error) {
      console.error("❌ Error sending SOL:", error);
      return false;
    }
  };
  
 
  const TransferSolana = async ({
    senderKeypair,
    recipientPubKey,
    amountToSend,
  }: {
    senderKeypair: Keypair;
    recipientPubKey: PublicKey;
    amountToSend: number;
  }) => {
    console.log("🚀 Starting SOL transfer...");
    console.log(`Sending ${amountToSend / LAMPORTS_PER_SOL} SOL`);
  
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
    if (!(senderKeypair instanceof Keypair)) {
      console.error("❌ Invalid senderKeypair: Must be a Keypair instance.");
      return;
    }
    if (!(recipientPubKey instanceof PublicKey)) {
      console.error("❌ Invalid recipientPubKey: Must be a PublicKey instance.");
      return;
    }
  
    const senderBalance = await connection.getBalance(senderKeypair.publicKey).catch((error) =>
      console.log(`Error fetching balance for ${senderKeypair.publicKey}: ${error}`)
    );
  
    if (typeof senderBalance === "number") {
      console.log(`💰 Sender balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`);
    } else {
      console.log("⚠️ Unable to fetch sender's balance.");
      return;
    }
  
    if (typeof senderBalance === "number" && senderBalance < amountToSend) {
      console.log("⚠️ Insufficient funds for transaction!");
      return;
    }
  
    const success = await sendSol(connection, senderKeypair, recipientPubKey, amountToSend);
    if (!success) return;
  
    console.log(`🎉 Transaction completed successfully! You sent ${(amountToSend / LAMPORTS_PER_SOL)} SOL`);
  };
  
  export default TransferSolana;