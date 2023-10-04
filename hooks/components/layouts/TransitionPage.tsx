import { ReactNode, FC } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export const TransitionPage: FC<{ children: ReactNode }> = ({ children }) => {

    const router = useRouter();

    return (
        <AnimatePresence mode='wait'>
            <motion.div key={router.pathname}>


                {children}

                <motion.div
                    className='slide-in'
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', height: "100vh" }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Image src="/logo-loading.png" alt='RecibimientoCAB' width={250} height={150} />
                    </motion.div>
                </motion.div>

                <motion.div
                    className='slide-out'
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'fixed', height: "100vh" }}
                >
                </motion.div>

            </motion.div>
        </AnimatePresence >
    )
}
