import { FC } from "react";
import { Box } from "@mui/material";

export const ProgressBar: FC<{ total: string, objetive: string }> = ({ total, objetive }) => {

    const totalCollected = parseFloat(total.replace(/\$|\.+/g, ''));
    const objetiveCollect = parseFloat(objetive.replace(/\$|\.+/g, ''));
    const progressPercentage = Math.round((totalCollected / objetiveCollect) * 100);

    return (
        <Box className='progress-bar' textAlign='center'>
            <Box className='progress-content' sx={{ width: `${progressPercentage}%` }}>
                <span style={{ fontSize: 15}}> {progressPercentage >= 100 ? 100 : progressPercentage}% </span>
            </Box>
        </Box>
    )
}
