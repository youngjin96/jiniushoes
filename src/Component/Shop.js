import { Grid, Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';

import StickyBox from "react-sticky-box";

import { useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../Environment/Firebase";
import IsLoading from "../Environment/IsLoading";

const Shop = () => {
    const navigate = useNavigate();

    useEffect(() => {
        var datasArr = [];
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
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState([]);

    const [nikeOpen, setNikeOpen] = useState(false);
    const [adidasOpen, setAdidasOpen] = useState(false);
    const [newBalanceOpen, setNewBalanceOpen] = useState(false);

    const onClickAll = () => {
        var datasArr = [];
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
        var datasArr = [];
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
        var datasArr = [];
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
        var datasArr = [];
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

    return (
        <Grid position="sticky" container columns={{ xs: 12, sm: 12, md: 12 }}>
            <Grid item xs={2} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }}>
                <Box sx={{ width: '100%', maxWidth: 360 }}>
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
            <Grid item xs={4} sx={{ display: { xs: 'none', sm: 'flex', lg: 'none' } }}>
            <Box sx={{ width: '100%', maxWidth: 360 }}>
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
            <Grid item xs={4} sx={{ display: { xs: 'flex', sm: 'none', lg: 'none' } }}>
            <Box sx={{ width: '100%', maxWidth: 360 }}>
                    <nav aria-label="main menu">
                        <List>
                            <ListItemButton onClick={onClickAll}>
                                <ListItemText primary="전체" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={onClickNike}>
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
            <Grid item xs={10} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }}>
                {isLoading ? <IsLoading /> : (
                    <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                        {datas && datas.map((item, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={4} style={{ textAlign: "center", marginTop: 20 }}>
                                <Button onClick={onClickItem} style={{ padding: 0, width: "95%" }}>
                                    <img alt={item.id} src={item.data.img_url} style={{ width: "100%", height: 300 }} />
                                </Button>
                                <Typography variant="subtitle2">
                                    {item.data.name}
                                </Typography>
                                <Typography variant="caption">
                                    {item.data.price}원
                                    </Typography>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
            <Grid item xs={8} sx={{ display: { xs: 'flex', sm: 'flex', lg: 'none' } }}>
                {isLoading ? <IsLoading /> : (
                    <Grid container columns={{ xs: 12, sm: 12, lg: 12 }}>
                        {datas && datas.map((item, idx) => (
                            <Grid key={idx} item xs={12} sm={12} lg={4} sx={{ textAlign: "center", marginTop: 5 }}>
                                <Button onClick={onClickItem} style={{ padding: 0, width: "95%" }}>
                                    <img alt={item.id} src={item.data.img_url} style={{ width: "100%", height: 300 }} />
                                </Button>
                                <Typography variant="subtitle2">
                                    {item.data.name}
                                </Typography>
                                <Typography variant="caption">
                                    {item.data.price}원
                                    </Typography>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default Shop;