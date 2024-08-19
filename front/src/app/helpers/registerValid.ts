export const validateName = (name: string): string => {
    const nameRegex = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(\s[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*){0,4}$/;
    if (!name.trim()) {
        return 'The name is required.';
    }
    if (name.length < 3 || name.length > 25) {
        return 'The name should be between 3 and 25 characters.';
    }
    if (!nameRegex.test(name)) {
        return 'The name should:\n • Begin with a capital letter.\n • Only have letters.';
    }
    return '';
};

export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        return 'The e-mail is required.';
    }
    if (!emailRegex.test(email)) {
        return 'The e-mail is not valid.';
    }
    return '';
};

export const validateAddress = (address: string): string => {
    const addressTrimmed = address.trim();
    if (!addressTrimmed) {
        return 'The address is required.';
    }
    if (addressTrimmed.length < 5 || addressTrimmed.length > 100) {
        return 'The address should be between 5 and 100 characters.';
    }
    const addressRegex = /^[A-Za-z0-9\s,.#-]+$/;
    if (!addressRegex.test(addressTrimmed)) {
        return 'The address is incorrect. It should contain only:\n • Letters and numbers.\n • Spaces and the symbols ,.#- are allowed.';
    }
    return '';
};

export const validatePhone = (phone: string): string => {
    const phoneTrimmed = phone.trim();
    const phoneRegex = /^\d{12}$/;
    if (!phoneTrimmed) {
        return 'The phone number is required.';
    }
    if (!phoneRegex.test(phone)) {
        return 'The phone number should be 12 digits.';
    }
    return '';
};

export const validatePassword = (password: string): string => {
    const passwordTrimmed = password.trim();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const specialCharRegex = /^[A-Za-z\d@$!%*?&]+$/;
    const allowedSymbols = '@ $ ! % * ? &';

    if (!passwordTrimmed) {
        return 'The password is required.';
    }
    if (passwordTrimmed.length < 8 || passwordTrimmed.length > 20) {
        return 'The password should be between 8 and 20 characters.';
    }
    if (!specialCharRegex.test(passwordTrimmed)) {
        return `Accepted symbols are the next: ${allowedSymbols}.`;
    }
    if (!passwordRegex.test(passwordTrimmed)) {
        return 'The password should contain:\n • A letter.\n • A number.\n • A special character.';
    }
    return '';
};