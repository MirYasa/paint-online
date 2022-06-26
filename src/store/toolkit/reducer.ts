import {createReducer} from "@reduxjs/toolkit"
import {updateColor, updateTool} from "./action"

export interface ToolState {
    type: string
    color: string
}

const initialState: ToolState = {
    type: '',
    color: '#000000'
}

export default createReducer(initialState, builder =>
    builder
        .addCase(updateColor, (state, action) => {
            const {color} = action.payload
            state.color = color
        })
)
