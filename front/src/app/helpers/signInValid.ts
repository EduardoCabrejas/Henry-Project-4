export const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        return 'El correo electrónico es requerido.';
    }
    if (!emailRegex.test(email)) {
        return 'El correo electrónico no es válido.';
    }
    return '';
};


export const validatePassword = (password: string): string => {
    const passwordTrimmed = password.trim();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const specialCharRegex = /^[A-Za-z\d@$!%*?&]+$/;
    const allowedSymbols = '@$!%*?&';

    if (!passwordTrimmed) {
        return 'La contraseña es requerida.';
    }
    if (passwordTrimmed.length < 8 || passwordTrimmed.length > 20) {
        return 'La contraseña debe tener entre 8 y 20 caracteres.';
    }
    if (!specialCharRegex.test(passwordTrimmed)) {
        return `Los símbolos aceptados son los siguientes: ${allowedSymbols}.`;
    }
    if (!passwordRegex.test(passwordTrimmed)) {
        return 'La contraseña debe contener:\n • Una letra.\n • Un número.\n • Un carácter especial.';
    }
    return '';
};