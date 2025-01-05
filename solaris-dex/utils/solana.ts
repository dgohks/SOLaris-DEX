import { Connection, clusterApiUrl } from '@solana/web3.js';

export const getConnection = () => new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || clusterApiUrl('devnet')
);

