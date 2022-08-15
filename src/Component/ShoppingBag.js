import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";


import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../Environment/Firebase";
import Loading from "../Environment/IsLoading";

const uid = sessionStorage.getItem("uid");
var shoesDatas = [];

const getItem = async () => {
    console.log("getItem");
    const shoesIdQuery = query(collection(db, "carts"), where("id", "==", uid));
    await getDocs(shoesIdQuery).then((querySnapshot) => {
        querySnapshot.forEach((res1) => {
            getDoc(doc(db, "shoes", res1.data().shoes_id)).then(res2 => {
                shoesDatas.push(res2.data());
            });
        });
    });
    console.log("finish");
}

const ShoppingBag = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [shoes, setShoes] = useState(shoesDatas);
    console.log(shoes);

    useEffect(() => {
        const a = async () => {
            await getItem().then(() => {
                setIsLoading(false);
            });
        };
        a();
        console.log(shoes);
    }, [shoes]);

    const onClicks = () => {
        shoes.map((item, idx) => {
            console.log(item.img_url);
        })
    }

    if (isLoading) return <Loading />

    return (
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
            {shoes && shoes.map((item, idx) => (
                <Grid key={idx} item xs={12}>
                    <img src={item.img_url} />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button onClick={onClicks}>
                    ss
                </Button>
            </Grid>
        </Grid>
    )
}

export default ShoppingBag;