const startButton = document.getElementById('start-btn'); // Get my start button
const nextButton = document.getElementById('next-btn'); // Get my next button
const questionContainerElement = document.getElementById('question-container'); // Get question container
let questionItem = document.getElementById('question');
let answerItem = document.getElementById('answers');
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame); //listen for a click event on my start button to initiate startGame function.
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Initiate an array to hold all my questions and answers
let questions = [
    {
        question: 'Who is the founder of Zoom?',
        answers: [
            {marker: 'A', text: 'Lei Yun', correct: false},
            {marker: 'B', text: 'Eric Yuan', correct: true},
            {marker: 'C', text: 'Jack Ma', correct: false}
        ]
    },

    {
        question: 'Who is the founder of Alibaba?',
        answers: [
            {marker: 'A', text: 'Lei Yun', correct: false},
            {marker: 'B', text: 'Eric Yuan', correct: false},
            {marker: 'C', text: 'Jack Ma', correct: true}
        ]
    },

    {
        question: 'Who was the third co-founder of Apple Computers?',
        answers: [
            {marker: 'A', text: 'Steve Markuls', correct: false},
            {marker: 'B', text: 'Tim Cook', correct: false},
            {marker: 'C', text: 'Ronald Wayne', correct: true}
        ]
    },

    {
        question: 'What is the name of the second company Steve Jobs founded?',
        answers: [
            {marker: 'A', text: 'Next Computers', correct: true},
            {marker: 'B', text: 'Pixar Studios', correct: false},
            {marker: 'C', text: 'Lisa Computers', correct: false}
        ]
    },

    {
        question: 'What is the name of the first company Jack Ma founded?',
        answers: [
            {marker: 'A', text: 'Hope Translation Agency', correct: true},
            {marker: 'B', text: 'Alibaba', correct: false},
            {marker: 'C', text: 'Taobao', correct: false}
        ]
    }
]

function startGame() {
    // console.log('Started')
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5); // sort questions randomly
    currentQuestionIndex = 0; // start randomizing from the first question 
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function showQuestion(question) {

    questionItem.innerText = question.question;

    // show answers
    question.answers.forEach(answer => {
        const list = document.createElement('li');
        list.classList.add('col-12', 'answer-list-item');
        const span = document.createElement('span');
        span.classList.add('list-marker');
        span.innerText = answer.marker;
        list.appendChild(span);
        const button = document.createElement('button');
        button.innerText = answer.text;
        list.appendChild(button);
        if (answer.correct) { // if answer is correct
            list.dataset.correct = answer.correct // set data attribute of list to correct
            // console.log(list);
        }
        list.addEventListener('click', selectAnswer)
        answerItem.appendChild(list);
    });

    // console.log(questionItem)

    // for (const item of questions) {
    //     for (const key in item) {
    //         questionItem.innerText = item.question;
    //         item.options.forEach(option => {
    //             const listItem = document.createElement('li');
    //             answerItem.appendChild(listItem)
    //             console.log(answerItem);
    //         });
            
    //     }
    // }
}

function selectAnswer(e) {
    const selectedButton = e.target; //return the selected list and assign to selectedButton
    const correct = selectedButton.dataset.correct; // assign the data attribute of selected button to correct
    
    // console.log(answerItem.children);
    Array.from(answerItem.children).forEach(list => {
        setStatusClass(list, list.dataset.correct)
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        // startButton.classList.add('right');
        // nextButton.classList.add('hide')
    }
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong');
}

function setNextQuestion() { 
    resetState()  
    showQuestion(shuffledQuestions[currentQuestionIndex]); // show a random question
}

function resetState() {
    // clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerItem.firstChild) {
        answerItem.removeChild(answerItem.firstChild)
    }
}


// showQuestion(questions);