import { useEffect, useState } from "react";

export const styledOnScroll = () => {
    const [navbarStyle, setNavbarStyle] = useState<string>("")

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setNavbarStyle("active-blur");
        } else {
            setNavbarStyle("");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    return navbarStyle
};