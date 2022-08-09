import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";

import Home from "../Component/Home";
import Profile from "../Component/Profile";
import Login from "../Component/Login";
import Community from "../Component/Community";
import Enroll from "../Component/Enroll";
import Mypage from "../Component/Mypage";

import Shop from "../Component/Shop";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oauth/kakao/callback" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/community" element={<Community />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/mypage" element={<Mypage />} />
        </Routes>
    )
}

export default Router;