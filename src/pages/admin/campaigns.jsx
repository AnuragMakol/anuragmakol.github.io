import React, { useState, useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";
import Swal from 'sweetalert2';
import { isEmpty } from 'lodash';
import Pagination from "react-js-pagination";
import moment from 'moment';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Loader } from '../../loader';
import { campaignStore } from '../../atoms';
import { AdminDashboardLayout } from '../../components/layouts';
import { listCampaigns, createCampaign, deleteCampaign } from '../../api';
import { successHandler, errorHandler } from '../../helpers';

export function AdminCampaigns(props) {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useRecoilState(campaignStore);
  const [isActive, setIsActive] = useState('hidden');

  // Pagination
  const limit = 50;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    initListCampaigns({
      page: page - 1,
      limit: limit
    });
  }, [page]);

  const { mutate: initListCampaigns, isLoading: loadingListCampaigns } = useMutation(listCampaigns, {
    onSuccess: (result) => {
      if (!isEmpty(result.data) && result.data.results.length > 0) {
        setCampaigns(result.data.results);
        setTotal(result.data.total);
      } else {
        setCampaigns([]);
        setTotal(0);
      }
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  const { register: registerCreateCampaign, handleSubmit: handleCreateCampaign, reset: resetCreateCampaign, formState: { errors: errorsCreateCampaign } } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required()
      })
    )
  });

  const onSubmitCreateCampaign = (form) => {
    initCreateCampaign(form);
    resetCreateCampaign();
  }

  const { mutate: initCreateCampaign, isLoading: loadingCreateCampaign } = useMutation(createCampaign, {
    onSuccess: (result) => {
      successHandler(result);
      navigate(`/admin/manage-campaign/${result.data._id}`);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  const { mutate: initDeleteCampaign, isLoading: loadingDeleteCampaign } = useMutation(deleteCampaign, {
    onSuccess: (result) => {
      successHandler(result);
      initListCampaigns({
        page: page - 1,
        limit: limit
      });
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  return (
    <AdminDashboardLayout props={props}>
      <Loader loading={loadingListCampaigns || loadingCreateCampaign || loadingDeleteCampaign} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black">
          Campaigns
        </h2>
        <div>
          <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={() => setIsActive('')}>Create Campaign</button>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-bold text-black">Mailer Listing</h4>
        </div>

        <div className="grid grid-cols-6 bg-gray border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">#</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Campaign Name</p>
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
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {
          isEmpty(campaigns) ? <div>
            <div className="text-center">
              <h1 className="my-24 text-3xl font-bold text-primary-600">No Results Found</h1>
            </div>
          </div> : <React.Fragment>
            {
              Object.values(campaigns).map((campaign, index) => {
                return (
                  <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                    <div className="col-span-1 items-center sm:flex">
                      <p className="text-sm font-medium text-black">{index + 1}</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-sm font-medium text-black">{campaign?.name}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      {
                        campaign?.status === "started" ? <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">Started</p> : ""
                      }
                      {
                        campaign?.status === "stopped" ? <p className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">Stopped</p> : ""
                      }
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">{moment(campaign?.created_at).format('DD MMM, YYYY')}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">{moment(campaign?.updated_at).format('DD MMM, YYYY')}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm font-medium text-black">
                        <button className="mx-2" onClick={() => navigate(`/admin/manage-campaign/${campaign?._id}`)}>
                          <i className="lni lni-pencil text-success text-base"></i>
                        </button>
                        <button className="mx-2" onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            html: 'This will delete the campaign permanently.',
                            icon: 'error',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: "No"
                          }).then((result) => {
                            if (result.isConfirmed) {
                              initDeleteCampaign({
                                id: campaign?._id
                              })
                            }
                          });
                        }}>
                          <i className="lni lni-trash-can text-danger text-lg"></i>
                        </button>
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </React.Fragment>
        }
      </div>

      <div className="flex justify-between items-center pt-4">
          <div>Showing <b>{campaigns.length}</b> of <b>{total}</b> Campaigns</div>
          <nav className="pagination-wrap">
          <Pagination activePage={page} itemsCountPerPage={limit} totalItemsCount={total} pageRangeDisplayed={5} onChange={(e) => setPage(e)} />
        </nav>
      </div>

      <div className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${isActive}`}>
        <div className="w-full max-w-142.5 rounded-lg bg-white">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black ">
                Create Campaign
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleCreateCampaign(onSubmitCreateCampaign)}>
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black">Campaign Name</label>
                  <input className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" type="text"  {...registerCreateCampaign('name')} />
                  {errorsCreateCampaign?.name && <span className="text-danger text-sm text-bold">Please add a name for the campaign</span>}
                </div>
                <div className="flex justify-end gap-4.5">
                  <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1" onClick={() => setIsActive('hidden')}> Cancel </button>
                  <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"> Save </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}