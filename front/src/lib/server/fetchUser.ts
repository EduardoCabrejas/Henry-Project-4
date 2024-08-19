import { LogForm, RegForm } from "@/interfaces/IForm";

export const postRegister = async (formData: RegForm) => {
    const response = await fetch('http://localhost:3001/users/register', {
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

export const postLogin = async (formData: LogForm) => {
    const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const result = await response.json();
    return result;
}