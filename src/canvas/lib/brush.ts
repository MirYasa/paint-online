import {fromEvent, map, pairwise, switchMap, takeUntil} from "rxjs"

export function brush(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
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
    return stream.subscribe(([from, to]: any) => {
        context?.beginPath()
        context?.moveTo(from.x, from.y)
        context?.lineTo(to.x, to.y)
        context?.stroke()
    })
}
