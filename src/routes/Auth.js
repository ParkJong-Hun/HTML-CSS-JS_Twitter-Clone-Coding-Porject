import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [newAccount, setNewAccout] = useState(true);
    const onChange = (event) => {
        const {target/*변경이 일어나는 부분*/: {name, value}} = event;//변화가 일어나는것 = 이벤트
        if(name === "email") {
            setEmail(value);//이메일을 바꿈
        } else if(name ==="password") {
            setPassword(value);//패스워드를 바꿈
        }
    }
    const onSubmit = async (event) => {/*async = 해당함수를 비동기로 예약 async와 await은 promise의 단점을 보완하기 위해 나온 최신 문법*/
        event.preventDefault();
        try {
            let data;
            if(newAccount) {//new Account
                /*await = 해당 메서드를 비동기로 처리*/data = await authService.createUserWithEmailAndPassword(email, password);
            } else {//log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };//Submit을 할 때 새로고침이 되어 리액트가 초기화되는것을 방지. preventDefault = 기본 행위 실행을 원치 않음을 의미.
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    plcaeholder="Email" 
                    required 
                    value={email}//직접 값을 지정하면 평생 값이 바꾸지 않음. 그러므로 state로 저장해서 바뀔때마다 갱신해야됨.
                    onChange={onChange}
                />
                <input 
                    name="password" 
                    type="password" 
                    plcaeholder="password" 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/*newAccount가 ture이면 Create Account false이면 Log In 버튼 */ />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>  
    );
};
export default Auth;