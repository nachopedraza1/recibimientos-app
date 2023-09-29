export const removeSecondName = (nombreCompleto: string) => {
    const palabras = nombreCompleto.split(' ');

    if (palabras.length >= 3) {
        palabras.splice(1, 1);
    }

    return palabras.join(' ');
}