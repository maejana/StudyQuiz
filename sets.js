// sets.js
import {texts} from "./texts";

export function saveSets(sets) {
    localStorage.setItem('questionSets', JSON.stringify(sets));
}

export function loadSets() {
    const data = localStorage.getItem('questionSets');
    return data ? JSON.parse(data) : [];
}

export function addSet(setName) {
    const sets = loadSets();
    sets.push({ setName: setName, questions: [] });
    saveSets(sets);
}

export function addQuestionToSet(setName, questionObj) {
    const sets = loadSets();
    const set = sets.find(s => s.setName === setName);
    if (set) {
        set.questions.push(questionObj);
        saveSets(sets);
    }
}
// Fragen eines Sets laden und anzeigen
function loadSetQuestions(setName) {
    const sets = loadSets();
    const set = sets.find(s => s.setName === setName);

    if (set) {
        const questionContainer = document.getElementById("question-container");
        questionContainer.innerHTML = ""; // Vorherige Fragen entfernen

        set.questions.forEach(q => {
            const questionEl = document.createElement("div");
            questionEl.textContent = q.question;
            questionContainer.appendChild(questionEl);
        });
    }
}
// Sets in einer Liste anzeigen
function displaySets() {
    const sets = loadSets();
    const setList = document.getElementById("set-list"); // Ein <ul> oder <select> Element
    setList.innerHTML = ""; // Vorherige Inhalte entfernen

    sets.forEach(set => {
        const listItem = document.createElement("li");
        listItem.textContent = set.setName;
        listItem.style.cursor = "pointer";
        listItem.onclick = () => {
            questions = set.questions; // Fragen des gewählten Sets laden
            current = 0;
            score = 0;
            scoreEl.textContent = texts[lang].score + "0";
            showScreen("quiz-container");
            showQuestion();
            nextBtn.disabled = true;
        };
        setList.appendChild(listItem);
    });
}