import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    email: "",
    token: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{name: string, email: string, token: string}>) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.token = action.payload.token
        }
    }
})

export const { login } = userSlice.actions
export default userSlice.reducer