export namespace Random {

    export const Int = (max: number = Number.MAX_VALUE, min: number = 0): number => {
        const minFloor = Math.floor(min);
        const maxFloor = Math.floor(max);

        return Math.floor(Math.random() * (maxFloor - minFloor)) + minFloor;
    }

    export const Bool = (): boolean => {
        return Math.random() > .5;
    }

    export const Opt = <T>(options: Array<T>): T => {
        return options[Int(0, options.length)];
    }
   
}
