function Component(){
    if (true){
        return <p>참이면 보여주는 html</p>
    }else { // else 문 생략가능
        return null;
    }

    return (
        <div>
            {1==1 ? <p>참</p> : null}

            {1==1 && <p>참</p>}

        </div>
    )
}

function Component2(){
    var user = 'seller';

    if (user === 'seller'){
        return <h2>판매자 로그인</h2>
    }else if (user === 'customer'){
        return <h2>구매자 로그인</h2>
    }else {
        return <h2>일반 로그인</h2>
    }

    switch (user){
        case "seller":
            return <h2>판매자 로그인</h2>
        default :
            return <h2>일반 로그인</h2>
    }
}

function Component3(){
    var state = 'info';
    var tabUI = {
        info: <p>상품정보</p>,
        shipping: <p>배송정보</p>,
        refund: <p>환불약관</p>,
    }

    return (
        <div>
            {
                {
                    info: <p>상품정보</p>,
                    shipping: <p>배송정보</p>,
                    refund: <p>환불약관</p>,
                }[state]
            },
            {
                tabUI[state]
            }
        </div>
    )
}