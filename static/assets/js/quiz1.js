let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let totalScore = 0; // Variable to keep track of the total score
let timeLeft = 15 * 60; // 15 minutes in seconds
let timerInterval;
let quizData = null; // This will hold the quiz data fetched from the server

// Ensure the event listeners are added only after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for the buttons
    document.getElementById('startButton').addEventListener('click', fetchQuiz);
    document.getElementById('submitAnswerButton').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior (form submission)
        submitAnswer();
    });
    document.getElementById('showAnswerButton').addEventListener('click', flipCard);
    document.getElementById('nextButton').addEventListener('click', nextQuestion);
    document.getElementById('prevButton').addEventListener('click', previousQuestion);
});

// Fetch the quiz from the server when the "Start Quiz" button is clicked
async function fetchQuiz() {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    try {
        const response = await axios.get('http://127.0.0.1:8080/GBL/quizzes/35', {
            headers: { 'token': token }
        });

        if (response.status === 200) {
            quizData = response.data; // Store the quiz data
            startQuiz(); // Start the quiz after loading the data
        } else {
            console.error('Failed to load quiz data');
        }
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}

// Start the quiz, called after quiz data is loaded
function startQuiz() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'block';
    document.getElementById('prevButton').style.display = 'block';
    loadQuestion();
    startTimer();
}

// Load and display the current question
function loadQuestion() {
    if (!quizData) return; // If quiz data is not available yet, do nothing

    const question = quizData.questions[currentQuestion];
    document.getElementById('questionText').innerText = `${question.questionText} (${question.questionType})`;

    const optionsElem = document.getElementById('options');
    optionsElem.innerHTML = ''; // Clear previous options

    if (question.choices.length > 0) {
        // Loop through choices and generate radio buttons based on the number of choices
        question.choices.forEach((choice, index) => {
            const li = document.createElement('li');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'option';
            radio.value = choice.choiceText;
            radio.id = `option${index}`;
            radio.onclick = () => selectAnswer(choice.choiceText); // Store selected answer

            const label = document.createElement('label');
            label.setAttribute('for', `option${index}`);
            label.innerText = `${index + 1}. ${choice.choiceText}`; // Format: "1. ChoiceText"

            li.appendChild(radio);
            li.appendChild(label);
            optionsElem.appendChild(li);

            // Preserve previously selected answer if the user navigates back
            if (quizData.questions[currentQuestion].selectedAnswer === choice.choiceText) {
                radio.checked = true;
            }
        });
    } else {
        // If there's only one choice, display it without radio buttons
        const li = document.createElement('li');
        li.innerText = "No available choices for this question.";
        optionsElem.appendChild(li);
    }
}

// Store the selected answer for the current question
function selectAnswer(option) {
    quizData.questions[currentQuestion].selectedAnswer = option;
}

