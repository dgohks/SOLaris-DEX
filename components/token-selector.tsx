import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MOCK_TOKENS = [
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'USDC', name: 'USD Coin' },
  { symbol: 'RAY', name: 'Raydium' },
];

export function TokenSelector({ onSelect }: { onSelect: (token: string) => void }) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a token" />
      </SelectTrigger>
      <SelectContent>
        {MOCK_TOKENS.map((token) => (
          <SelectItem key={token.symbol} value={token.symbol}>
            {token.name} ({token.symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

