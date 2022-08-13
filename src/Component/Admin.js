import { Box, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";

import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'mountains.jpg');
// uploadBytes(storageRef, file).then((snapshot) => {
//     console.log('Uploaded a blob or file!');
// });

const Admin = () => {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "name") {
            setName(value)
        }
    }

    const handlePdfFileChange = (e) => {
        const storage = getStorage();
        const storageRef = ref(storage, "gs://jiniushoes.appspot.com/nike/dunk/" + name);
        uploadBytes(storageRef, e.target.files[0]).then(() => {
            getDownloadURL(storageRef).then((url) => {
                console.log(url)
                // TODO get imagae from storage to database
            })
        });
    };
    return (
        <Box
            sx={{
                height: "100vh"
            }}
        >
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <TextField
                        name="name"
                        label="name"
                        onChange={onChange}
                        variant="standard"
                        style={{ width: 200, marginTop: 50 }}
                    />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", marginTop: 10 }}>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        required
                        onChange={handlePdfFileChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                            style={{ color: "black", borderColor: "#a8a9a8" }}
                        >
                            IMAGE
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Admin;