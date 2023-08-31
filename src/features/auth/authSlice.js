import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    "token": "",
    "user": {
        "id": 0,
        "name": "0",
        "email": "0",
        "createdAt": "",
        "updatedAt": "",
        "userRestaurantMap": [
            {
                "id": 0,
                "accessLevel": "",
                "isActive": true,
                "createdAt": "",
                "updatedAt": "",
                "restaurant": {
                    "id": 0,
                    "name": "",
                    "createdAt": "",
                    "updatedAt": ""
                }
            }
        ]
    },
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, actions) => {
            if (actions.payload.payload.token) {
                state.token = actions.payload.payload.token
                state.user = actions.payload.user
            }
        },
        clearAuth: (state) => {
            state.token = initialState.token;
            state.user = initialState.user;
        },
    }
})

export const {
    setAuth,
    clearAuth,
} = authSlice.actions
export default authSlice.reducer