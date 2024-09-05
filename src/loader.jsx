import React from 'react';

export const Loader = (props) => {
    return (
        <React.Fragment>
            {
                props.loading ? <div className="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                </div> : ""
            }
        </React.Fragment>
    )
}