export class ArrayGenerator {
    generate(arraySize: number, diapason: { from: number; to: number }) {
        const array = [];
        const isIntegerRange =
            Number.isInteger(diapason.from) && Number.isInteger(diapason.to);

        for (let i = 0; i < arraySize; i++) {
            const randomValue =
                Math.random() * (diapason.to - diapason.from) + diapason.from;

            array.push(isIntegerRange ? Math.floor(randomValue) : randomValue);
        }

        return array;
    }
}
