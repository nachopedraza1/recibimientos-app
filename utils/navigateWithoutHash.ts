import { FormEvent } from 'react';

export const navigateWithoutHash = (event: FormEvent, text: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(text);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
};