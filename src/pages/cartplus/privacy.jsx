import React from 'react';

import { WebsiteLayout } from '../../components/layouts';
import { IntroSection } from '../../components/sections';

export function CartplusPrivacy(props) {
    return (
        <WebsiteLayout props={props} footerVisible={false}>
            <div className='absolute top-27 flex justify-center w-full'>
                <img className='w-[200px]' src={`${import.meta.env.VITE_APP_URL}/assets/images/cartplus/logo-white.svg`} alt="cartPlus sticky add to cart" />
            </div>
            <IntroSection title="Privacy Policy" />
            <div className="container pt-15 pb-10">
                <div className="section-head-light">
                    <h1 className="text-3xl">Privacy Policy</h1>
                </div>
                <div>
                    <h6 className="mb-2">Effective Date: 1/12/2024</h6>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            1. Information We Collect
                        </h4>
                        <p className="mb-3">
                            CartPlus (“we,” “our,” “us”) respects your privacy and is
                            committed to protecting the data we collect from merchants
                            and their customers. This Privacy Policy explains how we
                            collect, use, and safeguard information when you use our
                            Shopify app. By installing and using CartPlus, you agree to
                            the practices described in this policy.
                        </p>
                        <p className="mb-3">
                            We collect data to provide and improve our services. The
                            information we collect includes:
                        </p>
                        <div className="pl-5">
                            <h6>a. Merchant Information</h6>
                            <ul className="pl-10 list-disc mb-5">
                                <li>
                                    Shopify store name, email address, and store ID.
                                </li>
                                <li>
                                    Billing information for subscription and payment
                                    purposes (processed through Shopify’s billing
                                    system).
                                </li>
                                <li>App configuration settings.</li>
                            </ul>
                            <h6>b. Customer Data</h6>
                            <ul className="pl-10 list-disc mb-5">
                                <li>
                                    Customer details related to cart activity, including
                                    product selections, preferences, and purchase
                                    behavior.
                                </li>
                                <li>
                                    Personal information (e.g., name, email, or address)
                                    as provided during checkout or other cart
                                    interactions.
                                </li>
                            </ul>
                            <h6>c. Technical Information</h6>
                            <ul className="pl-10 list-disc mb-5">
                                <li>Device details, browser type, and IP address.</li>
                                <li>
                                    Log data for performance analysis and
                                    troubleshooting.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            2. How We Use the Information
                        </h4>
                        <p className="mb-3">We use the collected information to:</p>
                        <ul className="pl-10 list-disc">
                            <li>
                                Provide core functionalities of CartPlus, including cart
                                management and analytics.
                            </li>
                            <li>Enhance and optimize app performance.</li>
                            <li>Respond to merchant inquiries and provide support.</li>
                            <li>Comply with legal and regulatory requirements.</li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            3. Sharing Your Information
                        </h4>
                        <p className="mb-3">
                            We do not sell or rent your information. However, we may
                            share it in the following scenarios:
                        </p>
                        <ul className="pl-10 list-disc">
                            <li>
                                With Shopify: To integrate with the Shopify platform and
                                ensure proper functioning of the app.
                            </li>
                            <li>
                                With Third-Party Service Providers: To support
                                operations such as hosting, analytics, or customer
                                support.
                            </li>
                            <li>
                                Legal Compliance: If required by law or in response to
                                valid legal requests.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">4. Data Retention</h4>
                        <p>
                            We retain information for as long as necessary to provide
                            our services or as required by law. Merchants may contact us
                            to request data deletion.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            5. Cookies and Tracking Technologies
                        </h4>
                        <p>
                            CartPlus may use cookies and similar technologies to enhance
                            functionality and analyze app usage. Merchants and their
                            customers can manage cookie preferences through their
                            browser settings.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            6. Merchant Responsibilities
                        </h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                Merchants are responsible for ensuring compliance with
                                applicable privacy laws (e.g., GDPR, CCPA) for their
                                customers.
                            </li>
                            <li>
                                Merchants must disclose the use of CartPlus and its data
                                practices in their store’s privacy policy.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">7. Data Security</h4>
                        <p>
                            We implement reasonable technical and organizational
                            measures to protect your data from unauthorized access,
                            loss, or misuse. However, no method of transmission or
                            storage is 100% secure.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">8. Children’s Privacy</h4>
                        <p>
                            CartPlus is not intended for use by individuals under the
                            age of 18. We do not knowingly collect personal information
                            from children.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">9. Your Rights</h4>
                        <p className="mb-3">
                            Depending on applicable laws, merchants and their customers
                            may have the right to:
                        </p>
                        <ul className="pl-10 list-disc mb-3">
                            <li>Access and correct personal information.</li>
                            <li>Request data deletion.</li>
                            <li>Opt-out of certain data uses.</li>
                        </ul>
                        <p>For requests, contact us at {import.meta.env.VITE_INFO_EMAIL}</p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            10. Changes to This Policy
                        </h4>
                        <p>
                            We may update this Privacy Policy from time to time. We
                            encourage you to review it periodically. Continued use of
                            the app constitutes acceptance of any changes.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-2 font-bold text-xl">11. Contact Us</h4>
                        <p>
                            If you have questions or concerns about this Privacy Policy,
                            contact us at:<br />
                            Email: {import.meta.env.VITE_INFO_EMAIL}
                        </p>
                    </div>
                </div>
            </div>
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