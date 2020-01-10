function Quizz(totalScore) {
  this.questions = [];
  this.answer = "";
  this.totalScore = totalScore;
}

const section = document.getElementById("quizz");

Quizz.prototype.getQuestions = function() {
  return this.questions;
};
Quizz.prototype.add = function(question) {
  this.questions.push(question);
};
Quizz.prototype.getIndex = function(question) {
  return this.questions.indexOf(question);
};
Quizz.prototype.setScore = function(point) {
  this.totalScore += point;
};
Quizz.prototype.setAnswer = function(answer) {
  this.answer = answer;
};
Quizz.prototype.getAnswer = function() {
  return this.answer;
};
Quizz.prototype.getScore = function() {
  return this.totalScore;
};
Quizz.prototype.compareAnswer = function(answerToQues, index) {
  for (let answer in this.answers) {
    if (this.answers.indexOf(answer) == index)
      if (answer == answerToQues) return true;
      else return false;
  }
};
Quizz.prototype.renderInHTML = function(quizz) {
  let index = quizz.getIndex(question);
  question2.toHTML(
    section,
    quizz.getQuestions()[index],
    quizz,
    question,
    index
  );
};

let quizz = new Quizz(0);
let question = new Question(
  "How Many Songs Are in the Playlist ?",
  ["3", "5", "1K"],
  "3"
);
let question3 = new Question(
  "Who made dickinson music  ?",
  ["Ian Hultquist", "Eric et Ramzy", "Eva Mendes"],
  "Ian Hultquist"
);
let question2 = new Question(
  "Who made tom and jerry Soundtrack  ?",
  ["Václav Lídl", "Donald Trump", "Laclau Charlotte"],
  "Laclau Charlotte"
);

quizz.add(question);
quizz.add(question2);
quizz.add(question3);
quizz.renderInHTML(quizz);
quizz.setAnswer("15");

// we have now a quizz wich contain a question with its answers and hold the index of the question
