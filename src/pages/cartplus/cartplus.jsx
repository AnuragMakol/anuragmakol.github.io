import React from 'react';

import { WebsiteLayout } from '../../components/layouts';

export function Cartplus(props) {
    return (
        <WebsiteLayout props={props} footerVisible={false}>
            <section className="pt-24 md:pt-28  relative">
                <div className="absolute left-0 max-w-full w-full top-0 z-10">
                    <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/cartplus-hero-bg1.webp`} alt="app vertix"
                        className="w-full max-w-full h-[700px] lg:h-[900px] xl:h-[1100px]" />
                </div>
                <div className="container w-full pt-[20px] md:pb-[320px] xl:pb-[420px] relative z-20">
                    <div className="w-[95px] h-[95px] top-[-12%] animate-[rotated_14s_infinite_linear] absolute z-[-1] rounded-[50%] left-[24%] before:w-2 before:h-2 before:content-[''] before:absolute before:rounded-[50%] before:left-2/4 before:top-0 before:bg-[#6aee90]"> </div>
                    <div className="w-40 h-40 left-[-1%] animate-[rotatedTwo_25s_infinite_linear] absolute z-[-1] rounded-[50%] top-[28%] before:w-[17px] before:h-[17px] before:content-[''] before:absolute before:rounded-[50%] before:right-full before:top-2/4 before:bg-[#ffb15f]"> </div>
                    <div className="w-[120px] h-[120px] bottom-[-17%] left-[-0%] animate-[rotated_15s_infinite_linear] absolute z-[-1] rounded-[50%] before:w-[7px] before:h-[7px] before:content-[''] before:absolute before:rounded-[50%] before:left-2/4 before:bottom-0 before:bg-[#ff53b3]"> </div>
                    <div className="w-[130px] h-[130px] top-[40%] animate-[rotatedTwo_15s_infinite_linear] absolute z-[-1] rounded-[50%] -right-[0%] before:w-[13px] before:h-[13px] before:content-[''] before:absolute before:rounded-[50%] before:left-2/4 before:bottom-0 before:bg-[#a49bff]"> </div>
                    <div className="w-[120px] h-[120px] top-[-0%] animate-[rotatedTwo_17s_infinite_linear] absolute z-[-1] rounded-[50%] right-[27%] before:w-3 before:h-3 before:content-[''] before:absolute before:rounded-[50%] before:left-2/4 before:bottom-0 before:bg-[#2eeaed]"> </div>
                    <div className="w-full md:mb-20">
                        <div className='max-w-[700px] mx-auto text-center relative z-10 text-white'>
                            <div className='mb-4 md:mb-8 flex justify-center'>
                                <img className='w-[220px] md:w-[320px]' src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/logo-white.svg`} alt="cartPlus sticky add to cart" />
                            </div>
                            <h1 className="text-4xl md:text-7xl leading-18 font-bold md:mb-8">
                                Sticky Add to Cart
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-100">
                                Boost engagement, reduce cart abandonment, and drive urgency with CartPlus
                            </p>
                            <div className="flex justify-center mb-10 md:mb-20">
                                <a type="button" href={import.meta.env.VITE_CARTPLUS_URL} target="_blank" className="btn border border-white px-10 md:py-6 font-semibold md:text-2xl group">
                                    <span>Start Free Trial</span>
                                    <span className="ml-1 transfrom transition-all group-hover:rotate-45">
                                        <svg className="w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 25 25" fill="none">
                                            <path d="M16.8569 9.67962L8.24994 18.2866L6.83594 16.8726L15.4419 8.26562H7.85694V6.26562H18.8569V17.2656H16.8569V9.67962Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className='md:absolute w-full left-0 right-0 lg:max-w-[780px] xl:max-w-[980px] mx-auto rounded-4xl flex justify-center md:px-2 lg:px-0'>
                            <div className='absolute z-[1] left-[-12%] w-[21.96%] animate-[jumpTwo_6s_infinite_linear] top-[6%] xsm:left-0 hidden lg:block'><img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/hero-arrow2.png`} alt="Urgency Timer" />
                                <span className='absolute lg:-left-[14%] xl:-left-[25%] bottom-[2%] font-bold text-center'>
                                    <span className='text-yellow-400 block'>Fully</span>
                                    <span className='text-yellow-400 block'>Customizable</span>
                                </span>
                            </div>
                            <div className='absolute bg-white rounded-[10px] py-4 hidden md:flex justify-center shadow-2xl z-[1] left-[4%] lg:left-[-12%] w-[303px] animate-[jumpTwo_6s_infinite_linear] bottom-[10%] lg:bottom-[36%] xsm:left-0 '>
                                <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/urgency-bar-toggle.png`} alt="Urgency Timer" />
                            </div>
                            <div className='absolute z-[1] bottom-[-10%] xl:bottom-[-5%] right-[5%] lg:right-[-12%] w-[310px] animate-[jumpTwo_6s_infinite_linear] shadow-2xl rounded-[10px] xsm:right-0 hidden md:block'>
                                <div className='bg-white rounded-2xl p-4 w-[310px]'>
                                    <img className='rounded-2xl' src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/customize-widget-img.png`} alt="Urgency Timer" />
                                </div>
                            </div>
                            <div className='p-4 md:p-6 lg:p-10 rounded-2xl md:rounded-4xl screen-holder inline-flex shadow-2xl'>
                                <img className='' src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/cartplus-hero-img.svg`} alt="cartPlus sticky add to cart" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-16 md:pt-[340px] pb-28">
                <div className="container">
                    <div className="section-head-light text-center">
                        <h2 className="mb-12">Features</h2>
                    </div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 text-center">
                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">
                                No Coding <span className='md:block'>Needed</span>
                            </h2>
                            <p className="text-lg">
                                Configuring the widget is effortless and requires no coding expertise.
                            </p>
                        </div>
                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">
                                Fully Customizable <span className='md:block'>Design</span>
                            </h2>
                            <p className="text-lg">
                                Easily tailor every aspect to align with your store’s branding using a powerful customization tool.
                            </p>
                        </div>
                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">
                                Multiple Pre-Designed <span className='md:block'>Templates</span>
                            </h2>
                            <p className="text-lg">
                                Utilize pre-designed templates or customize them to seamlessly align with your store’s branding.
                            </p>
                        </div>
                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">
                                Enhanced Conversion <span className='md:block'>Rates</span>
                            </h2>
                            <p className="text-lg">
                                It drives impulse purchases and enhances the likelihood of shoppers adding items to their cart.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-8 pb-16 md:py-28 bg-gradient">
                <div className="container">
                    <div className="md:flex items-center">
                        <div className='flex-grow mb-6 md:mb-0'> <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/sticky-add-to-cart-img1.png`} alt="app vertix" className="max-w-full" /></div>
                        <div className='md:pl-10 max-w-[600px]'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Maximize Revenue Potential</span>
                                <h3 className='mb-6'>Reduce cart abandonment</h3>
                                <p className='text-lg mb-6'>Enhance user experience and boost checkout rates by displaying a persistently visible checkout button on the cart page, ensuring seamless navigation for your customers.</p>
                            </div>
                            <ul className='list-disc pl-10'>
                                <li className='mb-2 text-lg'><span className='font-bold'>Top & Bottom Bar</span> for continuous visibility</li>
                                <li className='mb-2 text-lg'><span className='font-bold'>Countdown Timer</span> to create urgency and boost conversions</li>
                                <li className='text-lg'><span className='font-bold'>Pre-Designed Templates</span> for quick and easy customization</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-10 pb-18 md:py-28">
                <div className="container">
                    <div className="flex items-center flex-col md:flex-row">
                        <div className='pr-10 max-w-[600px] order-2 md:order-1'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Make Your Own</span>
                                <h3 className='mb-6'>Fully customizable with live preview</h3>
                                <p className='text-lg mb-6'>Tailor CartPlus - Sticky Add to Cart to match your brand seamlessly while previewing changes in real time.</p>
                            </div>
                            <ul className='list-disc pl-10'>
                                <li className='mb-2 text-lg'><span className='font-bold'>Adjust Container Width</span> for a perfect fit</li>
                                <li className='mb-2 text-lg'><span className='font-bold'>Enable or Disable the Urgency Timer</span> as needed</li>
                                <li className='text-lg'><span className='font-bold'>Customize Colors</span> to align with your brand identity</li>
                            </ul>
                        </div>
                        <div className='flex-grow order-1 md:order-2 mb-6 md:mb-0'>
                            <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/fully-customizable.png`} alt="app vertix" className="max-w-full" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-28 bg-blue-700">
                <div className="container rounded-4xl text-center">
                    <div className='justify-between items-center max-w-4xl mx-auto'>
                        <div className="section-head text-white mb-10">
                            <h3 className='mb-6'>Maximize Conversions and Minimize Cart Abandonment</h3>
                            <p className='text-lg'>Ensure your customers complete their purchases by utilizing strategic tools that keep them engaged and encourage immediate action. Don’t let potential sales slip away—drive conversions and boost revenue.</p>
                        </div>
                        <div>
                            <a href={import.meta.env.VITE_CARTPLUS_URL} target="_blank" className='btn bg-black text-white text-xl py-6 px-12 inline-flex group'>Start free trial 
                                <span className="md:ml-1 transfrom transition-all group-hover:rotate-45">
                                    <svg className="w-7" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"><path d="M16.8569 9.67962L8.24994 18.2866L6.83594 16.8726L15.4419 8.26562H7.85694V6.26562H18.8569V17.2656H16.8569V9.67962Z" fill="currentColor"></path></svg>
                                </span>
                                </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="md:pt-28">
                <div className="container">
                    <div className="md:flex items-center">
                        <div className='flex-grow'>
                            <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/urgency-timer-img.png`} alt="app vertix" className="max-w-full" />
                        </div>
                        <div className='pr-16 max-w-[600px]'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Countdown Timer</span>
                                <h3 className='mb-6'>Drive More Sales with a Sense of Urgency</h3>
                                <p className='text-lg mb-6'>Create a powerful FOMO effect with the Urgency Timer, compelling customers to act fast and complete their purchases before time runs out. Boost conversions by leveraging urgency-driven buying behavior!</p>
                            </div>
                            <ul className='list-disc pl-10'>
                                <li className='mb-2 text-lg'><span className='font-bold'>Encourage Faster Checkouts</span> – Motivate shoppers to complete their purchases</li>
                                <li className='mb-2 text-lg'><span className='font-bold'>Create a Fear of Missing Out (FOMO)</span> – Instill urgency with limited-time offers and countdowns</li>
                                <li className='text-lg'><span className='font-bold'>Increase Conversion Rates</span> – Reduce hesitation and drive impulse purchases</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-28">
                <div className="container">
                    <div className="flex items-center flex-col md:flex-row">
                        <div className='pr-10 max-w-[600px] order-2 md:order-1'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Responsive design</span>
                                <h3 className='mb-6'>Mobile-Optimized for Seamless Shopping</h3>
                                <p className='text-lg mb-6'>Enhance the user experience and drive higher checkout rates by displaying a persistent, always-visible checkout button on the product page, ensuring easy access for customers on all mobile devices.</p>
                            </div>
                        </div>
                        <div className='flex-grow order-1 md:order-2'> <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/mobile-ready-img.png`} alt="app vertix" className="max-w-full" /></div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-28 bg-gradient">
                <div className="container text-center">
                    <div className="section-head-light max-w-[800px] mx-auto mb-8">
                        <h3 className='mb-6'>Configuring the widget is straightforward and user-friendly</h3>
                        <p className='text-lg'>Should you require any assistance, our team is here to support you at every step. Please don’t hesitate to contact us for help</p>
                    </div>
                    <a href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`} className='btn btn-primary py-6 px-12'>Write to Us</a>
                </div>
            </section>
            <footer>
                <div className="w-full py-6">
                    <div className="container">
                        <div className='flex justify-between'>
                            <p>
                                {new Date().getFullYear()} © All rights reserved.
                            </p>
                            <div>
                                <ul className='flex'>
                                    <li className='mr-8'>
                                        <a href="/#/cartplus/terms">Terms & Conditions</a>
                                    </li>
                                    <li>
                                        <a href="/#/cartplus/privacy">Privacy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </WebsiteLayout>
    )
}