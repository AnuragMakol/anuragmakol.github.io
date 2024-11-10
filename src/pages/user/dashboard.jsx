import React, { useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";
import { isEmpty } from 'lodash';

import { Loader } from '../../loader';
import { userStore, statisticsStore } from '../../atoms';
import { fetchProductStatistics } from '../../api';
import { UserDashboardLayout } from '../../components/layouts';

import { errorHandler } from "../../helpers";

export function Dashboard(props) {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userStore);
  const [statistics, setStatistics] = useRecoilState(statisticsStore);

  useEffect(() => {
    initFetchProductStatistics({});
  }, []);

  const { mutate: initFetchProductStatistics, isLoading: loadingFetchProducStatistics } = useMutation(fetchProductStatistics, {
    onSuccess: (result) => {
      setStatistics(result.data);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  return (
    <UserDashboardLayout props={props}>
      <Loader loading={loadingFetchProducStatistics} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black ">
          Dashboard
        </h2>
      </div>

      <h4 className="text-xl font-bold text-black dark:text-white mt-5 mb-3">Weekly statistics</h4>
      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark mb-3">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.weekly?.views?.$numberDecimal == undefined ? 0 : statistics?.weekly?.views?.$numberDecimal}
              </h4>
              <p className="text-sm font-medium">Views</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.weekly?.added_to_cart?.$numberDecimal == undefined ? 0 : statistics?.weekly?.added_to_cart?.$numberDecimal}
              </h4>
              <p className="text-sm font-medium">Added to Cart</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark sm:border-b-0 sm:pb-0 xl:border-r">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.weekly?.conversions?.$numberDecimal == undefined ? 0 : statistics?.weekly?.conversions?.$numberDecimal}
              </h4>
              <p className="text-sm font-medium">Conversions</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.weekly?.revenue?.$numberDecimal == undefined ? 0 : user?.shop_details?.money_format.replace('{{amount}}', statistics?.weekly?.revenue?.$numberDecimal)}
              </h4>
              <p className="text-sm">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-xl font-bold text-black dark:text-white mt-5 mb-3">Monthly statistics</h4>
      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark mb-3">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.monthly?.views?.$numberDecimal == undefined ? 0 : statistics?.monthly?.views?.$numberDecimal}
              </h4>
              <p className="text-sm font-medium">Views</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.monthly?.added_to_cart?.$numberDecimal == undefined ? 0 : statistics?.monthly?.added_to_cart?.$numberDecimal}
              </h4>
              <p className="text-sm font-medium">Added to Cart</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark sm:border-b-0 sm:pb-0 xl:border-r">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.monthly?.conversions?.$numberDecimal == undefined ? 0 : statistics?.monthly?.conversions?.$numberDecimal}
              </h4>
              <p className="text-sm font-medium">Conversions</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                {statistics?.monthly?.revenue?.$numberDecimal == undefined ? 0 : user?.shop_details?.money_format.replace('{{amount}}', statistics?.monthly?.revenue?.$numberDecimal)}
              </h4>
              <p className="text-sm">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-xl font-bold text-black dark:text-white mt-5 mb-3">Most viewed products</h4>
      <div className="col-span-12 xl:col-span-6 mb-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Product Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Variants</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Type</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Vendor</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Views</p>
            </div>
          </div>

          {
            !isEmpty(statistics?.product_stats?.views) && Object.values(statistics?.product_stats?.views).map((item, index) => {
              return (
                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                  <div className="col-span-3 flex items-center">
                    <a className="flex flex-col gap-4 sm:flex-row sm:items-center" href={`https://${item?.shop}/${item?.url}`} target="_blank">
                      <div className="h-12.5 w-15 rounded-md">
                        <img src={item?.featured_image} alt="Product" />
                      </div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        {item?.title}
                      </p>
                    </a>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {
                        !isEmpty(item?.variants) && Object.values(item?.variants).map((variant, index2) => {
                          return (
                            <div key={index2}>
                              {variant?.title}
                            </div>
                          )
                        })
                      }
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.type}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.vendor}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-meta-3">{item?.views?.$numberDecimal}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <h4 className="text-xl font-bold text-black dark:text-white mt-5 mb-3">Products most added to cart</h4>
      <div className="col-span-12 xl:col-span-6 mb-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Product Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Variants</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Type</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Vendor</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Added to Cart</p>
            </div>
          </div>

          {
            !isEmpty(statistics?.product_stats?.added_to_cart) && Object.values(statistics?.product_stats?.added_to_cart).map((item, index) => {
              return (
                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                  <div className="col-span-3 flex items-center">
                    <a className="flex flex-col gap-4 sm:flex-row sm:items-center" href={`https://${item?.shop}/${item?.url}`} target="_blank">
                      <div className="h-12.5 w-15 rounded-md">
                        <img src={item?.featured_image} alt="Product" />
                      </div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        {item?.title}
                      </p>
                    </a>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {
                        !isEmpty(item?.variants) && Object.values(item?.variants).map((variant, index2) => {
                          return (
                            <div key={index2}>
                              {variant?.title} - <span className="text-sm font-medium text-meta-3">{variant?.added_to_cart}</span>
                            </div>
                          )
                        })
                      }
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.type}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.vendor}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-meta-3">{item?.added_to_cart?.$numberDecimal}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <h4 className="text-xl font-bold text-black dark:text-white mt-5 mb-3">Products with the most conversions</h4>
      <div className="col-span-12 xl:col-span-6 mb-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Product Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Variants</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Type</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Vendor</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Conversions</p>
            </div>
          </div>

          {
            !isEmpty(statistics?.product_stats?.conversions) && Object.values(statistics?.product_stats?.conversions).map((item, index) => {
              return (
                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                  <div className="col-span-3 flex items-center">
                    <a className="flex flex-col gap-4 sm:flex-row sm:items-center" href={`https://${item?.shop}/${item?.url}`} target="_blank">
                      <div className="h-12.5 w-15 rounded-md">
                        <img src={item?.featured_image} alt="Product" />
                      </div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        {item?.title}
                      </p>
                    </a>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {
                        !isEmpty(item?.variants) && Object.values(item?.variants).map((variant, index2) => {
                          return (
                            <div key={index2}>
                              {variant?.title} - <span className="text-sm font-medium text-meta-3">{variant?.conversions}</span>
                            </div>
                          )
                        })
                      }
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.type}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.vendor}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-meta-3">{item?.conversions?.$numberDecimal}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <h4 className="text-xl font-bold text-black dark:text-white mt-5 mb-3">Products that generated the most revenue</h4>
      <div className="col-span-12 xl:col-span-6 mb-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Product Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Variants</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Type</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Vendor</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Revenue</p>
            </div>
          </div>

          {
            !isEmpty(statistics?.product_stats?.revenue) && Object.values(statistics?.product_stats?.revenue).map((item, index) => {
              return (
                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={index}>
                  <div className="col-span-3 flex items-center">
                    <a className="flex flex-col gap-4 sm:flex-row sm:items-center" href={`https://${item?.shop}/${item?.url}`} target="_blank">
                      <div className="h-12.5 w-15 rounded-md">
                        <img src={item?.featured_image} alt="Product" />
                      </div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        {item?.title}
                      </p>
                    </a>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {
                        !isEmpty(item?.variants) && Object.values(item?.variants).map((variant, index2) => {
                          return (
                            <div key={index2}>
                              {variant?.title} - <span className="text-sm font-medium text-meta-3">{variant?.revenue == undefined ? 0 : user?.shop_details?.money_format.replace('{{amount}}', variant?.revenue)}</span>
                            </div>
                          )
                        })
                      }
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.type}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-black dark:text-white">{item?.vendor}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm font-medium text-meta-3">
                      {item?.revenue?.$numberDecimal == undefined ? 0 : user?.shop_details?.money_format.replace('{{amount}}', item?.revenue?.$numberDecimal)}
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </UserDashboardLayout>
  )
}