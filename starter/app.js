const scoreKeeper = { // Will be reset each time quiz begins
    dog: 0,
    cat: 0,
    parrot: 0,
    turtle: 0,
};

let currentQuestionIndex = 0; // Programming languages start counting at zero

const questions = [
    {
        text: 'What are you most likely to be doing at a party?',
        options: [
            {
                text: 'Playing games and making new friends',
                point: 'dog',
            },
            {
                text: 'Watching from a corner, hoping someone interesting shows up',
                point: 'cat',
            },
            {
                text: 'Partying! Dressed up, chatting it up, dancing... maybe a little loud',
                point: 'parrot',
            },
            {
                text: 'I would help set up beforehand and make sure everything goes smoothly',
                point: 'turtle',
            },
        ],
    },
    {
        text: 'How would you prefer to unwind?',
        options: [
            {
                text: 'Take a walk outside',
                point: 'dog',
            },
            {
                text: 'Lie out in the sun',
                point: 'cat',
            },
            {
                text: 'Go window shopping',
                point: 'parrot',
            },
            {
                text: 'Sit at home and do nothing',
                point: 'turtle',
            },
        ],
    },
    {
        text: 'How do you deal with stress?',
        options: [
            {
                text: 'Exercise',
                point: 'dog',
            },
            {
                text: 'Tell someone off',
                point: 'cat',
            },
            {
                // inside a string, you have to escape quote marks with a \
                text: 'Share how I\'m feeling',
                point: 'parrot',
            },
            {
                text: 'Have some alone time',
                point: 'turtle',
            },
        ],
    },
    {
        text: 'What sounds like the most fun to you?',
        options: [
            {
                text: 'Playing sports or videogames with friends',
                point: 'dog',
            },
            {
                text: 'Reading a book',
                point: 'cat',
            },
            {
                text: 'Just hanging out and talking with friends',
                point: 'parrot',
            },
            {
                text: 'Making things, or cleaning the house',
                point: 'turtle',
            },
        ],
    },
    {
        text: 'What do you look for in a friend?',
        options: [
            {
                text: 'Someone who is fun and energetic',
                point: 'dog',
            },
            {
                text: 'Someone who can be both quiet and playful',
                point: 'cat',
            },
            {
                text: 'Someone who I can share my secrets with',
                point: 'parrot',
            },
            {
                // inside a string, you have to escape quote marks with a \
                text: 'Someone who doesn\'t have too many emotions',
                point: 'turtle',
            },
        ],
    },
];

function startQuiz() {

    console.log('Quiz started!');

    // Reset score
    for (let result in scoreKeeper) {
        scoreKeeper[result] = 0;
    }

    // Ask first question
    askQuestion(questions[0]);
}

// Display Question
function askQuestion(question) {

    // clear quiz zone
    let quizZone = document.getElementById('quizZone');
    while (quizZone.firstChild) {
        quizZone.removeChild(quizZone.firstChild);
    }

    // render question
    let questionP = document.createElement('p');
    questionP.innerText = question.text;
    quizZone.appendChild(questionP);

    // create box to hold answers
    let answerDiv = document.createElement('div');
    answerDiv.setAttribute('id', 'quizAnswers');
    quizZone.appendChild(answerDiv);

    // render answers
    question.options.forEach((option, i) => {
        // Create a list item for this option
        let optionDiv = document.createElement('div');
        optionDiv.setAttribute('class', 'quizOption');
        optionDiv.innerText = option.text;
        answerDiv.appendChild(optionDiv);

        // add data
        optionDiv.index = i;

        // attach listeners
        optionDiv.onclick = acceptAnswer;
    });
}

function acceptAnswer(event) {
    // Property we added ourselves
    let selectedOptionIndex = event.target.index;
    console.log({ selectedOptionIndex });

    // Add point according to the question and option
    let currentQuestion = questions[currentQuestionIndex];
    let selectedOption = currentQuestion.options[selectedOptionIndex];
    scoreKeeper[selectedOption.point]++;

    console.log(JSON.stringify(scoreKeeper, null, 4));
    
    // Go to next question OR calculate result
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        calculateResult();
    }
    else {
        askQuestion(questions[currentQuestionIndex]);
    }
}

function calculateResult() {
    // Add up points, taking the FIRST/HIGHEST score
    let quizResult = '';

    let possibleResults = Object.keys(scoreKeeper);

    for (let i = 0; i < possibleResults.length; i++) {
        let thisPossibleResult = possibleResults[i];

        if (!quizResult || scoreKeeper[quizResult] < scoreKeeper[thisPossibleResult]) {
            quizResult = thisPossibleResult;
        }
    }

    // Display result
    showResult(quizResult);
}

// Display Results
function showResult(result) {
    // Hide the quizZone (the quiz is over)
    let quizZoneDiv = document.getElementById('quizZone');
    quizZoneDiv.style.display = 'none'; // hide it by adjusting its style (CSS) directly

    // Find the hidden <div> that contains the results
    let resultDiv = document.getElementById('answer-' + result);
    resultDiv.classList.toggle('hide'); // un-hide it by removing the '.hide' class

    // Show the 'Take Again' button
    let takeAgainButton = document.querySelector('#takeAgain');
    takeAgainButton.style.display = 'inline'; // Just a regular inline element that flows in the text, like a word or phrase
}
