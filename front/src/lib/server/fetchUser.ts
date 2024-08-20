import { LogForm, RegForm } from "@/interfaces/IForm";

export const postRegister = async (formData: RegForm) => {
    const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const result = await response.json();
      return result;
}

export const postSignIn = async (formData: LogForm) => {
    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const result = await response.json();
    return result;
}