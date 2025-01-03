import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";
import Swal from 'sweetalert2';
import moment from 'moment';

import { Loader } from '../../loader';
import { UserDashboardLayout } from '../../components/layouts';

import { userStore } from '../../atoms';
import { cancelRecurringCharge } from '../../api';
import { errorHandler, successHandler } from "../../helpers";

export function Billing(props) {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    const { mutate: initCancelRecurringCharge, isLoading: loadingCancelRecurringCharge } = useMutation(cancelRecurringCharge, {
        onSuccess: (result) => {
            setUser(result.data);
            successHandler(result);
            navigate('/logout');
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const CancelPlan = () => {
        Swal.fire({
            title: "Are you sure?",
            html: `This will cancel the subscription to the ${user?.plan_details?.name} Plan`,
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                initCancelRecurringCharge({})
            }
        });
    }

    return (
        <UserDashboardLayout props={props}>
            <Loader loading={loadingCancelRecurringCharge} />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-bold text-black">
                    Billing
                </h2>
            </div>

            {
                user?.plan_details !== undefined ? <div className="bg-white border border-stroke mb-4">
                    <div className="grid grid-cols-6 px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5">
                        <div className="col-span-2 flex items-center">
                            <p className="font-medium">Plan Name</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Activated On</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Trial Days</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Trial Ends On</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Subscription Price</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Renews On</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Actions</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5">
                        <div className="col-span-2 flex items-center">
                            <p className="font-medium">{user?.plan_details?.name} Plan</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">{moment(user?.plan_details?.createdAt).format("DD MMM, YYYY")}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-bold text-danger">{user?.plan_details?.trialDays > 0 ? user?.plan_details?.trialDays : "N/A"}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-bold text-danger">{user?.plan_details?.trialDays > 0 ? moment(user?.plan_details?.createdAt).add(user?.plan_details?.trialDays, 'days').format("DD MMM, YYYY") : "N/A"}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">{user?.plan_details?.price} {user?.plan_details?.currencyCode}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">{moment(user?.plan_details?.currentPeriodEnd).format("Do")} of every month</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">
                                <button className="block w-full rounded-md bg-danger p-3 text-center font-medium text-white transition hover:bg-opacity-90 ml-1" onClick={() => CancelPlan()}> Cancel Plan </button>
                            </p>
                        </div>
                    </div>
                </div> : ""
            }
        </UserDashboardLayout>
    )
}