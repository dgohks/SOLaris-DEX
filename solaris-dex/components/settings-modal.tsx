'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [mevProtection, setMevProtection] = useState(false)
  const [slippageType, setSlippageType] = useState('auto')
  const [customSlippage, setCustomSlippage] = useState('')
  const [feesType, setFeesType] = useState('auto')
  const [customFees, setCustomFees] = useState('')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Swap Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="mev-protection">MEV Protection (Jito)</Label>
            <Switch
              id="mev-protection"
              checked={mevProtection}
              onCheckedChange={setMevProtection}
            />
          </div>
          <div className="space-y-2">
            <Label>Slippage Tolerance</Label>
            <RadioGroup value={slippageType} onValueChange={setSlippageType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="slippage-auto" />
                <Label htmlFor="slippage-auto">Auto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="slippage-custom" />
                <Label htmlFor="slippage-custom">Custom</Label>
                {slippageType === 'custom' && (
                  <Input
                    type="number"
                    placeholder="0.5"
                    value={customSlippage}
                    onChange={(e) => setCustomSlippage(e.target.value)}
                    className="w-20 ml-2"
                  />
                )}
                {slippageType === 'custom' && <span>%</span>}
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Gas Fees</Label>
            <RadioGroup value={feesType} onValueChange={setFeesType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="fees-auto" />
                <Label htmlFor="fees-auto">Auto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="fees-custom" />
                <Label htmlFor="fees-custom">Custom</Label>
                {feesType === 'custom' && (
                  <Input
                    type="number"
                    placeholder="0.000005"
                    value={customFees}
                    onChange={(e) => setCustomFees(e.target.value)}
                    className="w-24 ml-2"
                  />
                )}
                {feesType === 'custom' && <span>SOL</span>}
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

