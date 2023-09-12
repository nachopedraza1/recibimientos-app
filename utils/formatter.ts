export const format = (numero: string): string => {

    const numSeparator = numero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return numSeparator;
}