import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import {AUTH_VALUE, COUNT_CONTRACT_ADDRESS, CHAIN_ID} from '../constants';

const option = {
    headers: [
      {
        name: "Authorization",
        value: AUTH_VALUE//"Basic" + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_KEY_ID).toString("base64")
      },
      {name: "x-chain-id", value: CHAIN_ID}
    ]
  }
  
  const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
  const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);
  
  export const readCount = async () => {
    const _count = await CountContract.methods.count().call();
    console.log(_count);
  }
  
  // caver.rpc.klay.getBalance(address) 는 klay 잔고를 물어보는 행위
  // then((response) => 답변이 오면 처리할 행위 정의하는 부분.
  // caver.utils.convertFromPeb(caver.utils.hexToNumberString(response)) 는 답변이 16진수로 오는데, 이것을 우리가 읽을 수 있는
  // 클레이 단위로 변경해 달라는 내용.
  export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((response) => {
      const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
      console.log(`BALANCE: ${balance}`);
      return balance;
    })
  }
  
  export const setCount = async (newCount) => {
    // 사용할 계정 설정
    try {
    const privatekey = '0x59f02e2983e383cf1d09004fdcf0198c7a4dadeb18f05f0f3c26f278b9a5beaa';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
    caver.wallet.add(deployer);
    // 스마트 컨트랙트 실행 트랜잭션 날리기
    // 결과 확인
    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,
      gas: "0x3d090" // gas limit 값 보다 작은 값을 설정해야 한다. //gas limit을 높게 설정하시면 gas limit * gas price만큼의 잔고가 없으면 해당 에러가 발생할 수 있습니다.
    })
    console.log(receipt);
    } catch(e) {
      console.log(`[ERROR_SETCOUNT] ${e}`);
    }
  }
  
  