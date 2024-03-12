import {createSlice} from "@reduxjs/toolkit";


let cart = createSlice({
    name: "cart",
    initialState: [
        {
            id: 0,
            title: "White and Black",
            content: "Born in France",
            count : 2,
            price: 120000,
        },
        {
            id: 2,
            title: "Grey Yordan",
            content: "Born in the States",
            count : 1,
            price: 130000,
        }
    ],
    reducers:{
        increadeCount(state, action){
            let num = state.findIndex((a) => {
                return a.id === action.payload;
                })
            state[num].count++;
            },
        addItem(state, action){
            state.push(action.payload);
        }
    }
})



export let {increadeCount, addItem} = cart.actions

export default cart;