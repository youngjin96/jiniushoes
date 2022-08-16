import { Box, Grid, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Brightness1, SportsRugbySharp } from "@mui/icons-material";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {

    return (
        <>
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid item xs={1.5}>

                </Grid>
                <Grid item xs={9} style={{ alignItems: "center", display: "flex" }}>
                    <Carousel
                        autoPlay
                        infiniteLoop
                        stopOnHover={false}
                        showThumbs={false}
                        showArrows={false}
                        showStatus={false}
                        transitionTime={2000}
                        interval={3000}
                    >
                        <div>
                            <img src="/img/1.jpg" style={{ height: "70vh", width: "100%" }} />
                        </div>
                        <div>
                            <img src="/img/2.jpg" style={{ height: "70vh", width: "100%" }} />
                        </div>
                        <div>
                            <img src="/img/3.jpg" style={{ height: "70vh", width: "100%" }} />
                        </div>
                        <div>
                            <img src="/img/4.jpg" style={{ height: "70vh", width: "100%" }} />
                        </div>
                    </Carousel>
                </Grid>
                <Grid item xs={1.5}>

                </Grid>
            </Grid>
        </>
    )
}
export default Home;