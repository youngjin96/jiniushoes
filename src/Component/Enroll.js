import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'

import { Button, Grid, TextField, Box } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Environment/Firebase";

var stepNum = 1;

const Enroll = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "age") {
            setAge(value)
        } else if (name === "gender") {
            setGender(value)
        }
    }

    const onClickEnroll = () => {
        createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            try {
                const docRef = await addDoc(collection(db, "clients"), {
                    email: email,
                    age: age,
                    gender: gender
                }).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: '회원가입 완료',
                        html: '회원가입이 정상적으로 완료되었습니다.',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    }).then(() => {
                        navigate("/");
                    });
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                html: errorMessage,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        });
    }

    return (
        <Box
            sx={{ height: '80vh' }}
        >
            <Grid
                container
                columns={{ xs: 12, sm: 12, md: 12 }}
                direction="column"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        label="Email"
                        onChange={onChange}
                        variant="standard"
                        style={{ width: 200, marginTop: 50 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="password"
                        label="Password"
                        onChange={onChange}
                        type="password"
                        variant="standard"
                        style={{ width: 200, marginTop: 30 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="age"
                        label="Age"
                        onChange={onChange}
                        variant="standard"
                        style={{ width: 200, marginTop: 30 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl style={{width: 200, marginTop: 50}}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            name="gender"
                            value={gender}
                            label="Gender"
                            onChange={onChange}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={onClickEnroll}
                        style={{ width: 200, marginTop: 50, backgroundColor: "black", color: "white" }}
                    >
                        회원가입
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Enroll;