import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

import axios from "axios"

import { db } from "../Environment/Firebase";
import { ADMIN_KEY } from "../Environment/Kakao";

const uid = sessionStorage.getItem("uid");
const token = window.location.search.split("=")[1];

const state = {
    params: {
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: sessionStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: token,
    },
};

const { params } = state;

axios({
    url: "https://kapi.kakao.com/v1/payment/approve",
    method: "POST",
    headers: {
      Authorization: `KakaoAK ${ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    params,
  }).then((response) => {
    // 결제 승인에 대한 응답 출력
    console.log(response);
    sessionStorage.removeItem("tid")
  });

const cartQuery = query(collection(db, "carts"), where("id", "==", uid));
getDocs(cartQuery).then((querySnapshot) => {
    querySnapshot.forEach((doc2) => {
        deleteDoc(doc(db, "carts", doc2.id));
    })   
})

const SuccessPayment = () => {

    return (
        <div>결제 성공</div>
    )
}

export default SuccessPayment;