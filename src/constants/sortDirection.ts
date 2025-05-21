import { SortDirection } from "./variables";

export class SortDirectionDefinition {
    constructor(
        public readonly id: SortDirection,
        public readonly displayName: string,
    ) {}

    static readonly ASC = new SortDirectionDefinition("asc", "За зростанням");
    static readonly DESC = new SortDirectionDefinition("desc", "За спаданням");

    static getById(id: SortDirection | null): SortDirectionDefinition | null {
        if (id === "asc") return SortDirectionDefinition.ASC;
        if (id === "desc") return SortDirectionDefinition.DESC;
        return null;
    }

    static get all(): SortDirectionDefinition[] {
        return [SortDirectionDefinition.ASC, SortDirectionDefinition.DESC];
    }
}
