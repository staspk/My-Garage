use std::collections::{HashMap, HashSet};
use crate::Bible::BIBLE;
use crate::Bible::ChapterPtr;
use rand::seq::IteratorRandom;
use rand::thread_rng;

pub fn Protestant_Set() -> HashSet<i16> {
    (1..BIBLE::TOTAL_CHAPTERS+1).collect()
}

pub fn random_pop(set:&mut HashSet<i16>) -> Option<i16> {
    let mut rng = thread_rng();
    let value = set.iter().copied().choose(&mut rng)?;
    set.remove(&value);
    return Some(value)
}

pub struct BibleChapters {
    sets: HashMap<String, HashSet<usize>>,
    marked: HashMap<String, HashSet<usize>>
}

impl BibleChapters {
    /// sets: `HashMap<translation, chapters>`
    pub fn new(sets: HashMap<String, HashSet<usize>>) -> Self {
        let mut marked = HashMap::new();
        for translation in sets.keys() {
            marked.insert(translation.clone(), HashSet::new());
        }

        return Self { sets, marked }
    }

    /// Pops random chapter indices from `sets`
    pub fn iterate(&self) -> BibleChaptersIterator {
        let mut sets: HashMap<String, HashSet<usize>> =
            self.sets
                .iter()
                .filter(|(_, v)| !v.is_empty())
                .map(|(k, v)| (k.clone(), v.clone()))
                .collect();

        let mut left: usize = sets.values().map(|s| s.len()).sum();
        
        return BibleChaptersIterator { sets, left }
    }

    pub fn iterate_marked(&self) -> Vec<ChapterPtr> {
        let mut marked: HashMap<String, HashSet<usize>> =
            self.marked
                .iter()
                .filter(|(_, v)| !v.is_empty())
                .map(|(k, v)| (k.clone(), v.clone()))
                .collect();

        let mut left: usize = marked.values().map(|s| s.len()).sum();
        let mut out = Vec::with_capacity(left);

        while left > 0 {
            let translation = {
                let keys: Vec<&String> = marked.keys().collect();
                keys[rand::random::<usize>() % keys.len()].clone()
            };

            let chap_index = random_pop(marked.get_mut(translation).unwrap());
            let ptr = BIBLE::chapters_map(chap_index);

            out.push(ChapterPtr::new(
                ptr.book,
                ptr.chapter,
                ptr.index,
                translation.clone(),
            ));

            left -= 1;
            if marked.get(translation).unwrap().is_empty() {
                marked.remove(translation);
            }
        }

        out
    }

    pub fn mark(&mut self, translation: &str, chap_index: usize) {
        let set = self.marked.get_mut(translation).unwrap_or_else(|| {
            panic!(
                "translation/set was not instantiated in constructor. translation: {}",
                translation
            )
        });
        set.insert(chap_index);
    }

    /// `{marked}/{total_chapters}`
    pub fn ratio(&self) -> String {
        let mut marked = 0usize;
        let mut total = 0usize;

        for chapters in self.marked.values() {
            marked += chapters.len();
            total += BIBLE::TOTAL_CHAPTERS;
        }

        format!("{}/{}", marked, total)
    }
}

pub struct BibleChaptersIterator {
    sets: HashMap<String, HashSet<usize>>,
    left: usize,
}
impl Iterator for BibleChaptersIterator {
    type Item = ChapterPtr;

    fn next(&mut self) -> Option<ChapterPtr> {
        if self.left == 0 {
            return None;
        }

        let mut range = thread_rng();

        let translation = self.sets
            .keys()
            .choose(&mut range)?
            .clone();

        let set = self.sets.get_mut(&translation)?;
        let chapter_index = random_pop(set);

        let ptr = BIBLE::chapters_map(chapter_index);

        self.left -= 1;

        if set.is_empty() {
            self.sets.remove(&translation);
        }

        Some(ChapterPtr::new(
            ptr.book,
            ptr.chapter,
            ptr.index,
            translation,
        ))
    }
}