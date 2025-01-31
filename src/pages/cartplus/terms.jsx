import React from 'react';

import { WebsiteLayout } from '../../components/layouts';

export function CartplusTerms(props) {
    return (
        <WebsiteLayout props={props}>
            <div className="container pt-35 pb-10">
                <div className="section-head-light">
                    <h1 className="text-3xl">Terms & Conditions</h1>
                </div>
                <div>
                    <h6 className="mb-2">Effective Date: 1/12/2024</h6>
                    <div className="mb-5">
                        <p className="mb-3">
                            Welcome to CartPlus (“we,” “our,” “us”), a Shopify app
                            designed to enhance cart management and improve the shopping
                            experience. By installing and using CartPlus, you agree to
                            the following Terms and Conditions. If you do not agree,
                            please uninstall the app and discontinue its use.
                        </p>
                        <h4 className="mb-2 font-bold text-xl">1. Definitions</h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                “App” refers to CartPlus, including all associated
                                features, services, and updates.
                            </li>
                            <li>
                                “Merchant” refers to any Shopify store owner or
                                authorized user installing and using the app.
                            </li>
                            <li>
                                “User” refers to customers of the Merchant’s Shopify
                                store.
                            </li>
                            <li>
                                “Service” refers to the functionality provided by the
                                app to improve cart management and related features.
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">2. Acceptance of Terms</h4>
                        <p className="mb-3">
                            By installing or using CartPlus, you confirm that:
                        </p>
                        <ul className="pl-10 list-disc">
                            <li>
                                You have the authority to bind your Shopify store to
                                these terms.
                            </li>
                            <li>
                                You will comply with all applicable laws and
                                regulations.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">3. License</h4>
                        <p>
                            We grant you a non-exclusive, revocable, and
                            non-transferable license to use CartPlus on your Shopify
                            store.
                        </p>
                    </div>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            4. Merchant Responsibilities
                        </h4>
                        <p className="mb-3">Merchants are responsible for:</p>
                        <ul className="pl-10 list-disc">
                            <li>Providing accurate information during app setup.</li>
                            <li>
                                Ensuring compliance with applicable data protection laws
                                for customer data.
                            </li>
                            <li>
                                Managing the app’s configurations and ensuring its
                                suitability for their store.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            5. Data Collection and Usage
                        </h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                CartPlus may collect non-personal and personal data as
                                outlined in our [Privacy Policy].
                            </li>
                            <li>
                                Data collected will be used to provide, enhance, and
                                optimize app functionality.
                            </li>
                            <li>
                                Merchants must obtain consent from their users if
                                required by applicable laws.
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">6. Fees and Billing</h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                CartPlus offers [free and/or paid plans]. Paid plans are
                                billed through Shopify’s billing system.
                            </li>
                            <li>Fees are non-refundable except as required by law.</li>
                            <li>
                                Failure to pay fees may result in suspension or
                                termination of access to the app.
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">7. Support and Updates</h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                We will provide reasonable support for the app. Support
                                requests can be directed to {import.meta.env.VITE_INFO_EMAIL}
                            </li>
                            <li>
                                The app may be updated to improve functionality or
                                ensure compatibility with Shopify’s platform.
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">8. Intellectual Property</h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                CartPlus, including its design, code, and features, is
                                our intellectual property.
                            </li>
                            <li>
                                Merchants may not copy, modify, or redistribute any part
                                of the app without prior written consent.
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            9. Disclaimer of Warranties
                        </h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                CartPlus is provided “as is” without warranties of any
                                kind.
                            </li>
                            <li>
                                We do not guarantee uninterrupted or error-free
                                operation of the app.
                            </li>
                            <li>
                                Merchants assume all risks associated with using the
                                app.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            10. Limitation of Liability
                        </h4>
                        <ul className="pl-10 list-disc">
                            <li>
                                To the fullest extent permitted by law, we are not
                                liable for any indirect, incidental, or consequential
                                damages arising from the use of CartPlus.
                            </li>
                            <li>
                                Our total liability is limited to the fees paid for the
                                app in the 3 months preceding the claim.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">11. Termination</h4>
                        <ul className="pl-10 list-disc">
                            <li>Merchants may uninstall CartPlus at any time.</li>
                            <li>
                                We may terminate or suspend access to the app if these
                                terms are violated.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            12. Governing Law and Jurisdiction
                        </h4>
                        <ul className="pl-10 list-disc">
                            <li>These terms are governed by the laws of Ludhiana.</li>
                            <li>
                                Disputes will be resolved in the courts of Ludhiana.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">13. Changes to Termss</h4>
                        <p>
                            We reserve the right to update these Terms and Conditions.
                            Continued use of the app after updates constitutes
                            acceptance of the new terms.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">14. Contact Us</h4>
                        <p>
                            For questions or concerns regarding these Terms and
                            Conditions, please contact us:<br />
                            Email: {import.meta.env.VITE_INFO_EMAIL}<br />
                        </p>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    )
}