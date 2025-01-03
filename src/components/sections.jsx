import React, { useState, useEffect } from "react";
import { useNavigate, } from 'react-router-dom';
import { useRecoilState } from "recoil";

import { userStore } from '../atoms';

export const UserHeader = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
            <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4"></div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <div className="relative group">
                        <a className="flex items-center gap-4 dropdown-flag">
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black ">Thomas Anree</span>
                                <span className="block text-xs font-medium">UX Designer</span>
                            </span>

                            <span className="h-10 w-10 rounded-full">
                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                            </span>
                            <svg className="fill-current 2xl:hidden" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z" fill=""></path>
                            </svg>
                        </a>
                        <div className="hidden group-hover:flex absolute w-50 right-0 pt-3">
                            <ul className="flex flex-col w-full py-2 bg-white shadow 2xl:hidden">
                                <li className="flex"><a className="px-4 py-2 w-full text-black hover:bg-gray" onClick={() => navigate('/profile')}>My Profile</a></li>
                                <li className="flex"><a className="px-4 py-2 w-full text-black hover:bg-gray" onClick={() => navigate('/logout')}>Logout</a></li>
                            </ul>
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
        <aside className="sidebar-nav-panel">
            <div className="flex items-center justify-between gap-2 px-3 py-6.5">
                <a className="logo" onClick={() => navigate('/dashboard')}>
                    <img src={`${import.meta.env.VITE_APP_URL}/images/logo/logo.svg`}
                        alt="Logo" className="logo-full" />
                    {/* <img src={`${import.meta.env.VITE_APP_URL}/images/logo/logo-icon.svg`} alt="Logo" className="logo-icon" /> */}
                </a>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear flex-grow">
                <nav className="px-2 py-4 mt-2">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2 flex nav-label"><span>MENU</span></h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <a className="flex items-center gap-2.5 rounded py-3 font-medium text-bodydark1 hover:bg-graydark nav-link" onClick={() => navigate('/dashboard')}>
                                    <span className="min-w-5 max-w-5 nav-icon"><img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-dashboard.svg`} alt='dashboard' /></span>
                                    <span className="nav-title">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-2.5 rounded py-3 font-medium text-bodydark1 hover:bg-graydark nav-link" onClick={() => navigate('/widget')}>
                                    <span className="min-w-5 max-w-5 nav-icon"><img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-widget.svg`} alt='widget' /></span>
                                    <span className="nav-title">Widget</span>
                                </a>
                            </li>
                        </ul>

                        <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2 flex nav-label"><span>USER SETTINGS</span></h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <a className="flex items-center gap-2.5 rounded py-3 font-medium text-bodydark1 hover:bg-graydark nav-link" onClick={() => navigate('/billing')}>
                                    <span className="min-w-5 max-w-5 nav-icon"><img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-invoice.svg`} alt='billing' /></span>
                                    <span className="nav-title">Billing</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-2.5 rounded py-3 font-medium text-bodydark1 hover:bg-graydark nav-link" onClick={() => navigate('/profile')}>
                                    <span className="min-w-5 max-w-5 nav-icon"><img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-user.svg`} alt='profile' /></span>
                                    <span className="nav-title">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-2.5 rounded py-3 font-medium text-bodydark1 hover:bg-graydark nav-link" onClick={() => navigate('/logout')}>
                                    <span className="min-w-5 max-w-5 nav-icon"><img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-logout.svg`} alt='log out' /></span>
                                    <span className="nav-title">Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="mx-4 mb-6.5 w-full min-w-59 max-w-59 rounded-sm border border-strokedark bg-boxdark px-4 py-6 text-center shadow-default mt-auto flex-col nav-bottom-block">
                    <h3 className="mb-1 font-semibold text-white">Facing an Issue ?</h3>
                    <p className="mb-4 text-xs text-white">Contact our support team and the issue will be resolved within 24 hours.</p>
                    <a href={`mailto:${import.meta.env.VITE_ADMIN_EMAIL}`} className="flex items-center justify-center rounded-md bg-primary p-2 text-white hover:bg-opacity-95"> Contact Us </a>
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
                <div className="flex items-center gap-2 sm:gap-4 xl:hidden">
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

                <div className="hidden sm:flex"></div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <div className="relative">
                        <a className="flex items-center gap-4 dropdown-flag">
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black ">{user?.name}</span>
                                <span className="block text-xs font-medium">{user?.email}</span>
                            </span>

                            <span className="h-12 w-12 rounded-full">
                                <img src={`${user?.image ? `${import.meta.env.VITE_API_URL}/${user?.image}` : '/images/user/user-03.png'}`} alt="User" />
                            </span>
                        </a>
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

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear flex-grow">
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

                        <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">SETTINGS</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <a className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark" onClick={() => navigate('/admin/profile')}>
                                    <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z" fill="" />
                                        <path d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z" fill="" />
                                    </svg>
                                    <span>My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark" onClick={() => navigate('/admin/logout')}>
                                    <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z" fill="" />
                                        <path d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z" fill="" />
                                    </svg>
                                    <span>Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    )
}