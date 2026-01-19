use std::collections::HashMap;
use std::sync::OnceLock;

pub struct ChapterPtr {
    pub book:Book,
    pub chapter:usize,
    pub index:usize,
    pub translation:Option<String>
}

#[derive(Clone, Copy)]
pub struct Book {
    pub name: &'static str,
    pub abbr: &'static str,
    pub index: u8,
    pub chapters: u8
}

pub struct BIBLE;
static CHAPTERS_MAP: OnceLock<HashMap<usize, ChapterPtr>> = OnceLock::new();

impl BIBLE {
    pub const GENESIS:Book               = Book { name: "Genesis",           abbr: "Gen",     index:  1, chapters:  50 };
    pub const EXODUS:Book                = Book { name: "Exodus",            abbr: "Exod",    index:  2, chapters:  40 };
    pub const LEVITICUS:Book             = Book { name: "Leviticus",         abbr: "Lev",     index:  3, chapters:  27 };
    pub const NUMBERS:Book               = Book { name: "Numbers",           abbr: "Num",     index:  4, chapters:  36 };
    pub const DEUTERONOMY:Book           = Book { name: "Deuteronomy",       abbr: "Deut",    index:  5, chapters:  34 };
    pub const JOSHUA:Book                = Book { name: "Joshua",            abbr: "Josh",    index:  6, chapters:  24 };
    pub const JUDGES:Book                = Book { name: "Judges",            abbr: "Judg",    index:  7, chapters:  21 };
    pub const RUTH:Book                  = Book { name: "Ruth",              abbr: "Ruth",    index:  8, chapters:   4 };
    pub const FIRST_SAMUEL:Book          = Book { name: "1 Samuel",          abbr: "1Sam",    index:  9, chapters:  31 };
    pub const SECOND_SAMUEL:Book         = Book { name: "2 Samuel",          abbr: "2Sam",    index: 10, chapters:  24 };
    pub const FIRST_KINGS:Book           = Book { name: "1 Kings",           abbr: "1Kgs",    index: 11, chapters:  22 };
    pub const SECOND_KINGS:Book          = Book { name: "2 Kings",           abbr: "2Kgs",    index: 12, chapters:  25 };
    pub const FIRST_CHRONICLES:Book      = Book { name: "1 Chronicles",      abbr: "1Chr",    index: 13, chapters:  29 };
    pub const SECOND_CHRONICLES:Book     = Book { name: "2 Chronicles",      abbr: "2Chr",    index: 14, chapters:  36 };
    pub const EZRA:Book                  = Book { name: "Ezra",              abbr: "Ezra",    index: 15, chapters:  10 };
    pub const NEHEMIAH:Book              = Book { name: "Nehemiah",          abbr: "Neh",     index: 16, chapters:  13 };
    pub const ESTHER:Book                = Book { name: "Esther",            abbr: "Esth",    index: 17, chapters:  10 };
    pub const JOB:Book                   = Book { name: "Job",               abbr: "Job",     index: 18, chapters:  42 };
    pub const PSALMS:Book                = Book { name: "Psalms",            abbr: "Ps",      index: 19, chapters: 150 };
    pub const PROVERBS:Book              = Book { name: "Proverbs",          abbr: "Prov",    index: 20, chapters:  31 };
    pub const ECCLESIASTES:Book          = Book { name: "Ecclesiastes",      abbr: "Eccl",    index: 21, chapters:  12 };
    pub const SONG_OF_SOLOMON:Book       = Book { name: "Song of Solomon",   abbr: "Song",    index: 22, chapters:   8 };
    pub const ISAIAH:Book                = Book { name: "Isaiah",            abbr: "Isa",     index: 23, chapters:  66 };
    pub const JEREMIAH:Book              = Book { name: "Jeremiah",          abbr: "Jer",     index: 24, chapters:  52 };
    pub const LAMENTATIONS:Book          = Book { name: "Lamentations",      abbr: "Lam",     index: 25, chapters:   5 };
    pub const EZEKIEL:Book               = Book { name: "Ezekiel",           abbr: "Ezek",    index: 26, chapters:  48 };
    pub const DANIEL:Book                = Book { name: "Daniel",            abbr: "Dan",     index: 27, chapters:  12 };
    pub const HOSEA:Book                 = Book { name: "Hosea",             abbr: "Hos",     index: 28, chapters:  14 };
    pub const JOEL:Book                  = Book { name: "Joel",              abbr: "Joel",    index: 29, chapters:   3 };
    pub const AMOS:Book                  = Book { name: "Amos",              abbr: "Amos",    index: 30, chapters:   9 };
    pub const OBADIAH:Book               = Book { name: "Obadiah",           abbr: "Obad",    index: 31, chapters:   1 };
    pub const JONAH:Book                 = Book { name: "Jonah",             abbr: "Jonah",   index: 32, chapters:   4 };
    pub const MICAH:Book                 = Book { name: "Micah",             abbr: "Mic",     index: 33, chapters:   7 };
    pub const NAHUM:Book                 = Book { name: "Nahum",             abbr: "Nah",     index: 34, chapters:   3 };
    pub const HABAKKUK:Book              = Book { name: "Habakkuk",          abbr: "Hab",     index: 35, chapters:   3 };
    pub const ZEPHANIAH:Book             = Book { name: "Zephaniah",         abbr: "Zeph",    index: 36, chapters:   3 };
    pub const HAGGAI:Book                = Book { name: "Haggai",            abbr: "Hag",     index: 37, chapters:   2 };
    pub const ZECHARIAH:Book             = Book { name: "Zechariah",         abbr: "Zech",    index: 38, chapters:  14 };
    pub const MALACHI:Book               = Book { name: "Malachi",           abbr: "Mal",     index: 39, chapters:   4 };
    pub const MATTHEW:Book               = Book { name: "Matthew",           abbr: "Matt",    index: 40, chapters:  28 };
    pub const MARK:Book                  = Book { name: "Mark",              abbr: "Mark",    index: 41, chapters:  16 };
    pub const LUKE:Book                  = Book { name: "Luke",              abbr: "Luke",    index: 42, chapters:  24 };
    pub const JOHN:Book                  = Book { name: "John",              abbr: "John",    index: 43, chapters:  21 };
    pub const ACTS:Book                  = Book { name: "Acts",              abbr: "Acts",    index: 44, chapters:  28 };
    pub const ROMANS:Book                = Book { name: "Romans",            abbr: "Rom",     index: 45, chapters:  16 };
    pub const FIRST_CORINTHIANS:Book     = Book { name: "1 Corinthians",     abbr: "1Cor",    index: 46, chapters:  16 };
    pub const SECOND_CORINTHIANS:Book    = Book { name: "2 Corinthians",     abbr: "2Cor",    index: 47, chapters:  13 };
    pub const GALATIANS:Book             = Book { name: "Galatians",         abbr: "Gal",     index: 48, chapters:   6 };
    pub const EPHESIANS:Book             = Book { name: "Ephesians",         abbr: "Eph",     index: 49, chapters:   6 };
    pub const PHILIPPIANS:Book           = Book { name: "Philippians",       abbr: "Phil",    index: 50, chapters:   4 };
    pub const COLOSSIANS:Book            = Book { name: "Colossians",        abbr: "Col",     index: 51, chapters:   4 };
    pub const FIRST_THESSALONIANS:Book   = Book { name: "1 Thessalonians",   abbr: "1Thess",  index: 52, chapters:   5 };
    pub const SECOND_THESSALONIANS:Book  = Book { name: "2 Thessalonians",   abbr: "2Thess",  index: 53, chapters:   3 };
    pub const FIRST_TIMOTHY:Book         = Book { name: "1 Timothy",         abbr: "1Tim",    index: 54, chapters:   6 };
    pub const SECOND_TIMOTHY:Book        = Book { name: "2 Timothy",         abbr: "2Tim",    index: 55, chapters:   4 };
    pub const TITUS:Book                 = Book { name: "Titus",             abbr: "Titus",   index: 56, chapters:   3 };
    pub const PHILEMON:Book              = Book { name: "Philemon",          abbr: "Phlm",    index: 57, chapters:   1 };
    pub const HEBREWS:Book               = Book { name: "Hebrews",           abbr: "Heb",     index: 58, chapters:  13 };
    pub const JAMES:Book                 = Book { name: "James",             abbr: "Jas",     index: 59, chapters:   5 };
    pub const FIRST_PETER:Book           = Book { name: "1 Peter",           abbr: "1Pet",    index: 60, chapters:   5 };
    pub const SECOND_PETER:Book          = Book { name: "2 Peter",           abbr: "2Pet",    index: 61, chapters:   3 };
    pub const FIRST_JOHN:Book            = Book { name: "1 John",            abbr: "1John",   index: 62, chapters:   5 };
    pub const SECOND_JOHN:Book           = Book { name: "2 John",            abbr: "2John",   index: 63, chapters:   1 };
    pub const THIRD_JOHN:Book            = Book { name: "3 John",            abbr: "3John",   index: 64, chapters:   1 };
    pub const JUDE:Book                  = Book { name: "Jude",              abbr: "Jude",    index: 65, chapters:   1 };
    pub const REVELATION:Book            = Book { name: "Revelation",        abbr: "Rev",     index: 66, chapters:  22 };

