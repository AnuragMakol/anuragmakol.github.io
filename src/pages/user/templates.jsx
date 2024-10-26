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
import { updateWidgetTemplate } from '../../api';
import { successHandler, errorHandler } from "../../helpers";

export function Templates(props) {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userStore);

    useEffect(() => {
        setValueUpdateWidgetTemplate('widget_template', user?.widget_settings?.widget_template);
        setValueUpdateWidgetTemplate('widget_position', user?.widget_settings?.widget_position);

        setValueUpdateWidgetTemplate('desktop_hide_image', user?.widget_settings?.desktop_hide_image);
        setValueUpdateWidgetTemplate('desktop_hide_title', user?.widget_settings?.desktop_hide_title);
        setValueUpdateWidgetTemplate('desktop_hide_compare_price', user?.widget_settings?.desktop_hide_compare_price);
        setValueUpdateWidgetTemplate('desktop_hide_sale_price', user?.widget_settings?.desktop_hide_sale_price);
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
    }, []);

    const { register: registerUpdateWidgetTemplate, handleSubmit: handleUpdateWidgetTemplate, formState: { errors: errorsUpdateWidgetTemplate }, setValue: setValueUpdateWidgetTemplate, reset: resetUpdateWidgetTemplate, getValues: getValuesUpdateWidgetTemplate } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                widget_template: yup.string().required(),
                widget_position: yup.string().required(),
                desktop_hide_image: yup.boolean(),
                desktop_hide_title: yup.boolean(),
                desktop_hide_compare_price: yup.boolean(),
                desktop_hide_sale_price: yup.boolean(),
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
                                <span>Widget Settings</span>
                            </h3>
                        </div>

                        <div className="p-7">
                            <form onSubmit={handleUpdateWidgetTemplate(onSubmitUpdateWidgetTemplate)}>
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Template</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('widget_template')}>
                                            <option value="">Select Template</option>
                                            <option value="template1">Template 1</option>
                                            <option value="template2">Template 2</option>
                                            <option value="template3">Template 3</option>
                                            <option value="template4">Template 4</option>
                                            <option value="template5">Template 5</option>
                                            <option value="template6">Template 6</option>
                                            <option value="template7">Template 7</option>
                                            <option value="template8">Template 8</option>
                                            <option value="customform">Custom Form</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate?.widget_template && <span className="text-danger text-sm text-bold">Please select a template</span>}
                                    </div>
                                </div>
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black">Widget Position</label>
                                    <div className="relative z-20 bg-white">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary" {...registerUpdateWidgetTemplate('widget_position')}>
                                            <option value="">Select Position</option>
                                            <option value="fixed-top">Fixed Top</option>
                                            <option value="fixed-bottom">Fixed Bottom</option>
                                            <option value="floating-top">Floating Top</option>
                                            <option value="floating-bottom">Floating Bottom</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {errorsUpdateWidgetTemplate?.widget_position && <span className="text-danger text-sm text-bold">Please select a position</span>}
                                    </div>
                                </div>

                                <div className="mb-5.5 flex flex-row gap-25 justify-between">
                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-black">Hide on Desktop</label>
                                        <div className="relative z-20 bg-white">
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_image')} />
                                                    <span className="ml-2">Hide Image</span>
                                                </label>
                                            </div>
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_title')} />
                                                    <span className="ml-2">Hide TItle</span>
                                                </label>
                                            </div>
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_compare_price')} />
                                                    <span className="ml-2">Hide Compare Price</span>
                                                </label>
                                            </div>
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('desktop_hide_sale_price')} />
                                                    <span className="ml-2">Hide Sale Price</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-black">Hide on Mobile</label>
                                        <div className="relative z-20 bg-white">
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_image')} />
                                                    <span className="ml-2">Hide Image</span>
                                                </label>
                                            </div>
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_title')} />
                                                    <span className="ml-2">Hide Title</span>
                                                </label>
                                            </div>
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_compare_price')} />
                                                    <span className="ml-2">Hide Compare Price</span>
                                                </label>
                                            </div>
                                            <div className="mb-3">
                                                <label className="flex cursor-pointer select-none items-center text-sm font-medium">
                                                    <input type="checkbox" {...registerUpdateWidgetTemplate('mobile_hide_sale_price')} />
                                                    <span className="ml-2">Hide Sale Price</span>
                                                </label>
                                            </div>
                                        </div>
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
                        user?.plan_details !== undefined ?
                            <div className="rounded-sm border border-stroke bg-white shadow-default mb-2">
                                <div className="border-b border-stroke px-7 py-4">
                                    <h3 className="font-medium text-black">
                                        <span>Customization Options</span>
                                    </h3>
                                </div>
                                <div className="p-7">
                                    <form onSubmit={handleUpdateWidgetTemplate(onSubmitUpdateWidgetTemplate)}>
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
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Product Title Size</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('product_title_size')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Product Title Color</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="color" {...registerUpdateWidgetTemplate('product_title_color')} />
                                            </div>
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
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Option Selector Text Size</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('option_selector_text_size')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Option Selector Text Color</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="color" {...registerUpdateWidgetTemplate('option_selector_text_color')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Compare Price Text Size</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('compare_price_text_size')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Compare Price Text Color</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="color" {...registerUpdateWidgetTemplate('compare_price_text_color')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Offer Price Text Size</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('offer_price_text_size')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Offer Price Text Color</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="color" {...registerUpdateWidgetTemplate('offer_price_text_color')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Text Size</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('add_to_cart_button_text_size')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Text Color</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_text_color')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Background Color</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_background_color')} />
                                            </div>
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
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Border Width</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="number" min="0" className="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none" {...registerUpdateWidgetTemplate('add_to_cart_button_border_width')} />
                                            </div>
                                        </div>

                                        <div className="mb-5.5">
                                            <label className="mb-3 block text-sm font-medium text-black">Add to Cart Button Border Color</label>
                                            <div className="relative z-20 bg-white">
                                                <input type="color" {...registerUpdateWidgetTemplate('add_to_cart_button_border_color')} />
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
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
                            </div> : ""
                    }
                </div>

                <div>
                    View area
                </div>
            </div>
        </UserDashboardLayout >
    )
}