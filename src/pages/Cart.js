import {Table, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeName, increadeAge} from "../store/userSlice.js";
import {increadeCount} from "../store/cartSlice.js";


function Cart(){

    let dispatch = useDispatch();
    let user = useSelector((state) => {
        return state.user
    })

    let state = useSelector((state) => state)


    return(
        <>
            <p>{state.users.name}({state.users.age}) 의 장바구니</p>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>내용</th>
                    <th>수량</th>
                    <th>추가</th>
                    <th>가격</th>
                    <th>상세</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.cart.map((item, i) =>
                        <tr key={i}>
                            <td>{state.cart[i].id}</td>
                            <td>{state.cart[i].title}</td>
                            <td>{state.cart[i].content}</td>
                            <td>{state.cart[i].count}</td>
                            <td>
                                <button className="" onClick={() => {
                                    dispatch(increadeCount(state.cart[i].id))
                                }}>+
                                </button>
                            </td>
                            <td>{state.cart[i].price}</td>
                        </tr>
                    )
                }

                </tbody>
            </Table>

            <Button className="btn btn-primary" onClick={() => {
                dispatch(changeName())
            }}>이름 변경 버튼
            </Button>
            <Button className="btn btn-danger" onClick={() => {
                dispatch(increadeAge(20))
            }}>나이 변경 버튼
            </Button>
        </>
    )
}

export default Cart;