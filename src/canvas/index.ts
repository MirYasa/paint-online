import {brush} from "./lib/brush"
import {circle} from "./lib/circle"
import {Subscription} from "rxjs"

type DrawFunc = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => Subscription

interface IDrawType {
    brush: DrawFunc
    circle: DrawFunc
}


export const drawType: IDrawType = {
    brush: brush,
    circle: circle
}
