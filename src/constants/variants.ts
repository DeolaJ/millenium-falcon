export const stageRevealVariant = {
    initial: (isEntry: boolean) => ({
        y: isEntry ? 100 : -100,
        opacity: 0,
    }),
    exit: (isEntry: boolean) => ({
        y: isEntry ? -100 : 100,
        opacity: 0,
    }),
};

export const selectionRevealVariant = {
    initial: (isEntry: boolean) => ({
        x: isEntry ? 100 : -100,
        opacity: 0,
    }),
    exit: (isEntry: boolean) => ({
        x: isEntry ? -100 : 100,
        opacity: 0,
    }),
};
