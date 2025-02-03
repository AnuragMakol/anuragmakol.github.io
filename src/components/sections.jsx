import React, { useState, useEffect } from "react";
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { subscribeForm } from "../api";

export const Header = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        HeaderVisibility();

        if(location.hash !== "") {
            ManageScroll(location.hash.replace('#', ''));
        }
    }, []);

    function ManageScroll(to) {
        let element = document.getElementById(to);

        if (element === null) {
            navigate(`/#${to}`);
        } else {
            let position = element.getBoundingClientRect();
            window.scrollTo({
                top: position.top + window.scrollY - 80,
                left: position.left,
                behavior: 'smooth'
            })
        }
    }

    function HeaderVisibility() {
        document.addEventListener("scroll", () => {
            let actual_height =
                document.body.offsetHeight || document.body.clientHeight;
            let scrolledHeight = window.scrollY;
            let height_threshold =
                (parseFloat(actual_height) * parseFloat(4)) / 100;

            if (scrolledHeight >= height_threshold) {
                document
                    .getElementsByTagName("header")[0]
                    .classList.add(`bg-black`);
            } else {
                document
                    .getElementsByTagName("header")[0]
                    .classList.remove(`bg-black`);
            }
        });
    }

    return (
        <header className="fixed w-full top-0 z-50">
            <nav>
                <div className="container">
                    <div className="relative flex h-24 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                                </svg>
                                <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <a href="/" className="w-36 flex">
                                    <img src={`${import.meta.env.VITE_APP_URL}/logo.svg`} alt="app vertix" />
                                </a>
                            </div>
                            <div className="hidden sm:mx-auto sm:block">
                                <div className="flex space-x-4">
                                <a onClick={() => ManageScroll('home')} className="px-3 py-2 font-semibold text-sm text-white uppercase" aria-current="page">Home</a>
                                    <a onClick={() => ManageScroll('about')} className="px-3 py-2 font-semibold text-sm text-white uppercase" aria-current="page">About</a>
                                    <a onClick={() => ManageScroll('portfolio')} className="px-3 py-2 font-semibold text-sm text-white uppercase">Portfolio</a>
                                    <a onClick={() => ManageScroll('services')} className="px-3 py-2 font-semibold text-sm text-white uppercase">Services</a>
                                    <div className="relative group">
                                        <a className="px-3 py-2 font-semibold text-sm text-white uppercase relative flex">Our Apps </a>
                                        <div className="absolute left-4 top-0 pt-10 hidden group-hover:flex">
                                            <div className="bg-white py-2 rounded-md w-[180px] shadow">
                                                <a href="/cartplus" className="block cursor-pointer font-medium px-4 py-2 hover:bg-gray-100">CartPlus</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3">
                                <div>
                                    <a onClick={() => ManageScroll('contact')} type="button" className="btn btn-primary uppercase font-semibold text-sm group">
                                        <span>Contact Us</span>
                                        <span className="ml-1 transfrom transition-all group-hover:rotate-45">
                                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                <path d="M16.8569 9.67962L8.24994 18.2866L6.83594 16.8726L15.4419 8.26562H7.85694V6.26562H18.8569V17.2656H16.8569V9.67962Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export const Footer = (props) => {
    const navigate = useNavigate();
    const [showAlert, setAlert] = useState(false);

    const { register: registerSubscribeForm, handleSubmit: handleSubmitSubscribeForm, reset: resetSubscribeForm } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                email: yup.string().email().required()
            })
        )
    });

    const onSubmitSubscribeForm = (form) => {
        initSubscribeForm(form);
    }

    const { mutate: initSubscribeForm } = useMutation(subscribeForm, {
        onSuccess: (result) => {
            setAlert(true);
            resetSubscribeForm();

            setTimeout(() => {
                setAlert(false)
            }, 4000);
        }
    });

    return (
        <div className="w-full bg-black text-white pt-20 pb-10">
            <div className="container">
                <div className="grid grid-cols-4 gap-6 mb-16">
                    <div>
                        <a href="/" className="text-gray-50 hover:text-gray-200 max-w-[150px] flex mb-6">
                            <img src={`${import.meta.env.VITE_APP_URL}/logo-primary.svg`} alt="app vertix" className="max-w-full" />
                        </a>
                        <p className="mb-6"> Elevating businesses with AI-driven software, web, and mobile solutions. </p>
                        <a href={`mailto:${import.meta.env.VITE_INFO_EMAIL}`} className="text-gray-50 hover:text-gray-200 font-bold text-xl flex mb-7">{import.meta.env.VITE_INFO_EMAIL}</a>
                        <div className="flex">
                            <a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
                                <svg aria-hidden="true" className="text-white w-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" fill="currentColor"></path>
                                </svg>
                            </a>
                            <a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
                                <svg aria-hidden="true" className="text-white w-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" fill="currentColor"></path>
                                </svg>
                            </a>
                            <a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
                                <svg aria-hidden="true" className="text-white w-4" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" fill="currentColor"></path>
                                </svg>
                            </a>
                            <a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
                                <svg aria-hidden="true" className="text-white w-4" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="currentColor"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-xl font-bold mb-5">Useful Links</h5>
                        <ul>
                            <li className="mb-2">
                                <a href="/terms" className="text-gray-50 hover:text-gray-200">Terms & Conditions</a>
                            </li>
                            <li className="mb-2">
                                <a href="/privacy" className="text-gray-50 hover:text-gray-200">Privacy</a>
                            </li>
                        </ul>
                    </div>
                    {/* <div>
				<h5 className="text-xl font-bold mb-5">Our Services</h5>
				<ul>
					<li className="mb-2">
						<a href="/about" className="text-gray-50 hover:text-gray-200">Mobile App Development</a>
					</li>
					<li className="mb-2">
						<a href="/terms" className="text-gray-50 hover:text-gray-200">Software Development</a>
					</li>
					<li className="mb-2">
						<a href="/privacy" className="text-gray-50 hover:text-gray-200">Cloud Maneged Services</a>
					</li>
					<li className="mb-2">
						<a href="/contact" className="text-gray-50 hover:text-gray-200">Ideation And Design Strategy</a>
					</li>
					<li className="mb-2">
						<a href="/contact" className="text-gray-50 hover:text-gray-200">IT Consulting</a>
					</li>
					<li className="mb-2">
						<a href="/contact" className="text-gray-50 hover:text-gray-200">Dev Ops</a>
					</li>
					<li className="mb-2">
						<a href="/contact" className="text-gray-50 hover:text-gray-200">Digital Transformation</a>
					</li>
				</ul>
			</div> */}
                    <div>
                        <h5 className="text-xl font-bold mb-5">Our Apps</h5>
                        <ul>
                            <li className="mb-2">
                                <a href="/cartplus" className="text-gray-50 hover:text-gray-200">CartPlus</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-xl font-bold mb-5">Subscribe Us</h5>
                        <div className="subscribtion-area">
                            <p className="mb-4">
                                Subscribe our newsletter for future updates.
                            </p>
                            <form onSubmit={handleSubmitSubscribeForm(onSubmitSubscribeForm)} className="bg-gray-800 p-2 rounded flex">
                                <input id="email" type="email" placeholder="Enter your email..." className="px-3 py-1.5 flex-grow mr-2" {...registerSubscribeForm('email')} required />
                                <label htmlFor="email"><i className="fa-regular fa-envelope"></i></label>
                                <button type="submit" className="uppercase text-xs font-bold btn btn-secondary">Subscribe</button>
                            </form>
                            {showAlert ? <div>Submitted</div> : ""}
                        </div>
                    </div>
                </div>
                {/* <div className="border border-gray-700 rounded-2xl px-6 py-8 flex items-center justify-between">
			<a href="/" className="text-gray-50 hover:text-gray-200 max-w-[150px] flex">
				<img src={`${import.meta.env.VITE_APP_URL}/logo-primary.svg`} alt="app vertix" className="max-w-full" />
			</a>
			<a href="/" className="text-gray-50 hover:text-gray-200 font-bold text-xl">
                {import.meta.env.VITE_INFO_EMAIL}
			</a>
			<div className="flex">
				<a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
					<svg aria-hidden="true" className="text-white w-4" viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
							fill="currentColor"></path>
					</svg>
				</a>
				<a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
					<svg aria-hidden="true" className="text-white w-4" viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
							fill="currentColor"></path>
					</svg></a>
				<a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
					<svg aria-hidden="true" className="text-white w-4" viewBox="0 0 448 512"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
							fill="currentColor"></path>
					</svg>
				</a>
				<a href="/" className="text-gray-50 hover:opacity-70 font-bold text-xl mx-2.5">
					<svg aria-hidden="true" className="text-white w-4" viewBox="0 0 448 512"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
							fill="currentColor"></path>
					</svg>
				</a>
			</div>
		</div> */}
                <div className="pt-6 flex justify-center">
                    <p>
                        {new Date().getFullYear()} © All rights reserved. 
                    </p>
                </div>
            </div>
        </div>
    )
}