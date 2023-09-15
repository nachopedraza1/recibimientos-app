import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

export const useNavbar = () => {

    const router = useRouter();

    const [activeSection, setActiveSection] = useState<string>('');
    const [navbarBlur, setNavbarBlur] = useState<string>('')
    console.log(activeSection);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setNavbarBlur("active-blur");
        } else {
            setNavbarBlur("");
        }
    };


    const navigateWithoutHash = (event: FormEvent, text: string) => {

        event.preventDefault();

        if (router.pathname !== '/') {
            router.push('/');

            setTimeout(() => {
                const targetElement = document.getElementById(text);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500);

            return;
        }

        const targetElement = document.getElementById(text);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {

            if (router.pathname !== '/') return setActiveSection('profile')

            const sections = document.querySelectorAll('section');
            let currentSection = null;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= 10 && rect.bottom >= 0) {
                    currentSection = section.id;
                }
            });
            setActiveSection(currentSection!);
        };
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        navigateWithoutHash,
        activeSection,
        navbarBlur,
    }
}