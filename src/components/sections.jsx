import React, { useState, useEffect } from "react";
import { useNavigate, } from 'react-router-dom';
import { useRecoilState } from "recoil";

import { userStore } from '../atoms';

export const UserHeader = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);
    const [headerDropdown, setHeaderDropdown] = useState('');

    useEffect(() => {

    }, []);

    const manageHeaderDropdown = (value) => {
        setHeaderDropdown(value);
    }

    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1  ">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm  lg:hidden">
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out "></span>
                                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out "></span>
                                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out "></span>
                            </span>
                            <span className="du-block absolute right-0 h-full w-full rotate-45">
                                <span className="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out "></span>
                                <span className="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out "></span>
                            </span>
                        </span>
                    </button>
                    <a className="block flex-shrink-0 lg:hidden" onClick={() => navigate('/dashboard')}>
                        <img src={`${import.meta.env.VITE_APP_URL}/images/logo/logo-icon.svg`} alt="Logo" />
                    </a>
                </div>
                <div className="hidden sm:block">
                    <form action="https://formbold.com/s/unique_form_id" method="POST">
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <svg className="fill-body hover:fill-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill="" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill="" />
                                </svg>
                            </button>
                            <input type="text" placeholder="Type to search..." className="w-full bg-transparent pl-9 pr-4 focus:outline-none xl:w-125" />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li className="relative">
                            <a className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dropdown-flag" onClick={() => manageHeaderDropdown('notification')}>
                                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                                </span>

                                <svg className="fill-current duration-300 ease-in-out" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z" fill="" />
                                </svg>
                            </a>

                            <div className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default  sm:right-0 sm:w-80 ${headerDropdown === 'notification' ? '' : 'invisible'}`}>
                                <div className="px-4.5 py-3">
                                    <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
                                </div>

                                <ul className="flex h-auto flex-col overflow-y-auto">
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="relative">
                            <a className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dropdown-flag" onClick={() => manageHeaderDropdown('messages')}>
                                <span className="absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                                </span>

                                <svg className="fill-current duration-300 ease-in-out" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z" fill="" />
                                    <path d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z" fill="" />
                                    <path d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z" fill="" />
                                    <path d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z" fill="" />
                                </svg>
                            </a>

                            <div className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default  sm:right-0 sm:w-80 ${headerDropdown === 'messages' ? '' : 'invisible'}`}>
                                <div className="px-4.5 py-3">
                                    <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
                                </div>

                                <ul className="flex h-auto flex-col overflow-y-auto">
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <div className="relative">
                        <a className="flex items-center gap-4 dropdown-flag" onClick={() => manageHeaderDropdown('settings')}>
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black ">Thomas Anree</span>
                                <span className="block text-xs font-medium">UX Designer</span>
                            </span>

                            <span className="h-12 w-12 rounded-full">
                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                            </span>

                            <svg className="hidden fill-current sm:block" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z" fill="" />
                            </svg>
                        </a>

                        <div className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default  ${headerDropdown === 'settings' ? '' : 'invisible'}`}>
                            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4">
                                <li>
                                    <a onClick={() => navigate('/profile')} className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                                        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z" fill="" />
                                            <path d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z" fill="" />
                                        </svg>
                                        <span>My Profile</span>
                                    </a>
                                </li>
                            </ul>
                            <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" onClick={() => navigate('/logout')}>
                                <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z" fill="" />
                                    <path d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z" fill="" />
                                </svg>
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export const UserSidebar = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    return (
        <aside className="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear  lg:static lg:translate-x-0">
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <a className="text-2xl" onClick={() => navigate('/dashboard')}>
                    <img src={`${import.meta.env.VITE_APP_URL}/images/logo/logo.svg`} alt="Logo" />
                </a>

                <button className="block lg:hidden">
                    <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill="" />
                    </svg>
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 px-4 py-4 lg:mt-2 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">MENU</h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <a className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark" onClick={() => navigate('/dashboard')}>
                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z" fill="" />
                                        <path d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z" fill="" />
                                        <path d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z" fill="" />
                                        <path d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z" fill="" />
                                    </svg>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="mx-auto mb-10 w-full max-w-60 rounded-sm border border-strokedark bg-boxdark px-4 py-6 text-center shadow-default">
                    <h3 className="mb-1 font-semibold text-white">Facing an Issue ?</h3>
                    <p className="mb-4 text-xs text-white">Contact our support team and the issue will be resolved within 24 hours.</p>
                    <a onClick={() => navigate('/contact-us')} target="_blank" rel="nofollow" className="flex items-center justify-center rounded-md bg-primary p-2 text-white hover:bg-opacity-95"> Contact Us </a>
                </div>
            </div>
        </aside>
    )
}

export const AdminHeader = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);
    const [headerDropdown, setHeaderDropdown] = useState('');

    useEffect(() => {

    }, []);

    const manageHeaderDropdown = (value) => {
        setHeaderDropdown(value);
    }

    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1  ">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm  lg:hidden">
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out "></span>
                                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out "></span>
                                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out "></span>
                            </span>
                            <span className="du-block absolute right-0 h-full w-full rotate-45">
                                <span className="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out "></span>
                                <span className="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out "></span>
                            </span>
                        </span>
                    </button>
                    <a className="block flex-shrink-0 lg:hidden" onClick={() => navigate('/admin/dashboard')}>
                        <img src={`${import.meta.env.VITE_APP_URL}/images/logo/logo-icon.svg`} alt="Logo" />
                    </a>
                </div>
                <div className="hidden sm:block">
                    <form action="https://formbold.com/s/unique_form_id" method="POST">
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <svg className="fill-body hover:fill-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill="" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill="" />
                                </svg>
                            </button>
                            <input type="text" placeholder="Type to search..." className="w-full bg-transparent pl-9 pr-4 focus:outline-none xl:w-125" />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li className="relative">
                            <a className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dropdown-flag" onClick={() => manageHeaderDropdown('notification')}>
                                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                                </span>

                                <svg className="fill-current duration-300 ease-in-out" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z" fill="" />
                                </svg>
                            </a>

                            <div className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default  sm:right-0 sm:w-80 ${headerDropdown === 'notification' ? '' : 'invisible'}`}>
                                <div className="px-4.5 py-3">
                                    <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
                                </div>

                                <ul className="flex h-auto flex-col overflow-y-auto">
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 ">
                                            <p className="text-sm">
                                                <span className="text-black ">Edit your information in a swipe</span>
                                                Sint occaecat cupidatat non proident, sunt in culpa qui
                                                officia deserunt mollit anim.
                                            </p>
                                            <p className="text-xs">12 May, 2025</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="relative">
                            <a className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dropdown-flag" onClick={() => manageHeaderDropdown('messages')}>
                                <span className="absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                                </span>

                                <svg className="fill-current duration-300 ease-in-out" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z" fill="" />
                                    <path d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z" fill="" />
                                    <path d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z" fill="" />
                                    <path d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z" fill="" />
                                </svg>
                            </a>

                            <div className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default  sm:right-0 sm:w-80 ${headerDropdown === 'messages' ? '' : 'invisible'}`}>
                                <div className="px-4.5 py-3">
                                    <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
                                </div>

                                <ul className="flex h-auto flex-col overflow-y-auto">
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2" href="messages.html">
                                            <div className="h-12.5 w-12.5 rounded-full">
                                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-medium text-black "> Mariya Desoja </h6>
                                                <p className="text-sm">I like your confidence 💪</p>
                                                <p className="text-xs">2min ago</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <div className="relative">
                        <a className="flex items-center gap-4 dropdown-flag" onClick={() => manageHeaderDropdown('settings')}>
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black ">Thomas Anree</span>
                                <span className="block text-xs font-medium">UX Designer</span>
                            </span>

                            <span className="h-12 w-12 rounded-full">
                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                            </span>

                            <svg className="hidden fill-current sm:block" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z" fill="" />
                            </svg>
                        </a>

                        <div className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default  ${headerDropdown === 'settings' ? '' : 'invisible'}`}>
                            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4">
                                <li>
                                    <a onClick={() => navigate('/admin/profile')} className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                                        <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z" fill="" />
                                            <path d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z" fill="" />
                                        </svg>
                                        <span>My Profile</span>
                                    </a>
                                </li>
                            </ul>
                            <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" onClick={() => navigate('/admin/logout')}>
                                <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z" fill="" />
                                    <path d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z" fill="" />
                                </svg>
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export const AdminSidebar = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    return (
        <aside className="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear  lg:static lg:translate-x-0">
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <a className="text-2xl" onClick={() => navigate('/admin/dashboard')}>
                    <img src={`${import.meta.env.VITE_APP_URL}/images/logo/logo.svg`} alt="Logo" />
                </a>

                <button className="block lg:hidden">
                    <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill="" />
                    </svg>
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 px-4 py-4 lg:mt-2 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">MENU</h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <a className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark" onClick={() => navigate('/admin/dashboard')}>
                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z" fill="" />
                                        <path d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z" fill="" />
                                        <path d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z" fill="" />
                                        <path d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z" fill="" />
                                    </svg>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark" onClick={() => navigate('/admin/users')}>
                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z" fill="" />
                                        <path d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z" fill="" />
                                        <path d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z" fill="" />
                                        <path d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z" fill="" />
                                    </svg>
                                    <span>Users</span>
                                </a>
                            </li>
                            <li>
                                <a className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark" onClick={() => navigate('/admin/campaigns')}>
                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z" fill="" />
                                        <path d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z" fill="" />
                                        <path d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z" fill="" />
                                        <path d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z" fill="" />
                                    </svg>
                                    <span>Campaigns</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    )
}