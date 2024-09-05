import React, { useState, useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useMutation } from 'react-query';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { Loader } from '../../loader';
import { AdminDashboardLayout } from '../../components/layouts';

import { listUsers } from '../../api';
import { successHandler, errorHandler } from "../../helpers"

export function AdminUsers(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    initListUsers({});
  }, []);

  const { mutate: initListUsers, isLoading: loadingListUsers } = useMutation(listUsers, {
    onSuccess: (result) => {
      setUsers(result.data);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  return (
    <AdminDashboardLayout props={props}>
      <Loader loading={loadingListUsers} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black ">
          Users
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default ">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-bold text-black ">Users Listing</h4>
        </div>

        <div className="grid grid-cols-6 bg-gray border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Name</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Email Address</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Shop URL</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Status</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Created At</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Updated At</p>
          </div>
        </div>
        {
          isEmpty(users) ? <div>
            <div className="text-center">
              <h1 className="my-24 text-3xl font-bold text-primary-600">No Results Found</h1>
            </div>
          </div> : <React.Fragment>
            {
              Object.values(users).map((user, index) => {
                return (
                  <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">{user?.name}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <p className="text-sm font-medium text-black">{user?.email}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <p className="text-sm font-medium text-black">{user?.shop}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      {
                        user?.status === "active" ? <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">Active</p> : ""
                      }
                      {
                        user?.status === "inactive" ? <p className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">In Active</p> : ""
                      }
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">{moment(user?.created_at).format('DD MMM, YYYY')}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">{moment(user?.updated_at).format('DD MMM, YYYY')}</p>
                    </div>
                  </div>
                )
              })
            }
          </React.Fragment>
        }
      </div>
    </AdminDashboardLayout>
  )
}