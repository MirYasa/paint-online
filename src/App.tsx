import React, {useEffect, useRef, useState} from 'react'
import Toolbar from "./components/Toolbar"
import Canvas from "./components/Canvas"
import {fromEvent, map, pairwise, switchMap, takeUntil} from "rxjs"
import {useAppSelector} from "./store/hook"

function App() {
    const canvasRef = useRef(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

    const {color} = useAppSelector(state => state.toolReducer)

    useEffect(() => {
        if (!canvas) return

        const mouseMove = fromEvent(canvas, 'mousemove')
        const mouseDown = fromEvent(canvas, 'mousedown')
        const mouseUp = fromEvent(canvas, 'mouseup')
        const mouseOut = fromEvent(canvas, 'mouseout')


        const stream = mouseDown
            .pipe(
                switchMap(
                    () =>
                        mouseMove
                            .pipe(
                                // @ts-ignore
                                map<MouseEvent, any>(e => ({
                                    x: e.offsetX,
                                    y: e.offsetY
                                })),
                                pairwise(),
                                takeUntil(mouseUp),
                                takeUntil(mouseOut)
                            )
                )
            )
        stream.subscribe(([from, to]: any) => {
            context?.beginPath()
            context?.moveTo(from.x, from.y)
            context?.lineTo(to.x, to.y)
            context?.stroke()
        })

    }, [canvas])

    useEffect(() => {
        if (!context) return

        context.strokeStyle = color
    }, [color])


    return (
        <div className={'w-full max-w-7xl ml-auto mr-auto'}>
            <Toolbar/>
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
