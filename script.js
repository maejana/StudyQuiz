import { saveSets, loadSets, addSet, addQuestionToSet } from './sets.js';
import { texts } from './texts.js';
let questions = [];
document.addEventListener("DOMContentLoaded", () => {

    // Funktion für Screens
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(div => div.style.display = 'none');
        document.getElementById(id).style.display = 'block';
    }

    let lang = "de";
    let current = 0;
    let score = 0;

    // Elemente holen
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const nextBtn = document.getElementById("next-button");
    const scoreEl = document.getElementById("score");
    const editBtn = document.getElementById("edit-button");
    const startScreen = document.getElementById("start-screen");
    const startBtn = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz-container");
    const editScreen = document.getElementById("edit-screen");
    const editSetBtn = document.getElementById("edit-set-button");
    const addSetBtn = document.getElementById("add-set-button");
    const addSetScreen = document.getElementById("add-set-screen");
    const editSetScreen = document.getElementById("edit-set-screen");
    const saveEditButton = document.getElementById("save-edit-button");
    const saveAddButton = document.getElementById("save-add-button");
    const addQuestionScreen = document.getElementById("add-question-screen");
    const addQuestionButton = document.getElementById("add-question-button");

    // Texte setzen
    document.getElementById("start-title").textContent = texts[lang].startTitle;
    startBtn.textContent = texts[lang].startButton;
    document.getElementById("quizTitle").textContent = texts[lang].quizTitle;
    nextBtn.textContent = texts[lang].nextButton;
    scoreEl.textContent = texts[lang].score + "0";
    editBtn.textContent = texts[lang].editButton;
    editSetBtn.textContent = texts[lang].editSetButton;
    addSetBtn.textContent = texts[lang].addSetButton;
    document.getElementById("add-set-title").textContent = texts[lang].addSetTitle;
    document.getElementById("edit-set-title").textContent = texts[lang].editSetTitle;
    saveEditButton.textContent = texts[lang].saveEditBtn;
    saveAddButton.textContent = texts[lang].saveAddBtn;
    addQuestionButton.textContent = texts[lang].addQuestBtn;

    // Nur Start-Screen anzeigen
    showScreen("start-screen");
    displaySets()

    function displaySets() {
        const sets = loadSets();
        const setList = document.getElementById("set-list");
        setList.innerHTML = "";

        sets.forEach(set => {
            const btn = document.createElement("button");
            btn.textContent = set.setName;
            btn.style.display = "block";
            btn.style.color = "#fff";
            btn.style.background = "blueviolet";
            btn.style.margin = "0.5em 0";
            btn.onclick = () => {
                questions = set.questions;
                current = 0;
                score = 0;
                scoreEl.textContent = texts[lang].score + "0";
                showScreen("quiz-container");
                showQuestion();
                nextBtn.disabled = true;
            };
            setList.appendChild(btn);
        });
    }

    // Quiz-Logik
    function showQuestion() {
        const q = questions[current];
        questionEl.textContent = q.question;
        answersEl.innerHTML = "";

        q.answers.forEach((text, index) => {
            const btn = document.createElement("button");
            btn.textContent = text;
            btn.onclick = () => checkAnswer(index);
            answersEl.appendChild(btn);
        });
    }

    function checkAnswer(index) {
        const q = questions[current];
        const answerButtons = answersEl.querySelectorAll("button");

        answerButtons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === q.correct) {
                btn.style.backgroundColor = "green";
                btn.style.color = "#fff";
            } else if (i === index) {
                btn.style.backgroundColor = "red";
                btn.style.color = "#fff";
            }
        });

        if (index === q.correct) {
            score++;
            scoreEl.textContent = texts[lang].score + score;
        }
        nextBtn.disabled = false;
    }

    nextBtn.onclick = () => {
        current++;
        if (current < questions.length) {
            showQuestion();
            nextBtn.disabled = true;
        } else {
            showScreen("start-screen");
            current = 0;
            score = 0;
            scoreEl.textContent = texts[lang].score + "0";
        }
    };

    startBtn.onclick = () => {
        const sets = loadSets();
        if (sets.length === 0) {
            alert("Bitte erst ein Set anlegen!");
            return;
        }

        // Debug-Ausgabe
        console.log("Erstes Set:", sets[0]);
        console.log("Fragen im ersten Set:", sets[0].questions);

        questions = sets[0].questions;
        if (!questions || questions.length === 0) {
            alert("Dieses Set enthält noch keine Fragen!");
            return;
        }

        current = 0;
        score = 0;
        scoreEl.textContent = texts[lang].score + "0";

        showScreen("quiz-container");
        showQuestion();
        nextBtn.disabled = true;
    };
    editBtn.onclick = () => {
        showScreen("edit-screen");
    };
    editSetBtn.onclick = () => {
        showScreen("edit-set-screen");
    };
    addSetBtn.onclick = () => {
        showScreen("add-set-screen");

    };
    saveEditButton.onclick = () => {
        // Hier Logik zum Speichern des bearbeiteten Sets hinzufügen
        saveSets(set); // Beispiel-Set speichern
        showAlert("Set bearbeitet!"); // Beispiel-Feedback
        showScreen("start-screen");
    };
    saveAddButton.onclick = () => {
        // Hier Logik zum Speichern des neuen Sets hinzufügen
        const setName = document.getElementById("set-name").value.trim();
        if (setName === "") {
            showAlert("Bitte einen Namen für das Set eingeben!");
            return;
        }
        addSet(setName);
        //alert("Neues Set gespeichert!");
        displaySets();
        showScreen("start-screen");
        document.getElementById("set-name").value = ""; // Eingabefeld zurücksetzen)
    };

    addQuestionButton.onclick = () => {
        const questionText = document.getElementById("question-text").value;
        const answers = [
            document.getElementById("answer1").value,
            document.getElementById("answer2").value,
            document.getElementById("answer3").value,
            document.getElementById("answer4").value
        ];
        const correct = parseInt(document.getElementById("correct-answer").value, 10) - 1;

        const newQuestion = {
            question: questionText,
            answers: answers,
            correct: correct
        };

        const setName = document.getElementById("set-name").value;
        addQuestionToSet(setName, newQuestion);

        // Eingabefelder leeren, damit direkt eine neue Frage eingegeben werden kann
        document.getElementById("question-text").value = "";
        document.getElementById("answer1").value = "";
        document.getElementById("answer2").value = "";
        document.getElementById("answer3").value = "";
        document.getElementById("answer4").value = "";
        document.getElementById("correct-answer").value = "";

        // Bleibe auf dem add-question-screen
        // (Kein showScreen-Aufruf nötig)
    };

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

    function showAlert(message) {
        const alert = document.createElement("div");
        alert.className = "alert";
        alert.textContent = message;
        document.body.appendChild(alert);

        // Nach 3 Sekunden verblassen lassen
        setTimeout(() => {
            alert.classList.add("hide");
        }, 3000);

        // Nach 4 Sekunden komplett entfernen
        setTimeout(() => {
            alert.remove();
        }, 4000);
    }
});

