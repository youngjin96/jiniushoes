import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'

import { Button, Grid, TextField, Box } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DaumPostcode from 'react-daum-postcode';

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Environment/Firebase";
import Loading from "../Environment/IsLoading";

const Enroll = () => {
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [openPostCode, setOpenPostCode] = useState(false);
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "name") {
            setName(value)
        } else if (name === "nickName") {
            setNickName(value)
        } else if (name === "age") {
            setAge(value)
        } else if (name === "gender") {
            setGender(value)
        } else if (name === "addressDetail") {
            setAddressDetail(value)
        }
    }

    const onClickSearchAddress = {
        clickButton: () => {
            setOpenPostCode(!openPostCode);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            setAddress(data.address);
            setPostCode(data.zonecode);
            setOpenPostCode(false);
        }
    };

    const onClickEnroll = () => {
        if (!email || !password || !age || !gender || !postCode || !address || !addressDetail) {
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                html: "모두 작성해주세요.",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        } else {
            setIsloading(true);
            createUserWithEmailAndPassword(auth, email, password).then(async () => {
                try {
                    await addDoc(collection(db, "users"), {
                        type: "user",
                        email: email,
                        name: name,
                        nick_name: nickName,
                        age: age,
                        gender: gender,
                        post_code: postCode,
                        address: address,
                        address_details: addressDetail
                    }).then((res) => {
                        const userRef = doc(db, "users", res.id);
                        updateDoc(userRef, {
                            id: res.id
                        });
                        setIsloading(false);
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
                setIsloading(false);
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
    }

    if (isLoading) return <Loading />

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
                {openPostCode ? (
                    <Grid item xs={12} sx={{marginTop: 10, width: "80%"}}>
                        <DaumPostcode 
                            onComplete={onClickSearchAddress.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                        />
                        <Button onClick={onClickSearchAddress.clickButton}>돌아가기</Button>
                    </Grid>
                    ) : (
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
                                    value={email}
                                    style={{ width: 300, marginTop: 50 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    onChange={onChange}
                                    type="password"
                                    variant="standard"
                                    value={password}
                                    style={{ width: 300, marginTop: 30 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    onChange={onChange}
                                    variant="standard"
                                    value={name}
                                    style={{ width: 300, marginTop: 30 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="nickName"
                                    label="NickName"
                                    onChange={onChange}
                                    variant="standard"
                                    value={nickName}
                                    style={{ width: 300, marginTop: 30 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="age"
                                    label="Age"
                                    onChange={onChange}
                                    variant="standard"
                                    value={age}
                                    style={{ width: 300, marginTop: 30 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{width: 300, marginTop: 50}}>
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
                                <Button variant="outlined" onClick={onClickSearchAddress.clickButton} style={{ width: 100, marginTop: 30, color:"black", borderColor: "black" }}>
                                    주소 찾기
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    label="우편 번호"
                                    variant="standard"
                                    value={postCode}
                                    style={{ width: 300, marginTop: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    label="주소"
                                    variant="standard"
                                    value={address}
                                    style={{ width: 300, marginTop: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="addressDetail"
                                    label="상세 주소"
                                    onChange={onChange}
                                    variant="standard"
                                    value={addressDetail}
                                    style={{ width: 300, marginTop: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    onClick={onClickEnroll}
                                    style={{ width: 300, marginTop: 50, backgroundColor: "black", color: "white" }}
                                >
                                    회원가입
                                </Button>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default Enroll;