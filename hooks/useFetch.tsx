import useSWR, { SWRConfiguration } from 'swr';

interface FetchData<T> {
    data: T;
    isLoading: boolean;
}

export function useFetch<T>(url: string, config: SWRConfiguration = {}): FetchData<T> {

    const { data, isLoading } = useSWR(`/api${url}`, config);

    return {
        data,
        isLoading
    }
}

