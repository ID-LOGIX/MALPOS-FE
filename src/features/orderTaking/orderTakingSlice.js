import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addToCardItems: [],
    itemQuantity: 1,
}

const orderTakingSlice = createSlice({
    name: "order-taking",
    initialState,
    reducers: {
        setAddToCardItems: (state, actions) => {
            if (actions.payload.length === 0) {
                state.addToCardItems = initialState.addToCardItems;
            }
            else if (state.addToCardItems.length === 0) {
                state.addToCardItems.push(actions.payload)
            } else {
                for (let i = 0; i < state.addToCardItems.length; i++) {
                    if (state.addToCardItems[i].itemId === actions.payload.itemId) {
                        state.addToCardItems[i] = actions.payload
                    } else {
                        let orderObj = state.addToCardItems.find(x => x.itemId === actions.payload.itemId)
                        if (orderObj === undefined) {
                            state.addToCardItems.push(actions.payload)
                        } else if (orderObj !== undefined && orderObj.itemId !== actions.payload.itemId) {
                            state.addToCardItems.push(actions.payload)
                        }
                    }
                }
            }
            // return state.addToCardItems
            // for (let i = 0; i < state.addToCardItems.length; i++) {
            //     debugger
            //     if (state.addToCardItems[i].itemId === actions.payload.itemId) {
            //         return state.addToCardItems[i] = actions.payload
            //     } else {
            //         return state.addToCardItems.push({ ...actions.payload })
            //     }
            // }
            // } else {
            //     debugger
            //     for (let x = 0; x <= state.addToCardItems.length; x++) {
            //         debugger
            //         if (state.addToCardItems[x].itemId === actions.payload.itemId) {
            //             debugger
            //             return state.addToCardItems[x] = actions.payload
            //         } else {
            //             debugger
            //             state.addToCardItems.push(actions.payload)
            //             console.log("state.addToCardItems", state.addToCardItems)
            //             return state.addToCardItems
            //         }
            //     }
            // }
        },
        setItemQuantityIncrement: (state, actions) => {
            state.addToCardItems.forEach((element, index) => {
                if (element.itemId === actions.payload.itemId) {
                    return state.addToCardItems[index].quantity = actions.payload.quantity
                }
            });
        }
    }
})

export const {
    setAddToCardItems,
    setItemQuantityIncrement,
} = orderTakingSlice.actions
export default orderTakingSlice.reducer