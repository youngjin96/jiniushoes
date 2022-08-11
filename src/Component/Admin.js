import { Box, Grid, TextField } from "@mui/material";
import { useState } from "react";


const Admin = () => {
    const [name, setName] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "name") {
            setName(value)
        }
    }
    return (
        <Box
            sx={{
                height: "100vh"
            }}
        >
            <Grid container columns={{xs: 12, sm: 12, md:12}}>
                <Grid item xs={12} sx={{textAlign: "center"}}>
                    <TextField
                        name="name"
                        label="name"
                        onChange={onChange}
                        variant="standard"
                        style={{ width: 200, marginTop: 50 }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Admin;