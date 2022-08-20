import { Route, Routes } from "react-router-dom";

import Auth from "./Auth";

import Home from "../Component/Home";
import Profile from "../Component/Profile";
import Login from "../Component/Login";
import Enroll from "../Component/Enroll";
import Mypage from "../Component/Mypage";
import SuccessPayment from "../Component/SuccessPayment";

import Shop from "../Component/Shop";
import ItemShop from "../Component/ItemShop";
import ShoppingBag from "../Component/ShoppingBag";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oauth/kakao/callback" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/shop/item" element={<ItemShop />} />
            <Route path="/shop/item/successpayment" element={<SuccessPayment />} />
            <Route path="/shoppingBag" element={<ShoppingBag />} />
        </Routes>
    )
}

export default Router;