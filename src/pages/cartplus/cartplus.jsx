import React from 'react';

import { WebsiteLayout } from '../../components/layouts';

export function Cartplus(props) {
    return (
        <WebsiteLayout props={props} footerVisible={false}> 
            <section className="pt-28 bg-gray-50">
                <div className="container relative z-40 w-full lg:pt-[200px] lg:pb-[220px]">
                    <div className="w-full mb-20">
                        <div>
                            <h1 className="text-6xl leading-18 font-bold mb-6 text-black">
                                CartPlus Sticky Add To Cart
                            </h1>
                            <p className="text-2xl">
                                Seamlessly integrates a sticky add-to-cart bar, ensuring
                                your customers can easily add items to their carts from
                                anywhere on your site.
                            </p>
                            <div className="flex">
                                <button className="btn btn-primary">Free Trial</button>
                                <button className="btn btn-link-primary"
                               >Got questions? Reach us now</button
                               >
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-28">
                <div className="container">
                    <div className="section-head-light text-center">
                        <h2 className="mb-10">Sticky Add To Cart Features</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-8 text-center">

                        <div>
                            <h3 className="mb-6 text-2xl font-bold">No Coding Required</h3>
                            <p className="text-xl">
                                Configuring the widget is incredibly simple – no coding
                                expertise is required.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-6 text-2xl font-bold">Fully Customizable</h3>
                            <p className="text-xl">
                                Customize everything to match your store's style with a
                                powerful customizer.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-6 text-2xl font-bold">
                                Premade multiple templates
                            </h3>
                            <p className="text-xl">
                                Ensures that the add to cart button remains visible and
                                easily accessible, even on smaller screens. This
                                optimizes the mobile experience and removes the need for
                                users to manually scroll back to the top to add items to
                                their cart
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-6 text-2xl font-bold">
                                Enhanced Mobile Experience
                            </h3>
                            <p className="text-xl">
                                Ensures that the add to cart button remains visible and
                                easily accessible, even on smaller screens. This
                                optimizes the mobile experience and removes the need for
                                users to manually scroll back to the top to add items to
                                their cart
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-28 bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-2">
                        <div className="section-head-light">
                            <h4>Heding</h4>
                            <p>Subhead</p>
                        </div>
                        <div>image placeholder</div>
                    </div>
                </div>
            </section>
            <section className="py-28">
                <div className="container">
                    <div className="grid grid-cols-2">
                        <div>image placeholder</div>
                        <div className="section-head-light">
                            <h4>Heding</h4>
                            <p>Subhead</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-28 bg-black section-dark">
                <div className="container">
                    <div className="section-head-light">
                        <h5>Simplify Workflow. Save Time. Sale Smooth.				</h5>
                        <p>Subhead</p>
                    </div>
                    <div className="flex">
                        <button className="btn btn-primary">Free Trial</button>
                        <button className="btn btn-link-primary"
                       >Got questions? Reach us now</button
                       >
                    </div>
                </div>
            </section>
            <section className="py-28 bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-2">
                        <div className="section-head-light">
                            <h4>Heding</h4>
                            <p>Subhead</p>
                        </div>
                        <div>image placeholder</div>
                    </div>
                </div>
            </section>
            <section className="py-28">
                <div className="container">
                    <div className="text-center mb-16">
                        <h3 className="text-5xl font-bold">Frequently Asked Questions</h3>
                    </div>
                    <div className="accordion max-w-[992px] mx-auto">
                        <div
                            className="accordion-item border border-gray-800 rounded-2xl mb-4"
                       >
                            <label>
                                <input type="checkbox" className="sr-only" />
                                <div
                                    className="accordion-head cursor-pointer flex items-center justify-between group"
                               >
                                    <h5
                                        className="text-xl font-black group-hover:text-gray-800 pl-6 pr-10 py-4 flex-grow"
                                   >
                                        What mobile app development services do you
                                        offer?
                                    </h5>
                                    <span
                                        className="ml-auto relative right-4 min-w-6 max-w-6 accordion-head-icon justify-center"
                                   >
                                        <img
                                            src={`${import.meta.env.VITE_APP_URL}/assets/images/arrow-down-solid.svg`}
                                            alt="app vertix"
                                            className="w-6"
                                        />
                                    </span>
                                </div>
                                <div className="accordion-content px-6 py-4">
                                    <p className="mb-6">
                                        As a leading
                                        <a
                                            href="https://appinventiv.com/mobile-app-development-services/"
                                            target="_blank"
                                       >mobile application development service</a
                                       > company, we offer a comprehensive array of services,
                                        including:
                                    </p>
                                    <ul className="mb-6 list-disc ml-6">
                                        <li>
                                            <a
                                                href="https://appinventiv.com/iphone-application-development/"
                                                target="_blank">iOS App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/android-application-development/"
                                                target="_blank"
                                           >Android App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/flutter-app-development/"
                                                target="_blank"
                                           >Flutter App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/react-native-app-development/"
                                                target="_blank"
                                           >React Native App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/wearable-devices-app-development/"
                                                target="_blank"
                                           >Wearable App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/web-application-development/"
                                                target="_blank">Web App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/progressive-web-apps/"
                                                target="_blank"
                                           >PWA Development
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/healthcare-mobile-app-development-services/"
                                                target="_blank"
                                           >Healthcare App Development</a
                                           >
                                        </li>
                                    </ul>
                                    <p>
                                        Our client-centric approach allows us to assist
                                        our clients all the way from the initial idea
                                        validation to execution and post maintenance.
                                        This involves rigorous planning, design,
                                        development, testing, and deployment, ensuring
                                        that the mobile app is not only technologically
                                        robust but also aligns with the client's
                                        business vision and user expectations.
                                    </p>
                                </div>
                            </label>
                        </div>
                        <div
                            className="accordion-item border border-gray-800 rounded-2xl mb-4"
                       >
                            <label>
                                <input type="checkbox" className="sr-only" />
                                <div
                                    className="accordion-head cursor-pointer flex items-center justify-between group"
                               >
                                    <h5
                                        className="text-xl font-black group-hover:text-gray-800 pl-6 pr-10 py-4 flex-grow"
                                   >
                                        What mobile app development services do you
                                        offer?
                                    </h5>
                                    <span
                                        className="ml-auto relative right-4 min-w-6 max-w-6 accordion-head-icon justify-center"
                                   >
                                        <img
                                            src={`${import.meta.env.VITE_APP_URL}/assets/images/arrow-down-solid.svg`}
                                            alt="app vertix"
                                            className="w-6"
                                        />
                                    </span>
                                </div>
                                <div className="accordion-content px-6 py-4">
                                    <p className="mb-6">
                                        As a leading
                                        <a
                                            href="https://appinventiv.com/mobile-app-development-services/"
                                            target="_blank"
                                       >mobile application development service</a
                                       > company, we offer a comprehensive array of services,
                                        including:
                                    </p>
                                    <ul className="mb-6 list-disc ml-6">
                                        <li>
                                            <a
                                                href="https://appinventiv.com/iphone-application-development/"
                                                target="_blank">iOS App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/android-application-development/"
                                                target="_blank"
                                           >Android App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/flutter-app-development/"
                                                target="_blank"
                                           >Flutter App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/react-native-app-development/"
                                                target="_blank"
                                           >React Native App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/wearable-devices-app-development/"
                                                target="_blank"
                                           >Wearable App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/web-application-development/"
                                                target="_blank">Web App Development</a
                                           >
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/progressive-web-apps/"
                                                target="_blank"
                                           >PWA Development
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://appinventiv.com/healthcare-mobile-app-development-services/"
                                                target="_blank"
                                           >Healthcare App Development</a
                                           >
                                        </li>
                                    </ul>
                                    <p>
                                        Our client-centric approach allows us to assist
                                        our clients all the way from the initial idea
                                        validation to execution and post maintenance.
                                        This involves rigorous planning, design,
                                        development, testing, and deployment, ensuring
                                        that the mobile app is not only technologically
                                        robust but also aligns with the client's
                                        business vision and user expectations.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    )
}