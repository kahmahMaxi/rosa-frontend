import {
  Connection,
  PublicKey,
  SendTransactionError,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export const transferRosaTokens = async (
  rpcEndpoint,
  walletAdapter,
  toPublicKey,
  amount,
  mintAddress
) => {
  try {
    const connection = new Connection(
      rpcEndpoint || clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    const fromPubkey = walletAdapter.publicKey;
    const toPubkey = new PublicKey(toPublicKey);
    const mint = new PublicKey(mintAddress);

    // Derive associated token accounts
    const fromTokenAccount = await getAssociatedTokenAddress(mint, fromPubkey);
    const toTokenAccount = await getAssociatedTokenAddress(mint, toPubkey);

    // Initialize transaction
    const transaction = new Transaction();

    // Check if destination ATA exists; create it if not
    try {
      await getAccount(connection, toTokenAccount);
    } catch (error) {
      if (error.message.includes("TokenAccountNotFoundError")) {
        const createAtaIx = createAssociatedTokenAccountInstruction(
          fromPubkey, // Payer (sender)
          toTokenAccount, // ATA address
          toPubkey, // Owner (recipient)
          mint // Token mint
        );
        transaction.add(createAtaIx);
        console.log("Added instruction to create destination ATA");
      } else {
        throw error;
      }
    }

    // Add transfer instruction
    const transferIx = createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      fromPubkey,
      // BigInt(amount),
      amount,
      [],
      TOKEN_PROGRAM_ID
    );
    transaction.add(transferIx);

    // Set blockhash and fee payer
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubkey;

    // Sign and send
    const signedTx = await walletAdapter.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
    });
    const confirmation = await connection.confirmTransaction(txid);
    // console.log("Transaction ID:", txid, "Confirmation:", confirmation);
    return { txid, confirmation };
  } catch (error) {
    console.error("Transfer failed:", error);
    if (error instanceof SendTransactionError) {
      console.log("Transaction logs:", await error.getLogs());
    }
    throw error;
  }
};