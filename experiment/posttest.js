/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
    {
      question: "What does Norton's Theorem state about a linear electrical network?",  ///// Write the question inside double quotes
      answers: {
        a: " It can be replaced by a single voltage source and a series resistor.",                  ///// Write the option 1 inside double quotes
        b: "It can be replaced by a single current source and a parallel resistor.",                  ///// Write the option 2 inside double quotes
        c: "It can be replaced by a combination of voltage and current sources.",                  ///// Write the option 3 inside double quotes
        d: "It can only be applied to non-linear circuits."                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "b"                ///// Write the correct option inside double quotes
    },

    {
      question: " What is the Norton equivalent current (I_N) in a circuit?",  ///// Write the question inside double quotes
      answers: {
        a: "The open-circuit current across the load terminals.",                  ///// Write the option 1 inside double quotes
        b: "The total current supplied by the voltage source.",                  ///// Write the option 2 inside double quotes
        c: "The short-circuit current across the load terminals",                  ///// Write the option 3 inside double quotes
        d: "The current through the equivalent resistor."                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },                                  ///// To add more questions, copy the section below 
    									                  ///// this line

    
    {
      question: "How is the Norton equivalent resistance (R_N) determined?",
      answers: {
        a: "By measuring the open-circuit voltage across the load terminals.",
        b: "By calculating the resistance seen at the load terminals with all sources deactivated.",
        c: "By summing all resistances in the circuit.",
        d: "By dividing the Norton current by the load voltage."
      },
      correctAnswer: "b"
    },

    {
    question: "Norton's Theorem is most closely related to which other circuit analysis theorem?",
    answers: {
      "a": "Superposition Theorem",
      "b": "Kirchhoff’s Voltage Law",
      "c": "Maximum Power Transfer Theorem",
      "d": "Thevenin’s Theorem"
    },
    correctAnswer: "d"
  },
  {
    question: "When applying Norton’s Theorem, what happens to independent voltage sources in the circuit when finding R_N?",
    answers: {
      "a": "They are replaced by open circuits.",
      "b": "They are replaced by short circuits.",
      "c": "They remain unchanged.",
      "d": "They are replaced by resistors."
    },
    correctAnswer: "b"
  }
    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////