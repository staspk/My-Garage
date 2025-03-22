const AskForSynonyms = 'Amount: 75.\nGive me 100 synonyms and/or alternate expression to express this word/idea/phrase. Answers must be only words popularly used in programming/swe/data/math professional fields.\n\nWord/Phrase: '

function copyToClipboard(template) {
    navigator.clipboard.writeText(template)
        .then(() => {
            console.log(`copyToClipboard Success`);
        })
        .catch(err => {
            console.log(`copyToClipboard Failure`);
            console.error(`copyToClipboard Failure`);
        });
}

function setOnClickPaste(text) {
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target) return;

        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
          target.value = text;
        else if (target.isContentEditable)
          target.innerText = text;
        else
          target.textContent = text;

    }, {once: true});
}

function handle_template_clicked(template) {
    if(template === 'AskForSynonyms')
        template = AskForSynonyms;

    // copyToClipboard(template);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: setOnClickPaste,
            args: [template]
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const templates = Array.from(document.querySelectorAll("#scroll_container .results-list-item.tabs")).map(child => child.id);

    // for (const template in templates) {
    //     const container = document.getElementById(template)
    //     container.addEventListener('click', () => {
    //         handle_template_clicked(template)
    //         alert(`added ${template}`)
    //     });
    // }

    var element = document.getElementById('AskForSynonyms');
    alert(element)
    element.addEventListener('click', (e) => {
        e.preventDefault();
        handle_template_clicked('AskForSynonyms');
    });

    const searchInput = document.getElementById('search_input');
    if (searchInput) {
        searchInput.focus();

        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();

                const currentText = searchInput.value.trim();
                const match = templates.find(item => item.toLowerCase().startsWith(currentText.toLowerCase()));

                if (match)
                    searchInput.value = match;
            }
        });

        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();

                handle()
            }
        });
    }
});