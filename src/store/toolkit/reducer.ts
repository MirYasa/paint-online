import {createReducer} from "@reduxjs/toolkit"
import {Tools, updateColor, updateTool} from "./action"

export interface ToolState {
    type: Tools
    color: string
}

const initialState: ToolState = {
    type: 'brush',
    color: '#000000'
}

export default createReducer(initialState, builder =>
    builder
        .addCase(updateColor, (state, action) => {
            const {color} = action.payload
            state.color = color
        })
        .addCase(updateTool, (state, action) => {
            const {type} = action.payload
            state.type = type
        })
)
