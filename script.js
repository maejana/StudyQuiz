document.addEventListener("DOMContentLoaded", function () {
    const texts = {
        de: {
            startButton: "Start",
            startTitle: "Willkommen bei StudyQuiz",
            quizTitle: "StudyQuiz",
            nextButton: "Nächste Frage",
            score: "Punkte: "
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

    // Texte setzen
    document.getElementById("start-title").textContent = texts[lang].startTitle;
    document.getElementById("start-button").textContent = texts[lang].startButton;
    document.getElementById("quizTitle").textContent = texts[lang].quizTitle;
    nextBtn.textContent = texts[lang].nextButton;
    scoreEl.textContent = texts[lang].score + "0";

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
        if (index === questions[current].correct) {
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
            current = 0;
            score = 0;
            scoreEl.textContent = texts[lang].score + "0";
        }
    };

    // Startseite/Quiz-Start
    const startScreen = document.getElementById("start-screen");
    const startBtn = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";

    startBtn.onclick = () => {
        startScreen.style.display = "none";
        quizContainer.style.display = "block";
        showQuestion();
        nextBtn.disabled = true;
    };
});