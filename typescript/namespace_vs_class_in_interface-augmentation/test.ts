export enum Status {
    Success = 'success',
    Partial = 'partial',
    NotFound = 'not_found'
}

export type verseString = string;

export interface IChapter {
    [translation: string]: {
        [verseNumber: string]: verseString
    } | null;
}
export class IChapter {
    static wrapAsResponse(chapter:IChapter) {
        let amountNull = 0, total = 0;
        for (const [translation, verses] of Object.entries(chapter))
            if(verses === null)
                amountNull++;
            total++;

        if (amountNull === 0) {
            return {
                status: Status.Success,
                data: chapter
            }
        } else if(total === amountNull) {
            return {
                status: Status.NotFound,
                data: chapter
            }
        } else {
            return {
                status: Status.Partial,
                data: chapter
            }
        }
    }
}