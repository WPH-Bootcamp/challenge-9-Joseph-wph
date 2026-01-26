import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface FilterState {
search: string
category?: string
sort?: 'price' | 'rating'
}


const initialState: FilterState = {
search: '',
}


const filterSlice = createSlice({
name: 'filters',
initialState,
reducers: {
setSearch(state, action: PayloadAction<string>) {
state.search = action.payload
},
setCategory(state, action: PayloadAction<string | undefined>) {
state.category = action.payload
},
setSort(state, action: PayloadAction<'price' | 'rating' | undefined>) {
state.sort = action.payload
},
resetFilters() {
return initialState
},
},
})


export const { setSearch, setCategory, setSort, resetFilters } = filterSlice.actions
export default filterSlice.reducer