    pub const TOTAL_CHAPTERS:i16 = 1189;

    pub fn chapters_map(chapter_index: usize, translation: Option<&str>) -> Option<ChapterPtr> {
        let map = CHAPTERS_MAP.get_or_init(|| {
            let mut map = HashMap::new();
            for iter in Iterate_Bible_Chapters() {
                map.insert(
                    iter.i,
                    ChapterPtr::new(iter.book, iter.chapter, iter.i, None),
                );
            }
            map
        });

        let ptr: &ChapterPtr = map.get(&chapter_index)?;


        
        return Some(ChapterPtr {
            book: ptr.book.clone(),
            chapter: ptr.chapter,
            index: ptr.index,
            translation: translation.map(str::to_owned),
        });
    }
}


#[derive(Clone, Copy)]
pub struct ChapterIter {
    pub i: usize,
    pub book: Book,
    pub chapter: u8,
}
pub struct IterateBibleChapters {
    i: usize,
    books: std::slice::Iter<'static, Book>,
    current_book: Option<Book>,
    chapter: u8,
}
impl Iterator for IterateBibleChapters {
    type Item = ChapterIter;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            match self.current_book {
                Some(book) if self.chapter <= book.chapters => {
                    let item = ChapterIter {
                        i: self.i,
                        book,
                        chapter: self.chapter,
                    };
                    self.i += 1;
                    self.chapter += 1;
                    return Some(item);
                }

                _ => {
                    self.current_book = self.books.next().copied();
                    self.chapter = 1;

                    if self.current_book.is_none() {
                        return None;
                    }
                }
            }
        }
    }
}