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

import { useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../Environment/Firebase";
import IsLoading from "../Environment/IsLoading";

let datasArr = [];

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
                    like: false
                });
            })
            setDatas(datasArr);
            setIsLoading(false);
        })
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
                if (item.like === true){
                    return { ...item, like : false}
                } else {
                    return { ...item, like : true}
                }
            }
            return item;
        });
        setDatas(newDatas);
    };

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

            <Grid item xs={10} sm={7} md={9}>
                {isLoading ? <IsLoading /> : (
                    <Grid container>
                        {console.log(datas)}
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

            <Grid item xs={0} sm={2.5} md={1.5}>
                <Box style={{top: 80, position: "sticky"}}>
                    <Card style={{ width: "100%" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Shopping Cart
                            </Typography>
                            <Typography variant="h5" component="div">
                                Order List
                                <hr />
                            </Typography>
                            <Typography variant="body2">
                                Nike Dunk Low Seoul
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Shop;