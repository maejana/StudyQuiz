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
            addSetTitle: "Neues Set erstellen"
            saveBtn: "Speichern"
        },
    };

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
    const saveButton = document.getElementById("save-button");


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
    saveButton.textContent = texts[lang].saveBtn;

    // Nur Start-Screen anzeigen
    startScreen.style.display = "block";
    quizContainer.style.display = "none";
    editScreen.style.display = "none";
    addSetScreen.style.display = "none";
    editSetScreen.style.display = "none";

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
            quizContainer.style.display = "none";
            startScreen.style.display = "block";
            editScreen.style.display = "none";
            addSetScreen.style.display = "none";
            editSetScreen.style.display = "none";
            current = 0;
            score = 0;
            scoreEl.textContent = texts[lang].score + "0";
        }
    };

    startBtn.onclick = () => {
        startScreen.style.display = "none";
        quizContainer.style.display = "block";
        editScreen.style.display = "none";
        addSetScreen.style.display = "none";
        editSetScreen.style.display = "none";
        showQuestion();
        nextBtn.disabled = true;
    };

    editBtn.onclick = () => {
        startScreen.style.display = "none";
        quizContainer.style.display = "none";
        editScreen.style.display = "block";
        addSetScreen.style.display = "none";
        editSetScreen.style.display = "none";
    };
    editSetBtn.onclick = () => {
        startScreen.style.display = "none";
        quizContainer.style.display = "none";
        editScreen.style.display = "none";
        addSetScreen.style.display = "none";
        editSetScreen.style.display = "block";
    };
    addSetBtn.onclick = () => {
        startScreen.style.display = "none";
        quizContainer.style.display = "none";
        editScreen.style.display = "none";
        addSetScreen.style.display = "block";
        editSetScreen.style.display = "none";
    };
});