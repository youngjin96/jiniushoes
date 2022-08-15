import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";


import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../Environment/Firebase";
import Loading from "../Environment/IsLoading";

const uid = sessionStorage.getItem("uid");
var shoesDatas = [];
console.log("mount");

const ShoppingBag = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [shoes, setShoes] = useState();

    const getShoesDatas = async () => {
        shoesDatas = [];
        const shoesIdQuery = query(collection(db, "carts"), where("id", "==", uid));
        await getDocs(shoesIdQuery).then((querySnapshot) => {
            querySnapshot.forEach(async (res1) => {
                await getDoc(doc(db, "shoes", res1.data().shoes_id)).then(res2 => {
                    shoesDatas.push(res2.data());
                }).then(() => {
                    setShoes(shoesDatas);
                });
            });
        });
        console.log("After setShoes");
        setIsLoading(false);
    }

    useEffect(() => {
        console.log("useEffect");
        getShoesDatas();
    }, []);

    if (isLoading) return <Loading />


    if (shoes) {
        shoes.map((item, idx) => {
            console.log(idx + item);
        })
        return (
            <img alt={shoes[0].name} src={shoes[0].img_url} style={{ width: "100", height: 300 }} />
        )
    }
}


export default ShoppingBag;