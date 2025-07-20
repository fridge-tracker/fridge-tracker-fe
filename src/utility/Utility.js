class Utility {
    static mapErrorResponseToMessage(error) {
        if (!error?.response?.data) {
            return false;
        }

        const responseData = error.response.data;
        let messageArray = [];

        if (responseData.detail) {
            messageArray.push(` ${responseData.detail}  `);
        }

        if (responseData.errors && Array.isArray(responseData.errors)) {
            const errorMessages = responseData.errors
                .map(error => {
                    const {messages} = error;
                    return messages.join(' ');
                })
                .join(' ');
            if (errorMessages) {
                messageArray.push(errorMessages);
            }
        }
        return messageArray.join(' ');
    }

}

export default Utility;
