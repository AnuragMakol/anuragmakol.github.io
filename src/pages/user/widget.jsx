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
import { Tooltip } from '../../components/kitchen-sink';

export function Widget(props) {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);
    const [deviceToggle, setDeviceToggle] = useState('desktop');
    const [templateStyle, setTemplateStyle] = useState('');
    const [customStyle, setCustomStyle] = useState('');

    const [widgetSettings, setWidgetSettings] = useState({
        widget_template: "",
        widget_style: "",
        widget_position: "",
        widget_width: "",
        widget_status: "",
        desktop_hide_image: "",
        desktop_hide_title: "",
        desktop_hide_compare_price: "",
        desktop_hide_offer_price: "",
        mobile_hide_image: "",
        mobile_hide_title: "",
        mobile_hide_compare_price: "",
        mobile_hide_offer_price: "",
        image_size: "",
        title_size: "",
        title_color: "",
        background_color: "",
        compare_price_size: "",
        compare_price_color: "",
        offer_price_size: "",
        offer_price_color: "",
        button_text_color: "",
        button_color: ""
    });

    useEffect(() => {
        let updateParams = {
            widget_status: user?.widget_settings?.widget_status,
            widget_template: user?.widget_settings?.widget_template,
            widget_style: user?.widget_settings?.widget_style,
            widget_position: user?.widget_settings?.widget_position,
            widget_width: user?.widget_settings?.widget_width,
            desktop_hide_image: user?.widget_settings?.desktop_hide_image,
            desktop_hide_title: user?.widget_settings?.desktop_hide_title,
            desktop_hide_compare_price: user?.widget_settings?.desktop_hide_compare_price,
            desktop_hide_offer_price: user?.widget_settings?.desktop_hide_offer_price,
            mobile_hide_image: user?.widget_settings?.mobile_hide_image,
            mobile_hide_title: user?.widget_settings?.mobile_hide_title,
            mobile_hide_compare_price: user?.widget_settings?.mobile_hide_compare_price,
            mobile_hide_offer_price: user?.widget_settings?.mobile_hide_offer_price,
            image_size: user?.widget_settings?.image_size,
            title_size: user?.widget_settings?.title_size,
            title_color: user?.widget_settings?.title_color,
            background_color: user?.widget_settings?.background_color,
            compare_price_size: user?.widget_settings?.compare_price_size,
            compare_price_color: user?.widget_settings?.compare_price_color,
            offer_price_size: user?.widget_settings?.offer_price_size,
            offer_price_color: user?.widget_settings?.offer_price_color,
            button_text_color: user?.widget_settings?.button_text_color,
            button_color: user?.widget_settings?.button_color
        }

        resetUpdateWidgetTemplate(updateParams);
        setWidgetSettings(updateParams);
        triggerFetchTemplate(user?.widget_settings?.widget_template, user?.widget_settings?.widget_style);
    }, []);

    const { register: registerUpdateWidgetTemplate, handleSubmit: handleUpdateWidgetTemplate, formState: { errors: errorsUpdateWidgetTemplate }, reset: resetUpdateWidgetTemplate, getValues: getValuesUpdateWidgetTemplate } = useForm({
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
                mobile_hide_offer_price: yup.boolean(),
                image_size: yup.string(),
                title_size: yup.string(),
                title_color: yup.string(),
                background_color: yup.string(),
                compare_price_size: yup.string(),
                compare_price_color: yup.string(),
                offer_price_size: yup.string(),
                offer_price_color: yup.string(),
                button_text_color: yup.string(),
                button_color: yup.string()
            })
        )
    });

    const onSubmitUpdateWidgetTemplate = (form) => {
        initUpdateWidgetTemplate(form);
    }

    const triggerFetchTemplate = (template, style) => {
        initFetchTemplateStyle({
            template: template,
            style: style
        });
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

    const PriceFormat = (format, price) => {
        return format.replace('{{amount}}', parseFloat(price / 100).toFixed(2));
    }

    const manageCustomStyle = (type, value) => {
        let tempData = {
            ...widgetSettings,
            [type]: value
        }

        if (tempData?.widget_style === "custom") {
            let tempStylesheet = `
            .asbw-stickybag-widget {
                ${tempData?.background_color !== undefined ? `background: ${tempData?.background_color} !important;` : ""}
            }
            .asbw-product-item-image {
                ${tempData?.image_size !== undefined ? `width: ${tempData?.image_size}px !important;` : ""}
                ${tempData?.image_size !== undefined ? `height: ${tempData?.image_size}px !important;` : ""}
                ${tempData?.image_size !== undefined ? `min-width: ${tempData?.image_size}px !important;` : ""}
            }
            .asbw-product-item-title {
                ${tempData?.title_color !== undefined ? `color: ${tempData?.title_color} !important;` : ""}
                ${tempData?.title_size !== undefined ? `font-size: ${tempData?.title_size}px !important;` : ""}
            }
            .asbw-stickybag-offer-price {
                ${tempData?.offer_price_color !== undefined ? `color: ${tempData?.offer_price_color} !important;` : ""}
                ${tempData?.offer_price_size !== undefined ? `font-size: ${tempData?.offer_price_size}px !important;` : ""}
            }
            .asbw-item-compare-price {
                ${tempData?.compare_price_color !== undefined ? `color: ${tempData?.compare_price_color} !important;` : ""}
                ${tempData?.compare_price_size !== undefined ? `font-size: ${tempData?.compare_price_size}px !important;` : ""}
            }
            .asbw-action-btn {
                ${tempData?.button_color !== undefined ? `background-color: ${tempData?.button_color} !important;` : ""}
                ${tempData?.button_color !== undefined ? `border: 1px solid ${tempData?.button_color} !important;` : ""}
                ${tempData?.button_text_color !== undefined ? `color: ${tempData?.button_text_color} !important;` : ""}
            }
        `;

            setCustomStyle(tempStylesheet);
        } else {
            setCustomStyle("");
        }
    }

    return (
        <UserDashboardLayout props={props}>
            <Loader loading={loadingUpdateWidgetTemplate} />
            <div className='flex flex-col overflow-hidden h-full max-h-full'>
                <div className="mb-6 flex flex-shrink-0 items-center justify-between">
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
                        <Tooltip position="left" property={`w-6 h-6`} image={`${import.meta.env.VITE_APP_URL}/images/icon/info-circle-solid.svg`} alt="info" title={`This will reset the integration of the app with your store`} />
                    </div>
                </div>
                <div className='overflow-x-auto overflow-y-hidden flex flex-1 relative'>
                    <button className="absolute top-px left-0 z-99999  rounded-md border border-stroke bg-white p-1.5 shadow-sm block lg:hidden">
                        <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path d="M 22.1875 2.28125 L 20.78125 3.71875 L 25.0625 8 L 4 8 L 4 10 L 25.0625 10 L 20.78125 14.28125 L 22.1875 15.71875 L 28.90625 9 Z M 9.8125 16.28125 L 3.09375 23 L 9.8125 29.71875 L 11.21875 28.28125 L 6.9375 24 L 28 24 L 28 22 L 6.9375 22 L 11.21875 17.71875 Z"></path>
                        </svg>
                    </button>
                    <div className='max-w-100 min-w-100 h-full absolute left-0 top-0 z-9999 duration-300 ease-linear  lg:static lg:translate-x-0 -translate-x-full lg:ml-0 -ml-px'>
                        <form className='h-full' onSubmit={handleUpdateWidgetTemplate(onSubmitUpdateWidgetTemplate)}>
                            <div className="rounded-sm border border-stroke bg-white shadow flex flex-col h-full">
                                <div className="border-b border-stroke px-6 py-4 flex flex-shrink-0">
                                    <h3 className="font-medium text-black">
                                        <span>Customizer</span>
                                    </h3>
                                </div>
                                <div className="py-4 px-6 overflow-x-hidden overflow-y-auto flex flex-grow flex-col w-full">
                                    <div className='flex items-center justify-between rounded mb-5'>
                                        <label className="font-medium text-graydark flex items-center">Show Widget
                                            <Tooltip position="right" property={`w-4.5 h-4.5`} image={`${import.meta.env.VITE_APP_URL}/images/icon/info-circle-solid.svg`} alt="info" title={`This will show/hide the widget on the store`} />
                                        </label>
                                        <label className="relative inline-block w-15 h-8 switch-slider-wrap">
                                            <input type="checkbox" className="sr-only" {...registerUpdateWidgetTemplate('widget_status')} />
                                            <span className="absolute cursor-pointer inset-0 bg-red-600 ring-1 ring-red-700 transition-all slider rounded-full flex items-center">
                                                <span className='status-text active text-white font-medium text-xs mr-8.5'>Yes</span>
                                                <span className='status-text inactive text-white font-medium text-xs mr-2.5 ml-auto'>No</span>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="mb-3 flex items-center">
                                        <label className="mb-1.5 block font-medium text-graydark w-22">Template</label>
                                        <div className="relative z-20 bg-white w-44 ml-auto">
                                            <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('widget_template')} onChange={(e) => {
                                                setWidgetSettings({
                                                    ...widgetSettings,
                                                    widget_template: e.target.value
                                                });

                                                triggerFetchTemplate(e.target.value, getValuesUpdateWidgetTemplate('widget_style'));
                                                manageCustomStyle('widget_template', e.target.value);
                                            }}>
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
                                            <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('widget_style')} onChange={(e) => {
                                                setWidgetSettings({
                                                    ...widgetSettings,
                                                    widget_style: e.target.value
                                                });

                                                triggerFetchTemplate(getValuesUpdateWidgetTemplate('widget_template'), e.target.value);
                                                manageCustomStyle('widget_style', e.target.value);
                                            }}>
                                                <option value="s1">Style 1</option>
                                                <option value="s2">Style 2</option>
                                                <option value="s3">Style 3</option>
                                                <option value="s4">Style 4</option>
                                                <option value="s5">Style 5</option>
                                                <option value="s6">Style 6</option>
                                                <option value="custom">Custom</option>
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

                                    <div className={`${widgetSettings?.widget_style === "custom" ? "border border-yellow-300 bg-yellow-50 bg-opacity-30 p-4 mt-6 mb-4" : "hidden"}`}>
                                        <h4 className='font-bold text-graydark mb-4'>Advanced Settings</h4>
                                        <div className="mb-3 flex items-center">
                                            <label className="text-sm font-medium text-black">Image Size</label>
                                            <div className="relative z-20 bg-white w-40 ml-auto">
                                                <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('image_size')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        image_size: e.target.value
                                                    });

                                                    manageCustomStyle('image_size', e.target.value);
                                                }}>
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
                                            <label className="text-sm font-medium text-black">Title Size</label>
                                            <div className="relative z-20 bg-white w-40 ml-auto">
                                                <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('title_size')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        title_size: e.target.value
                                                    });

                                                    manageCustomStyle('title_size', e.target.value);
                                                }}>
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
                                            <div className="relative z-20 bg-white w-40 ml-auto">
                                                <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('compare_price_size')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        compare_price_size: e.target.value
                                                    });

                                                    manageCustomStyle('compare_price_size', e.target.value);
                                                }}>
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
                                            <div className="relative z-20 bg-white w-40 ml-auto">
                                                <select className="relative text-graydark z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('offer_price_size')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        offer_price_size: e.target.value
                                                    });

                                                    manageCustomStyle('offer_price_size', e.target.value);
                                                }}>
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
                                                <input type="color" {...registerUpdateWidgetTemplate('background_color')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        background_color: e.target.value
                                                    });

                                                    manageCustomStyle('background_color', e.target.value);
                                                }} />
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="mb-1 block text-sm font-medium text-black">Title Color</label>
                                                <input type="color" {...registerUpdateWidgetTemplate('title_color')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        title_color: e.target.value
                                                    });

                                                    manageCustomStyle('title_color', e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div className='mb-3 flex flex-wrap'>
                                            <div className="mb-3 w-1/2">
                                                <label className="mb-1 block text-sm font-medium text-black"> Compare Price Color
                                                </label>
                                                <input type="color" {...registerUpdateWidgetTemplate('compare_price_color')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        compare_price_color: e.target.value
                                                    });

                                                    manageCustomStyle('compare_price_color', e.target.value);
                                                }} />
                                            </div>
                                            <div className="mb-3 w-1/2">
                                                <label className="mb-1 block text-sm font-medium text-black">Offer Price Color
                                                </label>
                                                <input type="color" {...registerUpdateWidgetTemplate('offer_price_color')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        offer_price_color: e.target.value
                                                    });

                                                    manageCustomStyle('offer_price_color', e.target.value);
                                                }} />
                                            </div>
                                        </div>

                                        <div className='flex flex-wrap'>
                                            <div className="w-1/2">
                                                <label className="mb-1 block text-sm font-medium text-black">Button Color</label>
                                                <input type="color" {...registerUpdateWidgetTemplate('button_color')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        button_color: e.target.value
                                                    });

                                                    manageCustomStyle('button_color', e.target.value);
                                                }} />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="mb-1 block text-sm font-medium text-black">Button Text Color</label>
                                                <input type="color" {...registerUpdateWidgetTemplate('button_text_color')} onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        button_text_color: e.target.value
                                                    });

                                                    manageCustomStyle('button_text_color', e.target.value);
                                                }} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mb-4 flex items-center">
                                        <label className="font-medium text-graydark w-22">Position</label>
                                        <div className="flex py-2 w-44 ml-auto">
                                            <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                <input type="radio" {...registerUpdateWidgetTemplate('widget_position')} value="top" onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        widget_position: e.target.value
                                                    });
                                                }} />
                                                <span className="ml-2">Top</span>
                                            </label>
                                            <label className="flex cursor-pointer select-none items-center text-sm font-medium ml-6">
                                                <input type="radio" {...registerUpdateWidgetTemplate('widget_position')} value="bottom" onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        widget_position: e.target.value
                                                    });
                                                }} />
                                                <span className="ml-2">Bottom</span>
                                            </label>
                                            {errorsUpdateWidgetTemplate?.widget_position && <span className="text-danger text-sm text-bold">Please select a position</span>}
                                        </div>
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <label className="mb-1.5 font-medium text-graydark w-22 flex items-center">Width
                                            <Tooltip position="right" property={`w-4.5 h-4.5`} image={`${import.meta.env.VITE_APP_URL}/images/icon/info-circle-solid.svg`} alt="info" title={`For Desktop only`} />
                                        </label>
                                        <div className="flex py-2 w-44 ml-auto">
                                            <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                <input type="radio" {...registerUpdateWidgetTemplate('widget_width')} value="fullwidth" onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        widget_width: e.target.value
                                                    });
                                                }} />
                                                <span className="ml-2">Full Width</span>
                                            </label>
                                            <label className="flex cursor-pointer select-none items-center text-sm font-medium ml-6">
                                                <input type="radio" {...registerUpdateWidgetTemplate('widget_width')} value="boxed" onChange={(e) => {
                                                    setWidgetSettings({
                                                        ...widgetSettings,
                                                        widget_width: e.target.value
                                                    });
                                                }} />
                                                <span className="ml-2">Boxed</span>
                                            </label>
                                            {errorsUpdateWidgetTemplate?.widget_width && <span className="text-danger text-sm text-bold">Please select a width</span>}
                                        </div>
                                    </div>
                                    <div className="border-t border-stroke pt-6">
                                        <div className='flex border border-stroke shadow-sm mb-5 rounded overflow-hidden'>
                                            <div className={`px-4 py-2 cursor-pointer flex-grow text-center font-medium ${deviceToggle === "desktop" ? "bg-primary text-white" : ""}`} onClick={() => setDeviceToggle('desktop')}>Desktop</div>
                                            <div className={`px-4 py-2 cursor-pointer flex-grow text-center font-medium ${deviceToggle === "mobile" ? "bg-primary text-white" : ""}`} onClick={() => setDeviceToggle('mobile')}>Mobile</div>
                                        </div>
                                        <div className={`${deviceToggle === "desktop" ? "transition-opacity ease-in-out delay-150 opacity-100 h-auto visible" : "h-0 opacity-0 invisible"}`}>
                                            <div className="relative z-20 bg-white flex flex-wrap">
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_image')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                desktop_hide_image: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Image</span>
                                                    </label>
                                                </div>
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_title')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                desktop_hide_title: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Title</span>
                                                    </label>
                                                </div>
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_compare_price')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                desktop_hide_compare_price: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Compare Price</span>
                                                    </label>
                                                </div>
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_offer_price')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                desktop_hide_offer_price: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Offer Price</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${deviceToggle === "mobile" ? "transition-opacity ease-in-out delay-150 opacity-100 h-auto visible" : "h-0 opacity-0 invisible"}`}>
                                            <div className={`${deviceToggle === "mobile" ? "relative z-20 bg-white flex flex-wrap" : "hidden"}`}>
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_image')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                mobile_hide_image: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Image</span>
                                                    </label>
                                                </div>
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_title')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                mobile_hide_title: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Title</span>
                                                    </label>
                                                </div>
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_compare_price')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                mobile_hide_compare_price: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Compare Price</span>
                                                    </label>
                                                </div>
                                                <div className="mb-3 w-1/2">
                                                    <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                        <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_offer_price')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                mobile_hide_offer_price: e.target.checked
                                                            });
                                                        }} />
                                                        <span className="ml-2">Hide Offer Price</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="py-4 px-6 flex justify-end space-x-2 border-t border-stroke">
                                    <a className="flex justify-center rounded bg-black bg-opacity-10 px-6 py-2 font-medium text-graydark hover:bg-opacity-15">
                                        Reset
                                    </a>
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <style>{templateStyle}</style>
                    <style>{customStyle}</style>
                    <div className='flex-grow pl-11 lg:pl-4 xl:pl-6'>
                        <div className={`${deviceToggle === "desktop" ? "transition-opacity ease-in delay-150 opacity-100 h-full visible" : "opacity-0 h-0 ease-out invisible"}`}>
                            <div className='border border-stroke shadow bg-white relative rounded-lg desktop-view flex flex-col h-full'>
                                <div className='border-b border-stroke h-13 flex items-center justify-between'>
                                    <div className='flex pl-5 min-w-48 max-w-48 items-center'>
                                        <div className='flex space-x-2 w-25'>
                                            <span className='w-3 h-3 bg-red-400 rounded-full border border-red-500'></span>
                                            <span className='w-3 h-3 bg-orange-300 rounded-full border border-orange-400'></span>
                                            <span className='w-3 h-3 bg-green-400 rounded-full border border-green-500'></span>
                                        </div>
                                        <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-safari-toolabr-left.svg`} alt='safari icons' />
                                    </div>
                                    <div className='max-w-96 w-full flex items-center'>
                                        <span className='mr-4'><svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 17.6147C7.63281 17.6147 7.84863 17.5649 8.05615 17.4487C12.7793 14.8008 14.3979 13.6802 14.3979 10.6504V4.30029C14.3979 3.42871 14.0244 3.15479 13.3188 2.85596C12.3394 2.44922 9.17676 1.31201 8.19727 0.97168C7.97314 0.896973 7.73242 0.847168 7.5 0.847168C7.26758 0.847168 7.02686 0.913574 6.81104 0.97168C5.83154 1.25391 2.66064 2.45752 1.68115 2.85596C0.983887 3.14648 0.602051 3.42871 0.602051 4.30029V10.6504C0.602051 13.6802 2.229 14.7925 6.94385 17.4487C7.15967 17.5649 7.36719 17.6147 7.5 17.6147ZM7.83203 2.2583C9.08545 2.75635 11.5176 3.63623 12.8042 4.07617C13.0283 4.15918 13.0781 4.27539 13.0781 4.55762V10.3433C13.0781 12.9082 11.8496 13.5806 8.01465 15.9131C7.77393 16.0625 7.64111 16.104 7.5083 16.1123V2.18359C7.59131 2.18359 7.69922 2.2085 7.83203 2.2583Z" fill="#737373" />
                                        </svg>
                                        </span>
                                        <div className='flex-grow bg-black bg-opacity-10 h-8 rounded-md flex justify-center items-center px-4'>
                                            <span className='mr-1'><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.21094 11.7158H6.78906C7.54492 11.7158 7.91406 11.3408 7.91406 10.5205V6.21973C7.91406 5.48145 7.60938 5.10059 6.98242 5.03613V3.55957C6.98242 1.35059 5.53516 0.28418 4 0.28418C2.46484 0.28418 1.01758 1.35059 1.01758 3.55957V5.06543C0.443359 5.15332 0.0859375 5.52832 0.0859375 6.21973V10.5205C0.0859375 11.3408 0.455078 11.7158 1.21094 11.7158ZM1.96094 3.43652C1.96094 1.96582 2.9043 1.18652 4 1.18652C5.0957 1.18652 6.03906 1.96582 6.03906 3.43652V5.03027L1.96094 5.03613V3.43652Z" fill="#9E9E9E" />
                                            </svg>
                                            </span>
                                            <span className='text-xs font-medium text-zinc-500'>google.com</span>
                                        </div>
                                    </div>
                                    <div className='pr-5 min-w-48 max-w-48 justify-end flex items-center'>
                                        <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-safari-toolabr-right.svg`} alt='safari icons' />
                                    </div>
                                </div>
                                <div className='relative flex-grow'>
                                    <div id="widget-area" className={`asbw-stickybag-widget asbw-stickybag-${widgetSettings?.widget_template}-${widgetSettings?.widget_style} ${widgetSettings?.widget_position === "top" ? "asbw-fixed-d-top" : "asbw-fixed-d-bottom"} ${widgetSettings?.widget_width === "boxed" ? "asbw-boxed" : ""}`}>
                                        <div id="widget-container">
                                            <div className="asbw-stickybag-product">
                                                {
                                                    widgetSettings?.desktop_hide_image ? "" : <div className="asbw-product-item-image">
                                                        <img id="widget-image" src="//cdn.shopify.com/s/files/1/1449/3238/products/guaranteed_navy.jpg?v=1521562674" />
                                                    </div>
                                                }

                                                <div className="asbw-stickybag-content">
                                                    {
                                                        widgetSettings?.desktop_hide_title ? "" : <div id="widget-title" className="asbw-product-item-title">Product Title</div>
                                                    }
                                                    {
                                                        widgetSettings?.widget_template === 't1' ? <div id="widget-price" className="asbw-product-price-wrapper">
                                                            {
                                                                widgetSettings?.desktop_hide_offer_price ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '3600')}</span>
                                                            }
                                                            {
                                                                widgetSettings?.desktop_hide_compare_price ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '4600')}</span>
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
                                                        widgetSettings?.widget_template === 't1' ? "" : <div id="widget-price" className="asbw-product-price-wrapper">
                                                            {
                                                                widgetSettings?.desktop_hide_offer_price ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '3600')}</span>
                                                            }
                                                            {
                                                                widgetSettings?.desktop_hide_compare_price ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '4600')}</span>
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
                        <div className={`${deviceToggle === "mobile" ? "transition-opacity ease-in delay-150 opacity-100 h-full visible" : "opacity-0 h-0 ease-out invisible"}`}>
                            <div className='border-4 border-slate-400 max-w-94 h-180 mx-auto relative rounded-iphone-outer mobile-view h-full'>
                                <div className='bg-white border-4 border-black h-full relative  flex flex-col rounded-7xl overflow-hidden'>
                                    <div className='relative w-full flex justify-center top-2.5 left-3 mb-4.5'>
                                        <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-iphone-statusbar.svg`} alt='iphone status bar' />
                                    </div>
                                    <div className='relative flex-grow'>
                                        <div id="widget-area" className={`asbw-stickybag-widget asbw-stickybag-${widgetSettings?.widget_template}-${widgetSettings?.widget_style} ${widgetSettings?.widget_position === "top" ? "asbw-fixed-d-top" : "asbw-fixed-d-bottom"} ${widgetSettings?.widget_width === "boxed" ? "asbw-boxed" : ""}`}>
                                            <div id="widget-container">
                                                <div className="asbw-stickybag-product">
                                                    <div className="asbw-product-item-image">
                                                        {
                                                            widgetSettings?.mobile_hide_image ? "" : <img id="widget-image" src="//cdn.shopify.com/s/files/1/1449/3238/products/guaranteed_navy.jpg?v=1521562674" />
                                                        }
                                                    </div>
                                                    <div className="asbw-stickybag-content">
                                                        {
                                                            widgetSettings?.mobile_hide_title ? "" : <div id="widget-title" className="asbw-product-item-title">Product Title</div>
                                                        }
                                                        {
                                                            widgetSettings?.widget_template === 't1' ? <div id="widget-price" className="asbw-product-price-wrapper">
                                                                {
                                                                    widgetSettings?.mobile_hide_offer_price ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '36.00')}</span>
                                                                }
                                                                {
                                                                    widgetSettings?.mobile_hide_compare_price ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '46.00')}</span>
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
                                                            widgetSettings?.widget_template === 't1' ? "" : <div id="widget-price" className="asbw-product-price-wrapper">
                                                                {
                                                                    widgetSettings?.mobile_hide_offer_price ? "" : <span className="asbw-stickybag-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '3600')}</span>
                                                                }
                                                                {
                                                                    widgetSettings?.mobile_hide_compare_price ? "" : <span className="asbw-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '4600')}</span>
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
                </div>
                <div className='pt-3'><p className='text-sm font-medium text-right'>Unlock full access and explore all features by <span className='text-red-600 underline cursor-pointer'>upgrading your plan</span> today!</p></div>
            </div>



        </UserDashboardLayout>
    )
}