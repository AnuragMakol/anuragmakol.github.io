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

    const ToggleTrialInfo = (type) => {
        let currentDate = moment().format();
        let trialEndDate = moment(user?.plan_details?.createdAt).add(user?.plan_details?.trialDays, 'days').format();

        if (user?.plan_details?.trialDays > 0) {
            if (moment(currentDate).isBefore(trialEndDate)) {
                if (type === "title") {
                    return `(${user?.plan_details?.trialDays} Days Trial)`;
                } else if (type === "info") {
                    return `Your trial will expire on ${moment(trialEndDate).format("DD MMM, YYYY")}`
                }
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    return (
        <UserDashboardLayout props={props}>
            <Loader loading={loadingCancelRecurringCharge} />
            <div className='max-w-150 mx-auto mb-5'>
                <h1 className="text-title-md2 font-bold text-black mb-5">
                    Billing
                </h1>
                {
                    user?.plan_details !== undefined ? <div className='bg-white border border-stroke p-10'>
                        <div className='border-b border-stroke pb-6 mb-6'>
                            <h2 className='font-medium text-md mb-1'>Plan Name</h2>
                            <p className="font-bold text-black text-lg">{user?.plan_details?.name} Plan {ToggleTrialInfo("title")}</p>
                            <p className='text-danger font-medium'>{ToggleTrialInfo("info")}</p>
                        </div>

                        <div className='border-b border-stroke pb-6 mb-6'>
                            <div className='mb-6'>
                                <h2 className='font-medium text-md mb-1'>Plan Start Date</h2>
                                <p className="font-bold text-black text-lg">{moment(user?.plan_details?.createdAt).format("DD MMM, YYYY")}</p>
                            </div>
                            <div>
                                <h2 className='font-medium text-md mb-1'>Billed On</h2>
                                <p className="font-bold text-black text-lg">{moment(user?.plan_details?.currentPeriodEnd).format("Do")} of every month</p>
                            </div>
                        </div>
                        <div className='mb-6'>
                            <h2 className='font-medium text-md mb-1'>Subscription Price</h2>
                            <p className="font-bold text-black text-lg">{user?.plan_details?.price} {user?.plan_details?.currencyCode}</p>
                        </div>
                        <div className='flex justify-end'>
                            <button className="rounded-md border border-danger hover:bg-danger hover:text-white py-2 px-4 font-medium text-danger transition" onClick={() => CancelPlan()}> Cancel Plan </button>
                        </div>
                    </div> : ""
                }
            </div>
        </UserDashboardLayout>
    )
}