export const format = (number: number | string): string => {

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}