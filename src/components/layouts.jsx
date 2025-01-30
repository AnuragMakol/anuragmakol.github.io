import React from "react";

import { Header, Footer } from "./sections";

export const WebsiteLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            {props.children}
            <Footer />
        </React.Fragment>
    )
}