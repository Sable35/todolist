import {createSlice} from '@reduxjs/toolkit'

export const TaskListSlice = createSlice({
    name: 'tasklists',
    initialState: {
        tasklists: [],
        statuses: [],
        priorities: [],
        regularities: [],
    },
    reducers: {
        setTaskLists: (state, action) => {
            state.tasklists = action.payload;
        },
        setStatuses: (state, action) => {
            state.statuses = action.payload;
        },
        setPriorities: (state, action) => {
            state.priorities = action.payload;
        },
        setRegularities: (state, action) => {
            state.regularities = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {setTaskLists, setStatuses, setPriorities, setRegularities} = TaskListSlice.actions

export default TaskListSlice.reducer