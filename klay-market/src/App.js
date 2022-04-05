import React, {useState} from 'react';
import logo from './logo.svg';
import QRCode from 'qrcode.react';
import { getBalance, readCount, setCount} from './api/UseCaver';
import * as KlipAPI from './api/UseKlip';
import './App.css';

// function onPressButton(balance) 
// {
//   console.log("hi");
// }

// 함수도 인자로 넘길 수 있다.
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}

const DEFAULT_QR_CODE = "DEFAULT";

function App() {
  // qrvalue 는 화면ㄴ에 표시할 값, setQRvalue 함수는 변경할 값을 담은 함수다.
  const [balance, setBalance] = useState('0');
  const [qrvalaue, setQrvalue] = useState(DEFAULT_QR_CODE);
// onPressButton 함수와 같은 역할을 수행하는 함수의 다른 형태
// 다른 함수 안에서 사용 가능. 
// 변수와 같은 형태
const onPressButton2 = (balance) => {
  // balance 에 표시할 값을 설정하면, 해당 값이 적용되어 표시된다.
  setBalance('10');
}
//  getBalance('0x76a66aad3c3f0bf36feac31b276446102cf8b840');

const onClickGetAddress = () => {
  KlipAPI.getAddress(setQrvalue);
}
const onClickSetCount = () => {
  KlipAPI.setCount(2000, setQrvalue);
}


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <button title = {'카운트 변경'} onClick={()=>{setCount(100)}} /> */}
        {/* useState 에서 정의한 setBalance 함수를 인자로 넘겨준다. */}
        <button onClick={()=>
          {
            //onPressButton2('15', setBalance)
            onClickGetAddress();
          }}>주소 가져오기</button>
        <button onClick={()=>
          {
            //onPressButton2('15', setBalance)
            onClickSetCount();
          }}>카운트 값 변경</button>
        <br />
        <br />
        <br />
        <QRCode value = {qrvalaue} />
        <p>{balance}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
