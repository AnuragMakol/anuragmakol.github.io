import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';

import { userStore } from '../../../atoms';
import { RemoveFromStorage } from '../../../helpers';

export const AdminLogout = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    useEffect(() => {
        RemoveFromStorage('admin_token');

        setTimeout(() => {
            window.location.href = `https://${import.meta.env.VITE_APP_URL}/admin/login`;
        }, 500);
    }, []);

    return (
        <div></div>
    )
}