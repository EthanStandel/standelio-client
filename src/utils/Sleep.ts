export const Sleep = async (milliseconds: number): Promise<void> => await new Promise(
    resolve => setTimeout(resolve, milliseconds)
);
