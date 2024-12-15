import React from "react";

import { UserHeader, UserSidebar, AdminHeader, AdminSidebar } from "./sections";

export const UserAuthLayout = (props) => {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export const UserDashboardLayout = (props) => {
    return (
        <div className="flex h-screen overflow-hidden widget-page">
            <UserSidebar />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden pl-16 2xl:pl-0">
                <UserHeader />
                <main>
                    <div className="mx-auto p-4 lg:py-6 lg:px-8 h-[calc(100vh-50px)] min-h-180">
                        {props.children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export const AdminAuthLayout = (props) => {
    return (
        <div className="bg-white">
            <div className="flex flex-wrap items-center h-screen">
                {props.children}
            </div>
        </div>
    )
}

export const AdminDashboardLayout = (props) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <AdminHeader />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {props.children}
                    </div>
                </main>
            </div>
        </div>
    );
};