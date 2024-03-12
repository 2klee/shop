import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from "./data/data.js";
import React, {useState} from "react";
import {Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import {Button} from "react-bootstrap";
import axios from "axios";
import {useQuery} from "react-query";


function Shoes({shoes, idx}) {
    return (
        <div className="image-box">
            <img src={"/item" + (idx + 1) + ".jpg"}/>
            <h4>{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>￦{shoes.price}</p>
        </div>
    );
}

function App() {
  let [shoes, setShoes] = useState(data);
  // let [items] = useState(data);
  let navigate = useNavigate();

  // let [stock, setStock] = useState([7,8,9]);


  // post 요청
  // axios.post("요청할 url", {name:'kim'});

  // let param = {id: 0, pass : "1231sd"}
  // async function getAPI(){
  //     try {
  //         const res = await axios.get('url1')
  //     }catch (e){
  //
  //     }
  // }

  // // 동시에 여러 ajax 요청
  // Promise.all([axios.get('URL1'), axios.get('URL2')])
  //     .then()


  // localStorage
  localStorage.setItem('data', JSON.stringify('{"판매자정보":{"이름":"남도일","지역":"서울"}}'));//데이터 저장
  let item = localStorage.getItem('data'); // 데이터 가져오기
  console.log(item); //이렇게 하면 이상하게 나옴
  console.log(JSON.parse(item)); //형변환
  // localStorage.clear();

  let result = useQuery('data', ()=> {
      axios.get("https://raw.githubusercontent.com/2klee/shop/master/src/data.json")
          .then((a) => {
                  //요청이 성공했을 때
                  return a.data
              }
          )
      }
  )


console.log(result);



    return (

      <div className="App">

          <Navbar bg="dark" data-bs-theme="dark">
              <Container>
                  <Navbar.Brand href="/">Navbar</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/detail/0">detail</Nav.Link>
                      <Nav.Link href="/cart">cart</Nav.Link>
                      <Nav.Link href="/event">event</Nav.Link>
                      <Button onClick={()=>{navigate('detail/0')}}>상세보기 이동</Button>
                      <Button onClick={()=>{navigate(-1)}}>이전 이동</Button>
                      <Button onClick={()=>{navigate(1)}}>다음 이동</Button>
                  </Nav>
              </Container>
          </Navbar>

          <Routes>
              <Route path="*" element={<div>404 페이지</div>} />

              <Route path="/" element={
                  <div>
                      <div className="bigimg d-flex align-items-center flex-column justify-content-center ">
                          <h1>hello, world</h1>
                          <p>안녕하세요</p>
                          <button type="button" className="btn btn-primary">Learn more</button>
                      </div>
                      <div className="container text-center mt-5">
                          <div className="row">
                              {shoes.map((item, i) => {
                                  return <Shoes shoes={shoes[i]} idx={i}/>;
                              })}
                          </div>
                      </div>

                      {/*<button className="btn btn-primary" onClick={() => {*/}
                      {/*    axios*/}
                      {/*        .get("https://korea-webtoon-api.herokuapp.com/search?keyword=갓오브하이스쿨")*/}
                      {/*        .then((data) => {*/}
                      {/*            // 요청이 성공했을때*/}
                      {/*            console.log(data);*/}
                      {/*            // let copy = [...shoes, ...data.data.webtoons]*/}
                      {/*            setShoes([...shoes, ...data.data.webtoons])*/}
                      {/*        })*/}
                      {/*        .catch(() => {*/}
                      {/*        });*/}

                      {/*}}>ajax 요청*/}
                      {/*</button>*/}

                      <button onClick={() => {
                          // let result = useQuery('item_data', ()=> (
                          //     axios.get("https://raw.githubusercontent.com/2klee/shop/master/src/data.json")
                          //         .then((data) => {
                          //             //요청이 성공했을 때
                          //             console.log(data);
                          //           }
                          //       )
                          //   )
                          // )
                      }}>ajax 요청
                      </button>
                  </div>
              }/>

              <Route path="/detail/:id" element={
                  <Context1.Provider value={{shoes}}>
                      <Detail/>
                  </Context1.Provider>
              }/>
              <Route path="/cart" element={
                  <Cart/>
              }/>
              <Route path="/about" element={<About/>}>
                  <Route path="member" element={<div>맴버 소개</div>}/>
                  <Route path="loc" element={<div>오시는 길</div>}/>
              </Route>
              {/*
                1. /event/one 페이지 접속 시 생일 축하 쿠포 이벤트 표시
                2. /event/two 페이지 접속 시 첫 주문 배송비 무료 이벤트 표시
              */}
              <Route path="/event" element={<Event/>}>
                  <Route path="one" element={<EventOne/>}/>
                  <Route path="two" element={<EventTwo/>}/>
              </Route>

          </Routes>
      </div>
  );
}

/*컴포넌트*/
function About() {
    return (
        <div>
            <h2>about 페이지</h2>
            <Outlet>
            </Outlet>
        </div>
    )
}

function Event() {
    let navigate = useNavigate();
    return (
        <div>
            <h2>event 페이지</h2>
            <Button onClick={()=>{navigate('one')}}>이벤트 1</Button>
            <Button onClick={()=>{navigate('two')}}>이벤트 2</Button>
            <h4>이벤트 내용</h4>
            <Outlet>
            </Outlet>
        </div>
    )
}

function EventOne(){
    return(
        <div>
            <h2>event one</h2>
            <p>생일 축하 이벤트</p>
            <img src="/iuBirth.jpeg"/>
        </div>
    )
}
function EventTwo(){
    return(
        <div>
            <h2>event two</h2>
            <p>첫 주문 배송비 무료 이벤트</p>
            <img src="/iuOrder.jpg"/>
        </div>
    )
}

class Detail2 extends React.Component{
    componentDidMount() {
        // 컴포넌트가 로드 되고 나서 실핼항 코드
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // 컴포넌트가 업데이트 되고 나서 실핼항 코드
    }

    componentWillUnmount() {
        // 컴포넌트가 삭제되기 전 실핼항 코드
    }
}



export default App;
export let Context1 = React.createContext();