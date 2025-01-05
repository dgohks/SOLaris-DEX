'use client'

import { useEffect, useRef } from 'react'
import { TOKENS } from '../utils/constants'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  image: HTMLImageElement
  rotation: number
  rotationSpeed: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Load images
    const imageUrls = Object.values(TOKENS).map(token => token.logo)

    const loadImages = async () => {
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => resolve(img)
          img.src = src
        })
      }

      const images = await Promise.all(imageUrls.map(loadImage))
      
      // Initialize particles
      particlesRef.current = Array.from({ length: 20 }, () => {
        const image = images[Math.floor(Math.random() * images.length)]
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: (40 + Math.random() * 20) * 1.2, // 20% larger
          speedX: (Math.random() - 0.5) * 1,
          speedY: (Math.random() - 0.5) * 1,
          image,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        }
      })

      // Start animation
      animate()
    }

    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Add semi-transparent overlay or starry night background
      if (theme === 'dark') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)' // Dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawStars(ctx, canvas.width, canvas.height)
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)' // 20% haze effect for light mode
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particlesRef.current.forEach(particle => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= canvas.width - particle.size) {
          particle.speedX *= -1
        }
        if (particle.y <= 0 || particle.y >= canvas.height - particle.size) {
          particle.speedY *= -1
        }

        // Repel from mouse
        const dx = particle.x - mouseRef.current.x
        const dy = particle.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const repelRange = 150

        if (distance < repelRange) {
          const force = (repelRange - distance) / repelRange
          particle.x += (dx / distance) * force * 3
          particle.y += (dy / distance) * force * 3
        }

        // Draw particle with rotation
        ctx.save()
        ctx.translate(particle.x + particle.size / 2, particle.y + particle.size / 2)
        ctx.rotate(particle.rotation)
        ctx.globalAlpha = 0.7 // Slight transparency for logos
        ctx.drawImage(
          particle.image,
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size
        )
        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    loadImages()

    return () => {
      window.removeEventListener('resize', updateSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const starCount = 200
    ctx.fillStyle = 'white'
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = Math.random() * 1.5
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
    />
  )
}

