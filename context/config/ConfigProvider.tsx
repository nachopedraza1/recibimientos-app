import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import useSWR, { mutate } from 'swr';

import { UiContext } from '@/context/ui';
import { ConfigContext, configReducer } from '@/context/config';

import { IMatch } from '@/interfaces';

export interface ConfigState {
    activeMatch: IMatch | null;
}

const Config_INITIAL_STATE: ConfigState = {
    activeMatch: null,
}


export const ConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const { activeSwitch } = useContext(UiContext);

    const [state, dispatch] = useReducer(configReducer, Config_INITIAL_STATE);

    const { data } = useSWR<IMatch>('/api/matches?active=true', {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    });

    const reloadData = async () => {
        await mutate('/api/matches?active=true');
    };

    useEffect(() => {
        reloadData();
        dispatch({ type: '[Config] - setActiveMatch', payload: data });
    }, [data, activeSwitch]);

    return (
        <ConfigContext.Provider value={{
            ...state
        }}>
            {children}
        </ConfigContext.Provider>
    )
};