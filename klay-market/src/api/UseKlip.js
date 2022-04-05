// Klip api docs 참고
import axios from "axios";
import {COUNT_CONTRACT_ADDRESS} from "../constants";

const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "KLAY_MARKET";

export const setCount = (count, setQrvalue) => {
    // App2App 의 prepare 과정.
    axios.post(
        A2P_API_PREPARE_URL,
        {
            bapp: {
                name: APP_NAME
            },
            type: "execute_contract",
            transaction: {
                to: COUNT_CONTRACT_ADDRESS,
                abi: '{ "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }',
                value: "0",
                params: `[\"${count}\"]`,
            },
        })
        .then((response) => {
        // 해당 url로 post 요청을 보내게 되면 request_key가 넘어오게 된다.
        const {request_key} = response.data;
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(() => {
            //request 과정. request_key 값을 가져오기를 매 초마다 시도한다.
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) => {
                // 결과값을 가져왔고, 그 값이 있는 경우,
                if (res.data.result)
                {
                    console.log(`[RESULT] ${JSON.stringify(res.data.result)}`);
                    // 1초마다 가져오는 interval을 clear 한다.
                    clearInterval(timerId);
                }
            })
        }, 1000)
    })
}

export const getAddress = (setQrvalue) => {
    // App2App 의 prepare 과정.
    axios.post(
        A2P_API_PREPARE_URL,
        {
            bapp: {
                name: APP_NAME
            },
            type: "auth",
        }
    ).then((response) => {
        // 해당 url로 post 요청을 보내게 되면 request_key가 넘어오게 된다.
        const {request_key} = response.data;
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(() => {
            //request 과정. request_key 값을 가져오기를 매 초마다 시도한다.
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) => {
                // 결과값을 가져왔고, 그 값이 있는 경우,
                if (res.data.result)
                {
                    console.log(`[RESULT] ${JSON.stringify(res.data.result)}`);
                    // 1초마다 가져오는 interval을 clear 한다.
                    clearInterval(timerId);
                }
            })
        }, 1000)
    })
}