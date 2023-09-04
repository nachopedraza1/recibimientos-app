import { useEffect, useState } from "react";

export const useNavbar = () => {

    const [activeSection, setActiveSection] = useState<string>('');
    const [navbarBlur, setNavbarBlur] = useState<string>('')

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setNavbarBlur("active-blur");
        } else {
            setNavbarBlur("");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
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
        activeSection,
        navbarBlur,
    }
}