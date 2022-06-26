import {createAction} from "@reduxjs/toolkit"


export const updateTool = createAction<{type: string}>('toolkit/updateTool')
export const updateColor = createAction<{color: string}>('toolkit/updateColor')
