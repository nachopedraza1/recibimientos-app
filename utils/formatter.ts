export const format = (number: string | number): string => {

    const numSeparator = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return numSeparator;
}