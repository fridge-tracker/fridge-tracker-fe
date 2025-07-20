import GoodForm from "./GoodForm.jsx";
import {useActionData, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiClient, {ENDPOINTS} from "../../api/apiClient.js";
import Utility from "../../utility/Utility.js";

const EditGood = () => {
    const actionData = useActionData();
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(location.state);
    if(data !== null) {
        window.localStorage.setItem("updateData", JSON.stringify(data));
    }else {
        const updateData = JSON.parse(window.localStorage.getItem("updateData"));
        console.log(updateData);
        setData(updateData);
    }
    useEffect(() => {
        if (actionData?.success) {
            window.localStorage.removeItem("updateData");
            toast.success("Edited good is successfully updated.");
            navigate("/goods");
        }
        toast.error(actionData?.error)
    }, [actionData, navigate]);

    return (
        <GoodForm title={"Edit Good"} formData={data} submitText={"Update"}></GoodForm>
    );
}

export default EditGood;

// eslint-disable-next-line react-refresh/only-export-components
export const updateAction = async ({ request }) =>{
    const data = await request.formData();
    const updateData = {
        id: data.get("id"),
        name: data.get("name"),
        description: data.get("description"),
        timeStored: data.get("timeStored"),
        bestBeforeDate: data.get("bestBeforeDate"),
    };
    return await apiClient.put(ENDPOINTS.GOODS.UPDATE(updateData.id), updateData).then(() => {
        return { success: true };

    }).catch((error) => {
        return { success: false, error: Utility.mapErrorResponseToMessage(error) || 'Update failed'};
    });
}