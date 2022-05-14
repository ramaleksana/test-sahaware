exports.Response = (status = 200, message = '', payload = []) => {
    return {
        status: status,
        message: message,
        payload: payload
    }
}

exports.ErrorValidation = (error) => {
    return this.Response(
        422,
        'Error Validations',
        error.details.map(i => i.message).join(','),
    )
}