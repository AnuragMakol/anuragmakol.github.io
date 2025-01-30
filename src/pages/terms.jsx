import React, { useEffect } from 'react';
import { useMutation } from 'react-query';

import { WebsiteLayout } from '../components/layouts';

export function Terms(props) {
    return (
        <WebsiteLayout props={props}>
            <div className="container pt-35 pb-10">
                <div className="section-head-light">
                    <h1 className="text-3xl">Terms & Conditions</h1>
                </div>
                <div>
                    <p className="mb-4">
                        Welcome to CartPlus (“we,” “our,” “us”). By accessing or using
                        our services, including website and app development, you agree
                        to these Terms and Conditions. If you do not agree, you must not
                        use our services.
                    </p>
                    <div>
                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">1. Definitions</h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    “Services” refers to website and app development,
                                    design, and related support provided by us.
                                </li>
                                <li>
                                    “Client” refers to any individual, business, or
                                    entity engaging our services.
                                </li>
                                <li>
                                    “Deliverables” refers to the final websites, apps,
                                    or other materials provided by us as part of the
                                    services.
                                </li>
                            </ul>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">2. Use of Services</h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    Our services are intended for lawful use only. You
                                    agree not to use our services for any illegal or
                                    unauthorized purpose.
                                </li>
                                <li>
                                    You are responsible for providing accurate project
                                    requirements and any materials (e.g., images,
                                    content) necessary for project completion.
                                </li>
                            </ul>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">3. Scope of Work</h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    We will provide services as outlined in the project
                                    agreement or proposal.
                                </li>
                                <li>
                                    Any changes to the project scope may result in
                                    additional fees or extended timelines.
                                </li>
                            </ul>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-5 font-bold text-xl">
                                4. Intellectual Property
                            </h4>
                            <div className="pl-5">
                                <h6>a. Ownership by Client:</h6>
                                <ul className="pl-10 list-disc mb-5">
                                    <li>
                                        Upon full payment, all rights to the
                                        deliverables, excluding pre-existing tools,
                                        templates, or software owned by us, will
                                        transfer to the client.
                                    </li>
                                </ul>
                                <h6>b. Ownership by Us:</h6>
                                <ul className="pl-10 list-disc mb-5">
                                    <li>
                                        We retain rights to methodologies, frameworks,
                                        and reusable code components developed during
                                        the project.
                                    </li>
                                </ul>
                                <h6>c. Third-Party Assets:</h6>
                                <ul className="pl-10 list-disc mb-5">
                                    <li>
                                        Clients must ensure proper licensing for any
                                        third-party content they provide for the
                                        project.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">
                                5. Fees and Payment Terms
                            </h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    Fees for services will be outlined in the project
                                    agreement.
                                </li>
                                <li>
                                    Payments must be made as per the agreed schedule.
                                </li>
                                <li>Late payments may incur penalties or interest.</li>
                                <li>
                                    Refunds are not provided for completed milestones or
                                    deliverables.
                                </li>
                            </ul>
                        </div>

                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">
                                6. Timelines and Delivery
                            </h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    We will make reasonable efforts to meet project
                                    timelines. However, delays caused by the client
                                    (e.g., late approvals, incomplete information) may
                                    result in rescheduled delivery dates.
                                </li>
                                <li>
                                    We are not liable for delays caused by external
                                    factors beyond our control.
                                </li>
                            </ul>
                        </div>

                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">7. Confidentiality</h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    We will not disclose any confidential information
                                    provided by the client without written consent.
                                </li>
                                <li>
                                    Clients agree not to share our proprietary tools or
                                    methods with third parties without permission.
                                </li>
                            </ul>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">
                                8. Liability and Indemnification
                            </h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    We are not liable for any direct, indirect, or
                                    consequential damages resulting from the use of our
                                    deliverables.
                                </li>
                                <li>
                                    The client agrees to indemnify us against any claims
                                    arising from the content, data, or materials
                                    provided by the client.
                                </li>
                            </ul>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">
                                9. Warranties and Disclaimer
                            </h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    We warrant that our services will be performed
                                    professionally and to industry standards.
                                </li>
                                <li>
                                    We do not guarantee specific results, such as
                                    rankings, traffic, or user acquisition, unless
                                    explicitly stated in the project agreement.
                                </li>
                            </ul>
                        </div>

                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">10. Termination</h4>
                            <ul className="pl-10 list-disc">
                                <li>
                                    Either party may terminate the agreement with
                                    written notice.
                                </li>
                                <li>
                                    Upon termination, the client must pay for all
                                    completed work and any outstanding fees.
                                </li>
                                <li>
                                    We reserve the right to terminate the agreement if
                                    the client violates these terms or engages in
                                    unethical behavior.
                                </li>
                            </ul>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">
                                11. Governing Law and Jurisdiction
                            </h4>
                            <ul className="pl-10 list-disc">
                                <li>These terms are governed by the laws of India.</li>
                                <li>
                                    Any disputes will be subject to the exclusive
                                    jurisdiction of the courts in Ludhiana.
                                </li>
                            </ul>
                        </div>

                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">12. Changes to Terms</h4>
                            <p>
                                We reserve the right to update these Terms and
                                Conditions. Clients will be notified of significant
                                changes.
                            </p>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-2 font-bold text-xl">13. Contact Us</h4>
                            <p>
                                For questions or concerns about these Terms and
                                Conditions, contact us at:<br />
                                Email: info@appvertix.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    )
}