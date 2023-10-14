export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomDate = (from: Date, to: Date) => {
    return new Date(
        from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
}
