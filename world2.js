const questions = [
  {
      question: "Which country has the tallest pyramid?",
      answers: [
          { text: "Mexico", correct: false},
          { text: "Guatemala", correct: false},
          { text: "Egypt", correct: true},
          { text: "Brazil", correct: false},
      ]
  },
  {
      question: "Which country has the biggest ocean waves?",
      answers: [
          { text: "Spain", correct: false},
          { text: "Portugal", correct: true},
          { text: "France", correct: false},
          { text: "USA", correct: false},
      ]
  },
  {
      question: "Which country has the largest cave in the world?",
      answers: [
          { text: "India", correct: false},
          { text: "Pakistan", correct: false},
          { text: "Thailand", correct: false},
          { text: "Vietnam", correct: true},
      ]
  },
  {
      question: "Which country is known for its mountains?",
      answers: [
          { text: "Russia", correct: false},
          { text: "Finland", correct: false},
          { text: "Norway", correct: true},
          { text: "Sweden", correct: false},
      ]
  }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
          button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
  });
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
  }else{
      selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true"){
          button.classList.add("correct");
      }
      button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
      showQuestion();
  }else{
      showScore();
  }
}


nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
      handleNextButton();
  }else{
      startQuiz();
  }
});


startQuiz();
