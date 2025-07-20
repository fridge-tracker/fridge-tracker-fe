import PageTitle from "../PageTitle.jsx";
import {Form} from "react-router-dom";

const GoodForm = ({title, submitText, formData}) => {
    return (
        <div className="formContainer">
            <div>
                <PageTitle title={title} />

                <Form method="POST" className="form">

                    {formData?.id && (
                        <input
                            type="hidden"
                            id="id"
                            name="id"
                            value={formData.id}
                        />
                    )}


                    <div>
                        <label htmlFor="name" >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name Of The Good"
                            autoComplete="name"
                            required
                            defaultValue={formData?.name || ''}
                        />
                    </div>

                    <div>
                        <label htmlFor="descritpion" >
                            Good Description
                        </label>
                        <input
                            id="description"
                            type="textarea"
                            name="description"
                            placeholder="Description Of The Good"
                            autoComplete="description"
                            required
                            defaultValue={formData?.description || ''}
                        />
                    </div>

                    <div>
                        <label htmlFor="timeStored" >
                            Time Stored
                        </label>
                        <input
                            id="timeStored"
                            type="datetime-local"
                            name="timeStored"
                            placeholder="Time Stored"
                            autoComplete="timeStored"
                            required
                            defaultValue={formData?.timeStored || ''}
                        />
                    </div>

                    <div>
                        <label htmlFor="bestBeforeDate" >
                            Best Before Date
                        </label>
                        <input
                            id="bestBeforeDate"
                            type="date"
                            name="bestBeforeDate"
                            placeholder="Best Before Date"
                            autoComplete="bestBeforeDate"
                            required
                            defaultValue={formData?.bestBeforeDate || ''}
                        />
                    </div>

                    <div>
                        <button className="styledButton"
                                type="submit"
                        >
                            {submitText}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default GoodForm;