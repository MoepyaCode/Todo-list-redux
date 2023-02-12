import { createSlice } from "@reduxjs/toolkit";

const initialState = []

/**
 * Task consists of the following:
 * 1) id: number
 * 2) task: string
 * 3) complete: boolean
 */

const tasksSlicer = createSlice({
    name: 'tasks',
    initialState: { value: initialState },
    reducers: {
        addTask: (state, action) => {
            state.value.push(action.payload)
        },
        updateTask: (state, action) => {
            const index = state.value.findIndex(task => task.id === action.payload.id)
            state.value[index].task = action.payload.task
        },
        completeTask: (state, action) => {
            const index = state.value.findIndex(task => task.id === action.payload.id)
            state.value[index].complete = action.payload.complete
        },
        deleteTask: (state, action) => {
            state.value = state.value.filter(task => task.id !== action.payload.id)
        },
    }
})

export const { addTask, updateTask, completeTask, deleteTask } = tasksSlicer.actions
export default tasksSlicer.reducer