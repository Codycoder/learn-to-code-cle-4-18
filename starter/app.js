

const possibleResults = {
    blueberry: 'You are a blueberry. Your unassuming exterior hides quite a personality!',
    strawberry: 'You are a strawberry. It is your very purpose to be reliably delightful.',
    watermelon: 'You are a watermelon. Anyone who gets past your tough outer shell will be refreshed by what\'s inside!',
};

const scoreKeeper = { // Will be reset each time quiz begins
    blueberry: 0,
    strawberry: 0,
    watermelon: 0,
};

const currentQuestion = 0; // Programming languages start counting at zero

const questions = [
    {
        text: 'What is your favorite color?',
        options: [
            {
                text: 'Blue',
                points: { blueberry: 2 },
            },
            {
                text: 'Red',
                points: { strawberry: 1, watermelon: 1 },
            },
            {
                text: 'Green',
                points: { watermelon: 2 },
            },
            {
                text: 'Pink',
                points: { strawberry: 2 },
            },
        ],
    },
    {
        text: 'What is your favorite type of food?',
        options: [
            {
                text: 'Sour',
                points: { blueberry: 2 },
            },
            {
                text: 'Sweet',
                points: { strawberry: 1, watermelon: 1, blueberry: -1 },
            },
            {
                text: 'Savory',
                points: { blueberry: 1 },
            },
            {
                text: 'Salty',
                points: { watermelon: 2 },
            },
            {
                text: 'Unagi',
                points: { },
            },
        ],
    },
];

function startQuiz() {

    alert('quiz started!');

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
    while (quizZone.firstChild) quizZone.removeChild(quizZone.firstChild);

    // render question
    let questionP = document.createElement('p');
    questionP.innerText = question.text;
    quizZone.appendChild(questionP);

    // create an unordered list to hold answers
    let answerUl = document.createElement('ul');
    quizZone.appendChild(answerUl);

    // render answers
    question.options.forEach(option => {
        // Create a list item for this option
        let optionLi = document.createElement('li');
        optionLi.innerText = option.text;
        answerUl.appendChild(optionLi);

        // attach listeners
        optionLi.onclick = () => alert('You clicked?');
    });
}

function acceptAnswer(points) {
    //
}

// Display Results
function showResult(result) {
    // based on answers
}
