import React from 'react';

import { WebsiteLayout } from '../../components/layouts';

export function Cartplus(props) {
    return (
        <WebsiteLayout props={props} footerVisible={false}>
            <section className="pt-28 bg-black">
                <div className="container w-full lg:pt-[20px] lg:pb-[420px]">
                    <div className="w-full mb-20">
                        <div className='max-w-[700px] mx-auto text-center relative z-10 text-white'>
                            <div className='mb-8 flex justify-center'>
                                <img className='w-[320px]' src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/logo-white.svg`} alt="cartPlus sticky add to cart" />
                            </div>
                            <h1 className="text-7xl leading-18 font-bold mb-8">
                                Sticky Add to Cart
                            </h1>
                            <p className="text-2xl mb-8 text-gray-100">
                                Keep the bar fixed at the top or bottom of the page so it's always visible to your customers.
                            </p>
                            <div className="flex justify-center mb-20">
                                <a type="button" className="btn border border-white px-10 py-6 font-semibold text-2xl group">
                                    <span>Start Free Trial</span>
                                    <span className="ml-1 transfrom transition-all group-hover:rotate-45">
                                        <svg className="w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 25 25" fill="none">
                                            <path d="M16.8569 9.67962L8.24994 18.2866L6.83594 16.8726L15.4419 8.26562H7.85694V6.26562H18.8569V17.2656H16.8569V9.67962Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </a>
                                {/* <button className="btn btn-link-primary"
                                >Got questions? Reach us now</button> */}
                            </div>
                        </div>
                        <div className='absolute w-full left-0 right-0 max-w-[980px] mx-auto shadow-2xl rounded-4xl'>
                            <div className='p-10 rounded-4xl screen-holder'>
                                <img className='' src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/cartplus-hero-img.svg`} alt="cartPlus sticky add to cart" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-[340px] pb-28">
                <div className="container">
                    <div className="section-head-light text-center">
                        <h2 className="mb-12">Features</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-8 text-center">

                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">No Coding <br />Required</h2>
                            <p className="text-lg">
                                Configuring the widget is incredibly simple – no coding
                                expertise is required.
                            </p>
                        </div>
                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">Fully <br />Customizable</h2>
                            <p className="text-lg">
                                Customize everything to match your store's style with a
                                powerful customizer.
                            </p>
                        </div>
                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">
                                Premade multiple templates
                            </h2>
                            <p className="text-lg">
                                Use the pre-made templates or customize them to suit your store branding.
                            </p>
                        </div>
                        <div className='shadow-xl px-4 py-10 rounded-2xl bg-white border border-gray-dark'>
                            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-11' fill='#005CFF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" /></svg>
                            </div>
                            <h2 className="mb-6 text-2xl font-bold">
                                Improved Conversion Rates
                            </h2>
                            <p className="text-lg">
                                it encourages impulse purchases and increases the likelihood of shoppers adding
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-28 bg-blue-50">
                <div className="container">
                    <div className="flex items-center">
                        <div className='flex-grow'> <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/sticky-add-to-cart-img1.png`} alt="app vertix" className="max-w-full" /></div>
                        <div className='pl-10 max-w-[600px]'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Generate More Revenue</span>
                                <h3 className='mb-6'>Reduce cart abandonment</h3>
                                <p className='text-lg mb-6'>Improves the user experience and increases checkout rates by showing the always-visible checkout button to your customers on the cart page.</p>
                            </div>
                            <ul className='list-disc pl-10'>
                                <li className='mb-2 text-lg font-bold'>Top & Bottom bar</li>
                                <li className='mb-2 text-lg font-bold'>Countdown Timer</li>
                                <li className='text-lg font-bold'>Premade Various Templates</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
            <section className="py-28">
                <div className="container">
                    <div className="flex items-center">
                        <div className='pr-16 max-w-[600px]'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Design Your Own</span>
                                <h3 className='mb-6'>Fully customizable with live preview</h3>
                                <p className='text-lg mb-6'>Design cartplus sticky add to cart according to your brand and see real time preview</p>
                            </div>
                            <ul className='list-disc pl-10'>
                                <li className='mb-2 text-lg font-bold'>Change container width</li>
                                <li className='mb-2 text-lg font-bold'>Show/Hide urgency timer</li>
                                <li className='text-lg font-bold'>Change colors as per your needs</li>
                            </ul>
                        </div>
                        <div className='flex-grow'> <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/fully-customizable.png`} alt="app vertix" className="max-w-full" /></div>
                    </div>
                </div>
            </section>
            <section className="py-28 bg-blue-700">
                <div className="container rounded-4xl">
                    <div className='justify-between items-center'>
                        <div className="section-head text-white mb-10">
                            <h3 className='mb-6'>Deski ties into your existing tools, services, & workflow. Get notifications or create a Story with others tools.
                            </h3>
                            <p className='text-lg'>If you’re having trouble getting motivated to keep to your fitness program.</p>
                        </div>
                        <div>
                            <a href='' className='btn btn-secondary py-6 px-12 text-lg inline-flex'>Start free trial</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-28">
                <div className="container">
                    <div className="flex items-center">
                        <div className='flex-grow'>
                            <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/urgency-timer-img.png`} alt="app vertix" className="max-w-full" />
                        </div>
                        <div className='pr-16 max-w-[600px]'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Countdown Timer</span>
                                <h3 className='mb-6'>Force your customers to buy with urgency timer</h3>
                                <p className='text-lg mb-6'>Design cartplus sticky add to cart according to your brand and see real time preview</p>
                            </div>
                            <ul className='list-disc pl-10'>
                                <li className='mb-2 text-lg font-bold'>Change container width</li>
                                <li className='mb-2 text-lg font-bold'>Show/Hide urgency timer</li>
                                <li className='text-lg font-bold'>Change colors as per your needs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-28">
                <div className="container">
                    <div className="flex items-center">
                        <div className='pr-10 max-w-[600px]'>
                            <div className="section-head-light">
                                <span className='bg-blue-100 py-1 px-4 rounded-full mb-4 inline-flex text-primary font-medium border border-primary text-sm'>Responsive design</span>
                                <h3 className='mb-6'>Mobile Ready</h3>
                                <p className='text-lg mb-6'>Improves the user experience and increases checkout rates by showing the always-visible checkout button to your customers on the cart page.</p>
                                <a href='#' className='btn btn-primary'>Start free trial</a>
                            </div>
                        </div>
                        <div className='flex-grow'> <img src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/mobile-ready-img.png`} alt="app vertix" className="max-w-full" /></div>
                    </div>
                </div>
            </section>
            <section className="py-28 bg-gradient">
                <div className="container text-center">
                    <div className="section-head-light max-w-3xl mx-auto mb-8">
                        <h3 className='mb-6'>Configuring the widget is incredibly simple</h3>
                        <p className='text-lg max-w-[500px] mx-auto'>We are here to help you every step of the way, so feel free to get in touch with us if you need any assistance.</p>
                    </div>
                    <a href='' className='btn btn-primary'>send a request</a>
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
                                        <a href="/cartplus/terms">Terms & Conditions</a>
                                    </li>
                                    <li>
                                        <a href="/cartplus/privacy">Privacy</a>
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