import React from 'react';

import { WebsiteLayout } from '../components/layouts';
import { IntroSection } from '../components/sections';

export function Privacy(props) {
    return (
        <WebsiteLayout props={props}>
            <IntroSection title="Privacy Policy" />

            <div className="container pt-15 pb-10">
                <div>
                    <h6 className="mb-5 font-bold">Effective Date: 1/12/2024</h6>
                    <p className="mb-3">
                        Appvertix (“we,” “our,” “us”) is committed to
                        protecting your privacy. This Privacy Policy explains how we
                        collect, use, and safeguard your information when you use our
                        services, including website and application development
                        services.
                    </p>
                    <p className="mb-3">
                        By using our services, you agree to the collection and use of
                        information in accordance with this Privacy Policy.
                    </p>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            1. Information We Collect
                        </h4>
                        <p className="mb-3">
                            We may collect the following types of information:
                        </p>
                        <div className="pl-5">
                            <h6>a. Personal Information:</h6>
                            <ul className="pl-10 list-disc mb-5">
                                <li>
                                    Name, email address, phone number, and business
                                    details when you contact us or sign up for our
                                    services.
                                </li>
                            </ul>
                            <h6>b. Non-Personal Information:</h6>
                            <ul className="pl-10 list-disc mb-5">
                                <li>
                                    Technical details such as browser type, IP address,
                                    device type, and usage data collected through
                                    cookies and similar technologies.
                                </li>
                            </ul>
                            <h6>c. Project Data:</h6>
                            <ul className="pl-10 list-disc">
                                <li>
                                    Details, assets, and content provided by you to
                                    develop your website or app.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            2. How We Use Your Information
                        </h4>
                        <p className="mb-3">
                            We use your information for the following purposes:
                        </p>
                        <ul className="pl-10 list-disc">
                            <li>To provide, improve, and customize our services.</li>
                            <li>
                                To communicate with you regarding project updates,
                                support, and other inquiries.
                            </li>
                            <li>
                                To analyze and improve the functionality and performance
                                of our website and services.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            3. Sharing Your Information
                        </h4>
                        <p className="mb-3">
                            We do not sell or rent your information. However, we may
                            share your information:
                        </p>
                        <ul className="pl-10 list-disc">
                            <li>
                                With trusted third-party service providers for the
                                purpose of delivering our services (e.g., hosting
                                platforms or payment processors).
                            </li>
                            <li>
                                If required by law or in response to valid legal
                                requests.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">4. Data Security</h4>
                        <p>
                            We implement reasonable technical and organizational
                            measures to protect your information against unauthorized
                            access, loss, or misuse.
                        </p>
                    </div>
                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            5. Cookies and Tracking Technologies
                        </h4>
                        <p>
                            We use cookies and similar technologies to enhance your user
                            experience and analyze website performance. You can manage
                            your cookie preferences through your browser settings.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">6. Third-Party Links</h4>
                        <p>
                            Our services may include links to third-party websites. We
                            are not responsible for the privacy practices or content of
                            these sites.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">7. Your Rights</h4>
                        <p className="mb-3">
                            Depending on applicable laws, you may have rights regarding
                            your personal data, including:
                        </p>
                        <ul className="pl-10 list-disc mb-3">
                            <li>Accessing and correcting your data.</li>
                            <li>Requesting deletion of your data.</li>
                            <li>Opting out of certain communications</li>
                        </ul>
                        <p>
                            To exercise these rights, contact us at {import.meta.env.VITE_INFO_EMAIL}
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">8. Children’s Privacy</h4>
                        <p>
                            Our services are not intended for individuals under the age
                            of 18. We do not knowingly collect personal data from
                            minors.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">
                            9. Updates to This Policy
                        </h4>
                        <p>
                            We may update this Privacy Policy from time to time. We
                            encourage you to review it periodically for any changes.
                        </p>
                    </div>

                    <div className="mb-5">
                        <h4 className="mb-2 font-bold text-xl">10. Contact Us</h4>
                        <p>
                            If you have any questions or concerns about this Privacy
                            Policy or our data practices, please contact us at:<br />
                            Email: {import.meta.env.VITE_INFO_EMAIL}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rts-breadcrumb-area bg_image"></div>
        </WebsiteLayout>
    )
}