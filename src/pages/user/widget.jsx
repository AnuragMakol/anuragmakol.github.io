import React, { useState, useEffect } from 'react';
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
import { updateWidgetTemplate, resetScriptTag, fetchTemplateStyle } from '../../api';
import { successHandler, errorHandler } from "../../helpers";

export function Widget(props) {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);
    const [deviceToggle, setDeviceToggle] = useState('desktop');
    const [widgetTemplate, setWidgetTemplate] = useState('');
    const [widgetStyle, setWidgetStyle] = useState('');
    const [widgetPosition, setWidgetPosition] = useState('');
    const [widgetWidth, setWidgetWidth] = useState('');
    const [widgetElements, setWidgetElements] = useState('');
    const [templateStyle, setTemplateStyle] = useState('');

    useEffect(() => {
        setValueUpdateWidgetTemplate('widget_template', user?.widget_settings?.widget_template);
        setValueUpdateWidgetTemplate('widget_style', user?.widget_settings?.widget_style);
        setValueUpdateWidgetTemplate('widget_position', user?.widget_settings?.widget_position);
        setValueUpdateWidgetTemplate('widget_width', user?.widget_settings?.widget_width);
        setValueUpdateWidgetTemplate('widget_status', user?.widget_settings?.widget_status);

        setValueUpdateWidgetTemplate('desktop_hide_image', user?.widget_settings?.desktop_hide_image);
        setValueUpdateWidgetTemplate('desktop_hide_title', user?.widget_settings?.desktop_hide_title);
        setValueUpdateWidgetTemplate('desktop_hide_compare_price', user?.widget_settings?.desktop_hide_compare_price);
        setValueUpdateWidgetTemplate('desktop_hide_offer_price', user?.widget_settings?.desktop_hide_offer_price);
        setValueUpdateWidgetTemplate('mobile_hide_image', user?.widget_settings?.mobile_hide_image);
        setValueUpdateWidgetTemplate('mobile_hide_title', user?.widget_settings?.mobile_hide_title);
        setValueUpdateWidgetTemplate('mobile_hide_compare_price', user?.widget_settings?.mobile_hide_compare_price);
        setValueUpdateWidgetTemplate('mobile_hide_sale_price', user?.widget_settings?.mobile_hide_sale_price);

        // Customizations
        setValueUpdateWidgetTemplate('product_image_size', user?.widget_settings?.product_image_size);
        setValueUpdateWidgetTemplate('product_image_style', user?.widget_settings?.product_image_style);
        setValueUpdateWidgetTemplate('product_title_size', user?.widget_settings?.product_title_size);
        setValueUpdateWidgetTemplate('product_title_color', user?.widget_settings?.product_title_color);
        setValueUpdateWidgetTemplate('option_selector_style', user?.widget_settings?.option_selector_style);
        setValueUpdateWidgetTemplate('option_selector_text_size', user?.widget_settings?.option_selector_text_size);
        setValueUpdateWidgetTemplate('option_selector_text_color', user?.widget_settings?.option_selector_text_color);
        setValueUpdateWidgetTemplate('compare_price_text_size', user?.widget_settings?.compare_price_text_size);
        setValueUpdateWidgetTemplate('compare_price_text_color', user?.widget_settings?.compare_price_text_color);
        setValueUpdateWidgetTemplate('offer_price_text_size', user?.widget_settings?.offer_price_text_size);
        setValueUpdateWidgetTemplate('offer_price_text_color', user?.widget_settings?.offer_price_text_color);
        setValueUpdateWidgetTemplate('add_to_cart_button_text_size', user?.widget_settings?.add_to_cart_button_text_size);
        setValueUpdateWidgetTemplate('add_to_cart_button_text_color', user?.widget_settings?.add_to_cart_button_text_color);
        setValueUpdateWidgetTemplate('add_to_cart_button_background_color', user?.widget_settings?.add_to_cart_button_background_color);
        setValueUpdateWidgetTemplate('add_to_cart_button_style', user?.widget_settings?.add_to_cart_button_style);
        setValueUpdateWidgetTemplate('add_to_cart_button_border_width', user?.widget_settings?.add_to_cart_button_border_width);
        setValueUpdateWidgetTemplate('add_to_cart_button_border_color', user?.widget_settings?.add_to_cart_button_border_color);

        let elementsData = '';
        if (user?.widget_settings?.desktop_hide_image === true) {
            elementsData = `${elementsData}di`;
        }
        if (user?.widget_settings?.desktop_hide_title === true) {
            elementsData = `${elementsData}dt`;
        }
        if (user?.widget_settings?.desktop_hide_compare_price === true) {
            elementsData = `${elementsData}dc`;
        }
        if (user?.widget_settings?.desktop_hide_offer_price === true) {
            elementsData = `${elementsData}ds`;
        }
        if (user?.widget_settings?.mobile_hide_image === true) {
            elementsData = `${elementsData}mi`;
        }
        if (user?.widget_settings?.mobile_hide_title === true) {
            elementsData = `${elementsData}mt`;
        }
        if (user?.widget_settings?.mobile_hide_compare_price === true) {
            elementsData = `${elementsData}mc`;
        }
        if (user?.widget_settings?.mobile_hide_sale_price === true) {
            elementsData = `${elementsData}ms`;
        }

        manageWidgetSettings('template', user?.widget_settings?.widget_template);
        manageWidgetSettings('style', user?.widget_settings?.widget_style);
        manageWidgetSettings('position', user?.widget_settings?.widget_position);
        manageWidgetSettings('width', user?.widget_settings?.widget_width);
        manageWidgetSettings('elements', elementsData);
    }, []);

    const { register: registerUpdateWidgetTemplate, handleSubmit: handleUpdateWidgetTemplate, formState: { errors: errorsUpdateWidgetTemplate }, setValue: setValueUpdateWidgetTemplate, reset: resetUpdateWidgetTemplate, getValues: getValuesUpdateWidgetTemplate } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_style: yup.string().required(),
                widget_position: yup.string().required(),
                widget_width: yup.string().required(),
                desktop_hide_image: yup.boolean(),
                desktop_hide_title: yup.boolean(),
                desktop_hide_compare_price: yup.boolean(),
                desktop_hide_offer_price: yup.boolean(),
                mobile_hide_image: yup.boolean(),
                mobile_hide_title: yup.boolean(),
                mobile_hide_compare_price: yup.boolean(),
                mobile_hide_sale_price: yup.boolean(),
                product_image_size: yup.string(),
                product_image_style: yup.string(),
                product_title_size: yup.string(),
                product_title_color: yup.string(),
                option_selector_style: yup.string(),
                option_selector_text_size: yup.string(),
                option_selector_text_color: yup.string(),
                compare_price_text_size: yup.string(),
                compare_price_text_color: yup.string(),
                offer_price_text_size: yup.string(),
                offer_price_text_color: yup.string(),
                add_to_cart_button_text_size: yup.string(),
                add_to_cart_button_text_color: yup.string(),
                add_to_cart_button_background_color: yup.string(),
                add_to_cart_button_style: yup.string(),
                add_to_cart_button_border_width: yup.string(),
                add_to_cart_button_border_color: yup.string()
            })
        )
    });

    const onSubmitUpdateWidgetTemplate = (form) => {
        initUpdateWidgetTemplate(form);
    }

    const { mutate: initUpdateWidgetTemplate, isLoading: loadingUpdateWidgetTemplate } = useMutation(updateWidgetTemplate, {
        onSuccess: (result) => {
            successHandler(result);
            setUser(result.data);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const { mutate: initResetScriptTag } = useMutation(resetScriptTag, {
        onSuccess: (result) => {
            successHandler(result);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const { mutate: initFetchTemplateStyle } = useMutation(fetchTemplateStyle, {
        onSuccess: (result) => {
            successHandler(result);
            setTemplateStyle(result.data);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const manageWidgetSettings = (type, value) => {
        if (type === "template") {
            let widgetData = getValuesUpdateWidgetTemplate('widget_style');

            initFetchTemplateStyle({
                template: value,
                style: widgetData
            });

            setWidgetTemplate(value);
            setWidgetStyle(widgetData);
        }

        if (type === "style") {
            let widgetData = getValuesUpdateWidgetTemplate('widget_template');

            initFetchTemplateStyle({
                template: widgetData,
                style: value
            });

            setWidgetTemplate(widgetData);
            setWidgetStyle(value);
        }

        if (type === "position") {
            let positioning_classes = '';

            if (value === "top") {
                positioning_classes = "asbw-fixed-d-top";
            } else if (value === "bottom") {
                positioning_classes = "asbw-fixed-d-bottom";
            }

            setWidgetPosition(positioning_classes);
        }

        if (type === "width") {
            let positioning_classes = '';

            if (value === "boxed") {
                positioning_classes = "asbw-boxed";
            } else {
                positioning_classes = ""
            }

            setWidgetWidth(positioning_classes);
        }

        if (type === "elements") {
            setWidgetElements(value);
        }
    }

    const manageElementsStatus = (type, value) => {
        let elementsData = widgetElements;
        if (type === "desktop_hide_image") {
            elementsData = value ? `${elementsData}di` : elementsData.replace('di', '');
        }
        if (type === "desktop_hide_title") {
            elementsData = value ? `${elementsData}dt` : elementsData.replace('dt', '');
        }
        if (type === "desktop_hide_compare_price") {
            elementsData = value ? `${elementsData}dc` : elementsData.replace('dc', '');
        }
        if (type === "desktop_hide_offer_price") {
            elementsData = value ? `${elementsData}ds` : elementsData.replace('ds', '');
        }
        if (type === "mobile_hide_image") {
            elementsData = value ? `${elementsData}mi` : elementsData.replace('mi', '');
        }
        if (type === "mobile_hide_title") {
            elementsData = value ? `${elementsData}mt` : elementsData.replace('mt', '');
        }
        if (type === "mobile_hide_compare_price") {
            elementsData = value ? `${elementsData}mc` : elementsData.replace('mc', '');
        }
        if (type === "mobile_hide_sale_price") {
            elementsData = value ? `${elementsData}ms` : elementsData.replace('ms', '');
        }

        manageWidgetSettings('elements', elementsData);
    }

    return (
        <UserDashboardLayout props={props}>
            <Loader loading={loadingUpdateWidgetTemplate} />

            <div className="mb-6 flex justify-between">
                <h2 className="text-title-md2 font-bold text-black">
                    Widget Settings
                </h2>
                <div className='flex items-center'>
                    <button className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={() => {
                        Swal.fire({
                            title: "Are you sure?",
                            html: "This will reset the sticky add to cart widget integration with your store. <br /> <br /> Use this function only when you are not able to see the sticky widget on your store after installing the app and customizing the widget for your store.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: "No"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                initResetScriptTag({});
                            }
                        });
                    }}>Reset Integration</button>
                    <span className='w-6 h-6 ml-2 cursor-pointer'>
                        <img src={`${import.meta.env.VITE_APP_URL}/images/icon/info-circle-solid.svg`} alt='info' />
                    </span>
                </div>
            </div>

            <div className='mb-6 flex justify-between'>
                <div className='w-95 min-w-95'>
                    <div className="rounded-sm border border-stroke bg-white shadow mb-2">
                        <div className="border-b border-stroke px-6 py-4">
                            <h3 className="font-medium text-black">
                                <span>Customizer</span>
                            </h3>
                        </div>

                        <div className="py-4 px-6">
                            <form onSubmit={handleUpdateWidgetTemplate(onSubmitUpdateWidgetTemplate)}>
                                <div className='flex items-center justify-between rounded mb-5'>
                                    <label className="font-medium text-graydark flex items-center">Show Widget
                                        <span className='w-4.5 h-4.5 ml-2 cursor-pointer opacity-70'>
                                            <img src={`${import.meta.env.VITE_APP_URL}/images/icon/info-circle-solid.svg`} alt='info' />
                                        </span>
                                    </label>
                                    <label class="relative inline-block w-15 h-8 switch-slider-wrap">
                                        <input type="checkbox" className="sr-only" {...registerUpdateWidgetTemplate('widget_status')} />
                                        <span class="absolute cursor-pointer inset-0 bg-red-600 ring-1 ring-red-700 transition-all slider rounded-full flex items-center">
                                            <span className='status-text active text-white font-medium text-xs mr-8.5'>Yes</span>
                                            <span className='status-text inactive text-white font-medium text-xs mr-2.5 ml-auto'>No</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="mb-3 flex items-center">
                                    <label className="mb-1.5 block font-medium text-graydark w-22">Template</label>
                                    <div className="relative z-20 bg-white w-44 ml-auto">
                                        <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('widget_template')} onChange={(e) => manageWidgetSettings('template', e.target.value)}>
                                            <option value="t1">Template 1</option>
                                            <option value="t2">Template 2</option>
                                            <option value="t3">Template 3</option>
                                        </select>
                                        <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate?.widget_template && <span className="text-danger text-sm text-bold">Please select a template</span>}
                                    </div>
                                </div>
                                <div className="mb-2 flex items-center">
                                    <label className="mb-1.5 block font-medium text-graydark w-22">Style</label>
                                    <div className="relative z-20 bg-white w-44 ml-auto">
                                        <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('widget_style')} onChange={(e) => manageWidgetSettings('style', e.target.value)}>
                                            <option value="s1">Style 1</option>
                                            <option value="s2">Style 2</option>
                                            <option value="s3">Style 3</option>
                                            <option value="s4">Style 4</option>
                                            <option value="s5">Style 5</option>
                                            <option value="s6">Style 6</option>
                                        </select>
                                        <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate?.widget_style && <span className="text-danger text-sm text-bold">Please select a style</span>}
                                    </div>
                                </div>
                                <div className='border border-yellow-300 bg-yellow-50 bg-opacity-30 p-4 mt-6 mb-4'>
                                    <h4 className='font-bold text-graydark mb-4'>Advanced Settings</h4>
                                    <div className="mb-3 flex items-center">
                                        <label className="text-sm font-medium text-black">Image Size</label>
                                        <div className="relative z-20 bg-white w-36 ml-auto">
                                            <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('product_image_size')}>
                                                <option value="">Select Size</option>
                                                <option value="32">32px x 32px</option>
                                                <option value="48">48px x 48px</option>
                                                <option value="64">64px x 64px</option>
                                                <option value="128">128px x 128px</option>
                                            </select>
                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-3 flex items-center">
                                        <label className="text-sm font-medium text-black">Title Font Size</label>
                                        <div className="relative z-20 bg-white w-36 ml-auto">
                                            <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('product_title_size')}>
                                                <option value="">Select Size</option>
                                                <option value="12">12px</option>
                                                <option value="14">14px</option>
                                                <option value="16">16px</option>
                                                <option value="18">18px</option>
                                                <option value="20">20px</option>
                                                <option value="22">22px</option>
                                                <option value="24">24px</option>
                                            </select>
                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-3 flex items-center">
                                        <label className="text-sm font-medium text-black">Compare Price Size
                                        </label>
                                        <div className="relative z-20 bg-white w-36 ml-auto">
                                            <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('compare_price_text_size')}>
                                                <option value="">Select Size</option>
                                                <option value="12">12px</option>
                                                <option value="14">14px</option>
                                                <option value="16">16px</option>
                                                <option value="18">18px</option>
                                                <option value="20">20px</option>
                                                <option value="22">22px</option>
                                                <option value="24">24px</option>
                                            </select>
                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-5 flex items-center">
                                        <label className="text-sm font-medium text-black">Offer Price Size
                                        </label>
                                        <div className="relative z-20 bg-white w-36 ml-auto">
                                            <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('offer_price_text_size')}>
                                                <option value="">Select Size</option>
                                                <option value="12">12px</option>
                                                <option value="14">14px</option>
                                                <option value="16">16px</option>
                                                <option value="18">18px</option>
                                                <option value="20">20px</option>
                                                <option value="22">22px</option>
                                                <option value="24">24px</option>
                                            </select>
                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='mb-3 flex flex-wrap'>
                                        <div className="mb-3 w-1/2">
                                            <label className="mb-1 block text-sm font-medium text-black">Background Color</label>
                                            <input type="color" {...registerUpdateWidgetTemplate('product_title_color')} />
                                        </div>
                                        <div className="mb-3 w-1/2">
                                            <label className="mb-1 block text-sm font-medium text-black">Title Color</label>
                                            <input type="color" {...registerUpdateWidgetTemplate('product_title_color')} />
                                        </div>
                                    </div>
                                    <div className='mb-3 flex flex-wrap'>
                                        <div className="mb-3 w-1/2">
                                            <label className="mb-1 block text-sm font-medium text-black"> Compare Price Color
                                            </label>
                                            <input type="color" {...registerUpdateWidgetTemplate('compare_price_text_color')} />
                                        </div>
                                        <div className="mb-3 w-1/2">
                                            <label className="mb-1 block text-sm font-medium text-black">Offer Price Color
                                            </label>
                                            <input type="color" {...registerUpdateWidgetTemplate('offer_price_text_color')} />
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap'>
                                        <div className="w-1/2">
                                            <label className="mb-1 block text-sm font-medium text-black">Button Color</label>
                                            <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_background_color')} />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="mb-1 block text-sm font-medium text-black">Button Text Color</label>
                                            <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_text_color')} />
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="font-medium text-graydark w-22">Position</label>
                                    <div className="relative z-20 flex py-2 w-44 ml-auto">
                                        <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                            <input type="radio" {...registerUpdateWidgetTemplate('widget_position')} value="top" onChange={(e) => manageWidgetSettings('position', e.target.value)} />
                                            <span className="ml-2">Top</span>
                                        </label>
                                        <label className="flex cursor-pointer select-none items-center text-sm font-medium ml-6">
                                            <input type="radio" {...registerUpdateWidgetTemplate('widget_position')} value="bottom" onChange={(e) => manageWidgetSettings('position', e.target.value)} />
                                            <span className="ml-2">Bottom</span>
                                        </label>
                                        {errorsUpdateWidgetTemplate?.widget_position && <span className="text-danger text-sm text-bold">Please select a position</span>}
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="mb-1.5 font-medium text-graydark w-22 flex items-center">Width
                                        <span className='w-4.5 h-4.5 ml-2 cursor-pointer opacity-70'>
                                            <img src={`${import.meta.env.VITE_APP_URL}/images/icon/info-circle-solid.svg`} alt='info' />
                                        </span>
                                    </label>
                                    <div className="relative z-20 flex py-2 w-44 ml-auto">
                                        <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                            <input type="radio" {...registerUpdateWidgetTemplate('widget_width')} value="fullwidth" onChange={(e) => manageWidgetSettings('width', e.target.value)} />
                                            <span className="ml-2">Full Width</span>
                                        </label>
                                        <label className="flex cursor-pointer select-none items-center text-sm font-medium ml-6">
                                            <input type="radio" {...registerUpdateWidgetTemplate('widget_width')} value="boxed" onChange={(e) => manageWidgetSettings('width', e.target.value)} />
                                            <span className="ml-2">Boxed</span>
                                        </label>
                                        {errorsUpdateWidgetTemplate?.widget_width && <span className="text-danger text-sm text-bold">Please select a width</span>}
                                    </div>
                                </div>
                                <div className="mb-6 gap-25 justify-between border-t border-stroke pt-6">
                                    {/* <label className="mb-1.5 block font-medium text-graydark">Elements</label> */}
                                    <div className='flex border border-stroke shadow-sm mb-5 rounded overflow-hidden'>
                                        <div className={`px-4 py-2 cursor-pointer flex-grow text-center font-medium ${deviceToggle === "desktop" ? "bg-primary text-white" : ""}`} onClick={() => setDeviceToggle('desktop')}>Desktop</div>
                                        <div className={`px-4 py-2 cursor-pointer flex-grow text-center font-medium ${deviceToggle === "mobile" ? "bg-primary text-white" : ""}`} onClick={() => setDeviceToggle('mobile')}>Mobile</div>
                                    </div>
                                    <div className={`${deviceToggle === "desktop" ? "transition-opacity ease-in-out delay-200 opacity-100 h-auto" : "h-0 opacity-0"}`}>
                                        <div className="relative z-20 bg-white flex flex-wrap">
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_image')} onChange={(e) => {
                                                        manageElementsStatus('desktop_hide_image', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Image</span>
                                                </label>
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_title')} onChange={(e) => {
                                                        manageElementsStatus('desktop_hide_title', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Title</span>
                                                </label>
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_compare_price')} onChange={(e) => {
                                                        manageElementsStatus('desktop_hide_compare_price', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Compare Price</span>
                                                </label>
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_offer_price')} onChange={(e) => {
                                                        manageElementsStatus('desktop_hide_offer_price', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Offer Price</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${deviceToggle === "mobile" ? "transition-opacity ease-in-out delay-200 opacity-100 h-auto" : "h-0 opacity-0"}`}>
                                        <div className="relative z-20 bg-white flex flex-wrap">
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_image')} onChange={(e) => {
                                                        manageElementsStatus('mobile_hide_image', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Image</span>
                                                </label>
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_title')} onChange={(e) => {
                                                        manageElementsStatus('mobile_hide_title', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Title</span>
                                                </label>
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_compare_price')} onChange={(e) => {
                                                        manageElementsStatus('mobile_hide_compare_price', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Compare Price</span>
                                                </label>
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_sale_price')} onChange={(e) => {
                                                        manageElementsStatus('mobile_hide_sale_price', e.target.checked);
                                                    }} />
                                                    <span className="ml-2">Hide Offer Price</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end space-x-2">
                                    <a className="flex justify-center rounded bg-black bg-opacity-10 px-6 py-2 font-medium text-graydark hover:bg-opacity-90" onClick={() => {
                                        let currentFormValues = getValuesUpdateWidgetTemplate();
                                        resetUpdateWidgetTemplate();

                                        setValueUpdateWidgetTemplate('widget_template', currentFormValues?.widget_template);
                                        setValueUpdateWidgetTemplate('widget_position', currentFormValues?.widget_position);
                                    }}>
                                        Reset
                                    </a>
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* {
                        user?.plan_details !== undefined ? */}
                    {/* <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-6 py-4">
                            <h3 className="font-medium text-black">
                                <span>Customization Options</span>
                            </h3>
                        </div>
                        <div className="py-4 px-6">
                            <form onSubmit={handleUpdateWidgetTemplate(onSubmitUpdateWidgetTemplate)}>
                                <div className="mb-3 flex items-center">
                                    <label className="mb-3 block text-sm font-medium text-black">Image Size</label>
                                    <div className="relative z-20 bg-white w-44 ml-auto">
                                        <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('product_image_size')}>
                                            <option value="">Select Size</option>
                                            <option value="32">32px x 32px</option>
                                            <option value="48">48px x 48px</option>
                                            <option value="64">64px x 64px</option>
                                            <option value="128">128px x 128px</option>
                                        </select>
                                        <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-3 flex items-center">
                                    <label className="text-sm font-medium text-black">Title Font Size</label>
                                    <div className="relative z-20 bg-white w-44 ml-auto">
                                        <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('product_title_size')}>
                                            <option value="">Select Size</option>
                                            <option value="12">12px</option>
                                            <option value="14">14px</option>
                                            <option value="16">16px</option>
                                            <option value="18">18px</option>
                                            <option value="20">20px</option>
                                            <option value="22">22px</option>
                                            <option value="24">24px</option>
                                        </select>
                                        <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3 flex items-center">
                                    <label className="text-sm font-medium text-black">Compare Price Text Size
                                    </label>
                                    <div className="relative z-20 bg-white w-44 ml-auto">
                                        <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('compare_price_text_size')}>
                                            <option value="">Select Size</option>
                                            <option value="12">12px</option>
                                            <option value="14">14px</option>
                                            <option value="16">16px</option>
                                            <option value="18">18px</option>
                                            <option value="20">20px</option>
                                            <option value="22">22px</option>
                                            <option value="24">24px</option>
                                        </select>
                                        <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3 flex items-center">
                                    <label className="text-sm font-medium text-black">Offer Price Text Size
                                    </label>
                                    <div className="relative z-20 bg-white w-44 ml-auto">
                                        <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('offer_price_text_size')}>
                                            <option value="">Select Size</option>
                                            <option value="12">12px</option>
                                            <option value="14">14px</option>
                                            <option value="16">16px</option>
                                            <option value="18">18px</option>
                                            <option value="20">20px</option>
                                            <option value="22">22px</option>
                                            <option value="24">24px</option>
                                        </select>
                                        <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className='mb-3 flex flex-wrap'>
                                    <div className="mb-3 w-1/2">
                                        <label className="mb-1 block text-sm font-medium text-black">Background Color</label>
                                        <div className="relative z-20 bg-white w-44 ml-auto">
                                            <input type="color" {...registerUpdateWidgetTemplate('product_title_color')} />
                                        </div>
                                    </div>
                                    <div className="mb-3 w-1/2">
                                        <label className="mb-1 block text-sm font-medium text-black">Title Color</label>
                                        <div className="relative z-20 bg-white w-44 ml-auto">
                                            <input type="color" {...registerUpdateWidgetTemplate('product_title_color')} />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3 flex flex-wrap'>
                                    <div className="mb-3 w-1/2">
                                        <label className="mb-1 block text-sm font-medium text-black"> Compare Price Text Color
                                        </label>
                                        <div className="relative z-20 bg-white w-44 ml-auto">
                                            <input type="color" {...registerUpdateWidgetTemplate('compare_price_text_color')} />
                                        </div>
                                    </div>
                                    <div className="mb-3 w-1/2">
                                        <label className="mb-1 block text-sm font-medium text-black">Offer Price Text Color
                                        </label>
                                        <div className="relative z-20 bg-white w-44 ml-auto">
                                            <input type="color" {...registerUpdateWidgetTemplate('offer_price_text_color')} />
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-3 flex flex-wrap'>
                                    <div className="mb-3 w-1/2">
                                        <label className="mb-1 block text-sm font-medium text-black">Button Color</label>
                                        <div className="relative z-20 bg-white w-44 ml-auto">
                                            <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_background_color')} />
                                        </div>
                                    </div>
                                    <div className="mb-3 w-1/2">
                                        <label className="mb-1 block text-sm font-medium text-black">Button Text Color</label>
                                        <div className="relative z-20 bg-white w-44 ml-auto">
                                            <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_text_color')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <a className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={() => {
                                        let currentFormValues = getValuesUpdateWidgetTemplate();
                                        resetUpdateWidgetTemplate();

                                        setValueUpdateWidgetTemplate('widget_template', currentFormValues?.widget_template);
                                        setValueUpdateWidgetTemplate('widget_position', currentFormValues?.widget_position);
                                    }}>
                                        Reset
                                    </a>
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div> */}
                    {/* : ""
                    } */}
                </div>

                <style>{templateStyle}</style>
                <div className='flex-grow pl-6'>
                    <div className={`${deviceToggle === "desktop" ? "transition-opacity ease-in delay-150 opacity-100 h-auto visible" : "opacity-0 h-0 ease-out invisible"}`}>
                        <h3 className='font-bold text-black mb-4 text-2xl'>Desktop View</h3>
                        <div className='mb-10 border border-stroke shadow bg-white relative min-h-150 rounded-lg desktop-view flex flex-col'>
                            <div className='border-b border-stroke h-13 flex items-center justify-between'>
                                <div className='flex space-x-2 pl-5 w-25'>
                                    <span className='w-3 h-3 bg-red-400 rounded-full border border-red-500'></span>
                                    <span className='w-3 h-3 bg-orange-300 rounded-full border border-orange-400'></span>
                                    <span className='w-3 h-3 bg-green-400 rounded-full border border-green-500'></span>
                                </div>
                                <div className='w-100 flex items-center'>
                                    <span className='mr-4'><svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 17.6147C7.63281 17.6147 7.84863 17.5649 8.05615 17.4487C12.7793 14.8008 14.3979 13.6802 14.3979 10.6504V4.30029C14.3979 3.42871 14.0244 3.15479 13.3188 2.85596C12.3394 2.44922 9.17676 1.31201 8.19727 0.97168C7.97314 0.896973 7.73242 0.847168 7.5 0.847168C7.26758 0.847168 7.02686 0.913574 6.81104 0.97168C5.83154 1.25391 2.66064 2.45752 1.68115 2.85596C0.983887 3.14648 0.602051 3.42871 0.602051 4.30029V10.6504C0.602051 13.6802 2.229 14.7925 6.94385 17.4487C7.15967 17.5649 7.36719 17.6147 7.5 17.6147ZM7.83203 2.2583C9.08545 2.75635 11.5176 3.63623 12.8042 4.07617C13.0283 4.15918 13.0781 4.27539 13.0781 4.55762V10.3433C13.0781 12.9082 11.8496 13.5806 8.01465 15.9131C7.77393 16.0625 7.64111 16.104 7.5083 16.1123V2.18359C7.59131 2.18359 7.69922 2.2085 7.83203 2.2583Z" fill="#737373" />
                                    </svg>
                                    </span>
                                    <div className='flex-grow bg-black bg-opacity-10 h-8 rounded-md flex justify-center items-center'>
                                        <span className='mr-1'><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.21094 11.7158H6.78906C7.54492 11.7158 7.91406 11.3408 7.91406 10.5205V6.21973C7.91406 5.48145 7.60938 5.10059 6.98242 5.03613V3.55957C6.98242 1.35059 5.53516 0.28418 4 0.28418C2.46484 0.28418 1.01758 1.35059 1.01758 3.55957V5.06543C0.443359 5.15332 0.0859375 5.52832 0.0859375 6.21973V10.5205C0.0859375 11.3408 0.455078 11.7158 1.21094 11.7158ZM1.96094 3.43652C1.96094 1.96582 2.9043 1.18652 4 1.18652C5.0957 1.18652 6.03906 1.96582 6.03906 3.43652V5.03027L1.96094 5.03613V3.43652Z" fill="#9E9E9E" />
                                        </svg>
                                        </span>
                                        <span className='text-xs font-medium text-zinc-500'>Stickybar.com</span>
                                    </div>
                                </div>
                                <div className='pr-5 w-25 justify-end flex items-center'>
                                    <span className='mr-3'>
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 14.0044C7.90674 14.0044 8.24707 13.6807 8.24707 13.2822V7.76221H13.6094C14.0078 7.76221 14.3481 7.42188 14.3481 7.01514C14.3481 6.6084 14.0078 6.27637 13.6094 6.27637H8.24707V0.748047C8.24707 0.349609 7.90674 0.0258789 7.5 0.0258789C7.09326 0.0258789 6.76123 0.349609 6.76123 0.748047V6.27637H1.39062C0.992188 6.27637 0.651855 6.6084 0.651855 7.01514C0.651855 7.42188 0.992188 7.76221 1.39062 7.76221H6.76123V13.2822C6.76123 13.6807 7.09326 14.0044 7.5 14.0044Z" fill="#737373" />
                                        </svg>
                                    </span>
                                    <span>
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.32422 13.8711H4.74365V15.1411C4.74365 16.8511 5.60693 17.7144 7.3501 17.7144H15.6841C17.4106 17.7144 18.2822 16.8511 18.2822 15.1411V6.74072C18.2822 5.03076 17.4106 4.16748 15.6841 4.16748H14.2563V2.89746C14.2563 1.1875 13.3848 0.324219 11.6582 0.324219H3.32422C1.58105 0.324219 0.717773 1.1875 0.717773 2.89746V11.2979C0.717773 13.0078 1.58105 13.8711 3.32422 13.8711ZM3.34082 12.5347C2.51074 12.5347 2.0542 12.0864 2.0542 11.2231V2.97217C2.0542 2.10889 2.51074 1.66064 3.34082 1.66064H11.6333C12.4551 1.66064 12.9199 2.10889 12.9199 2.97217V4.16748H7.3501C5.60693 4.16748 4.74365 5.02246 4.74365 6.74072V12.5347H3.34082ZM7.3667 16.3779C6.54492 16.3779 6.08008 15.9297 6.08008 15.0664V6.81543C6.08008 5.95215 6.54492 5.50391 7.3667 5.50391H15.6592C16.481 5.50391 16.9458 5.95215 16.9458 6.81543V15.0664C16.9458 15.9297 16.481 16.3779 15.6592 16.3779H7.3667Z" fill="#737373" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className='relative flex-grow'>
                                <div id="widget-area" className={`asbw-stickybag-widget asbw-stickybag-${widgetTemplate}-${widgetStyle} ${widgetPosition} ${widgetWidth}`}>
                                    <div id="widget-container">
                                        <div className="asbw-stickybag-product">
                                            <div className="asbw-product-item-image">
                                                {
                                                    widgetElements.includes('di') ? "" : <img id="widget-image" src="//cdn.shopify.com/s/files/1/1449/3238/products/guaranteed_navy.jpg?v=1521562674" />
                                                }
                                            </div>
                                            <div className="asbw-stickybag-content">
                                                {
                                                    widgetElements.includes('dt') ? "" : <div id="widget-title" className="asbw-product-item-title">Pivl Women Solid Hooded Jacket for Winter</div>
                                                }
                                                {
                                                    widgetTemplate === 't1' ? <div id="widget-price" className="asbw-product-price-wrapper">
                                                        {
                                                            widgetElements.includes('ds') ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">Rs. 36.00</span>
                                                        }
                                                        {
                                                            widgetElements.includes('dc') ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">Rs. 46.00</span>
                                                        }
                                                    </div> : ""
                                                }
                                            </div>
                                        </div>
                                        <div className="asbw-stickybag-widget-events">
                                            <div id="widget-options" className="asbw-stickybag-options">
                                                <div className="asbw-variant-opt">
                                                    <label className="asbw-label asbw-select-outer">
                                                        <select id="widget-option1" className="asbw-select">
                                                            <option value="Navy">Navy</option>
                                                        </select>
                                                        <span className="asbw-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                    </label>
                                                </div>
                                                <div className="asbw-variant-opt">
                                                    <label className="asbw-label asbw-select-outer">
                                                        <select id="widget-option2" className="asbw-select">
                                                            <option value="XS">XS</option>
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>
                                                            <option value="XL">XL</option>
                                                        </select>
                                                        <span className="asbw-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="asbw-stickybag-actions">
                                                {
                                                    widgetTemplate === 't1' ? "" : <div id="widget-price" className="asbw-product-price-wrapper">
                                                        {
                                                            widgetElements.includes('ds') ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">Rs. 36.00</span>
                                                        }
                                                        {
                                                            widgetElements.includes('dc') ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">Rs. 46.00</span>
                                                        }
                                                    </div>
                                                }
                                                <div className="asbw-stickybag-action-wrapper">
                                                    <button id="widget-submit" className="asbw-action-btn asbw-action-btn-md">Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${deviceToggle === "mobile" ? "transition-opacity ease-in delay-150 opacity-100 h-auto visible" : "opacity-0 h-0 ease-out invisible"}`}>
                        <h3 className='font-bold text-black mb-4 text-2xl'>Mobile View</h3>
                        <div className='border-4 border-slate-400 max-w-94 h-180 mx-auto relative rounded-iphone-outer mobile-view'>
                            <div className='mb-10 bg-white border-4 border-black h-full relative  flex flex-col rounded-7xl overflow-hidden'>
                                <div className='relative w-full flex justify-center top-2.5 left-3 mb-4.5'>
                                    <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-iphone-statusbar.svg`} alt='iphone status bar' />
                                </div>
                                <div className='relative flex-grow'>
                                    <div id="widget-area" className={`asbw-stickybag-widget asbw-stickybag-${widgetTemplate}-${widgetStyle} ${widgetPosition} ${widgetWidth}`}>
                                        <div id="widget-container">
                                            <div className="asbw-stickybag-product">
                                                <div className="asbw-product-item-image">
                                                    {
                                                        widgetElements.includes('mi') ? "" : <img id="widget-image" src="//cdn.shopify.com/s/files/1/1449/3238/products/guaranteed_navy.jpg?v=1521562674" />
                                                    }
                                                </div>
                                                <div className="asbw-stickybag-content">
                                                    {
                                                        widgetElements.includes('mt') ? "" : <div id="widget-title" className="asbw-product-item-title">Pivl Women Solid Hooded Jacket for Winter</div>
                                                    }
                                                    {
                                                        widgetTemplate === 't1' ? <div id="widget-price" className="asbw-product-price-wrapper">
                                                            {
                                                                widgetElements.includes('ms') ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">Rs. 36.00</span>
                                                            }
                                                            {
                                                                widgetElements.includes('mc') ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">Rs. 46.00</span>
                                                            }
                                                        </div> : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="asbw-stickybag-widget-events">
                                                <div id="widget-options" className="asbw-stickybag-options">
                                                    <div className="asbw-variant-opt">
                                                        <label className="asbw-label asbw-select-outer">
                                                            <select id="widget-option1" className="asbw-select">
                                                                <option value="Navy">Navy</option>
                                                            </select>
                                                            <span className="asbw-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                        </label>
                                                    </div>
                                                    <div className="asbw-variant-opt">
                                                        <label className="asbw-label asbw-select-outer">
                                                            <select id="widget-option2" className="asbw-select">
                                                                <option value="XS">XS</option>
                                                                <option value="S">S</option>
                                                                <option value="M">M</option>
                                                                <option value="L">L</option>
                                                                <option value="XL">XL</option>
                                                            </select>
                                                            <span className="asbw-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="asbw-stickybag-actions">
                                                    {
                                                        widgetTemplate === 't1' ? "" : <div id="widget-price" className="asbw-product-price-wrapper">
                                                            {
                                                                widgetElements.includes('ms') ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">Rs. 36.00</span>
                                                            }
                                                            {
                                                                widgetElements.includes('mc') ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">Rs. 46.00</span>
                                                            }
                                                        </div>
                                                    }
                                                    <div className="asbw-stickybag-action-wrapper">
                                                        <button id="widget-submit" className="asbw-action-btn asbw-action-btn-md">Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </UserDashboardLayout >
    )
}