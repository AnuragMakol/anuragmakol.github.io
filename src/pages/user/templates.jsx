import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useRecoilState } from "recoil";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Loader } from '../../loader';
import { UserDashboardLayout } from '../../components/layouts';

import { userStore } from '../../atoms';
import { updateWidgetSelectedTemplate, updateWidgetTemplate } from '../../api';
import { successHandler, errorHandler } from "../../helpers";

export function Templates(props) {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    useEffect(() => {
        // Selected Template
        let index = user?.widget_selected_template.replace('template', '');
        document.getElementsByName('template-selector')[index - 1].checked = true;

        // Template 1
        setUpdateWidgetTemplateValue1('widget_position', user?.widget_template_settings?.template1?.widget_position);
        setUpdateWidgetTemplateValue1('product_image_size', user?.widget_template_settings?.template1?.product_image_size);

        // Template 2
        setUpdateWidgetTemplateValue2('widget_position', user?.widget_template_settings?.template2?.widget_position);
        setUpdateWidgetTemplateValue2('product_image_size', user?.widget_template_settings?.template2?.product_image_size);

        // Template 3
        setUpdateWidgetTemplateValue3('widget_position', user?.widget_template_settings?.template3?.widget_position);
        setUpdateWidgetTemplateValue3('product_image_size', user?.widget_template_settings?.template3?.product_image_size);

        // Template 4
        setUpdateWidgetTemplateValue4('widget_position', user?.widget_template_settings?.template4?.widget_position);
        setUpdateWidgetTemplateValue4('product_image_size', user?.widget_template_settings?.template4?.product_image_size);

        // Template 5
        setUpdateWidgetTemplateValue5('widget_position', user?.widget_template_settings?.template5?.widget_position);
        setUpdateWidgetTemplateValue5('product_image_size', user?.widget_template_settings?.template5?.product_image_size);

        // Template 6
        setUpdateWidgetTemplateValue6('widget_position', user?.widget_template_settings?.template6?.widget_position);
        setUpdateWidgetTemplateValue6('product_image_size', user?.widget_template_settings?.template6?.product_image_size);

        // Template 7
        setUpdateWidgetTemplateValue7('widget_position', user?.widget_template_settings?.template7?.widget_position);
        setUpdateWidgetTemplateValue7('product_image_size', user?.widget_template_settings?.template7?.product_image_size);

        // Template 8
        setUpdateWidgetTemplateValue8('widget_position', user?.widget_template_settings?.template8?.widget_position);
        setUpdateWidgetTemplateValue8('product_image_size', user?.widget_template_settings?.template8?.product_image_size);

        // Custom Form
        setUpdateWidgetTemplateValueCustom('widget_position', user?.widget_template_settings?.customform?.widget_position);
        setUpdateWidgetTemplateValueCustom('product_image_size', user?.widget_template_settings?.customform?.product_image_size);
        setUpdateWidgetTemplateValueCustom('product_image_style', user?.widget_template_settings?.customform?.product_image_style);
        setUpdateWidgetTemplateValueCustom('product_title_size', user?.widget_template_settings?.customform?.product_title_size);
        setUpdateWidgetTemplateValueCustom('product_title_color', user?.widget_template_settings?.customform?.product_title_color);
        setUpdateWidgetTemplateValueCustom('option_selector_style', user?.widget_template_settings?.customform?.option_selector_style);
        setUpdateWidgetTemplateValueCustom('option_selector_text_size', user?.widget_template_settings?.customform?.option_selector_text_size);
        setUpdateWidgetTemplateValueCustom('option_selector_text_color', user?.widget_template_settings?.customform?.option_selector_text_color);
        setUpdateWidgetTemplateValueCustom('compare_price_text_size', user?.widget_template_settings?.customform?.compare_price_text_size);
        setUpdateWidgetTemplateValueCustom('compare_price_text_color', user?.widget_template_settings?.customform?.compare_price_text_color);
        setUpdateWidgetTemplateValueCustom('offer_price_text_size', user?.widget_template_settings?.customform?.offer_price_text_size);
        setUpdateWidgetTemplateValueCustom('offer_price_text_color', user?.widget_template_settings?.customform?.offer_price_text_color);
        setUpdateWidgetTemplateValueCustom('add_to_cart_button_text_size', user?.widget_template_settings?.customform?.add_to_cart_button_text_size);
        setUpdateWidgetTemplateValueCustom('add_to_cart_button_text_color', user?.widget_template_settings?.customform?.add_to_cart_button_text_color);
        setUpdateWidgetTemplateValueCustom('add_to_cart_button_background_color', user?.widget_template_settings?.customform?.add_to_cart_button_background_color);
        setUpdateWidgetTemplateValueCustom('add_to_cart_button_style', user?.widget_template_settings?.customform?.add_to_cart_button_style);
        setUpdateWidgetTemplateValueCustom('add_to_cart_button_border_width', user?.widget_template_settings?.customform?.add_to_cart_button_border_width);
        setUpdateWidgetTemplateValueCustom('add_to_cart_button_border_color', user?.widget_template_settings?.customform?.add_to_cart_button_border_color);
    }, []);

    const { mutate: initUpdateWidgetSelectedTemplate } = useMutation(updateWidgetSelectedTemplate, {
        onSuccess: (result) => {
            successHandler(result);
            setUser(result.data);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const { register: registerUpdateWidgetTemplate1, handleSubmit: handleUpdateWidgetTemplate1, formState: { errors: errorsUpdateWidgetTemplate1 }, setValue: setUpdateWidgetTemplateValue1 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplate2, handleSubmit: handleUpdateWidgetTemplate2, formState: { errors: errorsUpdateWidgetTemplate2 }, setValue: setUpdateWidgetTemplateValue2 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplate3, handleSubmit: handleUpdateWidgetTemplate3, formState: { errors: errorsUpdateWidgetTemplate3 }, setValue: setUpdateWidgetTemplateValue3 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplate4, handleSubmit: handleUpdateWidgetTemplate4, formState: { errors: errorsUpdateWidgetTemplate4 }, setValue: setUpdateWidgetTemplateValue4 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplate5, handleSubmit: handleUpdateWidgetTemplate5, formState: { errors: errorsUpdateWidgetTemplate5 }, setValue: setUpdateWidgetTemplateValue5 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplate6, handleSubmit: handleUpdateWidgetTemplate6, formState: { errors: errorsUpdateWidgetTemplate6 }, setValue: setUpdateWidgetTemplateValue6 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplate7, handleSubmit: handleUpdateWidgetTemplate7, formState: { errors: errorsUpdateWidgetTemplate7 }, setValue: setUpdateWidgetTemplateValue7 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplate8, handleSubmit: handleUpdateWidgetTemplate8, formState: { errors: errorsUpdateWidgetTemplate8 }, setValue: setUpdateWidgetTemplateValue8 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required()
            })
        )
    });

    const { register: registerUpdateWidgetTemplateCustom, handleSubmit: handleUpdateWidgetTemplateCustom, formState: { errors: errorsUpdateWidgetTemplateCustom }, setValue: setUpdateWidgetTemplateValueCustom } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required(),
                product_image_size: yup.string().required(),
                product_image_style: yup.string().required(),
                product_title_size: yup.string().required(),
                product_title_color: yup.string().required(),
                option_selector_style: yup.string().required(),
                option_selector_text_size: yup.string().required(),
                option_selector_text_color: yup.string().required(),
                compare_price_text_size: yup.string().required(),
                compare_price_text_color: yup.string().required(),
                offer_price_text_size: yup.string().required(),
                offer_price_text_color: yup.string().required(),
                add_to_cart_button_text_size: yup.string().required(),
                add_to_cart_button_text_color: yup.string().required(),
                add_to_cart_button_background_color: yup.string().required(),
                add_to_cart_button_style: yup.string().required(),
                add_to_cart_button_border_width: yup.string().required(),
                add_to_cart_button_border_color: yup.string().required()
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

    return (
        <UserDashboardLayout props={props}>
            <Loader loading={loadingUpdateWidgetTemplate} />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-bold text-black ">
                    Templates
                </h2>
            </div>

            <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template1" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template1'
                                })} />
                                <span className="ml-2">Template 1 (Default)</span>
                            </h3>
                        </div>

                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate1(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template1" {...registerUpdateWidgetTemplate1('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate1('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate1?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template2" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template2'
                                })} />
                                <span className="ml-2">Template 2</span>
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate2(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template2" {...registerUpdateWidgetTemplate2('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate2('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate2?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template3" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template3'
                                })} />
                                <span className="ml-2">Template 3</span>
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate3(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template3" {...registerUpdateWidgetTemplate3('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate3('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate3?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template4" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template4'
                                })} />
                                <span className="ml-2">Template 4</span>
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate4(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template4" {...registerUpdateWidgetTemplate4('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate4('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate4?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template5" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template5'
                                })} />
                                <span className="ml-2">Template 5</span>
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate5(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template5" {...registerUpdateWidgetTemplate5('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate5('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate5?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template6" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template6'
                                })} />
                                <span className="ml-2">Template 6</span>
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate6(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template6" {...registerUpdateWidgetTemplate6('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate6('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate6?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template7" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template2'
                                })} />
                                <span className="ml-2">Template 7</span>
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate7(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template7" {...registerUpdateWidgetTemplate7('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate7('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate7?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                        <div className="border-b border-stroke px-7 py-4">
                            <h3 className="font-medium text-black">
                                <input type="radio" name="template-selector" value="template8" onClick={() => initUpdateWidgetSelectedTemplate({
                                    widget_selected_template: 'template2'
                                })} />
                                <span className="ml-2">Template 8</span>
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate8(onSubmitUpdateWidgetTemplate)}>
                                <input type="hidden" value="template8" {...registerUpdateWidgetTemplate8('widget_template')} />
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate8('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top-left">Floating Top Left</option>
                                            <option value="floating-top-right">Floating Top Right</option>
                                            <option value="floating-bottom-left">Floating Bottom Left</option>
                                            <option value="floating-bottom-right">Floating Bottom Right</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate8?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {
                        user?.plan_details === undefined ? <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                            <div className="border-b border-stroke px-7 py-4">
                                <h3 className="font-medium text-black">
                                    <input type="radio" name="template-selector" value="customform" onClick={() => initUpdateWidgetSelectedTemplate({
                                        widget_selected_template: 'customform'
                                    })} />
                                    <span className="ml-2">Customize Widget Form - (Ideal for users not experienced with HTML, CSS)</span>
                                </h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={handleUpdateWidgetTemplateCustom(onSubmitUpdateWidgetTemplate)}>
                                    <input type="hidden" value="customform" {...registerUpdateWidgetTemplateCustom('widget_template')} />
                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                        <div className="relative z-20 bg-white">
                                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplateCustom('widget_position')}>
                                                <option value="">Select Position</option>
                                                <option value="fixed-top">Fixed Top</option>
                                                <option value="fixed-bottom">Fixed Bottom</option>
                                                <option value="floating-top-left">Floating Top Left</option>
                                                <option value="floating-top-right">Floating Top Right</option>
                                                <option value="floating-bottom-left">Floating Bottom Left</option>
                                                <option value="floating-bottom-right">Floating Bottom Right</option>
                                            </select>
                                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            {errorsUpdateWidgetTemplateCustom?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Product Image Size</label>
                                        <div className="relative z-20 bg-white">
                                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplateCustom('product_image_size')}>
                                                <option value="">Select Product Image Size</option>
                                                <option value="32">32px x 32px</option>
                                                <option value="48">48px x 48px</option>
                                                <option value="64">64px x 64px</option>
                                                <option value="128">128px x 128px</option>
                                            </select>
                                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            {errorsUpdateWidgetTemplateCustom?.product_image_size && <span className="text-danger text-sm text-bold">Please select a product image size</span>}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Product Image Style</label>
                                        <div className="relative z-20 bg-white">
                                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplateCustom('product_image_style')}>
                                                <option value="">Select Image Style</option>
                                                <option value="rounded">Rounded</option>
                                                <option value="squared">Squared</option>
                                            </select>
                                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            {errorsUpdateWidgetTemplateCustom?.product_image_style && <span className="text-danger text-sm text-bold">Please select a product image style</span>}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Product Title Size</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplateCustom('product_title_size')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.product_title_size && <span className="text-danger text-sm text-bold">Please select a product title size</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Product Title Color</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="color" {...registerUpdateWidgetTemplateCustom('product_title_color')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.product_title_color && <span className="text-danger text-sm text-bold">Please select a product title color</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Option Selector Style</label>
                                        <div className="relative z-20 bg-white">
                                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplateCustom('option_selector_style')}>
                                                <option value="">Select Option Selector Style</option>
                                                <option value="rounded">Rounded</option>
                                                <option value="squared">Squared</option>
                                            </select>
                                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            {errorsUpdateWidgetTemplateCustom?.option_selector_style && <span className="text-danger text-sm text-bold">Please select a option selector style</span>}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Option Selector Text Size</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplateCustom('option_selector_text_size')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.option_selector_text_size && <span className="text-danger text-sm text-bold">Please select a option selector text size</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Option Selector Text Color</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="color" {...registerUpdateWidgetTemplateCustom('option_selector_text_color')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.option_selector_text_color && <span className="text-danger text-sm text-bold">Please select a option selector text color</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Compare Price Text Size</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplateCustom('compare_price_text_size')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.compare_price_text_size && <span className="text-danger text-sm text-bold">Please select a compare price text size</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Compare Price Text Color</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="color" {...registerUpdateWidgetTemplateCustom('compare_price_text_color')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.compare_price_text_color && <span className="text-danger text-sm text-bold">Please select a compare price text color</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Offer Price Text Size</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplateCustom('offer_price_text_size')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.offer_price_text_size && <span className="text-danger text-sm text-bold">Please select a offer price text size</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Offer Price Text Color</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="color" {...registerUpdateWidgetTemplateCustom('offer_price_text_color')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.offer_price_text_color && <span className="text-danger text-sm text-bold">Please select a offer price text color</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Text Size</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplateCustom('add_to_cart_button_text_size')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.add_to_cart_button_text_size && <span className="text-danger text-sm text-bold">Please select a add to cart button text size</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Text Color</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="color" {...registerUpdateWidgetTemplateCustom('add_to_cart_button_text_color')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.add_to_cart_button_text_color && <span className="text-danger text-sm text-bold">Please select a add to cart button text color</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Background Color</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="color" {...registerUpdateWidgetTemplateCustom('add_to_cart_button_background_color')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.add_to_cart_button_background_color && <span className="text-danger text-sm text-bold">Please select a add to cart button background color</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Style</label>
                                        <div className="relative z-20 bg-white">
                                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplateCustom('add_to_cart_button_style')}>
                                                <option value="">Select Add to Cart Button Style</option>
                                                <option value="rounded">Rounded</option>
                                                <option value="squared">Squared</option>
                                            </select>
                                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.8">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            {errorsUpdateWidgetTemplateCustom?.add_to_cart_button_style && <span className="text-danger text-sm text-bold">Please select a add to cart button style</span>}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Border Width</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplateCustom('add_to_cart_button_border_width')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.add_to_cart_button_border_width && <span className="text-danger text-sm text-bold">Please select a add to cart button border width</span>}
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Border Color</label>
                                        <div className="relative z-20 bg-white">
                                            <input type="color" {...registerUpdateWidgetTemplateCustom('add_to_cart_button_border_color')} />
                                        </div>
                                        {errorsUpdateWidgetTemplateCustom?.add_to_cart_button_border_color && <span className="text-danger text-sm text-bold">Please select a add to cart button border color</span>}
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div> : ""
                    }
                </div>

                <div>
                    View area
                </div>
            </div>
        </UserDashboardLayout>
    )
}