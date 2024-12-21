import React, { Dispatch, SetStateAction, useEffect } from "react";
import QRCode from "../QRCode/QRCode";
import "./Menu.css";
import { Box } from "@mui/material";

const Menu = () =>{
    return (
        <Box className="Menu">
            <div className="qrcodeArea"><QRCode /></div>
            <div className="profileButton">Profile</div>
        </Box>

    )
}

export default Menu