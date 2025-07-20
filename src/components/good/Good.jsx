import apiClient, {ENDPOINTS} from "../../api/apiClient.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const Good = ({data, rerender}) => {
    const id = data.id;
    const {name, description, timeStored, bestBeforeDate, status} = data;
    const navigate = useNavigate();

    const getStatusClass = (status) => {
        if (status === "Near expiry") {
            return "near-expiry";
        } else if (status === "Expired") {
            return "expired";
        } else if (status === "Fresh") {
            return "fresh";
        }
        return "";
    };


    return (
        <div className="element-container">
            <div className="element-description">
                <p>name: {name}</p>
                <p>description: {description}</p>
                <p>stored time: {timeStored}</p>
                <p>best before date: {bestBeforeDate}</p>
                <p>status: <span className={getStatusClass(status)}>{status}</span></p>
                <button className="styledButton" onClick={()=>navigate("/editGood", {state: data})}>Edit</button>
                <button className="styledButton" onClick={() => {
                    removeGood(id).then(() => {rerender(true);});
                }
                }>Remove</button>
            </div>
        </div>
    );
};

const removeGood = async (id) => {
    await apiClient.delete(ENDPOINTS.GOODS.REMOVE(id)).then(() => {
        toast.success("Good removed successfully");
    }).catch(() => {
        toast.error("Failed to remove good");
    })
}

export default Good;