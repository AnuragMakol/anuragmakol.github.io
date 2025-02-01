import React from "react";

import { Header, Footer } from "./sections";

export const WebsiteLayout = (props) => {

    return (
        <React.Fragment>
            {
                props?.headerVisible === undefined || props?.headerVisible === true ? <Header /> : ""
            }
            {props.children}
            {
                props?.footerVisible === undefined || props?.footerVisible === true ? <Footer /> : ""
            }
        </React.Fragment>
    )
}