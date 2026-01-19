#![allow(warnings)]

mod Bible; mod bible_chapters;
mod print;
use crate::Bible::BIBLE;
use crate::Bible::ChapterPtr;
use crate::print::Print;
use std::fs;
use std::path::PathBuf;


pub fn BIBLE_TXT_NEW() -> PathBuf {
    PathBuf::from(file!())
        .canonicalize().expect("bs")
        .parent().expect("bs")
        .parent().expect("bs")
        .join("bible_txt")
}

pub fn file(ptr:&ChapterPtr) -> PathBuf {
    PathBuf::from(BIBLE_TXT_NEW())
        .join(ptr.translation.as_ref().expect("translation is required"))
        .join(&ptr.book.name)
        .join(format!("{}.txt", ptr.chapter))
}
pub fn text(ptr:&ChapterPtr) -> String {
    let path:PathBuf = file(ptr);
    return fs::read_to_string(path).expect("failed to read file as UTF-8")
}

pub fn is_titled(ptr: &ChapterPtr, text: &str) -> bool {
    let array: Vec<&str> = text.split("1 ").collect();

    if array.len() == 1 { return false; }
    if array[0].lines().count() > 0 { return true; }
    return false;
}

fn main() {
    // let mut chapters = BibleChapterSets::new(StandardForm::Inverse());

    // for ptr in chapters.iterate() {
    //     if is_titled(&ptr, text(&ptr)) {
    //         chapters.mark(&ptr.translation, ptr.index);
    //     }
    // }

    // Print::red(chapters.total_marked());
    Print::red(BIBLE_TXT_NEW().display());
}
