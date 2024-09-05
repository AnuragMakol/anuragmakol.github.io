import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';

import { userStore } from '../../../atoms';
import { RemoveFromStorage } from '../../../helpers';

export const Logout = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    useEffect(() => {
        RemoveFromStorage('token');

        setTimeout(() => {
            window.location.href = `https://${user?.shop}/admin`;
        }, 500);
    }, []);

    return (
        <div></div>
    )
}