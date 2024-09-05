import React from 'react';
import { useNavigate, } from 'react-router-dom';
import { useRecoilState } from "recoil";

import { Loader } from '../../loader';
import { UserDashboardLayout } from '../../components/layouts';

export function ContactUs(props) {
  const navigate = useNavigate();

  return (
    <UserDashboardLayout props={props}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black ">
          Contact Us
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default ">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black ">
                Contact Form
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">First Name</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">Last Name</label>
                    <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Email Address</label>
                  <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="email" />
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Subject</label>
                  <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text" />
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Message</label>
                  <textarea className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" rows={5}></textarea>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1" type="submit">
                    Cancel
                  </button>
                  <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  )
}