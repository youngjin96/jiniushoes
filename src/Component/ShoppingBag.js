import { useEffect, useState } from "react";

import { Button, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../Environment/Firebase";
import Loading from "../Environment/IsLoading";
import { Suspense } from "react";

const uid = sessionStorage.getItem("uid");


const ShoppingBag = () => {
    const [shoesDatas, setShoesDatas] = useState([]);
    const [selectionModel, setSelectionModel] = useState();

    const ImageCell = ({ rowData, dataKey, ...rest }) => (
        <Cell {...rest}>
            <img src={rowData[dataKey]} width="100%" height="100%" />
        </Cell>
    );

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

    const onClickBuy = (e) => {
        console.log(e.target.id)
    }

    const onClickRemove = () => {
        
    }

    if (shoesDatas) {
        return (
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                        <Grid item xs={12}>
                            <Table 
                                data={shoesDatas}
                                hover={false}
                                onRowClick={(data) => {
                                    console.log(data);
                                }}
                            >
                                <Column width={100} align="center" verticalAlign="middle">
                                    <HeaderCell style={{padding: 0}}>상품</HeaderCell>
                                    <ImageCell dataKey="img_url" style={{padding: 0, height: "200"}} />
                                </Column>

                                <Column width={300} align="center" verticalAlign="middle">
                                    <HeaderCell style={{padding: 0}}>상품명</HeaderCell>
                                    <Cell dataKey="name" style={{padding: 0}} />
                                </Column>

                                <Column width={150} align="center" verticalAlign="middle">
                                    <HeaderCell style={{padding: 0}}>판매가</HeaderCell>
                                    <Cell dataKey="price" style={{padding: 0}} />
                                </Column>

                                <Column width={150} align="center" verticalAlign="middle">
                                    <HeaderCell style={{padding: 0}}>주문관리</HeaderCell>
                                    <Cell style={{padding: 0}}>
                                        <Button variant="outlined" onClick={onClickRemove} style={{color: "black", borderColor: "black"}}>
                                            삭제
                                        </Button>
                                    </Cell>
                                </Column>

                            </Table>
                        </Grid>
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