import React, { Dispatch, SetStateAction, useEffect } from "react";
import QRCode from "../QRCode/QRCode";
import "./Menu.css";

const Menu = () =>{
    return (
        <div className="Menu">
            <div className="qrcodeArea"><QRCode /></div>
            <div className="profileButton">Profile</div>
        </div>

    )
}

export default Menu