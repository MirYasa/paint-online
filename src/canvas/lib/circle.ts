import {fromEvent, map, switchMap, takeUntil} from "rxjs"

export function circle(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const mouseMove = fromEvent(canvas, 'mousemove')
    const mouseDown = fromEvent(canvas, 'mousedown')
    const mouseUp = fromEvent(canvas, 'mouseup')
    const mouseOut = fromEvent(canvas, 'mouseout')

    const stream = mouseDown
        .pipe(
            switchMap(
                () => {
                    let res: any[] = []
                    let prev = []
                    let isStart = false
                    return mouseMove
                        .pipe(
                            // @ts-ignore
                            map<MouseEvent, any>(e => {
                                prev = [...res]
                                if (!isStart) {
                                    res.push({x: e.offsetX, y: e.offsetY})
                                } else {
                                    res[1] = {x: e.offsetX, y: e.offsetY}
                                }
                                isStart = true

                                return {
                                    prev: prev,
                                    cur: res
                                }
                            }),
                            takeUntil(mouseUp),
                            takeUntil(mouseOut)
                        )
                }
            )
        )
    return stream.subscribe((res: any) => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context?.beginPath()
        context?.arc(res.cur[0].x, res.cur[0].y, Math.abs(res.cur[1].x - res.cur[0].x), 0, 2 * Math.PI)
        context?.stroke()
    })
}
