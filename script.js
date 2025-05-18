document.addEventListener("DOMContentLoaded", function () {
    const texts = {
        de: {
            startButton: "Start",
            startTitle: "Willkommen bei StudyQuiz",
            quizTitle: "StudyQuiz",
            nextButton: "Nächste Frage",
            score: "Punkte: ",
            editButton: "Neues Set hinzufügen",
            addSetButton: "Neues Set erstellen",
            editSetButton: "Set bearbeiten",
            editSetTitle: "Set bearbeiten",
            addSetTitle: "Neues Set erstellen",
            saveEditBtn: "Speichern",
            saveAddBtn: "Set speichern",
            addQuestBtn: "Frage hinzufügen"
        },
    };
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
        alert("Set gespeichert!");
        showScreen("start-screen");
    };
    saveAddButton.onclick = () => {
        // Hier Logik zum Speichern des neuen Sets hinzufügen
        const setName = document.getElementById("set-name").value.trim();
        if (setName === "") {
            alert("Bitte einen Namen für das Set eingeben.");
            return;
        }
        addSet(setName);
        alert("Neues Set gespeichert!");
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

        // Hier muss der Name des aktuellen Sets bekannt sein, z.B.:
        const setName = document.getElementById("set-name").value;
        addQuestionToSet(setName, newQuestion);

        alert("Frage hinzugefügt!");
        showScreen("add-set-screen");
    };



    // Set speichern
    function saveSets(sets) {
        localStorage.setItem('questionSets', JSON.stringify(sets));
    }

// Sets laden
    function loadSets() {
        const data = localStorage.getItem('questionSets');
        return data ? JSON.parse(data) : [];
    }

// Neues Set anlegen
    function addSet(setName) {
        const sets = loadSets();
        sets.push({ setName: setName, questions: [] });
        saveSets(sets);
    }

// Frage zu Set hinzufügen
    function addQuestionToSet(setName, questionObj) {
        const sets = loadSets();
        const set = sets.find(s => s.setName === setName);
        if (set) {
            set.questions.push(questionObj);
            saveSets(sets);
        }
    }

    let questions = [];



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



});