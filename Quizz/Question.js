/* Question Class */
/*
 * this class Will contain
 * - a question
 * - a set of answers
 * - the correct answere
 * - the score for this questio
 */
function Question(question, answers, correctAnswer) {
  this.question = question;
  this.answers = answers;
  this.correctAnswer = correctAnswer;
  this.score = 0;
}

Question.prototype.getQuestion = function() {
  return this.question;
};
Question.prototype.getAnswers = function() {
  return this.answers;
};
Question.prototype.setScore = function(point) {
  this.score += point;
};
Question.prototype.getScore = function() {
  return this.score;
};
Question.prototype.getAnswer = function() {
  return this.correctAnswer;
};

/* Rendering in HTML (react style) */

Question.prototype.toHTML = function(
  element,
  question,
  quizz,
  callback,
  index
) {
  /* creating element */
  let h3 = document.createElement("h3");
  let nextQuestion = document.createElement("a");
  let Question = document.createElement("div");
  let rank = document.createElement("label");
  let win = document.createElement("label");
  let loose = document.createElement("label");
  let refresh = document.createElement("input");
  /* Setting details for element ( class for styling) (inner Html) */
  Question.setAttribute("class", "question");
  element.appendChild(Question);
  nextQuestion.innerHTML = "NEXT";
  rank.innerHTML = `Question ${index + 1}/${quizz.getQuestions().length}`;
  rank.setAttribute("class", "rank");
  nextQuestion.setAttribute("class", "next");
  win.setAttribute("class", "verdict");
  loose.setAttribute("class", "verdict");
  h3.style.borderRadius = "5px";
  Question.appendChild(h3);
  h3.innerHTML = `${question.question}`;
  refresh.setAttribute("type", "button");
  refresh.setAttribute("value", "Reload Game");
  refresh.addEventListener("click", e => {
    document.location.reload();
  });
  refresh.setAttribute("class","reload");
  /* ---------------------------------------------------------------- */

  /* Creating dynamically the questions and answers */
  for (let i = 0; i < question.getAnswers().length; ++i) {
    let input = document.createElement("input");
    let label = document.createElement("label");
    let div = document.createElement("div");

    label.innerHTML = `${question.getAnswers()[i]}`;
    label.appendChild(input);
    label.setAttribute("class", "answers");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "checked-only-once");
    div.setAttribute("class", "question-answer");
    input.value = `${question.getAnswers()[i]}`;

    Question.appendChild(input);
    Question.appendChild(label);
    div.appendChild(input);
    div.appendChild(label);
    Question.appendChild(div);
    Question.appendChild(rank);
    Question.appendChild(nextQuestion);

    /* Changing the visual depending on the answer */
    input.addEventListener("change", e => {
      response = input.value;
      if (question.getAnswer() === response) {
        quizz.setScore(1);
        h3.style.background = "green";
        console.log(quizz.getScore());
        console.log(index);
      } else {
        h3.style.background = "red";
      }
    });
  }
  /* The next question will be accessible only if the first one passes */
  nextQuestion.addEventListener("click", e => {
    if (quizz.getScore() == quizz.getQuestions().length) {
      win.innerHTML = `You Win ! Score : ${quizz.getScore()}`;
      Question.appendChild(win);
      Question.appendChild(refresh);
    } else if (
      quizz.getScore() != quizz.getQuestions().length &&
      index + 1 == quizz.getQuestions().length
    ) {
      loose.innerHTML = `Game Over ! Score : ${quizz.getScore()}`;
      Question.appendChild(loose);
      Question.appendChild(refresh);
    } else
      callback.toHTML(
        section,
        quizz.getQuestions()[index + 1],
        quizz,
        callback,
        index + 1
      );
  });
};
