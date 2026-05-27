// After Submission Validations

export function phoneInputValidation(phone:number|null,setErrors:(error: string|null) => void) {
    if (phone !== null && (phone > 9999999999 || phone < 1000000000)) {
        setErrors("Please enter a valid 10-digit phone number.");
        return false;
    }
    if (phone === null) {
        setErrors("Phone number is required.");
        return false;
    }
    setErrors(null);
    return true;
}
export function emailInputValidation(email:string,setErrors:(error: string|null) => void) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setErrors("Please enter a valid email address.");
        return false;
    }
    setErrors(null);
    return true;
}