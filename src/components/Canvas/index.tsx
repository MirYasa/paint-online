import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux"
import {useAppSelector} from "../../store/hook"

interface CanvasProps {
    width: number
    height: number
    canvasRef: React.MutableRefObject<null>
    setContext: (a: CanvasRenderingContext2D) => void
    setCanvas: (a: HTMLCanvasElement) => void
}

export default function Canvas({width, height, canvasRef, setContext, setCanvas}: CanvasProps) {

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement
        if (!canvas) return

        canvas.width = width
        canvas.height = height
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        setCanvas(canvas)

        const context = canvas.getContext('2d')
        if (!context) return

        setContext(context)
    }, [])


    return (
        <canvas ref={canvasRef}
                className={'w-full h-full border border-black mt-6'}>

        </canvas>
    )
};
