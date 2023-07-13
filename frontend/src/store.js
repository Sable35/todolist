import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "./slices/AuthSlice";
import TaskListReducer from "./slices/TaskListSlice";
import CategoryReducer from "./slices/CategorySlice";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        tasklists: TaskListReducer,
        categories: CategoryReducer,

    }
})