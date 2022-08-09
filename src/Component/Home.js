import { Box, Grid, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Brightness1, SportsRugbySharp } from "@mui/icons-material";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {

    return (
        <>
            <Box
                sx={{
                    // background: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))',
                    height: "93vh",
                    zIndex: 2,
                    position: "relative",
                }}
            >
                <Grid container columns={{ xs: 3, sm: 6, md: 12 }} style={{ height: "93vh" }}>
                    <Grid item xs={12} style={{ alignItems: "center", display: "flex" }}>
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
                                <img src="/img/1.jpg" style={{ height: "93vh", width: "100%" }} />
                            </div>
                            <div>
                                <img src="/img/2.jpg" style={{ height: "93vh", width: "100%" }} />
                            </div>
                            <div>
                                <img src="/img/3.jpg" style={{ height: "93vh", width: "100%" }} />
                            </div>
                            <div>
                                <img src="/img/4.jpg" style={{ height: "93vh", width: "100%" }} />
                            </div>
                        </Carousel>
                    </Grid>
                </Grid>
            </Box>
            

        </>

    )
}
export default Home;