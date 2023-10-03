
import { Rows } from "@/interfaces";
import { alertSnack } from "@/utils";
import { Switch } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { FC, useEffect, useState } from "react"

export const SwitchTableRow: FC<{ row: Rows }> = ({ row }) => {

    const [switchState, setSwitchState] = useState(row.active);

    useEffect(() => {
        setSwitchState(row.active);
    }, [row.active]);

    const handleSwitchToggle = async () => {
        setSwitchState(!switchState);

        try {
            await axios.put('/api/matches', { matchName: row.name });
            alertSnack('Creado con éxito', 'success');
        } catch (error) {
            if (isAxiosError(error)) {
                alertSnack(`${error.response?.data.message}`, 'error');
            }
        }
    };

    return (
        <Switch
            checked={switchState}
            onChange={() => handleSwitchToggle()}
        />
    )
}
