import { Grid, Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';

import { useNavigate } from 'react-router-dom';

import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

import { db } from "../Environment/Firebase";
import IsLoading from "../Environment/IsLoading";

var datasArr = [];

const Shop = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState([]);
    const [nikeOpen, setNikeOpen] = useState(false);
    const [adidasOpen, setAdidasOpen] = useState(false);
    const [newBalanceOpen, setNewBalanceOpen] = useState(false);

    const onClickNike = () => {
        setNikeOpen(!nikeOpen);
    };

    const onClickDunk = () => {
        datasArr = [];
        setIsLoading(true);
        getDocs(collection(db, "brands/nike/dunk")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datasArr.push(doc.data());
            });
            setDatas(datasArr);
            setIsLoading(false);
        });
    };

    const onClickJordan = () => {
        datasArr = [];
        getDocs(collection(db, "brands/nike/jordan")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datasArr.push(doc.data());
            });
            setDatas(datasArr);
        });
    };

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
        navigate("/shop/item", {
            state: {
                name: e.target.alt,
                url: e.target.src
            }
        });
    }
    
    return (
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
            <Grid item xs={2} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                <Box sx={{ width: '100%', maxWidth: 360 }}>
                    <nav aria-label="main menu">
                        <List>
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
                                    <ListItemButton sx={{ pl: 4 }}>
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
            <Grid item xs={2} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
                ss
            </Grid>
            <Grid item xs={10}>
                {isLoading ? <IsLoading /> : (
                    <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                        {datas && datas.map((data) => (
                            <Grid key={data.name} item xs={12} sm={6} md={4} style={{ textAlign: "center", marginTop: 20 }}>
                                <Button onClick={onClickItem} style={{ padding: 0, width: "95%" }}>
                                    <img src={data.url} alt={data.name} style={{ width: "100%", height: 300 }} />
                                </Button>
                                <Typography variant="subtitle2">
                                    {data.name}
                                </Typography>
                                <Typography variant="caption">
                                    {data.price}원
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