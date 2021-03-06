const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const updatedScore = document.getElementById("updateScore");
const questionIndex = document.getElementById("questionIndex");
const progressBarFull = document.getElementById("progressBarFull");

// const choice1 = document.getElementById("choice1");
// const choice2 = document.getElementById("choice2");
// const choice3 = document.getElementById("choice3");
// const choice4 = document.getElementById("choice4");

let currentQuestion = {};
let availableQuesions = [];
let questionCounter;
let yourAnswer = "";
let correctAnswer;
let score = 0;
let correctAnswerNumber;
let fillProgressBar=0;
let x=0;

let questions = [];
fetch('question.json')
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) =>{
      questions = loadedQuestions;
      startGame();
    })
    .then((err) =>{
      console.log(err);
    });

getNewQuestion = () => {
  if(questionCounter == x){
    return window.location.assign('/result.html');
  }
  currentQuestion = availableQuesions[questionCounter];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerHTML = currentQuestion['choice'+number];
  });

  correctAnswerNumber = currentQuestion['answer'];
  correctAnswer = currentQuestion['choice'+correctAnswerNumber];


  // Another method
  // choice1.innerHTML = currentQuestion['choice1'];
  // choice2.innerHTML = currentQuestion['choice2'];
  // choice3.innerHTML = currentQuestion['choice3'];
  // choice4.innerHTML = currentQuestion['choice4'];

  questionCounter++;

  //We can also use this in place of x
  // const questionCounter = Math.floor(Math.random() * availableQuesions.length);
};

startGame = () => {
  availableQuesions=[...questions];
  questionCounter = 0;
  getNewQuestion();
};

updateScore = (score) =>{
  updatedScore.innerHTML = score;
};

choices.forEach((choice) => {
  choice.addEventListener('click', function (e) {
    // const yourAnswer = this.textContent;
    // const yourAnswer = this.innerText;
    yourAnswer = this.innerHTML;

    if(yourAnswer == correctAnswer){
      score = score + 10;
      updateScore(score);
    }
    if(questionCounter<questions.length){
      questionIndex.innerHTML = (questionCounter+1)+"/"+questions.length;
    }

    const selectedChoice = e.target;
    let classToApply = 'incorrect';
    // const selectedAnswer = selectedChoice.dataset['number'];
    const selectedAnswer = selectedChoice.innerHTML;
    if(selectedAnswer == correctAnswer){
        classToApply = 'correct';
        fillProgressBar = fillProgressBar + 100/x;
        progressBarFull.style.width = `${fillProgressBar}%`;
    }
    else{
        classToApply = 'incorrect';
    }
    selectedChoice.parentElement.classList.add(classToApply);

    if(questionCounter == x){
      setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
      }, 2000);
    }
    else{
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 400); 
    }
  });
});

startGame();