import { Grid, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

import {db} from "../Environment/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

const ItemShop = () => {
    const location = useLocation();
    const uid = location.state.uid;
    const [shoesData, setShoesData] = useState();
    
    useEffect(() => {
        getDoc(doc(db, "shoes", uid)).then((data) => {
            setShoesData(data.data());
        })
    }, []);

    return (
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
                        <Button variant="contained">
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
                        <Button variant="contained">
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
                        <Button variant="contained">
                            구매
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ItemShop;