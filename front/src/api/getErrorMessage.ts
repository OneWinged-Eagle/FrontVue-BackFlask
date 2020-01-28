// getErrorMessage takes an axios error and returns a readable error message.
export const getErrorMessage = (error: any) => {
	let returnMessage = ""

	if (error.response && error.response.data) {
		returnMessage = ` (${error.response.data.msg || error.response.data.error_message || error.response.data})`
	}

	return error.message + returnMessage
}
