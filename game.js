let category = null,
    difficulty = null,
    limit = null,
    values = [],
    val = null,
    tmp = [];
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
//let tempUrl = null

    
let questions = [];


//const url = 'https://quizapi.io/api/v1/questions?apiKey=' + apiKey + '&category=' + category + '&difficulty=' + difficulty + '&limit=' + limit
    

function mainFunction() {
    val = window.location.search.substring(1)
    values = val.split("&")
    tmp = values[0].split("=")
    category = tmp[1]
    tmp = values[1].split("=")
    difficulty = tmp[1]
    tmp = values[2].split("=")
    limit = tmp[1]

    // tempUrl = url
    // if (tempUrl != 0){
    //     startGame()
        
    // } else {
    //     sendApiRequest()
    //  }
    sendApiRequest() 
}

//let play = document.querySelector("play")
    
//window.onload = sendApiRequest
async function sendApiRequest() {
    const apiKey = 'PoMrnpP4y0S3hCQnPAS1Q3MVi1Bsrkbl7F8HLieT'
    const url = 'https://quizapi.io/api/v1/questions?apiKey=' + apiKey + '&category=' + category + '&difficulty=' + difficulty + '&limit=' + limit
    // const res = await fetch(url)
    //tempUrl = url
    // //console.log(respons)
    // const data = await res.json()

    // console.log(data)
    // //const {questiones}
    // let loadedQuestions = data
    fetch(url)
    .then(res => {
        return res.json();
     })
     .then(loadedQuestions => {
         questions = loadedQuestions.map(loadedQuestion => {
           const formattedQuestion = {
              question: loadedQuestion.question,
              answers : loadedQuestion.answers,
              correct_answer : loadedQuestion.correct_answer
           }
           console.log(loadedQuestions)
           console.log(loadedQuestions.correct_answer)
           
     
           return formattedQuestion;
        }) 
        startGame();
     })
     
}

//CONSTANTS
const CORRECT_BONUS = 10;
//const limit = 100;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= limit) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${limit}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / limit) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion.answers["answer" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = ('answer' + selectedAnswer) == currentQuestion.correct_answer ? 'correct' : 'incorrect';

        // const classToApply =
        //     selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

  



   