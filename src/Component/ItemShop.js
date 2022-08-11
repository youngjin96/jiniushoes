import { Grid, Typography, Button, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"

import {db} from "../Environment/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

import IsLoading from "../Environment/IsLoading";
import { ADMIN_KEY } from "../Environment/Kakao";

const ItemShop = () => {
    const uid = sessionStorage.getItem("uid");
    
    const [isLoading, setIsLoading] = useState(false);
    const [shoesData, setShoesData] = useState();
    
    useEffect(() => {
        setIsLoading(true);
        getDoc(doc(db, "shoes", uid)).then((data) => {
            setShoesData(data.data());
            setIsLoading(false);
        });
    }, []);

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
                                <Button variant="contained" onClick={onClickBuy}>
                                    구매
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
                                <Button variant="contained" onClick={onClickBuy}>
                                    구매
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
                                <Button variant="contained" onClick={onClickBuy}>
                                    구매
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