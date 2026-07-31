export function success(data = null, message = "Success") {
	return {
		success: true,
		message,
		data,
	};
}

export function failure(message = "Something went wrong") {
	return {
		success: false,
		message,
		data: null,
	};
}
