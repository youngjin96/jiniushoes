import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";


import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../Environment/Firebase";
import Loading from "../Environment/IsLoading";
import { Suspense } from "react";

const uid = sessionStorage.getItem("uid");

const ShoppingBag = () => {
    const [shoesDatas, setShoesDatas] = useState([]);

    useEffect(() => {
        let arr = [];
        const shoesIdQuery = query(collection(db, "carts"), where("id", "==", uid));
        getDocs(shoesIdQuery).then((querySnapshot) => {
            querySnapshot.forEach((res) => {
                arr.push(res.data());
            })
        }).then(() => {
            setShoesDatas(arr);
        })
    }, []);

    if (shoesDatas) {
        return (
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                        {shoesDatas.map((item, idx) => {
                            return (
                                <Grid key={idx} item xs={2}>
                                    <img alt={item.name} src={item.img_url} style={{ width: "100%", height: 100 }} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={2}>

                </Grid>
            </Grid>
        )
    }

    return (
        <Loading />
    )
}

export default ShoppingBag;