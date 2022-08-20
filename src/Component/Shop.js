import { useEffect, useState } from "react";

import { Grid, Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import axios from "axios"

import { useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";

import { ADMIN_KEY } from "../Environment/Kakao";

import { db } from "../Environment/Firebase";
import IsLoading from "../Environment/IsLoading";

let datasArr = [];
const uid = sessionStorage.getItem("uid");

const Shop = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState([]);
    const [cartArr, setCartArr] = useState([]);

    const [nikeOpen, setNikeOpen] = useState(false);
    const [adidasOpen, setAdidasOpen] = useState(false);
    const [newBalanceOpen, setNewBalanceOpen] = useState(false);

    useEffect(() => {
        datasArr = [];
        setIsLoading(true);
        getDocs(collection(db, "shoes")).then((data) => {
            data.forEach((doc) => {
                datasArr.push({
                    id: doc.id,
                    data: doc.data(),
                    like: false,
                    cart_id: ""
                });
            })
        }).then(() => {
            let cart = [];
            const cartQuery = query(collection(db, "carts"), where("id", "==", uid));
            getDocs(cartQuery).then((querySnapshot) => {
                querySnapshot.forEach((res) => {
                    cart.push(res.data());
                    datasArr.map(item => {
                        if (item.data.name === res.data().name) {
                            item.like = true;
                            item.cart_id = res.data().doc_id;
                        }
                    })
                })
            }).then(() => {
                setCartArr(cart);
                setDatas(datasArr);
                setIsLoading(false)
            })
        });
    }, []);

    const onClickAll = () => {
        datasArr = [];
        setIsLoading(true);
        getDocs(collection(db, "shoes")).then((data) => {
            data.forEach((doc) => {
                datasArr.push({
                    id: doc.id,
                    data: doc.data()
                });
            })
            setDatas(datasArr);
            setIsLoading(false);
        })
    }

    const onClickNike = () => {
        setNikeOpen(!nikeOpen);
    };

    const onClickDunk = () => {
        datasArr = [];
        setIsLoading(true);
        const q = query(collection(db, "shoes"), where("line_id", "==", "jSJvH8MXARJkpibDiZam"));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datasArr.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setDatas(datasArr);
            setIsLoading(false);
        });
    };

    const onClickJordan = () => {
        datasArr = [];
        setIsLoading(true);
        const q = query(collection(db, "shoes"), where("line_id", "==", "guqNwCVSiYkApjoiuirT"));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datasArr.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setDatas(datasArr);
            setIsLoading(false);
        });
    };

    const onClickAirForce = () => {
        datasArr = [];
        setIsLoading(true);
        const q = query(collection(db, "shoes"), where("line_id", "==", "NRyeJRWONfCcydKjsdSA"));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datasArr.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setDatas(datasArr);
            setIsLoading(false);
        });
    }

    const onClickAdidas = () => {
        setAdidasOpen(!adidasOpen);
    }

    const onClickYeezy350 = (e) => {
        console.log(e);
    }
    const onClickNewBalance = () => {
        setNewBalanceOpen(!newBalanceOpen);
    }

    const onClickItem = (e) => {
        sessionStorage.setItem("shoes_id", e.target.alt);
        navigate("/shop/item");
    }

    const onChangeChecked = (event) => {
        const newDatas = datas.map((item, idx) => {
            if (parseInt(event.target.id) == idx) {
                if (item.like === true) {
                    let docId = "";
                    setCartArr(cartArr.filter(i => i.name !== item.data.name));
                    const q = query(collection(db, "carts"), where("id", "==", uid), where("name", "==", item.data.name));
                    getDocs(q).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            docId = doc.id;
                        })   
                    }).then(() => {
                        deleteDoc(doc(db, "carts", docId));
                    });
                    return { ...item, like: false }
                } else {
                    setCartArr(old => [...old, {name: item.data.name, price: item.data.price}])
                    addDoc(collection(db, "carts"), {
                        id: uid,
                        shoes_id: item.id,
                        name: item.data.name,
                        price: item.data.price,
                        img_url: item.data.img_url
                    }).then((res) => {
                        updateDoc(doc(db, "carts", res.id), {
                            doc_id: res.id
                        });
                    })
                    return { ...item, like: true }
                }
            }
            return item;
        });
        setDatas(newDatas);
    };

    const onClickBuy = () => {
        let price = 0;
        let quantity = 0;
        cartArr.forEach(item => {
            price += parseInt(item.price);
            quantity += 1;
        })
        
        const state = {
            // 응답에서 가져올 값들
            next_redirect_pc_url: "",
            tid: "",
            // 요청에 넘겨줄 매개변수들
            params: {
              cid: "TC0ONETIME",
              partner_order_id: "partner_order_id",
              partner_user_id: "partner_user_id",
              item_name: "상품 결제",
              quantity: quantity,
              total_amount: price,
              vat_amount: 0,
              tax_free_amount: 0,
              approval_url: "http://localhost:3000/shop/item/successpayment",
              fail_url: "http://localhost:3000/shop",
              cancel_url: "http://localhost:3000/shop",
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
        <Grid container>
            <Grid item xs={2} sm={2.5} md={1.5}>
                <Box style={{ top: 80, position: "sticky", width: '100%' }}>
                    <nav aria-label="main menu">
                        <List>
                            <ListItemButton onClick={onClickAll}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={"all"}
                                        src={"/img/black.png"}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary="전체" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={onClickNike}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={"nike"}
                                        src={"/img/Nike.png"}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary="NIKE" />
                            </ListItemButton>
                            <Collapse in={nikeOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} onClick={onClickDunk}>
                                        <ListItemText primary="Dunk" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }} onClick={onClickJordan}>
                                        <ListItemText primary="Jordan" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }} onClick={onClickAirForce}>
                                        <ListItemText primary="Air Force" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <Divider />
                            <ListItemButton onClick={onClickAdidas}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={"adidas"}
                                        src={"/img/Adidas.png"}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary="ADIDAS" />
                            </ListItemButton>
                            <Collapse in={adidasOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} onClick={onClickYeezy350}>
                                        <ListItemText primary="Yeezy 350" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Yeezy 500" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Yeezy 700" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <Divider />
                            <ListItemButton onClick={onClickNewBalance}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={"newbalance"}
                                        src={"/img/NewBalance.png"}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary="NEW BALANCE" />
                            </ListItemButton>
                            <Collapse in={newBalanceOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </nav>
                </Box>
            </Grid>

            <Grid item xs={10} sm={7} md={8}>
                {isLoading ? <IsLoading /> : (
                    <Grid container>
                        {datas && datas.map((item, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={4} style={{ textAlign: "center", marginTop: 20 }}>
                                <Button onClick={onClickItem} style={{ padding: 0, width: "95%" }}>
                                    <img alt={item.id} src={item.data.img_url} style={{ width: "100%", height: 300 }} />
                                </Button>
                                <Typography variant="subtitle2">
                                    {item.data.name}
                                    <Checkbox
                                        id={idx.toString()}
                                        checked={item.like}
                                        onChange={onChangeChecked}
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                    />
                                </Typography>
                                <Typography variant="caption">
                                    {item.data.price}원
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>

            <Grid item xs={0} sm={2.5} md={2.5}>
                <Box style={{ top: 80, position: "sticky" }}>
                    <Card style={{ width: "100%" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Shopping Cart
                            </Typography>
                            <Typography variant="h5" component="div">
                                Order List
                                <hr />
                            </Typography>
                            {cartArr && cartArr.map((item, idx) => {
                                return (
                                    <Grid container key={idx}>
                                        <Grid item xs={9}>
                                            {item.name}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {item.price}원
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={onClickBuy} style={{ backgroundColor: "black", color: "white", width: "100%" }}>구매</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Shop;