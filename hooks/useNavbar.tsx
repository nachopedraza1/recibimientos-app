import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useNavbar = () => {

    const router = useRouter();

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
        if (router.pathname !== '/') return setNavbarBlur("active-blur");
        window.addEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (router.pathname === '/') return setActiveSection('inicio')
        if (router.pathname.includes('/recibimientos')) return setActiveSection('recibimientos')
        setActiveSection(router.pathname.substring(1))
    }, [router.pathname])


    return {

        activeSection,
        navbarBlur,
    }
}