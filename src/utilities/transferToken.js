import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  sendAndConfirmRawTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export const transferRosaTokens = async (
  walletAdapter,
  toPublicKey,
  amount,
  mintAddress
) => {
  try {
    const connection = new Connection(
      "https://api.mainnet-beta.solana.com",
      "confirmed"
    );
    const fromPubkey = walletAdapter.publicKey;
    const toPubkey = new PublicKey(toPublicKey);
    const mint = new PublicKey(mintAddress);

    const fromTokenAccount = await getAssociatedTokenAddress(mint, fromPubkey);
    const toTokenAccount = await getAssociatedTokenAddress(mint, toPubkey);

    const transferIx = createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      fromPubkey,
      // eslint-disable-next-line no-undef
      BigInt(amount)
    );

    const transaction = new Transaction().add(transferIx);
    transaction.feePayer = fromPubkey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const signedTx = await walletAdapter.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTx.serialize());

    console.log("Transaction ID:", txid);
    return txid;
  } catch (error) {
    console.error("Transfer failed:", error);
    throw error;
  }
};
