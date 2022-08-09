import React from 'react';
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { REST_API_KEY, REDIRECT_URI, CLIENT_SECRET } from "./Kakao";

const Auth = () => {
    const code = new URL(window.location.href).searchParams.get("code");

    const navigate = useNavigate();

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        const payload = qs.stringify({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            client_secret: CLIENT_SECRET,
        });
        // access token 가져오기
        await axios.post(
            "https://kauth.kakao.com/oauth/token",
            payload
        ).then(res => {
            // Kakao Javascript SDK 초기화
            window.Kakao.init(REST_API_KEY);
            // access token 설정
            window.Kakao.Auth.setAccessToken(res.data.access_token);
            navigate("/profile", {replace: true});
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            { code}
        </div>
    );
};

export default Auth;