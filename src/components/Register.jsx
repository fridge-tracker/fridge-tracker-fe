import PageTitle from "./PageTitle.jsx";
import {Form, useActionData, useNavigate} from "react-router-dom";
import apiClient, {ENDPOINTS} from "../api/apiClient.js";
import {toast} from "react-toastify";
import {useEffect} from "react";
import Utility from "../utility/Utility.js";


export default function Register (){
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.success) {
            toast.success("Registration completed successfully");
            navigate("/home");
        }
        toast.error(actionData?.error)
    }, [actionData, navigate]);


    return (
        <div className="formContainer">
            <div>
                <PageTitle title="Register" />

                <Form method="POST" className="form">
                    <div>
                        <label htmlFor="email" >
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Your Email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName" >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="Your First Name"
                            autoComplete="firstName"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Your Last Name"
                            autoComplete="lastName"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            autoComplete="current-password"
                            required
                            minLength={4}
                            maxLength={20}
                        />
                    </div>

                    <div>
                        <button className="styledButton"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}




// eslint-disable-next-line react-refresh/only-export-components
export const registerAction = async ({ request }) =>{
    const data = await request.formData();
    const registerData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
    };
    return await apiClient.post(ENDPOINTS.USER.REGISTER, registerData).then(() => {
            return { success: true };

    }).catch((error) => {
        return { success: false, error: Utility.mapErrorResponseToMessage(error) || 'Registration failed'};
    });
}
