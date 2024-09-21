import React from 'react';
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';

import { Loader } from '../../loader';
import { UserDashboardLayout } from '../../components/layouts';

import { resetScriptTag } from '../../api';
import { successHandler, errorHandler } from "../../helpers";

export function Dashboard(props) {

  const { mutate: initResetScriptTag, isLoading: loadingResetScriptTag } = useMutation(resetScriptTag, {
    onSuccess: (result) => {
      successHandler(result);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  return (
    <UserDashboardLayout props={props}>
      <Loader loading={loadingResetScriptTag} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black ">
          Dashboard
        </h2>
        <div>
          <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              html: "This will reset the sticky add to cart widget integration with your store. <br /> <br /> Use this function only when you are not able to see the sticky widget on your store after installing the app and customizing the widget for your store.",
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: "No"
            }).then((result) => {
              if (result.isConfirmed) {
                initResetScriptTag({});
              }
            });
          }}>Reset Integration</button>
        </div>
      </div>
    </UserDashboardLayout>
  )
}