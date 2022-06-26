import React, {useMemo} from 'react'
import Brush from '../../assets/svgs/brush.svg'
import Circle from '../../assets/svgs/circle.svg'
import Eraser from '../../assets/svgs/eraser.svg'
import File from '../../assets/svgs/file.svg'
import Line from '../../assets/svgs/line.svg'
import Rect from '../../assets/svgs/rect.svg'
import Undo from '../../assets/svgs/undo.svg'
import Redo from '../../assets/svgs/redo.svg'
import {useAppDispatch} from "../../store/hook"
import {updateColor} from "../../store/toolkit/action"

interface IToolBarButtons {
    img: string | null
    component?: JSX.Element
    title: string
    style: string
}

export default function Toolbar() {
    const dispatch = useAppDispatch()

    const buttons: IToolBarButtons[] = useMemo(() =>
        [
            {
                img: Brush,
                title: 'brush',
                style: 'mr-3'
            },
            {
                img: Circle,
                title: 'circle',
                style: 'mr-3'
            },
            {
                img: Line,
                title: 'line',
                style: 'mr-3'
            },
            {
                img: Rect,
                title: 'rect',
                style: 'mr-3'
            },
            {
                img: Eraser,
                title: 'eraser',
                style: 'mr-3'
            },
            {
                img: null,
                component: <input
                    onChange={({target: {value}}) => dispatch(updateColor({color: value}))}
                    type={'color'}
                    className={'w-8 h-8 border-0'}/>,
                title: 'color-picker',
                style: 'mr-3'
            },
            {
                img: Undo,
                title: 'undo',
                style: 'ml-auto'
            },
            {
                img: Redo,
                title: 'redo',
                style: 'ml-3'
            },
            {
                img: File,
                title: 'file',
                style: 'ml-3'
            }
        ], [])

    return (
        <div className={'flex justify-between items-center shadow drop-shadow-xl w-full p-4'}>
            {
                buttons.map((button, index) =>
                    <button className={button.style} key={index}>
                        {
                            button.img ?
                                <img className={'w-8 h-8'} src={button.img} alt={button.title}/> : button.component
                        }
                    </button>
                )
            }
        </div>
    )
};
