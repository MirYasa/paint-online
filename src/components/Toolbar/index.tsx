import React, {useMemo} from 'react'
import Brush from '../../assets/svgs/brush.svg'
import Circle from '../../assets/svgs/circle.svg'
import Eraser from '../../assets/svgs/eraser.svg'
import File from '../../assets/svgs/file.svg'
import Line from '../../assets/svgs/line.svg'
import Rect from '../../assets/svgs/rect.svg'
import Undo from '../../assets/svgs/undo.svg'
import Redo from '../../assets/svgs/redo.svg'
import {useAppDispatch, useAppSelector} from "../../store/hook"
import {Tools, updateColor, updateTool} from "../../store/toolkit/action"

interface IToolBarButtons {
    img: string | null
    component?: JSX.Element
    title: string
    style: string
    isTool: boolean
}

export default function Toolbar() {
    const dispatch = useAppDispatch()
    const {type} = useAppSelector(state => state.toolReducer)
    const buttons: IToolBarButtons[] = useMemo(() =>
        [
            {
                img: Brush,
                title: 'brush',
                style: 'mr-3',
                isTool: true
            },
            {
                img: Circle,
                title: 'circle',
                style: 'mr-3',
                isTool: true
            },
            {
                img: Line,
                title: 'line',
                style: 'mr-3',
                isTool: true
            },
            {
                img: Rect,
                title: 'rect',
                style: 'mr-3',
                isTool: true
            },
            {
                img: Eraser,
                title: 'eraser',
                style: 'mr-3',
                isTool: true
            },
            {
                img: null,
                component: <input
                    onChange={({target: {value}}) => dispatch(updateColor({color: value}))}
                    type={'color'}
                    className={'w-8 h-8 border-0'}/>,
                title: 'color-picker',
                style: 'mr-3',
                isTool: false
            },
            {
                img: Undo,
                title: 'undo',
                style: 'ml-auto',
                isTool: false
            },
            {
                img: Redo,
                title: 'redo',
                style: 'ml-3',
                isTool: false
            },
            {
                img: File,
                title: 'file',
                style: 'ml-3',
                isTool: false
            }
        ], [])

    return (
        <div className={'flex justify-between items-center shadow drop-shadow-xl w-full p-3'}>
            {
                buttons.map((button, index) =>
                    <button key={index}
                            onClick={button.isTool ? () => dispatch(updateTool({type: button.title as Tools})) : undefined}
                            className={`${button.style} ${type === button.title ? 'border border-sky-500 rounded-md' : button.isTool ? 'border-transparent border' : ''} p-1`}>
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
