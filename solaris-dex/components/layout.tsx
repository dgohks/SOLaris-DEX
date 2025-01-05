import { AnimatedBackground } from './animated-background'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background/50 text-foreground relative">
      <AnimatedBackground />
      <main className="container mx-auto px-4 py-8 relative">
        {children}
      </main>
    </div>
  )
}

