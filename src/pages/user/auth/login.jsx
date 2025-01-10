import React, { useEffect } from "react";
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from "recoil";

import { userStore } from '../../../atoms';
import { getToken, userLogin, createRecurringCharge } from "../../../api";
import { AddToStorage, errorHandler } from '../../../helpers';
import { Loader } from "../../../loader";

export const Login = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    let location = new URLSearchParams(useLocation().search);

    useEffect(() => {
        initGetToken({
            shop: location.get('shop'),
            code: location.get('code')
        })
    }, []);

    const { mutate: initGetToken, isLoading: loadingGetToken } = useMutation(getToken, {
        onSuccess: (result) => {
            initUserLogin({
                shop: location.get('shop')
            });
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const { mutate: initUserLogin, isLoading: loadingUserLogin } = useMutation(userLogin, {
        onSuccess: (result) => {
            AddToStorage('token', result.data.token);
            setUser(result.data);

            // if (result.data.plan_details !== undefined) {
            navigate("/dashboard");
            // } else {
            // initCreateRecurringCharge({
            // page: "dashboard"
            // });
            // }
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const { mutate: initCreateRecurringCharge, isLoading: loadingCreateRecurringCharge } = useMutation(createRecurringCharge, {
        onSuccess: (result) => {
            window.location.href = result.data.appSubscriptionCreate.confirmationUrl;
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    return (
        <Loader loading={loadingGetToken || loadingUserLogin || loadingCreateRecurringCharge} />
    );
}