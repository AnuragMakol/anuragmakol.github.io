import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";
import { isEmpty, sumBy } from 'lodash';
import Swal from 'sweetalert2';

import { Loader } from '../../loader';
import { userStore, statisticsStore } from '../../atoms';
import { fetchProductStatistics, setRecurringCharge } from '../../api';
import { UserDashboardLayout } from '../../components/layouts';

import { successHandler, errorHandler, PriceFormat } from "../../helpers";

export function Dashboard(props) {
  const [user, setUser] = useRecoilState(userStore);
  const [statistics, setStatistics] = useRecoilState(statisticsStore);

  let location = new URLSearchParams(useLocation().search);
  let chargeID = location.get("charge_id");

  useEffect(() => {
    initFetchProductStatistics({});
  }, []);

  useEffect(() => {
    if (chargeID !== null) {
      initSetRecurringCharge({
        id: chargeID
      });
    }
  }, [chargeID]);

  const { mutate: initSetRecurringCharge, isLoading: loadingSetRecurringCharge } = useMutation(setRecurringCharge, {
    onSuccess: (result) => {
      setUser(result.data);
      successHandler(result);
      setTimeout(() => {
        EmbedAppInit();
      }, 1000);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  const { mutate: initFetchProductStatistics, isLoading: loadingFetchProductStatistics } = useMutation(fetchProductStatistics, {
    onSuccess: (result) => {
      setStatistics(result.data);
    },
    onError: (error) => {
      errorHandler(error);
    }
  });

  const BeautifyStatistics = (type, value) => {
    let amount = 0;

    if (value >= 1000) {
      amount = value / 1000;
      amount = `${amount.toFixed(2)}K`;
    } else {
      amount = value;
    }

    if (type === "revenue") {
      amount = PriceFormat(user?.shop_details?.money_format, amount);
    }

    return amount;
  }

  const EmbedAppInit = () => {
    Swal.fire({
      title: "CartPlus App Integration Guide",
      html: `
        <div class="border border-stroke">                  
          <iframe width="100%" height="530" src="https://www.youtube.com/embed/Aa1I009GBhE?autoplay=1&loop=1&controls=0&list=PL7suC7X_043s5IZ6BH_J5Sk5_9WXpJG7k" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="mt-5 text-base">
          Once you've watched the video tutorial above on enabling the CartPlus App integration with your store, click the I'm Ready button below. After completing all the steps outlined in the video, you can close the page and start using the app.
          <br /> <br />
          If you wish to enable the integration later, simply click the ‘Integration Guide’ button on your dashboard to proceed.
        </div>
      `,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: "I'm Ready",
      customClass: 'swal-wide text-black',
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(
          `https://admin.shopify.com/store/${user?.shop.split('.')[0]}/themes/current/editor?context=apps&activateAppId=${import.meta.env.VITE_EXTENSION_ID}/${import.meta.env.VITE_EXTENSION_NAME}`,
          '_blank'
        )
      }
    });
  }

  return (
    <UserDashboardLayout props={props}>
      <Loader loading={loadingFetchProductStatistics || loadingSetRecurringCharge} />
      <div className='max-w-[1200px] mx-auto pb-10'>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black">
            Dashboard
          </h2>
        </div>
        <div className='flex mb-6 space-x-6'>
          <div className='w-full rounded-sm border border-stroke bg-white shadow-default p-6'>
            <h2 className='text-xl font-bold mb-5 text-black'>Weekly statistics</h2>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 lg:col-span-6'>
                <div className='bg-blue-50 p-6 flex justify-between items-center relative overflow-hidden'>
                  <div className='absolute w-full h-full opacity-10 z-0 bg-no-repeat transform -scale-100 bg-left top-0' style={{ backgroundImage: `url(${import.meta.env.VITE_APP_URL}/images/card-bg.png)` }}>
                  </div>
                  <div className='relative z-1'>
                    <p className="text-sm text-primary font-bold mb-2">Total Views</p>
                    <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                      {statistics?.weekly?.views == undefined ? 0 : BeautifyStatistics('number', statistics?.weekly?.views)}
                    </h4>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border border-blue-300">
                    <span className='bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center'>
                      <svg className="fill-white w-5" width="32" height="26" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" fill=""></path><path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill=""></path></svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className='col-span-12 lg:col-span-6'>
                <div className='bg-pink-50 rounded-sm p-6 flex justify-between items-center relative overflow-hidden'>
                  <div className='absolute w-full h-full opacity-10 z-0 bg-no-repeat transform -scale-100 bg-left top-0' style={{ backgroundImage: `url(${import.meta.env.VITE_APP_URL}/images/card-bg.png)` }}>
                  </div>
                  <div className='relative z-1'>
                    <p className="text-sm text-primary font-bold mb-2">Added to Cart</p>
                    <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                      {statistics?.weekly?.added_to_cart == undefined ? 0 : BeautifyStatistics('number', statistics?.weekly?.added_to_cart)}
                    </h4>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 border border-pink-300">
                    <span className='bg-pink-500 w-9 h-9 rounded-full flex items-center justify-center'>
                      <svg className="fill-white w-4" width="26" height="30" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z" fill=""></path><path d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z" fill=""></path><path d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z" fill=""></path></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full rounded-sm border border-stroke bg-white shadow-default p-6 relative overflow-hidden'>
            <div className='relative z-1'>
              <h2 className='text-xl font-bold mb-5 text-black'>Monthly statistics</h2>
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 lg:col-span-6'>
                  <div className='bg-blue-50 p-6 flex justify-between items-center relative overflow-hidden'>
                    <div className='absolute w-full h-full opacity-10 z-0 bg-no-repeat transform -scale-100 bg-left top-0' style={{ backgroundImage: `url(${import.meta.env.VITE_APP_URL}/images/card-bg.png)` }}>
                    </div>
                    <div className='relative z-1'>
                      <p className="text-sm text-primary font-bold mb-2">Total Views</p>
                      <h4 className="mb-0.5 text-xl font-bold text-black md:text-title-lg">
                        {statistics?.monthly?.views == undefined ? 0 : BeautifyStatistics('number', statistics?.monthly?.views)}
                      </h4>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border border-blue-300">
                      <span className='bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center'>
                        <svg className="fill-white w-5" width="32" height="26" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" fill=""></path><path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill=""></path></svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='col-span-12 lg:col-span-6'>
                  <div className='bg-pink-50 p-6 flex justify-between items-center relative overflow-hidden'>
                    <div className='absolute w-full h-full opacity-10 z-0 bg-no-repeat transform -scale-100 bg-left top-0' style={{ backgroundImage: `url(${import.meta.env.VITE_APP_URL}/images/card-bg.png)` }}>
                    </div>
                    <div className='relative z-1'>
                      <p className="text-sm text-primary font-bold mb-2">Added to Cart</p>
                      <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                        {statistics?.monthly?.added_to_cart == undefined ? 0 : BeautifyStatistics('number', statistics?.monthly?.added_to_cart)}
                      </h4>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 border border-pink-300">
                      <span className='bg-pink-500 w-9 h-9 rounded-full flex items-center justify-center'>
                        <svg className="fill-white w-4" width="26" height="30" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z" fill=""></path><path d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z" fill=""></path><path d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z" fill=""></path></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='flex-grow mb-4 pr-6'>
            <div className="rounded-sm border border-stroke bg-white shadow-default py-6 mb-6">
              <h4 className="text-xl font-bold text-black mb-4 px-4">Most viewed products</h4>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th>
                      <p className="font-medium">Product Name</p>
                    </th>
                    <th>
                      <p className="font-medium">Type</p>
                    </th>
                    <th>
                      <p className="font-medium">Views</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    !isEmpty(statistics?.product_stats?.views) && Object.values(statistics?.product_stats?.views).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <a className="flex flex-col gap-4 sm:flex-row sm:items-center" href={`https://${item?.shop}/${item?.url}`} target="_blank">
                              <div className="h-12.5 w-12 rounded-md">
                                <img src={item?.featured_image} className='w-full h-full object-cover' alt="Product" />
                              </div>
                              <p className="text-sm font-medium text-black  min-w-40 max-w-40 line-clamp-1">
                                {item?.title}
                              </p>
                            </a>
                          </td>
                          <td>
                            <p className="text-sm font-medium text-black">{item?.type}</p>
                          </td>
                          <td>
                            <p className="text-sm font-medium text-green-600">{BeautifyStatistics('number', item?.total)}</p>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {
                isEmpty(statistics?.product_stats?.views) ? <div className='col-span-12'>
                  <p className='text-center pt-5'>No Results Found</p>
                </div> : ""
              }
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default py-6">
              <h4 className="text-xl font-bold text-black mb-4 px-4">Products most added to cart</h4>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th>
                      <p className="font-medium">Product Name</p>
                    </th>
                    <th className=''>
                      <p className="font-medium">Variants</p>
                    </th>
                    <th>
                      <p className="font-medium">Type</p>
                    </th>
                    <th>
                      <p className="font-medium">Add to Cart</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    !isEmpty(statistics?.product_stats?.added_to_cart) && Object.values(statistics?.product_stats?.added_to_cart).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <a className="flex flex-col gap-4 sm:flex-row sm:items-center" href={`https://${item?.shop}/${item?.url}`} target="_blank">
                              <div className="h-12.5 w-12 rounded-md">
                                <img src={item?.featured_image} className='w-full h-full object-cover' alt="Product" />
                              </div>
                              <p className="text-sm font-medium text-black  min-w-40 max-w-40 line-clamp-1">
                                {item?.title}
                              </p>
                            </a>
                          </td>
                          <td>
                            <div className="text-sm font-medium text-black">
                              {
                                !isEmpty(item?.variants) && Object.entries(item?.variants).map((stat, index2) => {
                                  return (
                                    <div key={index2}>
                                      {stat[0]} - <span className="text-sm font-medium text-green-600">{BeautifyStatistics('number', stat[1].length)}</span>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-medium text-black ">{item?.type}</p>
                          </td>
                          <td>
                            <p className="text-sm font-medium text-green-600">{BeautifyStatistics('number', item?.total)}</p>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {
                isEmpty(statistics?.product_stats?.added_to_cart) ? <div className='col-span-12'>
                  <p className='text-center pt-5'>No Results Found</p>
                </div> : ""
              }
            </div>
          </div>
          <div className='min-w-100 max-w-100'>
            <div className='w-full rounded-sm border border-stroke bg-primary shadow-default p-6 mb-6 bg-no-repeat bg-cover' style={{ backgroundImage: `url(${import.meta.env.VITE_APP_URL}/images/waves-card-bg.jpg)` }}>
              <h3 className='text-white font-semibold text-2xl mb-4'>Integration Guide</h3>
              <p className='text-white text-lg mb-6'>App required integration first time, if not done yet please click on integration guide</p>
              <button className='flex items-center justify-center rounded-md bg-red-600 text-white hover:bg-opacity-90 py-2 px-6 font-medium' onClick={() => EmbedAppInit()}>Integrate app</button>
            </div>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 w-full'>
              <h2 className='text-xl font-bold text-black mb-3'>How to Use</h2>
              <div className='mb-6 border border-stroke bg-stroke bg-opacity-10'>
                <div className='border-b border-stroke'>
                  <iframe width="100%" height="190" src="https://www.youtube.com/embed/Aa1I009GBhE" frameborder="0" allowfullscreen></iframe>
                </div>
                <h3 className='text-lg font-semibold text-black py-2 px-4'>How to integrate app</h3>
              </div>
              <div className='mb-6 border border-stroke bg-stroke bg-opacity-10'>
                <div className='border-b border-stroke'>
                  <iframe width="100%" height="190" src="https://www.youtube.com/embed/Aa1I009GBhE" frameborder="0" allowfullscreen></iframe>
                </div>
                <h3 className='text-lg font-semibold text-black py-2 px-4'>How to integrate app</h3>
              </div>
            </div>
          </div>
        </div>


      </div>
    </UserDashboardLayout>
  )
}