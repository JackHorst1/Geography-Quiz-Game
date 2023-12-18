const questions = [
  {
    question: "What is the largest state by land area?",
    answers: [
      { text: "Texas", correct: false},
      { text: "California", correct: false},
      { text: "Montana", correct: false},
      { text: "Alaska", correct: true},
    ]
  },
  {
    question: "Which state has objectively the best skiing mountains?",
    answers: [
      { text: "Utah", correct: false},
      { text: "Colorado", correct: true},
      { text: "California", correct: false},
      { text: "Montana", correct: false},
    ]
  },
  {
    question: "Which state has the lowest population?",
    answers: [
      { text: "Wyoming", correct: true},
      { text: "Alaska", correct: false},
      { text: "Rhode Island", correct: false},
      { text: "West Virginia", correct: false},
    ]
  },
  {
    question: "Which is the flattest state?",
    answers: [
      { text: "Maine", correct: false},
      { text: "Nebraska", correct: false},
      { text: "Florida", correct: true},
      { text: "Wisconsin", correct: false},
    ]
  }
]


const questionElement = document.getElementbyid("question");
const answerButtons = document.getElementbyid("answer-buttons");
const nextButton = document.getElementbyid("next-btn");

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
let questionNo = currentQuestionIndex +1;
questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

currentQuestion.answers.forEach(answer => {
  const button = document.createElement("button");
  button.innerHTML = answer.text;
  button.classList.add("btn");
  answerButtons.appendChild(button);
  if(answer.correct){
    button.dataset.correct = answer.correct;
  })
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
Array.from(answerButton.children).forEach(button => {
  if(button.dataset.correct === "true"){
    button.classList.add("correct");
  }
  button.disabled = true;
});
nextButton.style.display = "block";                                      
}

function showScore(){
resetState();
questionElement.innerHTML = "You scored ${score} out of ${questions.length}!";
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
