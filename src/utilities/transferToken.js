import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
  } from '@solana/web3.js';
  import {
    getOrCreateAssociatedTokenAccount,
    createTransferInstruction,
  } from '@solana/spl-token';
  
  export const transferRosaTokens = async (
    fromWallet,
    toPublicKey,
    amount, // amount in tokens (not lamports)
    rosaTokenMintAddress,
  ) => {
    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com');
  
      const mintPublicKey = new PublicKey(rosaTokenMintAddress);
      const toPublicKeyObj = new PublicKey(toPublicKey);
      const fromPublicKeyObj = fromWallet.publicKey;
  
      // 1. Get sender's associated token account
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mintPublicKey,
        fromPublicKeyObj
      );
  
      // 2. Get receiver's associated token account
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mintPublicKey,
        toPublicKeyObj
      );
  
      // 3. Create a transfer instruction
      const transferInstruction = createTransferInstruction(
        fromTokenAccount.address,
        toTokenAccount.address,
        fromPublicKeyObj,
        // BigInt(amount) // 👈 make sure it's a bigint
        amount // 👈 make sure it's a bigint
      );
  
      // 4. Add instruction to a transaction
      const transaction = new Transaction().add(transferInstruction);
  
      // 5. Sign and send the transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [fromWallet]
      );
  
      console.log('Transfer successful, signature:', signature);
      return signature;
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Failed to send tokens.');
      throw error;
    }
  };
  