import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TokenSelector } from './token-selector';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SwapForm() {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const handleSwap = async () => {
    if (!publicKey) {
      console.log("Wallet not connected");
      return;
    }

    try {
      const balance = await connection.getBalance(publicKey);
      console.log(`Wallet balance: ${balance / 1e9} SOL`);
      console.log(`Swapping ${amount} ${fromToken} to ${toToken}`);
      // Implement actual swap logic here
    } catch (error) {
      console.error("Error during swap:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-2">From</label>
        <TokenSelector onSelect={setFromToken} />
        <Input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">To</label>
        <TokenSelector onSelect={setToToken} />
      </div>
      <Button onClick={handleSwap} className="w-full" disabled={!fromToken || !toToken || !amount || !publicKey}>
        {publicKey ? 'Swap' : 'Connect Wallet to Swap'}
      </Button>
    </div>
  );
}

