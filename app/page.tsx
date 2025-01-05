'use client'

import { Layout } from "../components/layout"
import { SwapCard } from "../components/swap-card"

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <SwapCard />
      </div>
    </Layout>
  )
}

