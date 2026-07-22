import { createSlice } from '@reduxjs/toolkit'



const importantMeetSlice = createSlice({
    name: 'important',
    initialState: {
        items: [],
    },
    reducers: {
        addToImportant: (state, action) => {
            const existingItems = state.items.find(item=> item.id === action.payload)
            if(!existingItems){
                state.items.push(action.payload);
            }
        },
        removeFromImportant: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        setInitialImportant: (state, action) => {
            state.items = action.payload;
        }
    }
})

export const {addToImportant, removeFromImportant, setInitialImportant} = importantMeetSlice.actions
export default importantMeetSlice.reducer;