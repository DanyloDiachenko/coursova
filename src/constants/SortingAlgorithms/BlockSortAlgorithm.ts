import { AbstractSortingAlgorithm } from "./AbstractSortingAlgorithm";
import { SortDirection } from "../variables";

export class BlockSortAlgorithm extends AbstractSortingAlgorithm {
    get name(): string {
        return "Block Sort";
    }

    get complexity(): string {
        return "O(n * log(n))";
    }

    *sort(
        data: number[],
        direction: SortDirection,
    ): Generator<number[], number[], unknown> {
        const array = this.cloneArray(data);
        const n = array.length;

        if (n === 0) {
            return yield* this.handleEmptyArray();
        }
        yield [...array];

        const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));
        let blocks: number[][] = [];

        for (let i = 0; i < n; i += blockSize) {
            let block = array.slice(i, i + blockSize);
            for (let j = 1; j < block.length; j++) {
                let key = block[j];
                let k = j - 1;
                while (k >= 0 && block[k] > key) {
                    block[k + 1] = block[k];
                    k = k - 1;
                }
                block[k + 1] = key;
            }
            blocks.push(block);
        }

        let reconstructionIndex = 0;
        const reconstructedArray = new Array(n);
        for (const block of blocks) {
            for (const element of block) {
                if (reconstructionIndex < n) {
                    reconstructedArray[reconstructionIndex++] = element;
                }
            }
        }
        yield [...reconstructedArray];

        const result: number[] = [];
        const blockPointers = new Array(blocks.length).fill(0);

        for (let i = 0; i < n; i++) {
            let minVal = Infinity;
            let minBlockIndex = -1;

            for (let j = 0; j < blocks.length; j++) {
                if (blockPointers[j] < blocks[j].length) {
                    if (blocks[j][blockPointers[j]] < minVal) {
                        minVal = blocks[j][blockPointers[j]];
                        minBlockIndex = j;
                    }
                }
            }

            if (minBlockIndex !== -1) {
                result.push(minVal);
                blockPointers[minBlockIndex]++;

                const visualStepArray = new Array(n).fill(0);
                let currentFillIndex = 0;
                for (const sortedVal of result) {
                    if (currentFillIndex < n) {
                        visualStepArray[currentFillIndex++] = sortedVal;
                    }
                }
                for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
                    for (
                        let eIdx = blockPointers[bIdx];
                        eIdx < blocks[bIdx].length;
                        eIdx++
                    ) {
                        if (currentFillIndex < n) {
                            visualStepArray[currentFillIndex++] =
                                blocks[bIdx][eIdx];
                        }
                    }
                }
                yield [...visualStepArray];
            } else {
                break;
            }
        }
        return yield* this.handleSortDirection(result, direction);
    }
}
