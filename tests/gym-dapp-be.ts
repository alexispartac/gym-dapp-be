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

  it("Initialize an user account", async () => {
  
    const userid = "1";
    const username = "testuser";
    const email = "testuser@example.com";
    const password = "securepassword";

    await program.methods
      .initializeUserAccount(userid, username, email, password)
      .signers([user])
      .rpc();
    console.log("User account initialized");

    const userAccountPdaAndBump = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("useraccount"), user.publicKey.toBuffer()],
      program.programId
    );

    const userAccountPda = userAccountPdaAndBump[0]; 
    const dataFromPda = await program.account.user.fetch(userAccountPda);
    assert.equal(
      dataFromPda.username,
      username,
      "Username should match the initialized value"
    );
    assert.equal(
      dataFromPda.email,
      email,
      "Email should match the initialized value"
    );
    assert.equal(
      dataFromPda.password,
      password,
      "Password should match the initialized value"
    );

  });

});
