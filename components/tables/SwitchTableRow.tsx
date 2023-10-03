import { FC, useContext } from "react"
import axios, { isAxiosError } from "axios";

import { UiContext } from "@/context/ui";
import { alertSnack } from "@/utils";

import { Switch } from "@mui/material";
import { Rows } from "@/interfaces";

export const SwitchTableRow: FC<{ row: Rows }> = ({ row }) => {

    const { activeSwitch, updateActiveSwitch } = useContext(UiContext);

    const handleSwitchToggle = async () => {
        try {
            await axios.put('/api/matches', { matchName: row.name });
            updateActiveSwitch(row.name!);
        } catch (error) {
            if (isAxiosError(error)) {
                alertSnack(`${error.response?.data.message}`, 'error');
            }
        }
    };

    return (
        <Switch
            checked={!activeSwitch ? row.active : activeSwitch === row.name}
            onChange={() => handleSwitchToggle()}
        />
    )
}
