import { useEffect, useRef, useState } from 'react'

interface BorderGlowButtonProps {
    text: string
}

const BorderGlowButton: React.FC<BorderGlowButtonProps> = ({ text }) => {
    const ref = useRef<HTMLButtonElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: '-100%', y: '-100%' })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            setMousePosition({ x: `${x}px`, y: `${y}px` })
        }
        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <button
            className="relative overflow-hidden rounded-full bg-[#150926] border-[0.1px] border-[#F5FFDA] transform transition-transform ease-in-out active:scale-90"
            ref={ref}
        >
            <span
                className={`absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#fb3b53_0%,transparent_70%)] `}
                style={
                    {
                        left: mousePosition.x,
                        top: mousePosition.y,
                    } as any
                }
            ></span>
            <div className="relative z-10 m-[1px] rounded-[calc(0.5rem-1px)]  px-[20px] py-1 text-xs backdrop-blur-sm" style={{
                background: 'var(--linear, linear-gradient(90deg, #F5FFDA 0%, #EFC2FF 100%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                {text}
            </div>
        </button>
    )
}

export default BorderGlowButton