import axios from "axios";
import { FetchFromStorage } from './helpers';

//    __  __                  ___    ____  _____      
//   / / / /_______  _____   /   |  / __ \/  _( )_____
//  / / / / ___/ _ \/ ___/  / /| | / /_/ // / |// ___/
// / /_/ (__  )  __/ /     / ___ |/ ____// /   (__  ) 
// \____/____/\___/_/     /_/  |_/_/   /___/  /____/  
                                                   
export const getToken = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/init`, payload);
    return response.data;
}

export const userLogin = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/login`, payload);
    return response.data;
}

export const updateProfile = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/update-profile`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });

    return response.data;
}

export const createRecurringCharge = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/create-recurring-charge`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });
    return response.data;
}

export const setRecurringCharge = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/set-recurring-charge`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });
    return response.data;
}

export const cancelRecurringCharge = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/cancel-recurring-charge`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });
    return response.data;
}

export const resetScriptTag = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/reset-script-tag`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });
    return response.data;
}

export const uploadUserProfilePicture = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/upload-user-profile-picture`, payload.formdata, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });

    return response.data;
}

export const deleteUserProfilePicture = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/delete-user-profile-picture`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });

    return response.data;
}

export const updateWidgetType = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/update-widget-type`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });

    return response.data;
}

export const updateWidgetTemplate = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/update-widget-template`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("token")
        }
    });

    return response.data;
}

//     ___       __          _          ___    ____  _____      
//    /   | ____/ /___ ___  (_)___     /   |  / __ \/  _( )_____
//   / /| |/ __  / __ `__ \/ / __ \   / /| | / /_/ // / |// ___/
//  / ___ / /_/ / / / / / / / / / /  / ___ |/ ____// /   (__  ) 
// /_/  |_\__,_/_/ /_/ /_/_/_/ /_/  /_/  |_/_/   /___/  /____/  
                                                             
export const adminLogin = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, payload);

    return response.data;
}

export const listUsers = async (payload) => {
    let response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/list-users`, {
        params: payload,
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });

    return response.data;
}

export const listCampaigns = async (payload) => {
    let response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/list-campaigns`, {
        params: payload,
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });

    return response.data;
}

export const fetchCampaign = async (payload) => {
    let response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/fetch-campaign`, {
        params: payload,
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });

    return response.data;
}

export const createCampaign = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/create-campaign`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });
    
    return response.data;
}

export const updateCampaign = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/update-campaign`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });
    
    return response.data;
}

export const deleteCampaign = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/delete-campaign`, payload, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });
    
    return response.data;
}

export const fetchCampaignEmails = async (payload) => {
    let response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/fetch-campaign-emails`, {
        params: payload,
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });

    return response.data;
}

export const uploadCampaignCSV = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/upload-campaign-csv`, payload.formdata, {
        headers: {
            "Authorization": "Bearer " + FetchFromStorage("admin_token")
        }
    });
    
    return response.data;
}