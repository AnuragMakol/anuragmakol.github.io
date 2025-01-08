import React from "react";

export const Tooltip = (props) => {
    return (
        <React.Fragment>
            <div className={`${props.property} ml-2 cursor-pointer group relative z-100`}>
                <img src={props.image} alt={props.alt} />
                <div className={`${props.width !== undefined ? `min-w-${props.width}` : "whitespace-nowrap"} absolute z-20 rounded bg-black px-4.5 py-1.5 text-sm font-medium text-white invisible group-hover:visible opacity-0 group-hover:opacity-100 
                    ${props.position === "right" ? "left-full top-1/2 ml-3 -translate-y-1/2" : ""} 
                    ${props.position === "left" ? "right-full top-1/2 mr-3 -translate-y-1/2" : ""} 
                    ${props.position === "top" ? "bottom-full left-1/2 mb-3 -translate-x-1/2" : ""} 
                    ${props.position === "bottom" ? "top-full left-1/2 mt-3 -translate-x-1/2" : ""} 
                `}>
                    <span className={`absolute -z-10 h-2 w-2 rotate-45 rounded-sm bg-black
                        ${props.position === "right" ? "left-[-3px] top-1/2 -translate-y-1/2" : ""} 
                        ${props.position === "left" ? "right-[-3px] top-1/2 -translate-y-1/2" : ""} 
                        ${props.position === "top" ? "bottom-[-3px] left-1/2 -translate-x-1/2" : ""} 
                        ${props.position === "bottom" ? "left-1/2 top-[-3px] -translate-x-1/2" : ""} 
                    `}></span>
                    {props.title}
                </div>
            </div>
        </React.Fragment>
    )
}