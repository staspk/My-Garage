console.log('FIXIT RUNNING...')

const urlParams = new URLSearchParams(window.location.search);
const passageArray = urlParams.get('search').split(' ');

const BOOK         = passageArray.slice(0, -1).join(' ');                           //  '1 John'
const CHAPTER      = passageArray[passageArray.length - 1];                         //  '3'
const TRANSLATIONS = urlParams.get('version').split(';');                           //  ['KJV', 'NASB', 'RSV', 'RUSV', 'NRT']

print('BOOK', BOOK)
print('CHAPTER', CHAPTER)

if(TRANSLATIONS.length === 1) {
    console.log("one translation targetted:", TRANSLATIONS);

    const logo = document.querySelector('.logo');
    logo.remove();

    const leftNavButtons = document.querySelector('.an-mobile-menu-closed');           // Goal: leave an empty red column running vertically on the keft side
    leftNavButtons.remove();

    const leftAd = document.querySelector('.sidebar-tall-ad');                         // Goal: remove left ad and make the nav-bar less wide
    leftAd.remove();
    setTimeout(() => {
        const leftAd = document.querySelector('.sidebar-tall-ad');
        leftAd.remove();

        const leftNav = document.querySelector('nav');
        leftNav.style.minWidth = '100px';
    }, 1050);

    const passageDiv = document.querySelector('.passage-col');                         // Goal: make passage padding more reasonable
    passageDiv.style.padding = '40px 500px 40px 500px';
}

