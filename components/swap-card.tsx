'use client'

import { useState } from 'react'
import { ArrowDownUp, Settings2Icon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TOKENS, MOCK_RATES } from "@/utils/constants"
import Image from 'next/image'
import { SettingsModal } from './settings-modal'
import { TransactionModal } from './transaction-modal'

export function SwapCard() {
  const [fromToken, setFromToken] = useState(TOKENS.SOL)
  const [toToken, setToToken] = useState(TOKENS.USDC)
  const [fromAmount, setFromAmount] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)

  // Mock transaction hash for demo
  const [txHash, setTxHash] = useState('your-transaction-hash')

  const handleSwapPair = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount('')
  }

  const getExchangeRate = (from: typeof fromToken, to: typeof toToken) => {
    const pair = `${from.symbol}/${to.symbol}`
    return MOCK_RATES[pair] || 0
  }

  const calculateToAmount = () => {
    const rate = getExchangeRate(fromToken, toToken)
    if (!fromAmount || !rate) return '0.00'
    return (parseFloat(fromAmount) * rate).toFixed(2)
  }

  const handleSwap = () => {
    // Mock successful transaction
    setTxHash('mock-transaction-hash-123')
    setIsTransactionModalOpen(true)
  }

  const toAmount = calculateToAmount()

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-md bg-background/80 border-2">
      <CardHeader className="flex flex-col items-center space-y-1 pb-2">
        <CardTitle className="text-3xl font-bold">SOLaris DEX</CardTitle>
        <p className="text-sm text-muted-foreground">Swapping done simpler.</p>
        <p className="text-sm text-muted-foreground font-bold">Powered by Solana</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">From</label>
              <span className="text-sm text-muted-foreground">Balance: 0.00</span>
            </div>
            <div className="flex space-x-2">
              <Input 
                type="number" 
                placeholder="0.00" 
                className="flex-grow" 
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
              <Select value={fromToken.symbol} onValueChange={(value) => setFromToken(TOKENS[value])}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue>
                    <div className="flex items-center">
                      <Image src={fromToken.logo} alt={fromToken.name} width={24} height={24} className="mr-2" />
                      {fromToken.symbol}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TOKENS).map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center">
                        <Image src={token.logo} alt={token.name} width={24} height={24} className="mr-2" />
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="ghost" size="icon" className="rounded-full bg-muted" onClick={handleSwapPair}>
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">To</label>
              <span className="text-sm text-muted-foreground">Balance: 0.00</span>
            </div>
            <div className="flex space-x-2">
              <Input type="number" placeholder="0.00" className="flex-grow" value={toAmount} readOnly />
              <Select value={toToken.symbol} onValueChange={(value) => setToToken(TOKENS[value])}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue>
                    <div className="flex items-center">
                      <Image src={toToken.logo} alt={toToken.name} width={24} height={24} className="mr-2" />
                      {toToken.symbol}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TOKENS).map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center">
                        <Image src={token.logo} alt={token.name} width={24} height={24} className="mr-2" />
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2 mt-2">
              <p className="text-sm text-muted-foreground">
                ≈ {getExchangeRate(fromToken, toToken)} {toToken.symbol} per {fromToken.symbol}
              </p>
              {fromAmount && (
                <p className="text-sm text-muted-foreground">
                  You will receive:<br />≈ {toAmount} {toToken.symbol}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="icon" onClick={() => setIsSettingsOpen(true)}>
            <Settings2Icon className="h-4 w-4" />
          </Button>
          {isWalletConnected ? (
            <Button className="flex-grow ml-2" onClick={handleSwap}>Swap</Button>
          ) : (
            <Button className="flex-grow ml-2" onClick={() => setIsWalletConnected(true)}>Connect Wallet</Button>
          )}
        </div>
      </CardFooter>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <TransactionModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        amount={toAmount}
        token={toToken.symbol}
        txHash={txHash}
      />
    </Card>
  )
}

