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

import { successHandler, errorHandler } from "../../helpers";

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
      amount = user?.shop_details?.money_format.replace('{{amount}}', amount);
    }

    return amount;
  }

  const EmbedAppInit = () => {
    Swal.fire({
      title:"App Embed Tutorial",
      html: `
        <div>                  
          <iframe width="100%" height="562" src="https://www.youtube.com/embed/Aa1I009GBhE?autoplay=1&loop=1&controls=0&rel=0&vq=hd1080" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="mt-5">
          When you click on the I'm ready button below it will take you to the new page. Follow the steps as shown in the quick tutorial above and then close the page.
        </div>
      `,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: "I'm Ready",
      customClass: 'swal-wide',
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

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black">
          Dashboard
        </h2>
        <button className='px-6 flex items-center justify-center rounded-md bg-primary p-2 text-white hover:bg-opacity-95' onClick={() => EmbedAppInit()}>Embed App</button>
      </div>
      <div className='w-full mb-4'>
        <h2 className='text-xl font-bold text-black mb-3'>Weekly statistics</h2>
        <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-3'>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Total Views</p>
                <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                  {statistics?.weekly?.views == undefined ? 0 : BeautifyStatistics('number', statistics?.weekly?.views)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg className="fill-primary" width="32" height="26" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" fill=""></path><path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill=""></path></svg>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Added to Cart</p>
                <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                  {statistics?.weekly?.added_to_cart == undefined ? 0 : BeautifyStatistics('number', statistics?.weekly?.added_to_cart)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg className="fill-primary dark:fill-white" width="26" height="30" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z" fill=""></path><path d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z" fill=""></path><path d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z" fill=""></path></svg>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Total Conversions</p>
                <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                  {statistics?.weekly?.conversions == undefined ? 0 : BeautifyStatistics('number', statistics?.weekly?.conversions)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg className='fill-primary' width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.8752 24.65H31.5564V9.19062C31.5564 7.96875 30.5471 6.90625 29.2721 6.90625H26.4033C25.1814 6.90625 24.1189 7.91562 24.1189 9.19062V24.65H20.7189V12.1656C20.7189 10.9437 19.7096 9.88125 18.4346 9.88125H15.5658C14.3439 9.88125 13.2814 10.8906 13.2814 12.1656V24.65H9.82832V15.6187C9.82832 14.3969 8.81895 13.3344 7.54395 13.3344H4.6752C3.45332 13.3344 2.39082 14.3437 2.39082 15.6187V24.65H2.1252C1.4877 24.65 0.90332 25.1813 0.90332 25.8719C0.90332 26.5625 1.43457 27.0938 2.1252 27.0938H31.8752C32.5127 27.0938 33.0971 26.5625 33.0971 25.8719C33.0971 25.1813 32.5127 24.65 31.8752 24.65ZM4.83457 24.65V15.7781H7.4377V24.65H4.83457ZM15.6721 24.65V12.325H18.2752V24.65H15.6721ZM26.5627 24.65V9.35H29.1658V24.65H26.5627V24.65Z" fill="#3C50E0"></path></svg>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Total Revenue</p>
                <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                  {statistics?.weekly?.revenue == undefined ? 0 : BeautifyStatistics('revenue', statistics?.weekly?.revenue)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg className='fill-primary' width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.925 11.9C21.7813 11.9 18.7532 10.0938 18.7532 7.65002C18.7532 5.20627 21.7813 3.40002 25.925 3.40002C30.0688 3.40002 33.0969 5.20627 33.0969 7.65002C33.0969 10.0938 30.0688 11.9 25.925 11.9ZM25.925 5.79065C22.95 5.79065 21.1438 6.90627 21.1438 7.65002C21.1438 8.39377 22.95 9.5094 25.925 9.5094C28.9 9.5094 30.7063 8.39377 30.7063 7.65002C30.7063 6.90627 28.8469 5.79065 25.925 5.79065Z" fill="current-color"></path><path d="M25.9251 16.575C22.5782 16.575 19.922 15.4062 19.072 13.6C18.8063 13.0156 19.072 12.2719 19.6563 12.0062C20.2407 11.7406 20.9845 12.0062 21.2501 12.5906C21.622 13.3875 23.3751 14.1844 25.9782 14.1844C27.2001 14.1844 28.3157 13.9719 29.2188 13.6531C30.0157 13.3344 30.547 12.9094 30.7063 12.5375C30.9188 11.9 31.6095 11.5812 32.247 11.8469C32.8845 12.0594 33.2032 12.75 32.9376 13.3875C32.5657 14.45 31.5563 15.3531 30.0688 15.9375C28.847 16.3625 27.4126 16.575 25.9251 16.575Z" fill="current-color"></path><path d="M25.9251 21.25C22.5782 21.25 19.922 20.0813 19.072 18.275C18.8063 17.6907 19.072 16.9469 19.6563 16.6813C20.2407 16.4157 20.9845 16.6813 21.2501 17.2657C21.622 18.0625 23.3751 18.8594 25.9782 18.8594C27.2001 18.8594 28.3157 18.6469 29.2188 18.3282C30.0157 18.0094 30.547 17.5844 30.7063 17.2125C30.9188 16.575 31.6095 16.2563 32.247 16.5219C32.8845 16.7344 33.2032 17.425 32.9376 18.0625C32.5657 19.125 31.5563 20.0282 30.0688 20.6125C28.847 21.0375 27.4126 21.25 25.9251 21.25Z" fill="current-color"></path><path d="M25.9251 25.925C22.5782 25.925 19.922 24.7562 19.072 22.95C18.8063 22.3656 19.072 21.6218 19.6563 21.3562C20.2407 21.0906 20.9845 21.3562 21.2501 21.9406C21.622 22.7375 23.3751 23.5343 25.9782 23.5343C27.2001 23.5343 28.3157 23.3218 29.2188 23.0031C30.0157 22.6843 30.547 22.2593 30.7063 21.8875C30.9188 21.25 31.6095 20.9312 32.247 21.1968C32.8845 21.4093 33.2032 22.1 32.9376 22.7375C32.5657 23.8 31.5563 24.7031 30.0688 25.2875C28.847 25.7125 27.4126 25.925 25.9251 25.925Z" fill="current-color"></path><path d="M25.9251 30.6C22.5782 30.6 19.922 29.4313 19.072 27.625C18.8063 27.0406 19.072 26.2969 19.6563 26.0313C20.2407 25.7656 20.9845 26.0313 21.2501 26.6156C21.622 27.4125 23.3751 28.2094 25.9782 28.2094C27.2001 28.2094 28.3157 27.9969 29.2188 27.6781C30.0157 27.3594 30.547 26.9344 30.7063 26.5625C30.9188 25.925 31.6095 25.6063 32.247 25.8719C32.8845 26.0844 33.2032 26.775 32.9376 27.4125C32.5657 28.475 31.5563 29.3781 30.0688 29.9625C28.847 30.3875 27.4126 30.6 25.9251 30.6Z" fill="current-color"></path><path d="M8.07495 21.25C3.9312 21.25 0.903076 19.4437 0.903076 17C0.903076 14.5031 3.9312 12.75 8.07495 12.75C12.2187 12.75 15.2468 14.5563 15.2468 17C15.2468 19.4969 12.2187 21.25 8.07495 21.25ZM8.07495 15.1406C5.09995 15.1406 3.2937 16.2563 3.2937 17C3.2937 17.7437 5.09995 18.8594 8.07495 18.8594C11.05 18.8594 12.8562 17.7437 12.8562 17C12.8562 16.2563 11.05 15.1406 8.07495 15.1406Z" fill="current-color"></path><path d="M8.07498 25.925C4.72811 25.925 2.07186 24.7562 1.22186 22.95C0.956234 22.3656 1.22186 21.6218 1.80623 21.3562C2.39061 21.0906 3.13436 21.3562 3.39998 21.9406C3.77186 22.7375 5.52498 23.5343 8.12811 23.5343C9.34999 23.5343 10.4656 23.3218 11.3687 23.0031C12.1656 22.6843 12.6969 22.2593 12.8562 21.8875C13.0687 21.25 13.7594 20.9312 14.3969 21.1968C15.0344 21.4093 15.3531 22.1 15.0875 22.7375C14.7156 23.8 13.7062 24.7031 12.2187 25.2875C11.05 25.7125 9.61561 25.925 8.07498 25.925Z" fill="current-color"></path><path d="M8.07498 30.6C4.78123 30.6 2.07186 29.4313 1.22186 27.625C0.956234 27.0406 1.22186 26.2969 1.80623 26.0313C2.39061 25.7656 3.13436 26.0313 3.39998 26.6156C3.77186 27.4125 5.52498 28.2094 8.12811 28.2094C9.34999 28.2094 10.4656 27.9969 11.3687 27.6781C12.1656 27.3594 12.6969 26.9344 12.8562 26.5625C13.0687 25.925 13.7594 25.6063 14.3969 25.8719C15.0344 26.0844 15.3531 26.775 15.0875 27.4125C14.7156 28.475 13.7062 29.3781 12.2187 29.9625C11.05 30.3875 9.56249 30.6 8.07498 30.6Z" fill="current-color"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full mb-5'>
        <h2 className='text-xl font-bold text-black mb-3'>Monthly statistics</h2>
        <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-3'>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Total Views</p>
                <h4 className="mb-0.5 text-xl font-bold text-black md:text-title-lg">
                  {statistics?.monthly?.views == undefined ? 0 : BeautifyStatistics('number', statistics?.monthly?.views)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg className="fill-primary" width="32" height="26" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" fill=""></path><path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill=""></path></svg>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Added to Cart</p>
                <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                  {statistics?.monthly?.added_to_cart == undefined ? 0 : BeautifyStatistics('number', statistics?.monthly?.added_to_cart)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg className="fill-primary" width="26" height="30" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z" fill=""></path><path d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z" fill=""></path><path d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z" fill=""></path></svg>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Total Conversions</p>
                <h4 className="mb-0.5 text-xl font-bold text-black md:text-title-lg">
                  {statistics?.monthly?.conversions == undefined ? 0 : BeautifyStatistics('number', statistics?.monthly?.conversions)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-primary"><path d="M31.8752 24.65H31.5564V9.19062C31.5564 7.96875 30.5471 6.90625 29.2721 6.90625H26.4033C25.1814 6.90625 24.1189 7.91562 24.1189 9.19062V24.65H20.7189V12.1656C20.7189 10.9437 19.7096 9.88125 18.4346 9.88125H15.5658C14.3439 9.88125 13.2814 10.8906 13.2814 12.1656V24.65H9.82832V15.6187C9.82832 14.3969 8.81895 13.3344 7.54395 13.3344H4.6752C3.45332 13.3344 2.39082 14.3437 2.39082 15.6187V24.65H2.1252C1.4877 24.65 0.90332 25.1813 0.90332 25.8719C0.90332 26.5625 1.43457 27.0938 2.1252 27.0938H31.8752C32.5127 27.0938 33.0971 26.5625 33.0971 25.8719C33.0971 25.1813 32.5127 24.65 31.8752 24.65ZM4.83457 24.65V15.7781H7.4377V24.65H4.83457ZM15.6721 24.65V12.325H18.2752V24.65H15.6721ZM26.5627 24.65V9.35H29.1658V24.65H26.5627V24.65Z" fill="#3C50E0"></path></svg>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-3 mb-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default p-6 flex justify-between items-center'>
              <div>
                <p className="text-sm text-black font-medium mb-2">Total Revenue</p>
                <h4 className="mb-0.5 text-xl font-bold text-black dark:text-white md:text-title-lg">
                  {statistics?.monthly?.revenue == undefined ? 0 : BeautifyStatistics('revenue', statistics?.monthly?.revenue)}
                </h4>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2">
                <svg className='fill-primary' width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.925 11.9C21.7813 11.9 18.7532 10.0938 18.7532 7.65002C18.7532 5.20627 21.7813 3.40002 25.925 3.40002C30.0688 3.40002 33.0969 5.20627 33.0969 7.65002C33.0969 10.0938 30.0688 11.9 25.925 11.9ZM25.925 5.79065C22.95 5.79065 21.1438 6.90627 21.1438 7.65002C21.1438 8.39377 22.95 9.5094 25.925 9.5094C28.9 9.5094 30.7063 8.39377 30.7063 7.65002C30.7063 6.90627 28.8469 5.79065 25.925 5.79065Z" fill="current-color"></path><path d="M25.9251 16.575C22.5782 16.575 19.922 15.4062 19.072 13.6C18.8063 13.0156 19.072 12.2719 19.6563 12.0062C20.2407 11.7406 20.9845 12.0062 21.2501 12.5906C21.622 13.3875 23.3751 14.1844 25.9782 14.1844C27.2001 14.1844 28.3157 13.9719 29.2188 13.6531C30.0157 13.3344 30.547 12.9094 30.7063 12.5375C30.9188 11.9 31.6095 11.5812 32.247 11.8469C32.8845 12.0594 33.2032 12.75 32.9376 13.3875C32.5657 14.45 31.5563 15.3531 30.0688 15.9375C28.847 16.3625 27.4126 16.575 25.9251 16.575Z" fill="current-color"></path><path d="M25.9251 21.25C22.5782 21.25 19.922 20.0813 19.072 18.275C18.8063 17.6907 19.072 16.9469 19.6563 16.6813C20.2407 16.4157 20.9845 16.6813 21.2501 17.2657C21.622 18.0625 23.3751 18.8594 25.9782 18.8594C27.2001 18.8594 28.3157 18.6469 29.2188 18.3282C30.0157 18.0094 30.547 17.5844 30.7063 17.2125C30.9188 16.575 31.6095 16.2563 32.247 16.5219C32.8845 16.7344 33.2032 17.425 32.9376 18.0625C32.5657 19.125 31.5563 20.0282 30.0688 20.6125C28.847 21.0375 27.4126 21.25 25.9251 21.25Z" fill="current-color"></path><path d="M25.9251 25.925C22.5782 25.925 19.922 24.7562 19.072 22.95C18.8063 22.3656 19.072 21.6218 19.6563 21.3562C20.2407 21.0906 20.9845 21.3562 21.2501 21.9406C21.622 22.7375 23.3751 23.5343 25.9782 23.5343C27.2001 23.5343 28.3157 23.3218 29.2188 23.0031C30.0157 22.6843 30.547 22.2593 30.7063 21.8875C30.9188 21.25 31.6095 20.9312 32.247 21.1968C32.8845 21.4093 33.2032 22.1 32.9376 22.7375C32.5657 23.8 31.5563 24.7031 30.0688 25.2875C28.847 25.7125 27.4126 25.925 25.9251 25.925Z" fill="current-color"></path><path d="M25.9251 30.6C22.5782 30.6 19.922 29.4313 19.072 27.625C18.8063 27.0406 19.072 26.2969 19.6563 26.0313C20.2407 25.7656 20.9845 26.0313 21.2501 26.6156C21.622 27.4125 23.3751 28.2094 25.9782 28.2094C27.2001 28.2094 28.3157 27.9969 29.2188 27.6781C30.0157 27.3594 30.547 26.9344 30.7063 26.5625C30.9188 25.925 31.6095 25.6063 32.247 25.8719C32.8845 26.0844 33.2032 26.775 32.9376 27.4125C32.5657 28.475 31.5563 29.3781 30.0688 29.9625C28.847 30.3875 27.4126 30.6 25.9251 30.6Z" fill="current-color"></path><path d="M8.07495 21.25C3.9312 21.25 0.903076 19.4437 0.903076 17C0.903076 14.5031 3.9312 12.75 8.07495 12.75C12.2187 12.75 15.2468 14.5563 15.2468 17C15.2468 19.4969 12.2187 21.25 8.07495 21.25ZM8.07495 15.1406C5.09995 15.1406 3.2937 16.2563 3.2937 17C3.2937 17.7437 5.09995 18.8594 8.07495 18.8594C11.05 18.8594 12.8562 17.7437 12.8562 17C12.8562 16.2563 11.05 15.1406 8.07495 15.1406Z" fill="current-color"></path><path d="M8.07498 25.925C4.72811 25.925 2.07186 24.7562 1.22186 22.95C0.956234 22.3656 1.22186 21.6218 1.80623 21.3562C2.39061 21.0906 3.13436 21.3562 3.39998 21.9406C3.77186 22.7375 5.52498 23.5343 8.12811 23.5343C9.34999 23.5343 10.4656 23.3218 11.3687 23.0031C12.1656 22.6843 12.6969 22.2593 12.8562 21.8875C13.0687 21.25 13.7594 20.9312 14.3969 21.1968C15.0344 21.4093 15.3531 22.1 15.0875 22.7375C14.7156 23.8 13.7062 24.7031 12.2187 25.2875C11.05 25.7125 9.61561 25.925 8.07498 25.925Z" fill="current-color"></path><path d="M8.07498 30.6C4.78123 30.6 2.07186 29.4313 1.22186 27.625C0.956234 27.0406 1.22186 26.2969 1.80623 26.0313C2.39061 25.7656 3.13436 26.0313 3.39998 26.6156C3.77186 27.4125 5.52498 28.2094 8.12811 28.2094C9.34999 28.2094 10.4656 27.9969 11.3687 27.6781C12.1656 27.3594 12.6969 26.9344 12.8562 26.5625C13.0687 25.925 13.7594 25.6063 14.3969 25.8719C15.0344 26.0844 15.3531 26.775 15.0875 27.4125C14.7156 28.475 13.7062 29.3781 12.2187 29.9625C11.05 30.3875 9.56249 30.6 8.07498 30.6Z" fill="current-color"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 pb-8'>
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default py-6">
            <h4 className="text-xl font-bold text-black mb-6 px-4">Products that generated the most revenue</h4>
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
                    <p className="font-medium">Revenue</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  !isEmpty(statistics?.product_stats?.conversions) && Object.values(statistics?.product_stats?.conversions).map((item, index) => {
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
                                    {stat[0]} - <span className="text-sm font-medium text-green-600">{BeautifyStatistics('revenue', sumBy(stat[1], function (o) { return parseFloat(o.revenue.$numberDecimal) }))}</span>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </td>
                        <td>
                          <p className="text-sm font-medium text-black dark:text-white">{item?.type}</p>
                        </td>
                        <td>
                          <p className="text-sm font-medium text-green-600">
                            {BeautifyStatistics('revenue', item?.total_revenue)}
                          </p>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
            {
              isEmpty(statistics?.product_stats?.conversions) ? <div className='col-span-12'>
                <p className='text-center pt-5'>No Results Found</p>
              </div> : ""
            }
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default py-6">
            <h4 className="text-xl font-bold text-black mb-6 px-4">Products with the most conversions</h4>
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
                    <p className="font-medium">Conversions</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  !isEmpty(statistics?.product_stats?.conversions) && Object.values(statistics?.product_stats?.conversions).map((item, index) => {
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
                          <div className="text-sm font-medium text-black dark:text-white">
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
              isEmpty(statistics?.product_stats?.conversions) ? <div className='col-span-12'>
                <p className='text-center pt-5'>No Results Found</p>
              </div> : ""
            }
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default py-6">
            <h4 className="text-xl font-bold text-black mb-6 px-4">Most viewed products</h4>
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
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default py-6">
            <h4 className="text-xl font-bold text-black mb-6 px-4">Products most added to cart</h4>
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
      </div>
    </UserDashboardLayout>
  )
}