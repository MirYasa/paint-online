import {fromEvent, map, switchMap, takeUntil} from "rxjs"

interface ICircleData {
    prev: ICoordinate[]
    cur: ICoordinate[]
}

interface ICoordinate {
    x: number
    y: number
}

export function circle(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const mouseMove = fromEvent(canvas, 'mousemove')
    const mouseDown = fromEvent(canvas, 'mousedown')
    const mouseUp = fromEvent(canvas, 'mouseup')
    const mouseOut = fromEvent(canvas, 'mouseout')

    const stream = mouseDown
        .pipe(
            switchMap(
                () => {
                    let res: ICoordinate[] = []
                    let prev: ICoordinate[] = []
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
    // @ts-ignore
    return stream.subscribe((res: ICircleData) => {
        const circleX = res.cur[0].x
        const circleY = res.cur[0].y
        const circleRadius = Math.abs(res.cur[1]?.x - circleX)
        const circleRadius2 = Math.abs(res.cur[1]?.y - circleY)
        const saved = canvas.toDataURL()


        const img = new Image()
        img.src = saved
        img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
            context?.beginPath()
            context?.rect(circleX, circleY, circleRadius, circleRadius2)
            context?.stroke()
            context.fill()
        }
    })
}
