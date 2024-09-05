import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

export const Install = (props) => {
    let location = new URLSearchParams(useLocation().search);

    useEffect(() => {
        let shop = location.get('shop');
        let permissions = import.meta.env.VITE_SHOPIFY_APP_PERMISSIONS;

        let client_id = import.meta.env.VITE_SHOPIFY_API_KEY;
        let redirect_uri = import.meta.env.VITE_APP_URL;

        let url = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=${permissions}&redirect_uri=${redirect_uri}&state=${shop}&grant_options[]=offline`;
        window.location = url;
    }, []);

    return null;
}