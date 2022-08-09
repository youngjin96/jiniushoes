import { Grid, Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { collection, doc, getDocs, query, collectionGroup } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../Environment/Firebase";

var datasArr = [];

const Shop = () => {
    useEffect(() => {

    }, []);

    const [datas, setDatas] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [names, setNames] = useState([]);
    const [prices, setPrices] = useState([]);
    const [nikeOpen, setNikeOpen] = useState(false);
    const [adidasOpen, setAdidasOpen] = useState(false);
    const [newBalanceOpen, setNewBalanceOpen] = useState(false);

    const onClickNike = () => {
        setNikeOpen(!nikeOpen);
    };

    const onClickDunk = () => {
        datasArr = [];
        getDocs(collection(db, "brands/nike/dunk")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datasArr.push(doc.data());
            });
            setDatas(datasArr);
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
    const onClickNewBalance = () => {
        setNewBalanceOpen(!newBalanceOpen);
    }

    const onClickItem = (e) => {
        console.log(e.target);
    }
    return (
        <Box sx={{ height: '100vh' }}>

            <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid item xs={2} style={{ marginTop: 50 }}>
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
                                        <ListItemButton sx={{ pl: 4 }}>
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
                <Grid item xs={10}>
                    <Grid container spacing={3} columns={{ xs: 12, sm: 12, md: 12 }}>
                        {datas && datas.map((data) => (
                            <Grid key={data.name} item xs={6} sm={4} md={3}>
                                <Button onClick={onClickItem} style={{padding: 0}}>
                                    <img src={data.url} alt={data.name} style={{width: "100%", height: 300}}/>
                                </Button>
                                    <Typography variant="h6">
                                        {data.name}
                                    </Typography>
                                    <Typography>
                                        {data.price}원
                                    </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Shop;