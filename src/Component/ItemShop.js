import { Grid, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ItemShop = () => {
    const location = useLocation();
    const name = location.state.name;
    const url = location.state.url;
    const price = location.state.price;

    return (
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
            <Grid item xs={6} sx={{ justifyContent: "right", display: { xs: "none", sm: "none", lg: "flex" }, marginTop: 10 }}>
                <img src={url} style={{ width: "70%", height: 600 }} />
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: "none", sm: "flex", lg: "none" }, marginTop: 5 }}>
                <img src={url} style={{ width: "100%", height: 600 }} />
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: "flex", sm: "none", lg: "none" }, marginTop: 5 }}>
                <img src={url} style={{ width: "100%", height: 600 }} />
            </Grid>

            <Grid item xs={6} sx={{ textAlign: "center", display: { xs: "none", sm: "none", lg: "flex" }, marginTop: 10 }}>
                <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" >
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" >
                            {price}원
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
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" >
                            {price}원
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
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" >
                            {price}원
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