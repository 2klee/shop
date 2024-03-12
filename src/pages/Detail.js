import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import tab from "bootstrap/js/src/tab";
import {Context1} from "../App";
import {addItem} from "../store/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";


let YelloBtn = styled.button`
    background: ${props => props.bg};
    //background: yellow;
    color: ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding: 12px;
`

function Detail(props){

    let {id} = useParams();

    let {shoes} = useContext(Context1);
    let findItem = shoes.find((x)=> x.id == id);
    // let {stock} = useContext(Context1);


    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [amount, setAmount] = useState(true);

    let [tab, setTab] = useState(0);


    let dispatch = useDispatch();


    useEffect(() => {
        // 컴포넌트가 mount update 일 때 코드 실행함
        console.log("useEffect 실행");

        // 서버에서 데이터 호출
        // 오래 걸리느 반복 연산
        // 타이머
        // setInterval(() => {setTimer(false)}, 5000);
        // setTimeout(() => {setTimer(false)}, 5000);
        let timer = setTimeout(() => {setAlert(false)}, 5000);
        return() => {
            //여기 있는게 먼저 실행되고 위 코드가 실행
            clearTimeout(timer);
        }
    }, [count] );



    let handleAmount = (e) => {
        let amount = e.target.value;
        if (!isNaN(amount)) {
            setAmount(false);
        }else {
            setAmount(true);
        }
    };


    return (
        <div className="container">
            {alert ? (
                <div className="alert alert-danger">
                    5초 이내 클릭 시 할인
                </div>
            ) : null}
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + "/item" + (Number(id) + 1) + ".jpg"} width="100%"/>
                    {/*<img src={"/item" + id+1 + ".jpg"} width="100%"/>*/}
                    {/* 이렇게 하면 id 가 스트링으로 인식해서 오류 */}
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                    <button className="btn btn-primary" onClick={()=>{
                        dispatch(addItem(findItem))
                    }}>장바구니 담기</button>
                </div>

                <YelloBtn bg="yellow">버튼</YelloBtn>
                <YelloBtn bg="blue">버튼</YelloBtn>
            </div>

            { !amount && <Alertmount/>}
            <input id="amount" name="amount"onChange={ handleAmount } />

            <button onClick={(e) => setCount(count + 1)}>버튼</button>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{
                        setTab(0);
                    }}>상품상세</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{
                        setTab(1);
                    }}>상품리뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{
                        setTab(2);
                    }}>QnA</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
        </div>
    )
}

function TabContent({tab}){
    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(()=> {setFade('end')},300)
        return ()=>{
            setFade('');
        }
    }, [tab]);

    return (
        <div className={'start ' + fade}>
            {[<div>내용0</div>,<div>내용1</div>, <div>내용2</div>][tab]}
        </div>
        )
}

function Alertmount(){
    return (
        <div className="alert alert-danger">
            숫자 이외에 쓰지 마세요.
        </div>
    )
}

export default Detail;