import {createSlice} from '@reduxjs/toolkit'

export const CategorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {setCategories} = CategorySlice.actions

export default CategorySlice.reducer