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
import { updateWidgetType, updateWidgetTemplate } from '../../api';
import { successHandler, errorHandler } from "../../helpers";

export function Templates(props) {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    useEffect(() => {
        setTimeout(() => {
            if (user?.widget_type === "custom-form") {
                setUpdateWidgetTemplateValue('widget_position', user?.widget_settings?.widget_position);
                setUpdateWidgetTemplateValue('product_image_size', user?.widget_settings?.product_image_size);
                setUpdateWidgetTemplateValue('product_image_style', user?.widget_settings?.product_image_style);
                setUpdateWidgetTemplateValue('product_title_size', user?.widget_settings?.product_title_size);
                setUpdateWidgetTemplateValue('product_title_color', user?.widget_settings?.product_title_color);
                setUpdateWidgetTemplateValue('option_selector_style', user?.widget_settings?.option_selector_style);
                setUpdateWidgetTemplateValue('option_selector_text_size', user?.widget_settings?.option_selector_text_size);
                setUpdateWidgetTemplateValue('option_selector_text_color', user?.widget_settings?.option_selector_text_color);
                setUpdateWidgetTemplateValue('compare_price_text_size', user?.widget_settings?.compare_price_text_size);
                setUpdateWidgetTemplateValue('compare_price_text_color', user?.widget_settings?.compare_price_text_color);
                setUpdateWidgetTemplateValue('offer_price_text_size', user?.widget_settings?.offer_price_text_size);
                setUpdateWidgetTemplateValue('offer_price_text_color', user?.widget_settings?.offer_price_text_color);
                setUpdateWidgetTemplateValue('add_to_cart_button_text_size', user?.widget_settings?.add_to_cart_button_text_size);
                setUpdateWidgetTemplateValue('add_to_cart_button_text_color', user?.widget_settings?.add_to_cart_button_text_color);
                setUpdateWidgetTemplateValue('add_to_cart_button_background_color', user?.widget_settings?.add_to_cart_button_background_color);
                setUpdateWidgetTemplateValue('add_to_cart_button_style', user?.widget_settings?.add_to_cart_button_style);
                setUpdateWidgetTemplateValue('add_to_cart_button_border_width', user?.widget_settings?.add_to_cart_button_border_width);
                setUpdateWidgetTemplateValue('add_to_cart_button_border_color', user?.widget_settings?.add_to_cart_button_border_color);
            } 
                
            let index = user?.widget_type.replace('template', '');
            document.getElementsByName('template-selector')[index - 1].checked = true;
        }, 3000);
    }, []);

    const { mutate: initUpdateWidgetType } = useMutation(updateWidgetType, {
        onSuccess: (result) => {
            successHandler(result);
            setUser(result.data);
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    const { register: registerUpdateWidgetTemplate, handleSubmit: handleUpdateWidgetTemplate, formState: { errors: errorsUpdateWidgetTemplate }, setValue: setUpdateWidgetTemplateValue } = useForm({
        resolver: yupResolver(
            yup.object().shape({
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

    const onSubmitUpdateProfile = (form) => {
        initUpdateWidgetTemplate(form);
    }

    const { register: registerUpdateWidgetTemplate2, handleSubmit: handleUpdateWidgetTemplate2, formState: { errors: errorsUpdateWidgetTemplate2 }, setValue: setUpdateWidgetTemplateValue2 } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_style: yup.string().required()
            })
        )
    });

    const onSubmitUpdateProfile2 = (form) => {
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

            <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                <div className="border-b border-stroke px-7 py-4">
                    <h3 className="font-medium text-black">
                        <input type="radio" name="template-selector" value="template1" onClick={() => initUpdateWidgetType({
                            widget_type: 'template1'
                        })} />
                        <span className="ml-2">Template 1 (Default)</span>
                    </h3>
                </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                <div className="border-b border-stroke px-7 py-4">
                    <h3 className="font-medium text-black">
                        <input type="radio" name="template-selector" value="template2" onClick={() => initUpdateWidgetType({
                            widget_type: 'template2'
                        })} />
                        <span className="ml-2">Template 2</span>
                    </h3>
                </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                <div className="border-b border-stroke px-7 py-4">
                    <h3 className="font-medium text-black">
                        <input type="radio" name="template-selector" value="template3" onClick={() => initUpdateWidgetType({
                            widget_type: 'template3'
                        })} />
                        <span className="ml-2">Template 3</span>
                    </h3>
                </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                <div className="border-b border-stroke px-7 py-4">
                    <h3 className="font-medium text-black">
                        <input type="radio" name="template-selector" value="template4" onClick={() => initUpdateWidgetType({
                            widget_type: 'template4'
                        })} />
                        <span className="ml-2">Template 4</span>
                    </h3>
                </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                <div className="border-b border-stroke px-7 py-4">
                    <h3 className="font-medium text-black">
                        <input type="radio" name="template-selector" value="template5" onClick={() => initUpdateWidgetType({
                            widget_type: 'template5'
                        })} />
                        <span className="ml-2">Template 5</span>
                    </h3>
                </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                <div className="border-b border-stroke px-7 py-4">
                    <h3 className="font-medium text-black">
                        <input type="radio" name="template-selector" value="template6" onClick={() => initUpdateWidgetType({
                            widget_type: 'template6'
                        })} />
                        <span className="ml-2">Template 6</span>
                    </h3>
                </div>
            </div>

            {
                user?.plan_details === undefined ? <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                    <div className="border-b border-stroke px-7 py-4">
                        <h3 className="font-medium text-black">
                            <input type="radio" name="template-selector" value="custom-form" onClick={() => initUpdateWidgetType({
                                widget_type: 'custom-form'
                            })} />
                            <span className="ml-2">Customize Widget Form - (Ideal for users not experienced with HTML, CSS)</span>
                        </h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleUpdateWidgetTemplate(onSubmitUpdateProfile)}>
                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                <div className="relative z-20 bg-white">
                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('widget_position')}>
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
                                    {errorsUpdateWidgetTemplate?.widget_position && <span className="text-danger text-sm text-bold">Please select a widget position</span>}
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Product Image Size</label>
                                <div className="relative z-20 bg-white">
                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('product_image_size')}>
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
                                    {errorsUpdateWidgetTemplate?.product_image_size && <span className="text-danger text-sm text-bold">Please select a product image size</span>}
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Product Image Style</label>
                                <div className="relative z-20 bg-white">
                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('product_image_style')}>
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
                                    {errorsUpdateWidgetTemplate?.product_image_style && <span className="text-danger text-sm text-bold">Please select a product image style</span>}
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Product Title Size</label>
                                <div className="relative z-20 bg-white">
                                    <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('product_title_size')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.product_title_size && <span className="text-danger text-sm text-bold">Please select a product title size</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Product Title Color</label>
                                <div className="relative z-20 bg-white">
                                    <input type="color" {...registerUpdateWidgetTemplate('product_title_color')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.product_title_color && <span className="text-danger text-sm text-bold">Please select a product title color</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Option Selector Style</label>
                                <div className="relative z-20 bg-white">
                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('option_selector_style')}>
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
                                    {errorsUpdateWidgetTemplate?.option_selector_style && <span className="text-danger text-sm text-bold">Please select a option selector style</span>}
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Option Selector Text Size</label>
                                <div className="relative z-20 bg-white">
                                    <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('option_selector_text_size')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.option_selector_text_size && <span className="text-danger text-sm text-bold">Please select a option selector text size</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Option Selector Text Color</label>
                                <div className="relative z-20 bg-white">
                                    <input type="color" {...registerUpdateWidgetTemplate('option_selector_text_color')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.option_selector_text_color && <span className="text-danger text-sm text-bold">Please select a option selector text color</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Compare Price Text Size</label>
                                <div className="relative z-20 bg-white">
                                    <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('compare_price_text_size')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.compare_price_text_size && <span className="text-danger text-sm text-bold">Please select a compare price text size</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Compare Price Text Color</label>
                                <div className="relative z-20 bg-white">
                                    <input type="color" {...registerUpdateWidgetTemplate('compare_price_text_color')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.compare_price_text_color && <span className="text-danger text-sm text-bold">Please select a compare price text color</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Offer Price Text Size</label>
                                <div className="relative z-20 bg-white">
                                    <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('offer_price_text_size')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.offer_price_text_size && <span className="text-danger text-sm text-bold">Please select a offer price text size</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Offer Price Text Color</label>
                                <div className="relative z-20 bg-white">
                                    <input type="color" {...registerUpdateWidgetTemplate('offer_price_text_color')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.offer_price_text_color && <span className="text-danger text-sm text-bold">Please select a offer price text color</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Text Size</label>
                                <div className="relative z-20 bg-white">
                                    <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('add_to_cart_button_text_size')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.add_to_cart_button_text_size && <span className="text-danger text-sm text-bold">Please select a add to cart button text size</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Text Color</label>
                                <div className="relative z-20 bg-white">
                                    <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_text_color')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.add_to_cart_button_text_color && <span className="text-danger text-sm text-bold">Please select a add to cart button text color</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Background Color</label>
                                <div className="relative z-20 bg-white">
                                    <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_background_color')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.add_to_cart_button_background_color && <span className="text-danger text-sm text-bold">Please select a add to cart button background color</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Style</label>
                                <div className="relative z-20 bg-white">
                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('add_to_cart_button_style')}>
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
                                    {errorsUpdateWidgetTemplate?.add_to_cart_button_style && <span className="text-danger text-sm text-bold">Please select a add to cart button style</span>}
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Border Width</label>
                                <div className="relative z-20 bg-white">
                                    <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('add_to_cart_button_border_width')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.add_to_cart_button_border_width && <span className="text-danger text-sm text-bold">Please select a add to cart button border width</span>}
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Border Color</label>
                                <div className="relative z-20 bg-white">
                                    <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_border_color')} />
                                </div>
                                {errorsUpdateWidgetTemplate?.add_to_cart_button_border_color && <span className="text-danger text-sm text-bold">Please select a add to cart button border color</span>}
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

            {
                user?.plan_details === undefined ? <div className="rounded-sm border border-stroke bg-white shadow-default">
                    <div className="border-b border-stroke px-7 py-4">
                        <h3 className="font-medium text-black">
                            <input type="radio" name="template-selector" value="custom-css" onClick={() => initUpdateWidgetType({
                                widget_type: 'custom-css'
                            })} />
                            <span className="ml-2">Customize Widget Direct - (Ideal for users experienced with HTML, CSS or Web Developers)</span>
                        </h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleUpdateWidgetTemplate2(onSubmitUpdateProfile2)}>
                            <div className="mb-5.5">
                                <label className="mb-3 block text-sm font-medium text-black">Widget Style</label>
                                <textarea className="w-full rounded border border-stroke px-5 py-3 font-normal text-black outline-none transition focus:border-primary" rows={20} {...registerUpdateWidgetTemplate2('widget_style')} ></textarea>
                                <div className="relative z-20 bg-white">
                                    {errorsUpdateWidgetTemplate2?.widget_style && <span className="text-danger text-sm text-bold">Please add a custom widget style</span>}
                                </div>
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
        </UserDashboardLayout>
    )
}