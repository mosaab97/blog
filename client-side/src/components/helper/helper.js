import validator from 'validator'

export const isNullOrEmptyOrUndifind = (data) => data === null || data === "" || data === undefined

export const handleTextValidation = (id, value) => {
    if(isNullOrEmptyOrUndifind(value)) {
        return true
    } else if(id.includes('email')) {
        return !validator.isEmail(value)
    }
    return false
}