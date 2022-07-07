import {createAction} from "@reduxjs/toolkit"

export type Tools = 'brush' | 'circle'

    // | 'line' | 'rect' | 'eraser'

export const updateTool = createAction<{type: Tools}>('toolkit/updateTool')
export const updateColor = createAction<{color: string}>('toolkit/updateColor')
