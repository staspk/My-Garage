enum BibleTranslations {
    KJV  = 'KJV',
    NKJV = 'NKJV',
}



interface ISearchData {
    QueryString(): string
}

class BibleSearch implements ISearchData {
    translations: Array<BibleTranslations|string> = ['kjv', 'nkjv']
    constructor(
        public book: string,
        public chapter: number,
        public chapterEnd: number|undefined,
        public verse: number|undefined,
        public verseEnd:   number|undefined,
    ) {
        
    }

    QueryString(): string {
        return "";
    }
}




const key = BibleTranslations.KJV;
console.log(key)