import { ISortingAlgorithm } from "./SortingAlgorithms/AbstractSortingAlgorithm";
import { BlockSortAlgorithm } from "./SortingAlgorithms/BlockSortAlgorithm";
import { CountingSortAlgorithm } from "./SortingAlgorithms/CountingSortAlgorithm";
import { FlashSortAlgorithm } from "./SortingAlgorithms/FlashSortAlgorithm";
import { RadixSortAlgorithm } from "./SortingAlgorithms/RadixSortAlgorithm";
import { SortType } from "./variables";

export class SortTypeDefinition {
    constructor(
        public readonly id: SortType,
        public readonly displayName: string,
        private readonly AlgorithmClass: new () => ISortingAlgorithm,
    ) {}

    get algorithm(): ISortingAlgorithm {
        return new this.AlgorithmClass();
    }

    get complexity(): string {
        return new this.AlgorithmClass().complexity;
    }

    validateData(data: number[]): { isValid: boolean; errorMessage?: string } {
        return new this.AlgorithmClass().validateData(data);
    }
}

export class SortTypes {
    static readonly BLOCK = new SortTypeDefinition(
        "block",
        "Блочне сортування",
        BlockSortAlgorithm,
    );
    static readonly COUNTING = new SortTypeDefinition(
        "counting",
        "Сортування підрахунком",
        CountingSortAlgorithm,
    );
    static readonly RADIX = new SortTypeDefinition(
        "radix",
        "Порозрядне сортування",
        RadixSortAlgorithm,
    );
    static readonly FLASH = new SortTypeDefinition(
        "flash",
        "Flashsort",
        FlashSortAlgorithm,
    );

    private static readonly _all: SortTypeDefinition[] = [
        SortTypes.BLOCK,
        SortTypes.COUNTING,
        SortTypes.RADIX,
        SortTypes.FLASH,
    ];

    static all(): ReadonlyArray<SortTypeDefinition> {
        return this._all;
    }

    static getById(id: SortType | null): SortTypeDefinition | null {
        if (!id) return null;
        return this._all.find((st) => st.id === id) || null;
    }
}