if(TRANSLATIONS.length > 1) {
    console.log("multiple translations targetted:", TRANSLATIONS);

    const leftNav = document.querySelector('nav');
    leftNav.style.pointerEvents = 'none';

    const leftNavButtons = document.querySelector('.an-mobile-menu-closed');           // Goal: leave an empty red column running vertically on the left side
    leftNavButtons.remove();

    const content = document.querySelector('.content');                                // Goal: add padding to right side   
    content.style.padding = '32px 72px 21px 32px';

    const passageColumns = document.querySelectorAll('.passage-box .passage-col');     // Goal: change padding in reading columns from: 40px 60px, to: 40px 40px
    passageColumns.forEach(column => {
        column.style.padding = '40px 40px';
    });

    const passageLabels = document.querySelectorAll('.passage-display');               // Goal: remove redundant chapter/translation labels/buttons so that text begins at identical x-axis
    passageLabels.forEach(label => {
        label.remove();
    });

    setTimeout(() => {                                                                // Goal: make the previous/next chapter buttons smaller / less intrusive
        const prevButton = document.querySelector('.prev-chapter');
        if(prevButton) {
            prevButton.style.width = "20px"; prevButton.style.height = "28px";
        }
            
        const nextButton = document.querySelector('.next-chapter');
        if(nextButton) {
            nextButton.style.width = "20px"; nextButton.style.height = "28px";
            nextButton.style.transform = 'translate(10px, 10px)'
        }

        document.querySelectorAll('.prev-next path').forEach(arrow => {
            if(arrow)   arrow.style.transform = 'scale(.5, .5)';
        });
        document.querySelectorAll('.prev-chapter svg').forEach(arrow => {
            if(arrow)   arrow.style = 'position: relative; top: -10px; left: -3px;';
        });
        document.querySelectorAll('.next-chapter svg').forEach(arrow => {
            if(arrow)   arrow.style = 'position: relative; top: -10px;';
        });
    }, 125);


    // console.log(prevRect);
    // console.log(prevRect.style);
    // console.log(prevRect.style.top);
    // const box = prevRect.getBoundingClientResct();
    // console.log(box);

    // const abbr = (() => {
    //     return `text ${abbr}-${chapter}-`
    // })();

    const ABBR = BIBLE.getAbbr(BOOK);

    const min_width_between_column = '80px';

    setTimeout(() => {
        let verse_num = 0;
        while(true) {
            verse_num++;
            const selector = `span.text.${ABBR}-${CHAPTER}-${verse_num}`;
            const verse_elements = document.querySelectorAll(selector);

            if(verse_elements.length === 0 || verse_elements.length === 6)
                return;

            TITLES_IN_ROW_EXIST = TRANSLATIONS.length - verse_elements.length;

            if(TITLES_IN_ROW_EXIST) {
                TITLE_Y = 0; MAX_TITLE_HEIGHT = 0;
                VERSE_ALIGN_Y = 0;

                for (let i = 0; i < verse_elements.length; i++) {
                    const this_rect = verse_elements[i].getBoundingClientRect();
                    const this_x = parseInt(this_rect.x);

                    if(VERSE_ALIGN_Y < this_rect.y)
                        VERSE_ALIGN_Y = this_rect.y;

                    if( (i + 1) < verse_elements.length ) {             // if next element exists
                        const next_rect = verse_elements[i+1].getBoundingClientRect();
                        const next_x = parseInt(next_rect.x);

                        if(next_x === this_x) {                         // this_x == title elem. next_x == verse elem
                            if(TITLE_Y < this_rect.y)
                                TITLE_Y = this_rect.y;                  // finding the highest y value

                            if(MAX_TITLE_HEIGHT < this_rect.height)
                                MAX_TITLE_HEIGHT = this_rect.height;
                            
                            i++;
                        }
                    }
                }

                for (let i = 0; i < verse_elements.length; i++) {
                    const this_rect = verse_elements[i].getBoundingClientRect();
                    const this_x = parseInt(this_rect.x);

                    if( (i + 1) < verse_elements.length ) {             // if next element exists
                        const next_rect = verse_elements[i+1].getBoundingClientRect();
                        const next_x = parseInt(next_rect.x);

                        if(next_x === this_x) { 
                            if(this_rect.y < TITLE_Y)
                                verse_elements[i].style.transform = `translate(0px, ${TITLE_Y - this_rect.y}px)`;

                            if(next_rect.y < VERSE_ALIGN_Y)
                                verse_elements[i+1].style.transform = `translate(0px, ${VERSE_ALIGN_Y - next_rect.y}px)`;
                        }
                    }
                    else {
                        if(this_rect.y < VERSE_ALIGN_Y)
                            verse_elements[i].style.transform = `translate(0px, ${VERSE_ALIGN_Y - this_rect.y}px)`;
                    }
                }
            }
            else {
                VERSE_ALIGN_Y = 0;

                for (let i = 0; i < verse_elements.length; i++) {
                    const this_rect = verse_elements[i].getBoundingClientRect();

                    if(VERSE_ALIGN_Y < this_rect.y)
                        VERSE_ALIGN_Y = this_rect.y;
                }

                print('ON SECOND LOOP...');
                print('VERSE_ALIGN_Y', VERSE_ALIGN_Y);

                for (let i = 0; i < verse_elements.length; i++) {
                    const this_rect = verse_elements[i].getBoundingClientRect();
                    print('element(this_rect)', verse_elements[i]);

                    print('BEFORE:', verse_elements[i].getBoundingClientRect());

                     if(this_rect.y < VERSE_ALIGN_Y) {
                        verse_elements[i].style.transform = `translate(0px, ${VERSE_ALIGN_Y - this_rect.y}px)`;
                        print(`just did a translation of: ${VERSE_ALIGN_Y - this_rect.y}`);
                        print('AFTER:', verse_elements[i].getBoundingClientRect());
                     }
                        
                }

                print()
            }
        }
    }, 200);
    

    // TRANSLATIONS.forEach(version => {

    // });

    const targetElement = 'text Matt-23-2';

    // const cssSelector = '.' + targetClass.split(' ').join('.');     // Converts "text Matt-23-2" to ".text.Matt-23-2"
}
else {
    console.log("else reached. -not(translations.length === 1) && -not(translations.length > 1)")
}



