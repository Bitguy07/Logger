import React, { useState, useEffect } from "react"
import axios from 'axios';

axios.defaults.withCredentials = true;
const origin =  window.location.hostname === "localhost"
                ? import.meta.env.VITE_API_LOCAL
                : import.meta.env.VITE_API_PROD;

export default function qrCode(user) {
    const [qrCodelink, setQrCodelink] = useState(null);

    useEffect(() => {
        if(user === null) return;
            const generateQrCode = async () => {
                try{
                    const response = await axios.post(`${origin}/qr-code/generate_qr_code`, {name:user.name, username:user.username} );
                    const qrCode = response?.data.qr_code;
                    setQrCodelink(qrCode);
                }catch(err){
                    console.log(err);
                }
            }
            generateQrCode();

    }, [user]);

    return qrCodelink;
}