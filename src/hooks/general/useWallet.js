


import { useState } from 'react';



export const useWallet = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    try {

      const provider = (window).phantom?.solana;
      if (!provider?.isPhantom) {
        alert('Please install Phantom Wallet!');
        return;
      }
      const response = await provider.connect();
      console.log(response.publicKey.toString())
      setWalletAddress(response.publicKey.toString());

    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet.');
    }

  };

  return { walletAddress, connectWallet };
};




