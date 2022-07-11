import React, {useEffect, useRef, useState} from 'react'
import Toolbar from "./components/Toolbar"
import Canvas from "./components/Canvas"
import {useAppSelector} from "./store/hook"
import {drawType} from "./canvas"

function App() {
    const {color, type} = useAppSelector(state => state.toolReducer)

    const canvasRef = useRef(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!canvas || !context) return

        const sub = drawType[type](canvas, context)

        return () => {
            sub.unsubscribe()
        }
    }, [type, canvas, context])

    useEffect(() => {
        if (!context) return

        context.strokeStyle = color
        context.fillStyle = color
    }, [color])

    return (
        <div className={'w-full max-w-7xl ml-auto mr-auto'}>
            <Toolbar/>
            {/*<Settingsbar/>*/}
            <Canvas
                width={1280}
                height={640}
                canvasRef={canvasRef}
                setContext={setContext}
                setCanvas={setCanvas}
            />
        </div>
    )
}

export default App
