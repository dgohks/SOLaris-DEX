import { X } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TOKENS } from '@/utils/constants'

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  token: keyof typeof TOKENS
  txHash: string
}

export function TransactionModal({ isOpen, onClose, amount, token, txHash }: TransactionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle>Transaction Processed</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Image 
                src={TOKENS[token].logo} 
                alt={TOKENS[token].name} 
                width={32} 
                height={32} 
              />
              <span className="text-xl font-bold">
                {amount} {token}
              </span>
            </div>
            <a 
              href={`https://solscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              View on Solscan
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

