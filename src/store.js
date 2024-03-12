import {configureStore, createSlice} from "@reduxjs/toolkit";
import user from './store/userSlice'
import cart from './store/cartSlice'




let stock = createSlice({
    name: "stock",
    initialState: [7,8,9],
})

// Cart 페이지에서 +버튼 만들고
// +버튼 클릭시 해당 상품의 count +1

// 상세페이지 주문하기 버튼 클리기 새로운 상품이 state


export default configureStore({
    reducer:{
        users: user.reducer,
        cart : cart.reducer,
        stock : stock.reducer
    }
})


export let {increadeCount} = user.actions
