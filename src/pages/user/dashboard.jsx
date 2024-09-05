import React from 'react';
import { UserDashboardLayout } from '../../components/layouts';

import { Loader } from '../../loader';

export function Dashboard(props) {

  return (
    <UserDashboardLayout props={props}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black ">
          Dashboard
        </h2>
      </div>
    </UserDashboardLayout>
  )
}