import { useState, FC, ReactNode } from 'react';
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

interface Props {
    children: ReactNode;
}

export const Animation: FC<Props> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const onVisibilityChange = (isVisible: boolean) => {
        setIsVisible(isVisible);
    };

    return (
        <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
            {({ isVisible }: any) => (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {children}
                </motion.div>
            )}
        </VisibilitySensor>
    );
};
