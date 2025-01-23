import Swal from "sweetalert2";
import { isNaN } from "lodash";
import countries from "./static/countries.json";

//    _____ __        __  _         ____        __       
//   / ___// /_____ _/ /_(_)____   / __ \____ _/ /_____ _
//   \__ \/ __/ __ `/ __/ / ___/  / / / / __ `/ __/ __ `/
//  ___/ / /_/ /_/ / /_/ / /__   / /_/ / /_/ / /_/ /_/ / 
// /____/\__/\__,_/\__/_/\___/  /_____/\__,_/\__/\__,_/  

export const ListCountries = () => {
    return countries.data;
}

export const ListAgeRange = () => {
    let agerange = [];
    for (let i = 10; i <= 65; i++) {
        agerange.push(i);
    }

    return agerange;
}

export const ListMonths = () => {
    let months = [
        {
            name: "January",
            value: 1
        },
        {
            name: "February",
            value: 2
        },
        {
            name: "March",
            value: 3
        },
        {
            name: "April",
            value: 4
        },
        {
            name: "May",
            value: 5
        },
        {
            name: "June",
            value: 6
        },
        {
            name: "July",
            value: 7
        },
        {
            name: "August",
            value: 8
        },
        {
            name: "September",
            value: 9
        },
        {
            name: "October",
            value: 10
        },
        {
            name: "November",
            value: 11
        },
        {
            name: "December",
            value: 12
        }
    ];

    return months;
}

export const ListYears = () => {
    var currentYear = new Date().getFullYear();
    var years = [];

    for (let i = 0; i <= 12; i++) {
        years[i] = currentYear;
        currentYear = currentYear + 1;
    }

    return years;
}

//    _____ __
//   / ___// /_____  _________ _____ ____
//   \__ \/ __/ __ \/ ___/ __ `/ __ `/ _ \
//  ___/ / /_/ /_/ / /  / /_/ / /_/ /  __/
// /____/\__/\____/_/   \__,_/\__, /\___/
//                           /____/

export const AddToStorage = (elem, value) => {
    sessionStorage.setItem(elem, JSON.stringify(value));
}

export const RemoveFromStorage = (elem) => {
    sessionStorage.removeItem(elem);
}

export const FetchFromStorage = (elem) => {
    let value = sessionStorage.getItem(elem);
    return JSON.parse(value);
}

//     ____  _                __     __  __     __                    
//    / __ \(_)_______  _____/ /_   / / / /__  / /___  ___  __________
//   / / / / / ___/ _ \/ ___/ __/  / /_/ / _ \/ / __ \/ _ \/ ___/ ___/
//  / /_/ / / /  /  __/ /__/ /_   / __  /  __/ / /_/ /  __/ /  (__  ) 
// /_____/_/_/   \___/\___/\__/  /_/ /_/\___/_/ .___/\___/_/  /____/  
//                                           /_/                      

export const NumberFormat = (value) => {
    if (value === null || value === undefined) {
        return "";
    } else {
        return parseFloat(value).toFixed(2);
    }
}

export const PriceFormat = (type, value) => {
    let formattedPrice = type.replace(/{{.*}}/, parseFloat(value/100).toFixed(2));
    return formattedPrice;
}

//     __  __                ____              
//    / / / /___ _____  ____/ / /__  __________
//   / /_/ / __ `/ __ \/ __  / / _ \/ ___/ ___/
//  / __  / /_/ / / / / /_/ / /  __/ /  (__  ) 
// /_/ /_/\__,_/_/ /_/\__,_/_/\___/_/  /____/  

export const errorHandler = async (error) => {
    let errorMessage = '';
    if (error.response.data.message === undefined) {
        errorMessage = error.message
    } else {
        errorMessage = error.response.data.message
    }

    Swal.fire({
        icon: "error",
        text: errorMessage,
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: 'top-end',
        showConfirmButton: false,
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
        },
    });
}

export const successHandler = async (success) => {
    if (success.message !== undefined) {
        Swal.fire({
            icon: "success",
            text: success.message,
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            showConfirmButton: false,
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast',
            }
        });
    }
}