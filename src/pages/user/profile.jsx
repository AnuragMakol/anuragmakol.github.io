import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";
import Swal from 'sweetalert2';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Loader } from '../../loader';
import { UserDashboardLayout } from '../../components/layouts';

import { userStore } from '../../atoms';
import { updateProfile, uploadUserProfilePicture, deleteUserProfilePicture } from '../../api';
import { successHandler, errorHandler } from "../../helpers";

export function Profile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userStore);

  const { register: registerUpdateProfile, handleSubmit: handleSubmitUpdateProfile, reset: resetUpdateProfile, formState: { errors: errorsUpdateProfile } } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        postal_code: yup.string().required(),
        state: yup.string().required(),
        country: yup.string().required(),
      })
    )
  });

  const onSubmitUpdateProfile = (form) => {
    initUpdateProfile(form);
  }

  const { mutate: initUpdateProfile, isLoading: loadingUpdateProfile } = useMutation(updateProfile, {
    onSuccess: (result) => {
      successHandler(result);
      setUser(result.data);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  function UploadManager(e, type) {
    var allFiles = Array.from(e.target.files);

    const formData = new FormData();
    for (let i = 0; i < allFiles.length; i++) {
      formData.append('images', allFiles[i], allFiles[i].name);
    }

    initUploadUserProfilePicture({
      formdata: formData
    });
  }

  const { mutate: initUploadUserProfilePicture, isLoading: loadingUploadUserProfilePicture } = useMutation(uploadUserProfilePicture, {
    onSuccess: (result) => {
      successHandler(result);
      setUser(result.data);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  const { mutate: initDeleteUserProfilePicture, isLoading: loadingDeleteUserProfilePicture } = useMutation(deleteUserProfilePicture, {
    onSuccess: (result) => {
      successHandler(result);
      setUser(result.data);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  return (
    <UserDashboardLayout props={props}>
      <Loader loading={loadingUpdateProfile || loadingUploadUserProfilePicture || loadingDeleteUserProfilePicture} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black ">
          Profile
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default ">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black ">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmitUpdateProfile(onSubmitUpdateProfile)}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">Full Name</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" defaultValue={user?.name} {...registerUpdateProfile('name')} />
                    {errorsUpdateProfile?.name && <span className="text-danger text-sm text-bold">Please add a name</span>}
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">Email Address</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="email" defaultValue={user?.email} {...registerUpdateProfile('email')} />
                    {errorsUpdateProfile?.email && <span className="text-danger text-sm text-bold">Please add an email</span>}
                  </div>
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Address</label>
                  <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" defaultValue={user?.address}  {...registerUpdateProfile('address')} />
                  {errorsUpdateProfile?.address && <span className="text-danger text-sm text-bold">Please add an address</span>}
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">City</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" defaultValue={user?.city}  {...registerUpdateProfile('city')} />
                    {errorsUpdateProfile?.city && <span className="text-danger text-sm text-bold">Please add a city</span>}
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">Postal Code</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" defaultValue={user?.postal_code}  {...registerUpdateProfile('postal_code')} />
                    {errorsUpdateProfile?.postal_code && <span className="text-danger text-sm text-bold">Please add a postal_code</span>}
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">State</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" defaultValue={user?.state}  {...registerUpdateProfile('state')} />
                    {errorsUpdateProfile?.state && <span className="text-danger text-sm text-bold">Please add a state</span>}
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">Country</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" defaultValue={user?.country}  {...registerUpdateProfile('country')} />
                    {errorsUpdateProfile?.country && <span className="text-danger text-sm text-bold">Please add a country</span>}
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default ">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black ">
                Your Profile Picture
              </h3>
            </div>
            <div className="p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full">
                  <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/avatar.svg'}`} alt="User" />
                </div>
                <div>
                  <span className="mb-1.5 font-medium text-black ">Edit your photo</span>
                  {
                    user?.image ? <span className="flex gap-2.5">
                      <button className="text-sm font-medium hover:text-primary" onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          html: 'This will delete the profile picture for your account permanently',
                          icon: 'error',
                          showCancelButton: true,
                          confirmButtonText: 'Yes',
                          cancelButtonText: "No"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            initDeleteUserProfilePicture({})
                          }
                        });
                      }}>
                        Delete
                      </button>
                    </span> : ""
                  }
                </div>
              </div>

              <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 sm:py-7.5">
                <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" onChange={(e) => UploadManager(e, 'images')} />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white ">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z" fill="#3C50E0"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z" fill="#3C50E0"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z" fill="#3C50E0"></path>
                    </svg>
                  </span>
                  <p className="text-sm font-medium">
                    <span className="text-primary mr-1">Click to upload or drag and drop</span>
                  </p>
                  <p className="mt-1.5 text-sm font-medium">
                    PNG, JPG or JPEG
                  </p>
                  <p className="text-sm font-medium">
                    (max, 800 X 800px)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  )
}