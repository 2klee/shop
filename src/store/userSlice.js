import {createSlice} from "@reduxjs/toolkit";


let user = createSlice(
    {
        name: "users",
        initialState: {name : 'Lee', age : 20},
        reducers:{
            changeName(state){
                state.name = 'Park'
                // state.age = state.age + 1
            },
            increadeAge(state, action){
                state.age += action.payload;
            }
        }
    }
)


export let {changeName, increadeAge} = user.actions

export default user;