// Submit the answer and stream the AI response using EventSource
function submitAnswer() {
    const submitButton = document.getElementById('submitAnswerButton');
    submitButton.disabled = true; // Disable the button to prevent double-clicks

    const token = localStorage.getItem('authToken');
    const question = quizData.questions[currentQuestion];
    const selectedAnswer = question.selectedAnswer;

    if (!selectedAnswer) {
        alert("Please select an answer!");
        submitButton.disabled = false; // Re-enable button if no answer is selected
        return;
    }

    // Prepare the message to send to the AI
    const message = `Question: ${question.questionText}. Answer: ${selectedAnswer}`;

    // Use EventSource to handle streaming response from the server
    const aiResponseElem = document.getElementById('aiResponse');
    if (aiResponseElem) {
        aiResponseElem.innerText = ''; // Clear previous response
    }

    const eventSource = new EventSource(`http://127.0.0.1:8080/GBL/ai/chat?message=${encodeURIComponent(message)}`);

    // Buffer to accumulate streamed text
    let accumulatedText = '';

    eventSource.onmessage = (event) => {
        // Append incoming data with a space before it
        if (aiResponseElem) {
            accumulatedText += event.data + ' '; // Add space after each new data
            aiResponseElem.innerText = accumulatedText.trim(); // Update the UI with trimmed text
            aiResponseElem.scrollTop = aiResponseElem.scrollHeight; // Scroll to the bottom if overflow
        }
    };

    eventSource.onerror = () => {
        console.error('Error in AI response stream.');
        eventSource.close(); // Close the stream on error
        submitButton.disabled = false; // Re-enable button
    };

    eventSource.onopen = () => {
        console.log('AI stream opened.');
    };

    // Close the stream after some time (depends on your backend implementation)
    setTimeout(() => {
        eventSource.close(); // Close the stream once complete

        // Display the correct answer and explanation after streaming ends
        const correctAnswerElem = document.getElementById('correctAnswer');
        const answerExplanationElem = document.getElementById('answerExplanation');

        if (correctAnswerElem) {
            correctAnswerElem.innerText = `Correct Answer: ${getCorrectAnswer(question.choices)}`;
        }

        if (answerExplanationElem) {
            answerExplanationElem.innerText = question.explanation;
        }

        // Calculate score
        if (!question.scored) { // If the question hasn't been scored yet
            if (selectedAnswer === getCorrectAnswer(question.choices)) {
                score += 10; // Correct answer gives 10 points
            }
            question.scored = true;
        }

        // Update the total score
        totalScore += score;

        // Show/Hide buttons appropriately
        document.getElementById('showAnswerButton').style.display = 'block';
        submitButton.disabled = false; // Re-enable button after processing
    }, 10000); // Adjust the timeout according to your backend's response time
}

// Get the correct answer from the choices
function getCorrectAnswer(choices) {
    const correctChoice = choices.find(choice => choice.correct === true);
    return correctChoice ? correctChoice.choiceText : 'No correct answer found';
}

// Flip the question card to show the answer
function flipCard() {
    const cardInner = document.getElementById('questionCard');
    cardInner.classList.toggle('flipped');
}

// Move to the next question
function nextQuestion() {
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        if (document.getElementById('questionCard').classList.contains('flipped')) {
            flipCard(); // Ensure card is flipped back to the question
        }
        document.getElementById('submitAnswerButton').style.display = 'block';
        document.getElementById('showAnswerButton').style.display = 'none';

        // Reset AI response when moving to the next question
        resetAIResponse();
    } else {
        alert("No more questions.");
    }
}

// Move to the previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        if (document.getElementById('questionCard').classList.contains('flipped')) {
            flipCard(); // Ensure card is flipped back to the question
        }
        document.getElementById('submitAnswerButton').style.display = 'block';
        document.getElementById('showAnswerButton').style.display = 'none';

        // Reset AI response when moving to the previous question
        resetAIResponse();
    } else {
        alert("No previous questions.");
    }
}

// Reset the AI response display elements
function resetAIResponse() {
    const aiResponseElem = document.getElementById('aiResponse');
    const correctAnswerElem = document.getElementById('correctAnswer');
    const answerExplanationElem = document.getElementById('answerExplanation');

    if (aiResponseElem) {
        aiResponseElem.innerText = ''; // Clear AI response
    }
    if (correctAnswerElem) {
        correctAnswerElem.innerText = 'Answer: '; // Reset to default
    }
    if (answerExplanationElem) {
        answerExplanationElem.innerText = 'Explanation will appear here.'; // Reset explanation
    }
}

// Start the quiz timer
function startTimer() {
    const timerElem = document.getElementById('timer');
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElem.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Time's up! Submitting the quiz.");
            submitQuiz();
        }
    }, 1000);
}

// Submit the quiz
async function submitQuiz() {
    clearInterval(timerInterval); // Stop the timer
    const token = localStorage.getItem('authToken');

    // Send total score to the server
    try {
        await axios.post(`http://127.0.0.1:8080/GBL/user/score?score=${totalScore}`, null, {
            headers: { 'token': token }
        });
        alert(`Quiz submitted. Your final score is ${totalScore}`);
    } catch (error) {
        console.error('Error submitting total score:', error);
        alert(`Quiz submitted. Your final score is ${totalScore} (Failed to update server)`);
    }
}