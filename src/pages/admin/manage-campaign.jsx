import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";
import { isEmpty } from 'lodash';
import Pagination from "react-js-pagination";
import moment from 'moment';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Loader } from '../../loader';
import { AdminDashboardLayout } from '../../components/layouts';
import { fetchCampaign, updateCampaign, fetchCampaignEmails, uploadCampaignCSV } from '../../api';
import { successHandler, errorHandler } from '../../helpers';

export function AdminManageCampaign(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [campaign, setCampaign] = useState({});
  const [activeTab, setActiveTab] = useState(1);
  const [emailList, setEmailList] = useState([]);

  // Pagination
  const limit = 50;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    initFetchCampaign({
      id: params.id
    });
  }, []);

  useEffect(() => {
    initFetchCampaignEmails({
      id: params.id,
      page: page - 1,
      limit: limit
    });
  }, [page]);

  const setUpdateForm = (data) => {
    setUpdateCampaignValue('name', data?.name);
    setUpdateCampaignValue('min_delay', data?.min_delay);
    setUpdateCampaignValue('max_delay', data?.max_delay);
    setUpdateCampaignValue('provider', data?.provider);
    setUpdateCampaignValue('cron_timing', data?.cron_timing);
    setUpdateCampaignValue('status', data?.status);

    for (let i = 0; i < data?.templates?.length; i++) {
      setUpdateCampaignValue(`templates[${i}].subject`, data?.templates[i]?.subject);
      setUpdateCampaignValue(`templates[${i}].message`, data?.templates[i]?.message);
    }
  }

  const { mutate: initFetchCampaign, isLoading: loadingFetchCampaign } = useMutation(fetchCampaign, {
    onSuccess: (result) => {
      setCampaign(result.data);
      setUpdateForm(result.data);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  const { mutate: initFetchCampaignEmails, isLoading: loadingFetchCampaignEmails } = useMutation(fetchCampaignEmails, {
    onSuccess: (result) => {
      if (!isEmpty(result.data) && result.data.results.length > 0) {
        setEmailList(result.data.results);
        setTotal(result.data.total);
      } else {
        setEmailList([]);
        setTotal(0);
      }
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  const { register: registerUpdateCampaign, handleSubmit: handleUpdateCampaign, reset: resetUpdateCampaign, formState: { errors: errorsUpdateCampaign }, setValue: setUpdateCampaignValue } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        min_delay: yup.number().required(),
        max_delay: yup.number().required(),
        cron_timing: yup.string().required(),
        status: yup.string().required(),
        provider: yup.string().required(),
        templates: yup.array().of(
          yup.object().shape({
            subject: yup.string(),
            message: yup.string()
          })
        )
      })
    )
  });

  const onSubmitUpdateCampaign = (form) => {
    form.id = params.id;
    initUpdateCampaign(form);
  }

  const { mutate: initUpdateCampaign, isLoading: loadingUpdateCampaign } = useMutation(updateCampaign, {
    onSuccess: (result) => {
      successHandler(result);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  function UploadManager(e, type) {
    var allFiles = Array.from(e.target.files);

    const formData = new FormData();
    for (let i = 0; i < allFiles.length; i++) {
      formData.append('files', allFiles[i], allFiles[i].name);
      formData.append('name', e.target.name);
      formData.append('campaign_id', params?.id);
    }

    initUploadCampaignCSV({
      formdata: formData
    });
  }

  const { mutate: initUploadCampaignCSV, isLoading: loadingUploadCampaignCSV } = useMutation(uploadCampaignCSV, {
    onSuccess: (result) => {
      initFetchCampaignEmails({
        id: params.id,
        page: page - 1,
        limit: limit
      });
      successHandler(result);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  return (
    <AdminDashboardLayout props={props}>
      <Loader loading={loadingFetchCampaign || loadingUpdateCampaign || loadingFetchCampaignEmails || loadingUploadCampaignCSV} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black ">
          Campaign - {campaign?.name}
        </h2>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default ">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black ">
                Timing Settings
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleUpdateCampaign(onSubmitUpdateCampaign)}>
                <div className="mb-5.5 w-full">
                  <label className="mb-3 block text-sm font-medium text-black">Name</label>
                  <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="text" {...registerUpdateCampaign('name')} />
                  {errorsUpdateCampaign?.name && <span className="text-danger text-sm text-bold">Please add a name for the campaign</span>}
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">Min. Delay (In Seconds)</label>
                    <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="number" min="0" {...registerUpdateCampaign('min_delay')} />
                    {errorsUpdateCampaign?.min_delay && <span className="text-danger text-sm text-bold">Please add min. delay for the emails</span>}
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black">Max. Delay (In Seconds)</label>
                    <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="number" min="0" {...registerUpdateCampaign('max_delay')} />
                    {errorsUpdateCampaign?.max_delay && <span className="text-danger text-sm text-bold">Please add max. delay for the emails</span>}
                  </div>
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Email Service Provider</label>
                  <div className="relative z-20 bg-white ">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateCampaign('provider')} >
                      <option value="">Select Service Provider</option>
                      <option value="sendgrid">Sendgrid</option>
                      <option value="mailgun">Mailgun</option>
                      <option value="resend">Resend</option>
                      <option value="plunk">Plunk</option>
                      <option value="mailersend">Mailer Send</option>
                    </select>
                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  {errorsUpdateCampaign?.provider && <span className="text-danger text-sm text-bold">Please select a service provider</span>}
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Cron Timing</label>
                  <div className="relative z-20 bg-white ">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateCampaign('cron_timing')} >
                      <option value="">Select Timing</option>
                      <option value="* * * * *">Every Minute</option>
                      <option value="*/5 * * * *">Every 5 Minutes</option>
                      <option value="*/10 * * * *">Every 10 Minutes</option>
                      <option value="*/15 * * * *">Every 15 Minutes</option>
                      <option value="*/30 * * * *">Every 30 Minutes</option>
                      <option value="0 * * * *">Every Hour</option>
                      <option value="0 */3 * * *">Every 3 Hours</option>
                      <option value="0 */6 * * *">Every 6 Hours</option>
                      <option value="0 */9 * * *">Every 9 Hours</option>
                      <option value="0 */12 * * *">Every 12 Hours</option>
                      <option value="0 0 * * *">Every Day At Night</option>
                      <option value="0 6 * * *">Every Day At 6 AM</option>
                      <option value="0 12 * *">Every Day At Noon</option>
                      <option value="0 18 * * *">Every Day At 6 PM</option>
                    </select>
                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  {errorsUpdateCampaign?.cron_timing && <span className="text-danger text-sm text-bold">Please select cron timing for the campaign</span>}
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Status</label>
                  <div className="relative z-20 bg-white ">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateCampaign('status')}>
                      <option value="">Select Status</option>
                      <option value="started">Started</option>
                      <option value="stopped">Stopped</option>
                    </select>
                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  {errorsUpdateCampaign?.status && <span className="text-danger text-sm text-bold">Please select a status for the campaign</span>}
                </div>

                <div className="flex justify-end gap-4.5">
                  <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1" type="submit" onClick={() => resetUpdateCampaign()}>
                    Cancel
                  </button>
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
                Upload CSV
              </h3>
            </div>
            <div className="p-7">
              <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 sm:py-7.5">
                <input type="file" accept="text/csv" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" name="files" onChange={(e) => UploadManager(e)} />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white ">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z" fill="#3C50E0"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z" fill="#3C50E0"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z" fill="#3C50E0"></path>
                    </svg>
                  </span>
                  <p className="text-sm font-medium">
                    <span className="mr-1">Click to upload or drag and drop</span>
                  </p>
                  <p className="mt-1.5 text-sm font-medium">
                    CSV only (UTF-8 Format)
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-primary text-center">
                <a href={`${import.meta.env.VITE_API_URL}/files/campaign-format.csv`} download>Download Sample CSV format</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-5.5">
        <div className="border-b border-stroke px-7.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white"> Email Templates </h3>
        </div>
        <div className="mb-6 w-full px-7.5">
          <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
            <a href="#" className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab === 1 ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setActiveTab(1)}> Template 1 </a>
            <a href="#" className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab === 2 ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setActiveTab(2)}> Template 2 </a>
            <a href="#" className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab === 3 ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setActiveTab(3)}> Template 3 </a>
            <a href="#" className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab === 4 ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setActiveTab(4)}> Template 4 </a>
            <a href="#" className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab === 5 ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setActiveTab(5)}> Template 5 </a>
          </div>
          <form onSubmit={handleUpdateCampaign(onSubmitUpdateCampaign)}>
            <div className={`font-medium leading-relaxed ${activeTab === 1 ? "" : "hidden"}`}>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Subject</label>
                <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="text" {...registerUpdateCampaign('templates[0].subject')} />
              </div>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Message</label>
                <textarea className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" rows={12} {...registerUpdateCampaign('templates[0].message')}></textarea>
              </div>
            </div>
            <div className={`font-medium leading-relaxed ${activeTab === 2 ? "" : "hidden"}`}>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Subject</label>
                <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="text" {...registerUpdateCampaign('templates[1].subject')} />
              </div>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Message</label>
                <textarea className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" rows={12} {...registerUpdateCampaign('templates[1].message')}></textarea>
              </div>
            </div>
            <div className={`font-medium leading-relaxed ${activeTab === 3 ? "" : "hidden"}`}>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Subject</label>
                <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="text" {...registerUpdateCampaign('templates[2].subject')} />
              </div>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Message</label>
                <textarea className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" rows={12} {...registerUpdateCampaign('templates[2].message')}></textarea>
              </div>
            </div>
            <div className={`font-medium leading-relaxed ${activeTab === 4 ? "" : "hidden"}`}>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Subject</label>
                <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="text" {...registerUpdateCampaign('templates[3].subject')} />
              </div>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Message</label>
                <textarea className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" rows={12} {...registerUpdateCampaign('templates[3].message')}></textarea>
              </div>
            </div>
            <div className={`font-medium leading-relaxed ${activeTab === 5 ? "" : "hidden"}`}>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Subject</label>
                <input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" type="text" {...registerUpdateCampaign('templates[4].subject')} />
              </div>
              <div className="mb-5.5 w-full">
                <label className="mb-3 block text-sm font-medium text-black">Message</label>
                <textarea className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" rows={12} {...registerUpdateCampaign('templates[4].message')}></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-4.5">
              <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1" type="submit">
                Cancel
              </button>
              <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default ">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-bold text-black">Mailer Listing</h4>
        </div>
        <div className="grid grid-cols-6 bg-gray border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">#</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Email Address</p>
          </div>
          <div className="col-span-2 flex items-center">
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
          isEmpty(emailList) ? <div>
            <div className="text-center">
              <h1 className="my-24 text-3xl font-bold text-primary-600">No Results Found</h1>
            </div>
          </div> : <React.Fragment>
            {
              Object.values(emailList).map((item, index) => {
                return (
                  <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                    <div className="col-span-1 items-center sm:flex">
                      <p className="text-sm font-medium text-black">{index + 1}</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-sm font-medium text-black">{item?.email}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                      {
                        item?.status === "pending" ? <p className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">Pending</p> : ""
                      }
                      {
                        item?.status === "verified" ? <p className="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary">Verified</p> : ""
                      }
                      {
                        item?.status === "error" ? <p className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">Error</p> : ""
                      }
                      {
                        item?.status === "sent" ? <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">Sent</p> : ""
                      }
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">{moment(item?.created_at).format('DD MMM, YYYY')}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">{moment(item?.updated_at).format('DD MMM, YYYY')}</p>
                    </div>
                  </div>
                )
              })
            }
          </React.Fragment>
        }
      </div>

      <div className="">
        <div className="">
          <div>Showing <b>{emailList.length}</b> of <b>{total}</b> Emails</div>
        </div>
        <div className="">
          <Pagination activePage={page} itemsCountPerPage={limit} totalItemsCount={total} pageRangeDisplayed={5} onChange={(e) => setPage(e)} />
        </div>
      </div>
    </AdminDashboardLayout>
  )
}