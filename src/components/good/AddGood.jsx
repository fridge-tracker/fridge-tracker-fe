import GoodForm from "./GoodForm.jsx";
import {useActionData, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import apiClient, {ENDPOINTS} from "../../api/apiClient.js";
import Utility from "../../utility/Utility.js";

const AddGood = () => {
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.success) {
            toast.success("New good is successfully added.");
            navigate("/goods");
        }
        toast.error(actionData?.error)
    }, [actionData, navigate]);


    return (
        <GoodForm title={"Add Good"} submitText={"Add"}></GoodForm>
    );
}

export default AddGood;

// eslint-disable-next-line react-refresh/only-export-components
export const addAction = async ({ request }) =>{
    const data = await request.formData();
    const addData = {
        name: data.get("name"),
        description: data.get("description"),
        timeStored: data.get("timeStored"),
        bestBeforeDate: data.get("bestBeforeDate"),
    };
    return await apiClient.post(ENDPOINTS.GOODS.ADD, addData).then(() => {
        return { success: true };

    }).catch((error) => {
        return { success: false, error: Utility.mapErrorResponseToMessage(error) || 'Update failed'};
    });
}