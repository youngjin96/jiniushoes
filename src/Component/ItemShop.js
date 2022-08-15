import { Grid, Typography, Button, Box } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"

import {db} from "../Environment/Firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from 'react';

import IsLoading from "../Environment/IsLoading";
import { ADMIN_KEY } from "../Environment/Kakao";

const ItemShop = () => {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("uid");
    const shoesId = sessionStorage.getItem("shoes_id");
    
    const [isLoading, setIsLoading] = useState(false);
    const [shoesData, setShoesData] = useState();
    
    useEffect(() => {
        setIsLoading(true);
        getDoc(doc(db, "shoes", shoesId)).then((data) => {
            setShoesData(data.data());
            setIsLoading(false);
        });
    }, []);

    const onClickBag = async () => {
        await addDoc(collection(db, "carts"), {
            id: id,
            shoes_id: shoesId
        })
    }

    const onClickBuy = () => {
        const state = {
            // 응답에서 가져올 값들
            next_redirect_pc_url: "",
            tid: "",
            // 요청에 넘겨줄 매개변수들
            params: {
              cid: "TC0ONETIME",
              partner_order_id: "partner_order_id",
              partner_user_id: "partner_user_id",
              item_name: shoesData.name,
              quantity: 1,
              total_amount: shoesData.price,
              vat_amount: 0,
              tax_free_amount: 0,
              approval_url: "http://localhost:3000/shop/item/successpayment",
              fail_url: "http://localhost:3000/shop/item",
              cancel_url: "http://localhost:3000/shop/item",
            },
        };
        const { params } = state;
        
        axios({
            url: "https://kapi.kakao.com/v1/payment/ready",
            method: "POST",
            headers: {
              Authorization: `KakaoAK ${ADMIN_KEY}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        }).then((response) => {
            const { data: { next_redirect_pc_url, tid } } = response;
            state.next_redirect_pc_url = next_redirect_pc_url;
            state.tid = tid;
            window.location.href = next_redirect_pc_url;
        });
    }

    return (
        <Box>
            {isLoading ? <IsLoading /> : (
                <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                    <Grid item xs={6} sx={{ justifyContent: "right", display: { xs: "none", sm: "none", lg: "flex" }, marginTop: 10 }}>
                        <img src={shoesData && shoesData.img_url} style={{ width: "70%", height: 600 }} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: { xs: "none", sm: "flex", lg: "none" }, marginTop: 5 }}>
                        <img src={shoesData && shoesData.img_url} style={{ width: "100%", height: 600 }} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: { xs: "flex", sm: "none", lg: "none" }, marginTop: 5 }}>
                        <img src={shoesData && shoesData.img_url} style={{ width: "100%", height: 600 }} />
                    </Grid>

                    <Grid item xs={6} sx={{ textAlign: "center", display: { xs: "none", sm: "none", lg: "flex" }, marginTop: 10 }}>
                        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" >
                                    {shoesData && shoesData.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" >
                                    {shoesData && shoesData.price}원
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" onClick={onClickBag} sx={{ width: 150, height: 50, borderColor: "black", color: "black" }}>
                                    장바구니에 담기
                                </Button>
                                <Button variant="contained" onClick={onClickBuy} sx={{width: 200, padding: 0, marginLeft: 10}}>
                                    <img src="/img/KakaoPay.png" style={{width: "100%", height: 50}}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: { xs: "none", sm: "flex", lg: "none" } }}>
                        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" >
                                    {shoesData && shoesData.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" >
                                    {shoesData && shoesData.price}원
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={onClickBuy} sx={{width: 200, padding: 0}}>
                                    <img src="/img/KakaoPay.png" style={{width: "100%", height: 50}}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: { xs: "flex", sm: "none", lg: "none" } }}>
                        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                            <Grid item xs={12}>
                                <Typography variant="h5" >
                                    {shoesData && shoesData.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" >
                                    {shoesData && shoesData.price}원
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={onClickBuy} sx={{width: 200, padding: 0}}>
                                    <img src="/img/KakaoPay.png" style={{width: "100%", height: 50}}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}

export default ItemShop;