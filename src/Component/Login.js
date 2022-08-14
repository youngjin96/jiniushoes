import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Swal from 'sweetalert2'

import { KAKAO_AUTH_URL } from "../Environment/Kakao";
import { auth } from "../Environment/Firebase";

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickLogin();
        }
    }

    const onChange = (event) => {
        const { target: { id, value } } = event;
        if (id === "email") {
            setEmail(value)
        } else if (id === "password") {
            setPassword(value)
        }
    }

    const onClickEnroll = () => {
        navigate("/enroll");
    }

    const onClickLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            sessionStorage.setItem("uid", res._tokenResponse.localId);
            navigate("/");
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: '로그인 실패',
                html: "이메일 혹은 비밀번호를 확인해주세요.",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        });
    }

    const onClickGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider).then(() => {
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', height: '79vh' }}>
            <Avatar sx={{ marginTop: 10, bgcolor: 'black' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ marginTop: 3 }}>
                LOGIN
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3, marginTop: 3 }}>
                <Grid
                    container
                    columns={{ xs: 12, sm: 12, md: 12 }}
                    spacing={4}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="standard"
                            style={{ width: 250 }}
                            onChange={onChange}
                            onKeyPress={onKeyPress}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="standard"
                            style={{ width: 250 }}
                            onChange={onChange}
                            onKeyPress={onKeyPress}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            style={{ width: 250, backgroundColor: "black", color: "white", height: 50 }}
                            onClick={onClickLogin}
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={onClickGoogle}
                            style={{ color: 'black', textTransform: "none" }}
                        >
                            Continue With Google
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={onClickEnroll}
                            style={{ color: 'black', textTransform: "none" }}
                        >
                            회원가입
                        </Button>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Button
                            variant="contained"
                            style={{ width: 200, backgroundColor: "#fbe60b", color: "black" }}
                        >
                            <Link href={KAKAO_AUTH_URL} style={{ textDecoration: 'none', textTransform: 'none', color: "black" }}>
                                카카오 로그인
                            </Link>
                        </Button>
                    </Grid> */}
                </Grid>
            </Box>
        </Box>
    )
}

export default Login;