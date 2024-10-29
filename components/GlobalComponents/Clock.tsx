"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function ClockComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState(400)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        const newSize = Math.min(width, height)
        setSize(newSize)
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = (size / 2) - 10

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw clock face
    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.95, centerX, centerY, radius * 1.05)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.5, '#f0f0f0')
    gradient.addColorStop(1, '#e0e0e0')

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw metallic rim
    const rimGradient = ctx.createLinearGradient(0, 0, size, size)
    rimGradient.addColorStop(0, '#f0f0f0')
    rimGradient.addColorStop(0.5, '#a0a0a0')
    rimGradient.addColorStop(1, '#f0f0f0')

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.05, 0, 2 * Math.PI)
    ctx.strokeStyle = rimGradient
    ctx.lineWidth = radius * 0.1
    ctx.stroke()

    // Draw hour and minute markers
    for (let i = 0; i < 60; i++) {
      const angle = (i * Math.PI) / 30
      const x1 = centerX + (radius - 10) * Math.sin(angle)
      const y1 = centerY - (radius - 10) * Math.cos(angle)
      let x2, y2

      if (i % 5 === 0) {
        // Hour markers
        x2 = centerX + (radius - 25) * Math.sin(angle)
        y2 = centerY - (radius - 25) * Math.cos(angle)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#333'

        // Draw hour numbers
        ctx.font = `bold ${size / 20}px Arial`
        ctx.fillStyle = '#333'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const numberRadius = radius - 45
        const numberX = centerX + numberRadius * Math.sin(angle)
        const numberY = centerY - numberRadius * Math.cos(angle)
        ctx.fillText(i === 0 ? '12' : (i / 5).toString(), numberX, numberY)
      } else {
        // Minute markers
        x2 = centerX + (radius - 15) * Math.sin(angle)
        y2 = centerY - (radius - 15) * Math.cos(angle)
        ctx.lineWidth = 1
        ctx.strokeStyle = '#666'
      }

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    // Get current time
    const hours = time.getHours() % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    // Draw hour hand
    ctx.save()
    ctx.beginPath()
    ctx.translate(centerX, centerY)
    const hourAngle = (hours + minutes / 60) * (Math.PI / 6) - Math.PI / 2
    ctx.rotate(hourAngle)
    ctx.moveTo(-15, 0)
    ctx.lineTo(radius * 0.5, 0)
    ctx.strokeStyle = '#333'
    ctx.lineWidth = size / 67
    ctx.lineCap = 'round'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    ctx.shadowBlur = 5
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.stroke()
    ctx.restore()

    // Draw minute hand
    ctx.save()
    ctx.beginPath()
    ctx.translate(centerX, centerY)
    const minuteAngle = (minutes + seconds / 60) * (Math.PI / 30) - Math.PI / 2
    ctx.rotate(minuteAngle)
    ctx.moveTo(-15, 0)
    ctx.lineTo(radius * 0.7, 0)
    ctx.strokeStyle = '#666'
    ctx.lineWidth = size / 100
    ctx.lineCap = 'round'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    ctx.shadowBlur = 5
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.stroke()
    ctx.restore()

    // Draw second hand
    ctx.save()
    ctx.beginPath()
    ctx.translate(centerX, centerY)
    const secondAngle = seconds * (Math.PI / 30) - Math.PI / 2
    ctx.rotate(secondAngle)
    ctx.moveTo(-20, 0)
    ctx.lineTo(radius * 0.9, 0)
    ctx.strokeStyle = '#e74c3c'
    ctx.lineWidth = size / 200
    ctx.lineCap = 'round'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    ctx.shadowBlur = 5
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    ctx.stroke()
    ctx.restore()

    // Draw center dot
    ctx.beginPath()
    ctx.arc(centerX, centerY, size / 50, 0, 2 * Math.PI)
    ctx.fillStyle = '#333'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(centerX, centerY, size / 100, 0, 2 * Math.PI)
    ctx.fillStyle = '#666'
    ctx.fill()

  }, [time, size])

  return (
    <div className="flex items-center justify-center  bg-gray-100 p-2">
      <div 
        ref={containerRef} 
        className="w-full h-full max-w-[90vmin] max-h-[90vmin] aspect-square p-4 bg-white rounded-full shadow-xl"
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="w-full h-full rounded-full shadow-inner"
        />
      </div>
    </div>
  )
}