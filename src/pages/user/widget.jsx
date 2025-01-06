import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";
import { isEmpty } from 'lodash';
import Swal from 'sweetalert2';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Loader } from '../../loader';
import { UserDashboardLayout } from '../../components/layouts';

import { userStore } from '../../atoms';
import { updateWidgetTemplate, resetScriptTag, fetchTemplateStyle, resetWidgetTemplate } from '../../api';
import { successHandler, errorHandler } from "../../helpers";
import { Tooltip } from '../../components/kitchen-sink';

export function Widget(props) {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);
    const [templateStyle, setTemplateStyle] = useState('');
    const [tabToggle, setTabToggle] = useState('content');
    const [deviceToggle, setDeviceToggle] = useState('desktop');
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [customStyle, setCustomStyle] = useState('');

    const [widgetSettings, setWidgetSettings] = useState({
        widget_template: "",
        widget_style: "",
        widget_position: "",
        widget_width: "",
        widget_status: "",
        widget_visibility: "",
        widget_scroll: "",
        widget_background: "",
        widget_padding_x: "",
        widget_padding_y: "",
        widget_border_width: "",
        widget_border_color: "",
        widget_border_radius: "",
        desktop_hide_image: "",
        desktop_hide_title: "",
        desktop_hide_compare_price: "",
        desktop_hide_offer_price: "",
        mobile_hide_image: "",
        mobile_hide_title: "",
        mobile_hide_compare_price: "",
        mobile_hide_offer_price: "",
        image_size_x: "",
        image_size_y: "",
        title_color: "",
        title_font_size: "",
        title_font_weight: "",
        title_line_height: "",
        title_spacing: "",
        offer_price_color: "",
        offer_price_font_size: "",
        offer_price_font_weight: "",
        compare_price_color: "",
        compare_price_font_size: "",
        compare_price_font_weight: "",
        button_background: "",
        button_background_hover: "",
        button_text_color: "",
        button_font_size: "",
        button_font_weight: "",
        button_padding_x: "",
        button_padding_y: "",
        button_height: "",
        button_border_radius: "",
        button_border_color: "",
        button_border_hover_color: "",
        button_border_width: "",
        button_text: "",
        button_text_loading: "",
        button_redirect: "",
        urgency_bar_status: "",
        urgency_bar_text_color: "",
        urgency_bar_type: "",
        urgency_bar_datestart: "",
        urgency_bar_dateend: "",
        urgency_bar_timestart: "",
        urgency_bar_timeend: "",
        urgency_bar_duration: "",
        urgency_bar_background: "",
        urgency_bar_padding_y: "",
        urgency_bar_text: "",
        urgency_bar_text_size: "",
        urgency_bar_text_font_weight: "",
        urgency_bar_timer_color: "",
        urgency_bar_timer_size: "",
        urgency_bar_timer_font_weight: "",
        variants_background: "",
        variants_text_color: "",
        variants_font_size: "",
        variants_font_weight: "",
        variants_height: "",
        variants_border_width: "",
        variants_border_color: "",
        variants_border_radius: ""
    });

    useEffect(() => {
        triggerFetchTemplate(user?.widget_settings?.widget_template, user?.widget_settings?.widget_style);
    }, []);

    const { register: registerUpdateWidgetTemplate, handleSubmit: handleUpdateWidgetTemplate, formState: { errors: errorsUpdateWidgetTemplate }, reset: resetUpdateWidgetTemplate, getValues: getValuesUpdateWidgetTemplate, setValue: setValueUpdateWidgetTemplate } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_status: yup.boolean().required(),
                widget_template: yup.string().required(),
                widget_style: yup.string().required(),
                widget_position: yup.string().required(),
                widget_width: yup.string().required(),
                widget_visibility: yup.string().required(),
                widget_scroll: yup.string().required(),
                widget_background: yup.string(),
                widget_padding_x: yup.string(),
                widget_padding_y: yup.string(),
                widget_border_width: yup.string(),
                widget_border_color: yup.string(),
                widget_border_radius: yup.string(),
                desktop_hide_image: yup.boolean(),
                desktop_hide_title: yup.boolean(),
                desktop_hide_compare_price: yup.boolean(),
                desktop_hide_offer_price: yup.boolean(),
                mobile_hide_image: yup.boolean(),
                mobile_hide_title: yup.boolean(),
                mobile_hide_compare_price: yup.boolean(),
                mobile_hide_offer_price: yup.boolean(),
                image_size_x: yup.string(),
                image_size_y: yup.string(),
                title_color: yup.string(),
                title_font_size: yup.string(),
                title_font_weight: yup.string(),
                title_line_height: yup.string(),
                title_spacing: yup.string(),
                offer_price_color: yup.string(),
                offer_price_font_size: yup.string(),
                offer_price_font_weight: yup.string(),
                compare_price_color: yup.string(),
                compare_price_font_size: yup.string(),
                compare_price_font_weight: yup.string(),
                button_background: yup.string(),
                button_background_hover: yup.string(),
                button_text_color: yup.string(),
                button_font_size: yup.string(),
                button_font_weight: yup.string(),
                button_padding_x: yup.string(),
                button_padding_y: yup.string(),
                button_height: yup.string(),
                button_border_color: yup.string(),
                button_border_hover_color: yup.string(),
                button_border_radius: yup.string(),
                button_border_width: yup.string(),
                button_text: yup.string(),
                button_text_loading: yup.string(),
                button_redirect: yup.string(),
                urgency_bar_status: yup.boolean().required(),
                urgency_bar_text_color: yup.string(),
                urgency_bar_type: yup.string(),
                urgency_bar_datestart: yup.string(),
                urgency_bar_dateend: yup.string(),
                urgency_bar_timestart: yup.string(),
                urgency_bar_timeend: yup.string(),
                urgency_bar_duration: yup.string(),
                urgency_bar_background: yup.string(),
                urgency_bar_padding_y: yup.string(),
                urgency_bar_text: yup.string(),
                urgency_bar_text_size: yup.string(),
                urgency_bar_text_font_weight: yup.string(),
                urgency_bar_timer_color: yup.string(),
                urgency_bar_timer_size: yup.string(),
                urgency_bar_timer_font_weight: yup.string(),
                variants_background: yup.string(),
                variants_text_color: yup.string(),
                variants_font_size: yup.string(),
                variants_font_weight: yup.string(),
                variants_height: yup.string(),
                variants_border_width: yup.string(),
                variants_border_color: yup.string(),
                variants_border_radius: yup.string()
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
            setTemplateStyle(result.data.widget_style);
            resetUpdateWidgetTemplate(result.data.widget_settings);
            setWidgetSettings(result.data.widget_settings);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    useEffect(() => {
        let settings = Object.entries(widgetSettings)
        for (let i = 0; i < settings.length; i++) {
            setValueUpdateWidgetTemplate(settings[i][0], settings[i][1]);
            manageCustomStyle(settings[i][0], settings[i][1]);
        }
    }, [widgetSettings]);

    const { mutate: initUpdateWidgetTemplate, isLoading: loadingUpdateWidgetTemplate } = useMutation(updateWidgetTemplate, {
        onSuccess: (result) => {
            successHandler(result);
            setUser(result.data);
            triggerFetchTemplate(result.data.widget_settings.widget_template, result.data.widget_settings.widget_style);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const { mutate: initResetWidgetTemplate, isLoading: loadingResetWidgetTemplate } = useMutation(resetWidgetTemplate, {
        onSuccess: (result) => {
            successHandler(result);
            setUser(result.data);
            triggerFetchTemplate(result.data.widget_settings.widget_template, result.data.widget_settings.widget_style);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const manageCustomStyle = (type, value) => {
        let tempData = {
            ...widgetSettings,
            [type]: value
        }

        let tempStylesheet = `
            .cpatc-widget {
                ${tempData?.widget_border_radius !== undefined ? `border-radius: ${tempData?.widget_border_radius}px !important;` : ""}
            }
            #widget-container {
                ${tempData?.widget_border_width !== undefined ? `border-width: ${tempData?.widget_border_width}px !important;` : ""}
                ${tempData?.widget_border_color !== undefined ? `border-color: ${tempData?.widget_border_color} !important;` : ""}
                ${tempData?.widget_border_radius !== undefined ? `border-radius: ${tempData?.widget_border_radius}px !important;` : ""}
            }
            .cpatc-timer-wrapper {
                ${tempData?.urgency_bar_background !== undefined ? `background-color: ${tempData?.urgency_bar_background} !important;` : ""}                
                ${tempData?.urgency_bar_padding_y !== undefined ? `padding-top: ${tempData?.urgency_bar_padding_y}px !important;` : ""}                
                ${tempData?.urgency_bar_padding_y !== undefined ? `padding-bottom: ${tempData?.urgency_bar_padding_y}px !important;` : ""}                
            }
            .cpatc-timer-wrapper .cpatc-timer-title {
                ${tempData?.urgency_bar_text_size !== undefined ? `font-size: ${tempData?.urgency_bar_text_size}px !important;` : ""}
                ${tempData?.urgency_bar_text_color !== undefined ? `color: ${tempData?.urgency_bar_text_color} !important;` : ""}
                ${tempData?.urgency_bar_text_font_weight !== undefined ? `font-weight: ${tempData?.urgency_bar_text_font_weight} !important;` : ""}
            }
            .cpatc-timer-wrapper .cpatc-timer-countdown {
                ${tempData?.urgency_bar_timer_size !== undefined ? `font-size: ${tempData?.urgency_bar_timer_size}px !important;` : ""}
                ${tempData?.urgency_bar_timer_color !== undefined ? `color: ${tempData?.urgency_bar_timer_color} !important;` : ""}
                ${tempData?.urgency_bar_timer_font_weight !== undefined ? `font-weight: ${tempData?.urgency_bar_timer_font_weight} !important;` : ""}
            }
            .cpatc-widget:not(.cpatc-boxed), #widget-content {
                ${tempData?.widget_background !== undefined ? `background: ${tempData?.widget_background} !important;` : ""}
            }
            #widget-content {                
                ${tempData?.widget_padding_x !== undefined ? `padding-left: ${tempData?.widget_padding_x}px !important;` : ""}
                ${tempData?.widget_padding_x !== undefined ? `padding-right: ${tempData?.widget_padding_x}px !important;` : ""}
                ${tempData?.widget_padding_y !== undefined ? `padding-top: ${tempData?.widget_padding_y}px !important;` : ""}
                ${tempData?.widget_padding_y !== undefined ? `padding-bottom: ${tempData?.widget_padding_y}px !important;` : ""}                
            }
            .cpatc-product .cpatc-product-item-image {
                ${tempData?.image_size_x !== undefined ? `width: ${tempData?.image_size_x}px !important;` : ""}
                ${tempData?.image_size_x !== undefined ? `min-width: ${tempData?.image_size_x}px !important;` : ""}
                ${tempData?.image_size_y !== undefined ? `height: ${tempData?.image_size_y}px !important;` : ""}
            }
            .cpatc-content .cpatc-product-item-title {
                ${tempData?.title_color !== undefined ? `color: ${tempData?.title_color} !important;` : ""}
                ${tempData?.title_font_size !== undefined ? `font-size: ${tempData?.title_font_size}px !important;` : ""}
                ${tempData?.title_font_weight !== undefined ? `font-weight: ${tempData?.title_font_weight} !important;` : ""}
                ${tempData?.title_line_height !== undefined ? `line-height: ${tempData?.title_line_height}!important;` : ""}
                ${tempData?.title_spacing !== undefined ? `margin-bottom: ${tempData?.title_spacing}!important;` : ""}
            }
            .cpatc-content .cpatc-offer-price,
            .cpatc-actions .cpatc-offer-price {
                ${tempData?.offer_price_color !== undefined ? `color: ${tempData?.offer_price_color} !important;` : ""}
                ${tempData?.offer_price_font_size !== undefined ? `font-size: ${tempData?.offer_price_font_size}px !important;` : ""}
                ${tempData?.offer_price_font_weight !== undefined ? `font-weight: ${tempData?.offer_price_font_weight} !important;` : ""}
            }
            .cpatc-content .cpatc-item-compare-price,
            .cpatc-actions .cpatc-item-compare-price {
                ${tempData?.compare_price_color !== undefined ? `color: ${tempData?.compare_price_color} !important;` : ""}
                ${tempData?.compare_price_font_size !== undefined ? `font-size: ${tempData?.compare_price_font_size}px !important;` : ""}
                ${tempData?.compare_price_font_weight !== undefined ? `font-weight: ${tempData?.compare_price_font_weight} !important;` : ""}
            }
            .cpatc-select-outer {
                ${tempData?.variants_background !== undefined ? `background-color: ${tempData?.variants_background} !important;` : ""}                            
                ${tempData?.variants_font_weight !== undefined ? `font-weight: ${tempData?.variants_font_weight} !important;` : ""}
                ${tempData?.variants_border_width !== undefined ? `border-width: ${tempData?.variants_border_width}px !important;` : ""}
                ${tempData?.variants_border_color !== undefined ? `border-color: ${tempData?.variants_border_color} !important;` : ""}
                ${tempData?.variants_border_radius !== undefined ? `border-radius: ${tempData?.variants_border_radius}px !important;` : ""}
            }
            .cpatc-select-outer .cpatc-select {
                ${tempData?.variants_font_size !== undefined ? `font-size: ${tempData?.variants_font_size}px !important;` : ""}
                ${tempData?.variants_text_color !== undefined ? `color: ${tempData?.variants_text_color} !important;` : ""}
                ${tempData?.variants_height !== undefined ? `height: ${tempData?.variants_height}px !important;` : ""}                
            }
            .cpatc-action-wrapper .cpatc-action-btn  {
                ${tempData?.button_background !== undefined ? `background-color: ${tempData?.button_background} !important;` : ""}
                ${tempData?.button_text_color !== undefined ? `color: ${tempData?.button_text_color} !important;` : ""}
                ${tempData?.button_font_size !== undefined ? `font-size: ${tempData?.button_font_size}px !important;` : ""}
                ${tempData?.button_font_weight !== undefined ? `font-weight: ${tempData?.button_font_weight} !important;` : ""}
                ${tempData?.button_padding_x !== undefined ? `padding-left: ${tempData?.button_padding_x}px !important;` : ""}
                ${tempData?.button_padding_x !== undefined ? `padding-right: ${tempData?.button_padding_x}px !important;` : ""}
                ${tempData?.button_padding_y !== undefined ? `padding-top: ${tempData?.button_padding_y}px !important;` : ""}
                ${tempData?.button_padding_y !== undefined ? `padding-bottom: ${tempData?.button_padding_y}px !important;` : ""}
                ${tempData?.button_height !== undefined ? `height: ${tempData?.button_height}px !important;` : ""}
                ${tempData?.button_border_width !== undefined ? `border-width: ${tempData?.button_border_width}px !important;` : ""}
                ${tempData?.button_border_color !== undefined ? `border-color: ${tempData?.button_border_color} !important;` : ""}
                ${tempData?.button_border_radius !== undefined ? `border-radius: ${tempData?.button_border_radius}px !important;` : ""}
            }
            .cpatc-action-wrapper .cpatc-action-btn:hover  {
                ${tempData?.button_background_hover !== undefined ? `background-color: ${tempData?.button_background_hover} !important;` : ""}
                ${tempData?.button_border_hover_color !== undefined ? `border-color: ${tempData?.button_border_hover_color} !important;` : ""}
            }
        `;

        setCustomStyle(tempStylesheet);
    }

    const PriceFormat = (format, price) => {
        return format.replace('{{amount}}', parseFloat(price / 100).toFixed(2));
    }

    return (
        <UserDashboardLayout props={props}>
            <Loader loading={loadingUpdateWidgetTemplate || loadingResetWidgetTemplate} />
            <div className='flex flex-col overflow-hidden h-full max-h-full'>
                <div className='overflow-x-auto overflow-y-hidden flex flex-1 relative'>
                    <button className={`z-999 rounded-md  p-1.5  block lg:hidden ${sidebarToggle ? "fixed top-19 left-20 bg-graydark text-white border border-stroke shadow-sm" : "absolute left-90 mt-1 top-2"}`} onClick={() => setSidebarToggle(!sidebarToggle)}>
                        {
                            sidebarToggle ? <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M 22.1875 2.28125 L 20.78125 3.71875 L 25.0625 8 L 4 8 L 4 10 L 25.0625 10 L 20.78125 14.28125 L 22.1875 15.71875 L 28.90625 9 Z M 9.8125 16.28125 L 3.09375 23 L 9.8125 29.71875 L 11.21875 28.28125 L 6.9375 24 L 28 24 L 28 22 L 6.9375 22 L 11.21875 17.71875 Z"></path>
                            </svg> : <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z" /></svg>
                        }
                    </button>
                    <div className={`max-w-100 min-w-100 h-full absolute left-0 top-0 z-99 duration-300 ease-linear lg:static lg:translate-x-0 lg:ml-0 ${sidebarToggle ? "-translate-x-full -ml-0.5" : "-translate-x-0 -ml-0"}`}>
                        <form className='h-full' onSubmit={handleUpdateWidgetTemplate(onSubmitUpdateWidgetTemplate)}>
                            <div className="rounded-sm border bg-slate-50 border-stroke shadow-md flex flex-col h-full">
                                <div className='flex w-full border-b border-stroke bg-white'>
                                    <div className={`flex flex-col cursor-pointer flex-grow w-1/2 py-3 px-4 items-center font-medium text-black  ${tabToggle === "content" ? "border-b-4 border-green-500" : ""}`} onClick={() => setTabToggle('content')}>
                                        <span className='w-5 h-5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                                <path d="M 25 4.03125 C 24.234375 4.03125 23.484375 4.328125 22.90625 4.90625 L 13 14.78125 L 12.78125 15 L 12.71875 15.3125 L 12.03125 18.8125 L 11.71875 20.28125 L 13.1875 19.96875 L 16.6875 19.28125 L 17 19.21875 L 17.21875 19 L 27.09375 9.09375 C 28.246094 7.941406 28.246094 6.058594 27.09375 4.90625 C 26.515625 4.328125 25.765625 4.03125 25 4.03125 Z M 25 5.96875 C 25.234375 5.96875 25.464844 6.089844 25.6875 6.3125 C 26.132813 6.757813 26.132813 7.242188 25.6875 7.6875 L 16 17.375 L 14.28125 17.71875 L 14.625 16 L 24.3125 6.3125 C 24.535156 6.089844 24.765625 5.96875 25 5.96875 Z M 4 8 L 4 28 L 24 28 L 24 14.8125 L 22 16.8125 L 22 26 L 6 26 L 6 10 L 15.1875 10 L 17.1875 8 Z" />
                                            </svg>
                                        </span>
                                        Content
                                    </div>
                                    <div className={`flex flex-col cursor-pointer flex-grow w-1/2 py-3 px-4 items-center font-medium text-black ${tabToggle === "design" ? "border-b-4 border-green-500" : ""}`} onClick={() => setTabToggle('design')}>
                                        <span className='w-5 h-5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                                <path d="M 5.25 2.75 L 4.6875 3.28125 L 3.28125 4.6875 L 2.75 5.25 L 3.15625 5.90625 L 5.25 9.40625 L 5.53125 9.90625 L 8.46875 9.90625 L 12.46875 13.875 C 8.894531 17.464844 4.347656 22.027344 4.1875 22.1875 C 2.621094 23.753906 2.617188 26.320313 4.21875 27.8125 C 5.78125 29.355469 8.328125 29.394531 9.8125 27.8125 C 9.824219 27.800781 9.832031 27.792969 9.84375 27.78125 L 16 21.59375 L 22.1875 27.8125 L 22.28125 27.875 C 23.851563 29.355469 26.347656 29.375 27.8125 27.8125 L 27.8125 27.78125 L 27.84375 27.78125 C 29.375 26.214844 29.390625 23.667969 27.8125 22.1875 L 27.78125 22.15625 L 22.5625 16.96875 C 26.074219 16.640625 28.824219 13.675781 28.875 10.09375 L 28.90625 10.09375 C 28.910156 10.074219 28.90625 10.050781 28.90625 10.03125 C 28.90625 10.019531 28.90625 10.011719 28.90625 10 C 29.003906 8.84375 28.753906 7.738281 28.15625 6.78125 L 27.46875 5.71875 L 22.8125 10.375 L 21.40625 8.90625 L 26.15625 4.15625 L 24.78125 3.59375 C 23.976563 3.25 23.046875 3 22 3 C 18.15625 3 15 6.15625 15 10 C 15 10.417969 15.089844 10.78125 15.15625 11.15625 C 14.71875 11.59375 14.390625 11.953125 13.875 12.46875 L 9.90625 8.5 L 9.90625 5.53125 L 9.40625 5.25 L 5.90625 3.15625 Z M 22 5 C 22.140625 5 22.238281 5.082031 22.375 5.09375 L 18.59375 8.875 L 19.28125 9.59375 L 22.09375 12.5 L 22.78125 13.21875 L 26.75 9.25 C 26.769531 9.480469 26.933594 9.648438 26.90625 9.90625 L 26.90625 10 C 26.90625 12.753906 24.660156 15 21.90625 15 C 21.539063 15 21.09375 14.914063 20.59375 14.8125 L 20.0625 14.71875 L 19.6875 15.09375 L 8.40625 26.40625 L 8.375 26.40625 L 8.375 26.4375 C 7.664063 27.214844 6.421875 27.234375 5.59375 26.40625 L 5.59375 26.375 L 5.5625 26.375 C 4.785156 25.664063 4.765625 24.421875 5.59375 23.59375 C 5.972656 23.214844 13.3125 15.8125 16.90625 12.21875 L 17.3125 11.8125 L 17.15625 11.25 C 17.074219 10.925781 17 10.367188 17 10 C 17 7.246094 19.246094 5 22 5 Z M 5.5625 5.25 L 7.90625 6.6875 L 7.90625 7.6875 L 7.6875 7.90625 L 6.6875 7.90625 L 5.25 5.5625 Z M 20.1875 17.40625 L 26.40625 23.59375 L 26.40625 23.625 L 26.4375 23.625 C 27.214844 24.335938 27.234375 25.578125 26.40625 26.40625 L 26.375 26.40625 L 26.375 26.4375 C 25.664063 27.214844 24.421875 27.234375 23.59375 26.40625 L 17.40625 20.1875 Z" />
                                            </svg>
                                        </span>
                                        Design
                                    </div>
                                </div>
                                <div className="overflow-x-hidden overflow-y-auto flex flex-grow flex-col w-full">
                                    <div className={`p-4 ${tabToggle === "content" ? "" : "hide-desktop"}`}>
                                        <div className='bg-white border border-stroke px-4 py-3 flex items-center justify-between rounded-md shadow-sm mb-3'>
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
                                        <div className='card mb-3'>
                                            <h3 className='text-black font-bold mb-3'>Text Settings</h3>
                                            <div className='mb-3'>
                                                <label className="block-label">Button Text</label>
                                                <input type="text" className="block-form-control h-9" {...registerUpdateWidgetTemplate('button_text')} />
                                                {errorsUpdateWidgetTemplate?.button_text && <span className="text-danger text-sm text-bold">Please add text for the add to cart button</span>}
                                            </div>
                                            <div className='mb-3'>
                                                <label className="block-label">Button Text - After Adding to Cart</label>
                                                <input type="text" className="block-form-control h-9" {...registerUpdateWidgetTemplate('button_text_loading')} />
                                                {errorsUpdateWidgetTemplate?.button_text_loading && <span className="text-danger text-sm text-bold">Please add text for the add to cart button after loading</span>}
                                            </div>
                                            <div className='mb-3'>
                                                <label className="block-label">Page Redirect - After Adding to Cart</label>
                                                <div className="relative z-20 bg-input-color">
                                                    <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('button_redirect')}>
                                                        <option value="nothing">Do nothing (Stay on page)</option>
                                                        <option value="cart">Redirect to Cart Page</option>
                                                        <option value="checkout">Redirect to Checkout Page</option>
                                                    </select>
                                                    <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g opacity="0.5">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    {errorsUpdateWidgetTemplate?.button_redirect && <span className="text-danger text-sm text-bold">Please select a redirect type</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card mb-3'>
                                            <h3 className='text-black font-bold mb-3'>Widget Position</h3>
                                            <div>
                                                <div className="flex w-full space-x-4">
                                                    <label className="cursor-pointer select-none w-1/2 group cpatc-pw-label">
                                                        <input className='sr-only' type="radio" name='position' {...registerUpdateWidgetTemplate('widget_position')} value="top" onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_position: e.target.value
                                                            });
                                                        }} />
                                                        <div className='flex cpatc-pw-btn items-center justify-center border border-dashed border-slate-400 rounded-md group-hover:bg-input-color group-hover:bg-opacity-50'>
                                                            <img className='w-20 shadow-1' src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-top-position.svg`} alt='top' />
                                                        </div>
                                                    </label>
                                                    <label className="cursor-pointer select-none w-1/2 group cpatc-pw-label">
                                                        <input className='sr-only' type="radio" name='position' {...registerUpdateWidgetTemplate('widget_position')} value="bottom" onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_position: e.target.value
                                                            });
                                                        }} />
                                                        <div className='flex cpatc-pw-btn items-center justify-center border border-dashed border-slate-400 w-full rounded-md group-hover:bg-input-color group-hover:bg-opacity-50'>
                                                            <img className='w-20 shadow-1' src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-bottom-position.svg`} alt='bottom' />
                                                        </div>
                                                    </label>
                                                </div>
                                                {errorsUpdateWidgetTemplate?.widget_position && <span className="text-danger text-sm text-bold w-44 ml-auto">Please select a position</span>}
                                            </div>
                                        </div>
                                        <div className='card mb-3'>
                                            <h3 className='text-black font-bold mb-3 flex items-center'>Widget Type <Tooltip position="right" property={`w-4.5 h-4.5`} image={`${import.meta.env.VITE_APP_URL}/images/icon/info-circle-solid.svg`} alt="info" title={`For Desktop only`} /></h3>
                                            <div>
                                                <div className="flex space-x-4">
                                                    <label className="cursor-pointer select-none w-1/2 group cpatc-pw-label">
                                                        <input className='sr-only' type="radio" {...registerUpdateWidgetTemplate('widget_width')} value="fullwidth" onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_width: e.target.value
                                                            });
                                                        }} />
                                                        <div className='cpatc-pw-btn border border-dashed border-slate-400 w-full h-10 rounded-md group-hover:bg-input-color group-hover:bg-opacity-50 flex items-center'>
                                                            <div className='w-full h-2 m-1 rounded-full' style={{ backgroundColor: "#7D8F9B" }}></div>
                                                        </div>
                                                        <span className="mt-1 text-sm text-black text-center block">Full Width</span>
                                                    </label>
                                                    <label className="cursor-pointer select-none w-1/2 group cpatc-pw-label">
                                                        <input className='sr-only' type="radio" {...registerUpdateWidgetTemplate('widget_width')} value="boxed" onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_width: e.target.value
                                                            });
                                                        }} />
                                                        <div className='cpatc-pw-btn border border-dashed border-slate-400 w-full h-10 rounded-md group-hover:bg-input-color group-hover:bg-opacity-50 flex items-center justify-center '>
                                                            <div className='w-3/6 bg-slate-500 h-2 rounded-full' style={{ backgroundColor: "#7D8F9B" }}></div>
                                                        </div>
                                                        <span className="mt-1 text-sm text-black text-center block">Boxed</span>
                                                    </label>
                                                </div>
                                                {errorsUpdateWidgetTemplate?.widget_width && <span className="text-danger text-sm text-bold w-44 ml-auto">Please select a width</span>}
                                            </div>
                                        </div>
                                        <div className='card mb-3'>
                                            <div className='mb-5'>
                                                <h3 className="text-black font-bold mb-1">Widget Visibility</h3>
                                                <div className="relative z-20 bg-input-color">
                                                    <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('widget_visibility')}>
                                                        <option value="all">Show on all devices</option>
                                                        <option value="desktop">Show on desktop only</option>
                                                        <option value="mobile">Show on mobile only</option>
                                                    </select>
                                                    <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g opacity="0.5">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className='text-black mb-3 leading-tight'>Select the elements you want to hide</h3>
                                            <div>
                                                <div className='flex border border-stroke shadow-sm mb-5 rounded overflow-hidden'>
                                                    <div className={`w-1/2 px-3 py-2  flex justify-center items-center cursor-pointer ${deviceToggle === "desktop" ? "bg-black text-white" : ""}`} onClick={() => setDeviceToggle('desktop')}>
                                                        <svg fill='currentColor' className='w-6 mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 2 6 L 2 24 L 15 24 L 15 26 L 10 26 L 10 28 L 22 28 L 22 26 L 17 26 L 17 24 L 30 24 L 30 6 Z M 4 8 L 28 8 L 28 22 L 4 22 Z" /></svg>
                                                        Desktop
                                                    </div>
                                                    <div className={`w-1/2 px-3 py-2 flex justify-center items-center cursor-pointer ${deviceToggle === "mobile" ? "bg-black text-white" : ""}`} onClick={() => setDeviceToggle('mobile')}>
                                                        <svg fill='currentColor' className='w-6 mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 11 4 C 9.355469 4 8 5.355469 8 7 L 8 25 C 8 26.644531 9.355469 28 11 28 L 21 28 C 22.644531 28 24 26.644531 24 25 L 24 7 C 24 5.355469 22.644531 4 21 4 Z M 11 6 L 21 6 C 21.554688 6 22 6.445313 22 7 L 22 25 C 22 25.554688 21.554688 26 21 26 L 11 26 C 10.445313 26 10 25.554688 10 25 L 10 7 C 10 6.445313 10.445313 6 11 6 Z M 16 23 C 15.449219 23 15 23.449219 15 24 C 15 24.550781 15.449219 25 16 25 C 16.550781 25 17 24.550781 17 24 C 17 23.449219 16.550781 23 16 23 Z" /></svg>
                                                        Mobile
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${deviceToggle === "desktop" ? "transition-opacity ease-in-out delay-150 opacity-100 h-auto visible" : "h-0 opacity-0 invisible"}`}>
                                                <div className="relative z-20 bg-white flex flex-wrap">
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_image')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    desktop_hide_image: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Image</span>
                                                        </label>
                                                    </div>
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_title')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    desktop_hide_title: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Title</span>
                                                        </label>
                                                    </div>
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_compare_price')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    desktop_hide_compare_price: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Compare Price</span>
                                                        </label>
                                                    </div>
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_offer_price')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    desktop_hide_offer_price: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Offer Price</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${deviceToggle === "mobile" ? "transition-opacity ease-in-out delay-150 opacity-100 h-auto visible" : "h-0 opacity-0 invisible"}`}>
                                                <div className={`${deviceToggle === "mobile" ? "relative z-20 bg-white flex flex-wrap" : "hidden"}`}>
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_image')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    mobile_hide_image: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Image</span>
                                                        </label>
                                                    </div>
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_title')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    mobile_hide_title: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Title</span>
                                                        </label>
                                                    </div>
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_compare_price')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    mobile_hide_compare_price: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Compare Price</span>
                                                        </label>
                                                    </div>
                                                    <div className="mb-3 w-full">
                                                        <label className="flex cursor-pointer select-none items-center font-medium text-black">
                                                            <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_offer_price')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    mobile_hide_offer_price: e.target.checked
                                                                });
                                                            }} />
                                                            <span className="ml-3">Hide Offer Price</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card mb-3'>
                                            <h3 className='text-black font-medium mb-3 flex items-center'>Show widget</h3>
                                            <div className='flex items-center mb-4'>
                                                <label className="block-label max-w-28">After scrolling </label>
                                                <div className='min-w-15 max-w-15'>
                                                    <input type="number" className="block-form-control h-9" {...registerUpdateWidgetTemplate('widget_scroll')} />
                                                </div>
                                                <span className='text-sm text-black pl-2 font-medium'>% of The Page</span>
                                            </div>
                                            {errorsUpdateWidgetTemplate?.widget_scroll && <span className="text-danger text-sm text-bold">Please add a value</span>}
                                            <div>
                                                <label className="block-label">Widget Show/Hide animation</label>
                                                <div className="relative z-20 bg-input-color">
                                                    <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('widget_animation')}>
                                                        <option value="slide">Slide</option>
                                                        <option value="fade">Fade</option>
                                                    </select>
                                                    <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g opacity="0.5">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bg-white border border-stroke px-4 py-3 rounded-md shadow-sm mb-3'>
                                            <div className='flex items-center justify-between'>
                                                <label className="font-medium text-graydark flex items-center">Show Time Urgency Bar
                                                </label>
                                                <label className="relative inline-block w-15 h-8 switch-slider-wrap">
                                                    <input type="checkbox" className="sr-only" {...registerUpdateWidgetTemplate('urgency_bar_status')} onChange={(e) => {
                                                        setWidgetSettings({
                                                            ...widgetSettings,
                                                            urgency_bar_status: e.target.checked
                                                        })

                                                        if (e.target.checked) {
                                                            setTimeout(() => {
                                                                document.getElementsByClassName('intoView')[0].scrollIntoView({ block: "center", behavior: "smooth" })
                                                            }, 200);
                                                        }
                                                    }} />
                                                    <span className="absolute cursor-pointer inset-0 bg-red-600 ring-1 ring-red-700 transition-all slider rounded-full flex items-center">
                                                        <span className='status-text active text-white font-medium text-xs mr-8.5'>Yes</span>
                                                        <span className='status-text inactive text-white font-medium text-xs mr-2.5 ml-auto'>No</span>
                                                    </span>
                                                </label>
                                            </div>
                                            {
                                                widgetSettings?.urgency_bar_status ? <div className='pt-2'>
                                                    <div className='mb-4'>
                                                        <label className="block-label">Urgency Text</label>
                                                        <input type="text" className="block-form-control h-9" {...registerUpdateWidgetTemplate('urgency_bar_text')} />
                                                    </div>
                                                    <div className='mb-5'>
                                                        <label className="block-label">Countdown/Timer Style</label>
                                                        <div className="relative z-20 bg-input-color">
                                                            <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('urgency_bar_type')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    urgency_bar_type: e.target.value
                                                                });
                                                            }}>
                                                                <option value="minutes">Countdown based on remaining minutes</option>
                                                                <option value="specific">Countdown based on a specific date</option>
                                                            </select>
                                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.5">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {
                                                        widgetSettings?.urgency_bar_type === "minutes" ? <div className='mb-5 border border-stroke py-4 px-3.5 rounded-md intoView'>
                                                            <label className="block-label pb-2">Time Duration</label>
                                                            <div className='flex items-center'>
                                                                <input type="number" className="block-form-control max-w-25 h-9 text-center" {...registerUpdateWidgetTemplate('urgency_bar_duration')} />
                                                                <p className='text-black text-sm font-medium pl-2 italic'>In Minutes</p>
                                                            </div>
                                                        </div> : ""
                                                    }
                                                    {
                                                        widgetSettings?.urgency_bar_type === "specific" ? <div className='mb-5 border border-stroke py-4 px-3.5 rounded-md intoView'>
                                                            <div className='border-b border-stroke pb-5 mb-5'>
                                                                <label className="block-label pb-1">Start date</label>
                                                                <div className='flex'>
                                                                    <div className='w-1/2 mr-2'>
                                                                        <input type="date" className="block-form-control h-9 text-center" {...registerUpdateWidgetTemplate('urgency_bar_datestart')} />
                                                                    </div>
                                                                    <div className='flex'>
                                                                        <input type="time" className="block-form-control h-9 text-center" {...registerUpdateWidgetTemplate('urgency_bar_timestart')} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='mb-5'>
                                                                <label className="block-label pb-1">End date</label>
                                                                <div className='flex'>
                                                                    <div className='w-1/2 mr-2'>
                                                                        <input type="date" className="block-form-control h-9 text-center" {...registerUpdateWidgetTemplate('urgency_bar_dateend')} />
                                                                    </div>
                                                                    <div className='flex'>
                                                                        <input type="time" className="block-form-control h-9 text-center" {...registerUpdateWidgetTemplate('urgency_bar_timeend')} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : ""
                                                    }
                                                </div> : ""
                                            }
                                        </div>
                                    </div>
                                    <div className={`p-4 ${tabToggle === "design" ? "" : "hide-desktop"}`}>
                                        <div className='accordion-wrap'>
                                            <div className='accordion-item '>
                                                <label htmlFor='collapsible-item1' className='accordion-head cursor-pointer flex justify-between p-3'>
                                                    <h4 className='text-black font-bold'>
                                                        Theme Selection
                                                    </h4>
                                                </label>
                                                <input className='sr-only' type='checkbox' id="collapsible-item1" />
                                                <span className='accordion-icon'>
                                                    <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                                </span>
                                                <div className='accordion-content px-4 pb-4'>
                                                    <div className='flex justify-between items-center mb-4'>
                                                        <label className="block text-sm font-medium text-black">Template</label>
                                                        <div className='min-w-32 max-w-32'>
                                                            <div className="relative z-20 bg-input-color">
                                                                <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('widget_template')} onChange={(e) => {
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
                                                                    <option value="t4">Template 4</option>
                                                                    <option value="t5">Template 5</option>
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
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <label className="block text-sm font-medium text-black">Style</label>
                                                        <div className='min-w-32 max-w-32'>
                                                            <div className="relative z-20 bg-input-color">
                                                                <select className="block-select-control" {...registerUpdateWidgetTemplate('widget_style')} onChange={(e) => {
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
                                                                    <option value="s7">Style 7</option>
                                                                    <option value="s8">Style 8</option>
                                                                    <option value="s9">Style 9</option>
                                                                    <option value="s10">Style 10</option>
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
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className='accordion-item'>
                                            <label htmlFor="collapsible-item2" className='accordion-head cursor-pointer flex justify-between p-3'>
                                                <h4 className='text-black font-bold'>
                                                    Customize Widget
                                                </h4>
                                            </label>
                                            <input className='sr-only' type='checkbox' id="collapsible-item2" />
                                            <span className='accordion-icon'>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                            </span>
                                            <div className='accordion-content px-4 pb-4'>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Background Color</label>
                                                    <div className='min-w-32 max-w-34 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('widget_background')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_background: e.target.value
                                                            });

                                                            manageCustomStyle('widget_background', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Padding Top/Bottom</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('widget_padding_y')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_padding_y: e.target.value
                                                            });

                                                            manageCustomStyle('widget_padding_y', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Padding Left/Right</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('widget_padding_x')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_padding_x: e.target.value
                                                            });

                                                            manageCustomStyle('widget_padding_x', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Width</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('widget_border_width')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_border_width: e.target.value
                                                            });

                                                            manageCustomStyle('widget_border_width', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('widget_border_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_border_color: e.target.value
                                                            });

                                                            manageCustomStyle('widget_border_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label className="block text-sm font-medium text-black">Border Radius</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('widget_border_radius')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                widget_border_radius: e.target.value
                                                            });

                                                            manageCustomStyle('widget_border_radius', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordion-item'>
                                            <label htmlFor="collapsible-item3" className='accordion-head cursor-pointer flex justify-between p-3'>
                                                <h4 className='text-black font-bold'>
                                                    Customize Urgency Bar
                                                </h4>
                                            </label>
                                            <input className='sr-only' type='checkbox' id="collapsible-item3" />
                                            <span className='accordion-icon'>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                            </span>
                                            <div className='accordion-content px-4 pb-4'>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Background Color</label>
                                                    <div className='min-w-32 max-w-34 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('urgency_bar_background')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_background: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_background', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Text Color</label>
                                                    <div className='min-w-32 max-w-34 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('urgency_bar_text_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_text_color: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_text_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Spacing</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="number" className='block-form-control' {...registerUpdateWidgetTemplate('urgency_bar_padding_y')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_padding_y: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_padding_y', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('urgency_bar_timer_size')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_timer_size: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_timer_size', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Weight</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('urgency_bar_text_font_weight')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_text_font_weight: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_text_font_weight', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Countdown Text Color</label>
                                                    <div className='min-w-32 max-w-34 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('urgency_bar_timer_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_timer_color: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_timer_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Countdown Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('urgency_bar_text_size')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_text_size: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_text_size', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Countdown Font Weight</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('urgency_bar_timer_font_weight')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                urgency_bar_timer_font_weight: e.target.value
                                                            });

                                                            manageCustomStyle('urgency_bar_timer_font_weight', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordion-item'>
                                            <label htmlFor="collapsible-item4" className='accordion-head cursor-pointer flex justify-between p-3'>
                                                <h4 className='text-black font-bold'>
                                                    Customize Button
                                                </h4>
                                            </label>
                                            <input className='sr-only' type='checkbox' id="collapsible-item4" />
                                            <span className='accordion-icon'>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                            </span>
                                            <div className='accordion-content px-4 pb-4'>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Background Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('button_background')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_background: e.target.value
                                                            });

                                                            manageCustomStyle('button_background', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Background Color (Hover)</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('button_background_hover')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_background_hover: e.target.value
                                                            });

                                                            manageCustomStyle('button_background_hover', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Text Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('button_text_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_text_color: e.target.value
                                                            });

                                                            manageCustomStyle('button_text_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('button_font_size')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_font_size: e.target.value
                                                            });

                                                            manageCustomStyle('button_font_size', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Weight</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <div className="relative z-20 bg-input-color">
                                                            <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('button_font_weight')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    button_font_weight: e.target.value
                                                                });

                                                                manageCustomStyle('button_font_weight', e.target.value);
                                                            }}>
                                                                <option value="100">100</option>
                                                                <option value="200">200</option>
                                                                <option value="300">300</option>
                                                                <option value="400">400</option>
                                                                <option value="500">500</option>
                                                                <option value="600">600</option>
                                                                <option value="700">700</option>
                                                                <option value="800">800</option>
                                                                <option value="900">900</option>
                                                            </select>
                                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.5">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Padding Top/Bottom</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('button_padding_y')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_padding_y: e.target.value
                                                            });

                                                            manageCustomStyle('button_padding_y', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Padding Left/Right</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('button_padding_x')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_padding_x: e.target.value
                                                            });

                                                            manageCustomStyle('button_padding_x', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Height</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('button_height')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_height: e.target.value
                                                            });

                                                            manageCustomStyle('button_height', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('button_border_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_border_color: e.target.value
                                                            });

                                                            manageCustomStyle('button_border_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Color (Hover)</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('button_border_hover_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_border_hover_color: e.target.value
                                                            });

                                                            manageCustomStyle('button_border_hover_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Width</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('button_border_width')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_border_width: e.target.value
                                                            });

                                                            manageCustomStyle('button_border_width', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Radius</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('button_border_radius')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                button_border_radius: e.target.value
                                                            });

                                                            manageCustomStyle('button_border_radius', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordion-item'>
                                            <label htmlFor="collapsible-item5" className='accordion-head cursor-pointer flex justify-between p-3'>
                                                <h4 className='text-black font-bold'>
                                                    Customize Product Image
                                                </h4>
                                            </label>
                                            <input className='sr-only' type='checkbox' id="collapsible-item5" />
                                            <span className='accordion-icon'>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                            </span>
                                            <div className='accordion-content px-4 pb-4'>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Image Width</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('image_size_x')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                image_size_x: e.target.value
                                                            });

                                                            manageCustomStyle('image_size_x', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Image Height</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('image_size_y')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                image_size_y: e.target.value
                                                            });

                                                            manageCustomStyle('image_size_y', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordion-item rounded-md bg-white border border-stroke shadow-sm mb-3'>
                                            <label htmlFor="collapsible-item6" className='accordion-head cursor-pointer flex justify-between p-3'>
                                                <h4 className='text-black font-bold'>
                                                    Customize Product Title
                                                </h4>
                                            </label>
                                            <input className='sr-only' type='checkbox' id="collapsible-item6" />
                                            <span className='accordion-icon'>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                            </span>
                                            <div className='accordion-content px-4 pb-4'>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Title Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('title_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                title_color: e.target.value
                                                            });

                                                            manageCustomStyle('title_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('title_font_size')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                title_font_size: e.target.value
                                                            });

                                                            manageCustomStyle('title_font_size', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Weight</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <div className="relative z-20 bg-input-color">
                                                            <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('title_font_weight')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    title_font_weight: e.target.value
                                                                });

                                                                manageCustomStyle('title_font_weight', e.target.value);
                                                            }}>
                                                                <option value="100">100</option>
                                                                <option value="200">200</option>
                                                                <option value="300">300</option>
                                                                <option value="400">400</option>
                                                                <option value="500">500</option>
                                                                <option value="600">600</option>
                                                                <option value="700">700</option>
                                                                <option value="800">800</option>
                                                                <option value="900">900</option>
                                                            </select>
                                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.5">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Line Height</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('title_line_height')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                title_line_height: e.target.value
                                                            });

                                                            manageCustomStyle('title_line_height', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Spacing</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('title_spacing')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                title_spacing: e.target.value
                                                            });

                                                            manageCustomStyle('title_spacing', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordion-item'>
                                            <label htmlFor="collapsible-item7" className='accordion-head cursor-pointer flex justify-between p-3'>
                                                <h4 className='text-black font-bold'>
                                                    Customize Product Price
                                                </h4>
                                            </label>
                                            <input className='sr-only' type='checkbox' id="collapsible-item7" />
                                            <span className='accordion-icon'>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                            </span>
                                            <div className='accordion-content px-4 pb-4'>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Price Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('offer_price_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                offer_price_color: e.target.value
                                                            });

                                                            manageCustomStyle('offer_price_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('offer_price_font_size')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                offer_price_font_size: e.target.value
                                                            });

                                                            manageCustomStyle('offer_price_font_size', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Weight</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <div className="relative z-20 bg-input-color">
                                                            <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('offer_price_font_weight')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    offer_price_font_weight: e.target.value
                                                                });

                                                                manageCustomStyle('offer_price_font_weight', e.target.value);
                                                            }}>
                                                                <option value="100">100</option>
                                                                <option value="200">200</option>
                                                                <option value="300">300</option>
                                                                <option value="400">400</option>
                                                                <option value="500">500</option>
                                                                <option value="600">600</option>
                                                                <option value="700">700</option>
                                                                <option value="800">800</option>
                                                                <option value="900">900</option>
                                                            </select>
                                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.5">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-full h-px bg-stroke mb-4'></div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Compare Price Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('compare_price_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                compare_price_color: e.target.value
                                                            });

                                                            manageCustomStyle('compare_price_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('compare_price_font_size')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                compare_price_font_size: e.target.value
                                                            });

                                                            manageCustomStyle('compare_price_font_size', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <div className="relative z-20 bg-input-color">
                                                            <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('compare_price_font_weight')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    compare_price_font_weight: e.target.value
                                                                });

                                                                manageCustomStyle('compare_price_font_weight', e.target.value);
                                                            }}>
                                                                <option value="100">100</option>
                                                                <option value="200">200</option>
                                                                <option value="300">300</option>
                                                                <option value="400">400</option>
                                                                <option value="500">500</option>
                                                                <option value="600">600</option>
                                                                <option value="700">700</option>
                                                                <option value="800">800</option>
                                                                <option value="900">900</option>
                                                            </select>
                                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.5">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordion-item rounded-md bg-white border border-stroke shadow-sm mb-3'>
                                            <label htmlFor="collapsible-item8" className='accordion-head cursor-pointer flex justify-between p-3'>
                                                <h4 className='text-black font-bold'>
                                                    Customize Product Options
                                                </h4>
                                            </label>
                                            <input className='sr-only' type='checkbox' id="collapsible-item8" />
                                            <span className='accordion-icon'>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-chevron.svg`} alt='icon down' />
                                            </span>
                                            <div className='accordion-content px-4 pb-4'>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Background Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('variants_background')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                variants_background: e.target.value
                                                            });

                                                            manageCustomStyle('variants_background', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Text Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('variants_text_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                variants_text_color: e.target.value
                                                            });

                                                            manageCustomStyle('variants_text_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Size</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('variants_font_size')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                variants_font_size: e.target.value
                                                            });

                                                            manageCustomStyle('variants_font_size', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Font Weight</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <div className="relative z-20 bg-input-color">
                                                            <select className="block-select-control h-9" {...registerUpdateWidgetTemplate('variants_font_weight')} onChange={(e) => {
                                                                setWidgetSettings({
                                                                    ...widgetSettings,
                                                                    variants_font_weight: e.target.value
                                                                });

                                                                manageCustomStyle('variants_font_weight', e.target.value);
                                                            }}>
                                                                <option value="100">100</option>
                                                                <option value="200">200</option>
                                                                <option value="300">300</option>
                                                                <option value="400">400</option>
                                                                <option value="500">500</option>
                                                                <option value="600">600</option>
                                                                <option value="700">700</option>
                                                                <option value="800">800</option>
                                                                <option value="900">900</option>
                                                            </select>
                                                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="0.5">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#000"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Height</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('variants_height')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                variants_height: e.target.value
                                                            });

                                                            manageCustomStyle('variants_height', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Width</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('variants_border_width')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                variants_border_width: e.target.value
                                                            });

                                                            manageCustomStyle('variants_border_width', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Color</label>
                                                    <div className='min-w-32 max-w-32 flex justify-end'>
                                                        <input type="color" {...registerUpdateWidgetTemplate('variants_border_color')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                variants_border_color: e.target.value
                                                            });

                                                            manageCustomStyle('variants_border_color', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="block text-sm font-medium text-black">Border Radius</label>
                                                    <div className='min-w-32 max-w-32'>
                                                        <input type='number' className='block-form-control h-9' {...registerUpdateWidgetTemplate('variants_border_radius')} onChange={(e) => {
                                                            setWidgetSettings({
                                                                ...widgetSettings,
                                                                variants_border_radius: e.target.value
                                                            });

                                                            manageCustomStyle('variants_border_radius', e.target.value);
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-4 px-6 flex justify-end space-x-2 border-t border-stroke bg-white">
                                    {
                                        user?.widget_theme !== undefined && user?.widget_theme[`${widgetSettings?.widget_template}-${widgetSettings?.widget_style}`] ? <a className="flex justify-center rounded bg-black bg-opacity-10 px-6 py-2 font-medium text-graydark hover:bg-opacity-15" onClick={() => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                html: "This will reset the current style for the template to the initial values.",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes',
                                                cancelButtonText: "No"
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    initResetWidgetTemplate({
                                                        template: user?.widget_settings?.widget_template,
                                                        style: user?.widget_settings?.widget_style
                                                    });
                                                }
                                            });
                                        }}>
                                            Reset to Default
                                        </a> : ""
                                    }
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <style>{templateStyle}</style>
                    <style>{customStyle}</style>
                    <div className='flex-grow pl-11 lg:pl-4 xl:pl-6 overflow-auto'>
                        <div className={`${deviceToggle === "desktop" ? "transition-opacity ease-in delay-150 opacity-100 h-full visible" : "opacity-0 h-0 ease-out invisible"}`}>
                            <div className='border border-stroke shadow bg-white relative rounded-lg desktop-view flex flex-col h-full overflow-hidden'>
                                <div className='border-b border-stroke h-13 flex items-center justify-between'>
                                    <div className='flex pl-5 min-w-48 max-w-48 items-center'>
                                        <div className='flex space-x-2 w-25'>
                                            <span className='w-3 h-3 bg-red-400 rounded-full border border-red-500' onClick={() => {
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
                                            }}></span>
                                            <span className='w-3 h-3 bg-orange-300 rounded-full border border-orange-400'></span>
                                            <span className='w-3 h-3 bg-green-400 rounded-full border border-green-500'></span>
                                        </div>
                                        <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-safari-toolabr-left.svg`} alt='safari icons' />
                                    </div>
                                    <div className='max-w-96 w-full flex items-center'>
                                        <span className='mr-4'>
                                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.5 17.6147C7.63281 17.6147 7.84863 17.5649 8.05615 17.4487C12.7793 14.8008 14.3979 13.6802 14.3979 10.6504V4.30029C14.3979 3.42871 14.0244 3.15479 13.3188 2.85596C12.3394 2.44922 9.17676 1.31201 8.19727 0.97168C7.97314 0.896973 7.73242 0.847168 7.5 0.847168C7.26758 0.847168 7.02686 0.913574 6.81104 0.97168C5.83154 1.25391 2.66064 2.45752 1.68115 2.85596C0.983887 3.14648 0.602051 3.42871 0.602051 4.30029V10.6504C0.602051 13.6802 2.229 14.7925 6.94385 17.4487C7.15967 17.5649 7.36719 17.6147 7.5 17.6147ZM7.83203 2.2583C9.08545 2.75635 11.5176 3.63623 12.8042 4.07617C13.0283 4.15918 13.0781 4.27539 13.0781 4.55762V10.3433C13.0781 12.9082 11.8496 13.5806 8.01465 15.9131C7.77393 16.0625 7.64111 16.104 7.5083 16.1123V2.18359C7.59131 2.18359 7.69922 2.2085 7.83203 2.2583Z" fill="#737373" />
                                            </svg>
                                        </span>
                                        <div className='flex-grow bg-black bg-opacity-10 h-8 rounded-md flex justify-center items-center px-4'>
                                            <span className='mr-1'><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.21094 11.7158H6.78906C7.54492 11.7158 7.91406 11.3408 7.91406 10.5205V6.21973C7.91406 5.48145 7.60938 5.10059 6.98242 5.03613V3.55957C6.98242 1.35059 5.53516 0.28418 4 0.28418C2.46484 0.28418 1.01758 1.35059 1.01758 3.55957V5.06543C0.443359 5.15332 0.0859375 5.52832 0.0859375 6.21973V10.5205C0.0859375 11.3408 0.455078 11.7158 1.21094 11.7158ZM1.96094 3.43652C1.96094 1.96582 2.9043 1.18652 4 1.18652C5.0957 1.18652 6.03906 1.96582 6.03906 3.43652V5.03027L1.96094 5.03613V3.43652Z" fill="#9E9E9E" />
                                            </svg>
                                            </span>
                                            <a href="https://appvertix.com" target="_blank">
                                                <span className='text-xs font-medium text-zinc-500'>appvertix.com</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='pr-5 min-w-48 max-w-48 justify-end flex items-center'>
                                        <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-safari-toolabr-right.svg`} alt='safari icons' />
                                    </div>
                                </div>
                                <div className='relative flex-grow'>
                                    <div className='flex w-full max-w-230 mx-auto h-full pt-36 justify-between px-4'>
                                        <div className='w-1/2 pr-4'>
                                            <img src={`${import.meta.env.VITE_APP_URL}/images/cpwidget/tshirt-vector.jpg`} alt='safari icons' />
                                        </div>
                                        <div className='w-1/2 pt-4'>
                                            <div>
                                                <h1 className='font-semibold text-2xl mb-4'>Product title</h1>
                                                <div className='flex flex-col'>
                                                    <span className='w-20 h-3 bg-gray block rounded-md mb-4'></span>
                                                    <span className='w-4/5 h-3 bg-gray block rounded-md mb-3'></span>
                                                    <span className='w-8/12 h-3 bg-gray block rounded-md mb-3'></span>
                                                    <span className='w-20 h-3 bg-gray block rounded-md'></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="widget-area" className={`cpatc-widget cpatc-${widgetSettings?.widget_template}-${widgetSettings?.widget_style} ${widgetSettings?.widget_position === "top" ? "cpatc-fixed-d-top" : "cpatc-fixed-d-bottom"} ${widgetSettings?.widget_width === "boxed" ? "cpatc-boxed" : ""}`}>
                                        <div id='widget-container' className='has-shadow'>
                                            {
                                                widgetSettings?.urgency_bar_status ? <div className="cpatc-timer-wrapper">
                                                    <div className='cpatc-timer-container'>
                                                        <div className="cpatc-timer-title">{widgetSettings.urgency_bar_text}</div>
                                                        <div className="cpatc-timer-countdown">00:15:00</div>
                                                    </div>
                                                </div> : ""
                                            }
                                            <div id="widget-content">
                                                <div className="cpatc-product">
                                                    {
                                                        widgetSettings?.desktop_hide_image ? "" : <div className="cpatc-product-item-image">
                                                            <img id="widget-image" src="//cdn.shopify.com/s/files/1/1449/3238/products/guaranteed_navy.jpg?v=1521562674" />
                                                        </div>
                                                    }

                                                    <div className="cpatc-content">
                                                        {
                                                            widgetSettings?.desktop_hide_title ? "" : <div id="widget-title" className="cpatc-product-item-title">Product Title</div>
                                                        }
                                                        {
                                                            widgetSettings?.widget_template === 't1' || widgetSettings?.widget_template === 't4' ? <div id="widget-price" className="cpatc-product-price-wrapper">
                                                                {
                                                                    widgetSettings?.desktop_hide_offer_price ? "" : <span className="cpatc-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '3600')}</span>
                                                                }
                                                                {
                                                                    widgetSettings?.desktop_hide_compare_price ? "" : <span className="cpatc-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '4600')}</span>
                                                                }
                                                            </div> : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="cpatc-widget-events">
                                                    <div id="widget-options" className="cpatc-options">
                                                        <div className="cpatc-variant-opt">
                                                            <label className="cpatc-label cpatc-select-outer">
                                                                <select id="widget-option1" className="cpatc-select">
                                                                    <option value="Navy">Navy</option>
                                                                </select>
                                                                <span className="cpatc-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                            </label>
                                                        </div>
                                                        <div className="cpatc-variant-opt">
                                                            <label className="cpatc-label cpatc-select-outer">
                                                                <select id="widget-option2" className="cpatc-select">
                                                                    <option value="XS">XS</option>
                                                                    <option value="S">S</option>
                                                                    <option value="M">M</option>
                                                                    <option value="L">L</option>
                                                                    <option value="XL">XL</option>
                                                                </select>
                                                                <span className="cpatc-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="cpatc-actions">
                                                        {
                                                            widgetSettings?.widget_template === 't1' || widgetSettings?.widget_template === 't4' ? "" : <div id="widget-price" className="cpatc-product-price-wrapper">
                                                                {
                                                                    widgetSettings?.desktop_hide_offer_price ? "" : <span className="cpatc-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '3600')}</span>
                                                                }
                                                                {
                                                                    widgetSettings?.desktop_hide_compare_price ? "" : <span className="cpatc-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '4600')}</span>
                                                                }
                                                            </div>
                                                        }
                                                        <div className="cpatc-action-wrapper">
                                                            <button id="widget-submit" className="cpatc-action-btn">{widgetSettings?.button_text}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${deviceToggle === "mobile" ? "flex items-center transition-opacity ease-in delay-150 opacity-100 h-full visible min-h-180" : "opacity-0 h-0 ease-out invisible"}`}>
                            <div className={`border-slate-400 w-full max-w-94 mx-auto relative rounded-iphone-outer mobile-view max-h-203 boder-4 h-full ${deviceToggle === "mobile" ? "" : " hidden"}`}>
                                <div className='bg-white border-4 border-black w-full h-full relative  flex flex-col rounded-7xl overflow-hidden max-h-203'>
                                    <div className='relative w-full flex justify-center top-2.5 left-3 mb-4.5'>
                                        <img src={`${import.meta.env.VITE_APP_URL}/images/icon/icon-iphone-statusbar.svg`} alt='iphone status bar' />
                                    </div>
                                    <div className='relative flex-grow'>
                                        <div className='flex flex-col w-full mx-auto pt-4 px-4'>
                                            <div>
                                                <img src={`${import.meta.env.VITE_APP_URL}/images/cpwidget/tshirt-vector.jpg`} alt='safari icons' />
                                            </div>
                                            <div className='pt-4'>
                                                <div>
                                                    <h1 className='font-semibold text-2xl mb-4'>Product title</h1>
                                                    <div className='flex flex-col'>
                                                        <span className='w-20 h-3 bg-gray block rounded-md mb-4'></span>
                                                        <span className='w-4/5 h-3 bg-gray block rounded-md mb-3'></span>
                                                        <span className='w-8/12 h-3 bg-gray block rounded-md mb-3'></span>
                                                        <span className='w-20 h-3 bg-gray block rounded-md'></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="widget-area" className={`cpatc-widget cpatc-${widgetSettings?.widget_template}-${widgetSettings?.widget_style} ${widgetSettings?.widget_position === "top" ? "cpatc-fixed-d-top" : "cpatc-fixed-d-bottom"} ${widgetSettings?.widget_width === "boxed" ? "cpatc-boxed" : ""}`}>
                                            <div id="widget-container" className='has-shadow'>
                                                {
                                                    widgetSettings?.urgency_bar_status ? <div className="cpatc-timer-wrapper">
                                                        <div className='cpatc-timer-container'>
                                                            <div className="cpatc-timer-title">{widgetSettings.urgency_bar_text}</div>
                                                            <div className="cpatc-timer-countdown">00:15:00</div>
                                                        </div>
                                                    </div> : ""
                                                }
                                                <div id='widget-content'>
                                                    <div className="cpatc-product">
                                                        <div className="cpatc-product-item-image">
                                                            {
                                                                widgetSettings?.mobile_hide_image ? "" : <img id="widget-image" src="//cdn.shopify.com/s/files/1/1449/3238/products/guaranteed_navy.jpg?v=1521562674" />
                                                            }
                                                        </div>
                                                        <div className="cpatc-content">
                                                            {
                                                                widgetSettings?.mobile_hide_title ? "" : <div id="widget-title" className="cpatc-product-item-title">Product Title</div>
                                                            }
                                                            {
                                                                widgetSettings?.widget_template === 't1' || widgetSettings?.widget_template === 't4' ? <div id="widget-price" className="cpatc-product-price-wrapper">
                                                                    {
                                                                        widgetSettings?.mobile_hide_offer_price ? "" : <span className="cpatc-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '3600')}</span>
                                                                    }
                                                                    {
                                                                        widgetSettings?.mobile_hide_compare_price ? "" : <span className="cpatc-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '4600')}</span>
                                                                    }
                                                                </div> : ""
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="cpatc-widget-events">
                                                        <div id="widget-options" className="cpatc-options">
                                                            <div className="cpatc-variant-opt">
                                                                <label className="cpatc-label cpatc-select-outer">
                                                                    <select id="widget-option1" className="cpatc-select">
                                                                        <option value="Navy">Navy</option>
                                                                    </select>
                                                                    <span className="cpatc-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                                </label>
                                                            </div>
                                                            <div className="cpatc-variant-opt">
                                                                <label className="cpatc-label cpatc-select-outer">
                                                                    <select id="widget-option2" className="cpatc-select">
                                                                        <option value="XS">XS</option>
                                                                        <option value="S">S</option>
                                                                        <option value="M">M</option>
                                                                        <option value="L">L</option>
                                                                        <option value="XL">XL</option>
                                                                    </select>
                                                                    <span className="cpatc-select-indicate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z" /></svg></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="cpatc-actions">
                                                            {
                                                                widgetSettings?.widget_template === 't1' || widgetSettings?.widget_template === 't4' ? "" : <div id="widget-price" className="cpatc-product-price-wrapper">
                                                                    {
                                                                        widgetSettings?.mobile_hide_offer_price ? "" : <span className="cpatc-offer-price" id="widget-offer-price">{PriceFormat(user?.shop_details?.money_format, '3600')}</span>
                                                                    }
                                                                    {
                                                                        widgetSettings?.mobile_hide_compare_price ? "" : <span className="cpatc-item-compare-price" id="widget-compare-price">{PriceFormat(user?.shop_details?.money_format, '4600')}</span>
                                                                    }
                                                                </div>
                                                            }
                                                            <div className="cpatc-action-wrapper">
                                                                <button id="widget-submit" className="cpatc-action-btn cpatc-action-btn-md">{widgetSettings?.button_text}</button>
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
                </div>
            </div>
        </UserDashboardLayout>
    )
}