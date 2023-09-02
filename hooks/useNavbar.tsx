import { useEffect, useState } from "react";
import { styledOnScroll } from "@/utils/styledOnScroll";

export const useNavbar = () => {

    const [activeTab, setActiveTab] = useState<string>('');

    const navbarStyle = styledOnScroll();

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentSection = null;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= 0 && rect.bottom >= 0) {
                    currentSection = section.id;
                }
            });
            setActiveTab(currentSection!);
        };
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        activeTab,
        navbarStyle,
    }
}