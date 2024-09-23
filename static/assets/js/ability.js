let timeLeft = 900; // 15 minutes
let score = 0;

const questions = [
    // Q1
    {
        question: "1.Which of the following is the first step in project initiation?",
        options: [
            "A) Defining the project scope",
            "B) Identifying stakeholders",
            "C) Developing a work breakdown structure",
            "D) Allocating resources"
        ],
        answer: "B",
        explanation: "Identifying stakeholders is critical in the initiation phase because it helps determine who will be impacted by the project and who will provide input. Stakeholder identification sets the foundation for understanding project requirements."
    },
    // Q2
    {
        question: "2.A project charter includes all of the following EXCEPT:",
        options: [
            "A) Project objectives",
            "B) High-level project description",
            "C) Detailed task assignments",
            "D) Stakeholder list"
        ],
        answer: "C",
        explanation: "A project charter provides a high-level overview of the project, but it does not include detailed task assignments, which are developed later in the planning phase."
    },
    // Q3
    {
        question: "3.Which document is crucial in project planning for defining what is and what is not included in the project?",
        options: [
            "A) Project charter",
            "B) Scope statement",
            "C) Risk register",
            "D) Communication plan"
        ],
        answer: "B",
        explanation: "The scope statement outlines the boundaries of the project, defining what is included and excluded to avoid scope creep and manage expectations."
    },
    // Q4
    {
        question: "4.What is the main purpose of a project feasibility study during the initiation phase?",
        options: [
            "A) To identify risks",
            "B) To allocate resources",
            "C) To determine if the project is viable",
            "D) To finalize the project plan"
        ],
        answer: "C",
        explanation: "A feasibility study helps assess whether the project is achievable with the available resources, time, and technology, ensuring that it's worth pursuing."
    },
    // Q5
    {
        question: "5.What is the primary purpose of project execution?",
        options: [
            "A) To define the project plan",
            "B) To ensure project deliverables are completed",
            "C) To manage risks",
            "D) To update stakeholders"
        ],
        answer: "B",
        explanation: "Project execution focuses on completing tasks and deliverables as planned to meet the project's objectives."
    },
    // Q6
    {
        question: "6.Which tool is commonly used for monitoring project progress during execution?",
        options: [
            "A) Gantt chart",
            "B) SWOT analysis",
            "C) PESTLE analysis",
            "D) Brainstorming"
        ],
        answer: "A",
        explanation: "Gantt charts help project managers monitor progress by providing a visual representation of the project's timeline and the status of each task."
    },
    // Q7
    {
        question: "7.Which of the following is NOT a key component of project monitoring?",
        options: [
            "A) Tracking performance",
            "B) Managing changes",
            "C) Approving the project charter",
            "D) Identifying issues"
        ],
        answer: "C",
        explanation: "Approving the project charter occurs in the initiation phase, while project monitoring involves tracking performance, managing changes, and identifying issues during execution."
    },
    // Q8
    {
        question: "8.In Earned Value Management (EVM), what does Schedule Variance (SV) measure?",
        options: [
            "A) The difference between actual and planned costs",
            "B) The difference between actual progress and planned progress",
            "C) The difference between earned value and actual costs",
            "D) The risk of delays"
        ],
        answer: "B",
        explanation: "Schedule Variance (SV) measures whether the project is ahead or behind schedule by comparing planned and actual progress."
    },
    // Q9
    {
        question: "9.Which of the following is the primary goal of risk management?",
        options: [
            "A) To eliminate all project risks",
            "B) To minimize the impact of risks on the project",
            "C) To assign blame for issues",
            "D) To increase project scope"
        ],
        answer: "B",
        explanation: "Risk management aims to identify, assess, and reduce the impact of risks on project outcomes, not to eliminate them entirely, as some risks are inevitable."
    },
    // Q10
    {
        question: "10.What is a risk register used for?",
        options: [
            "A) Tracking project tasks",
            "B) Documenting identified risks and responses",
            "C) Storing quality standards",
            "D) Communicating with stakeholders"
        ],
        answer: "B",
        explanation: "A risk register is a tool used to document identified risks, their likelihood, potential impact, and planned responses to manage or mitigate them."
    },
    // Q11
    {
        question: "11.Which of the following is a tool used for quality control in project management?",
        options: [
            "A) Cause and effect diagram",
            "B) PERT chart",
            "C) Risk matrix",
            "D) Work Breakdown Structure (WBS)"
        ],
        answer: "A",
        explanation: "A cause and effect diagram (also known as a fishbone diagram) is used in quality control to identify potential causes of problems and issues in a project."
    },
    // Q12
    {
        question: "12.What is the primary focus of quality assurance in a project?",
        options: [
            "A) Preventing defects",
            "B) Correcting defects",
            "C) Reporting project delays",
            "D) Identifying risks"
        ],
        answer: "A",
        explanation: "Quality assurance focuses on the processes and procedures that prevent defects in project deliverables, ensuring that the project meets the required quality standards."
    },
    // Q13
    {
        question: "13.Which of the following tasks is NOT part of project closure?",
        options: [
            "A) Releasing project resources",
            "B) Documenting lessons learned",
            "C) Updating the risk register",
            "D) Delivering final reports"
        ],
        answer: "C",
        explanation: "Updating the risk register happens throughout the project. During closure, the focus is on finalizing documentation, releasing resources, and reflecting on lessons learned."
    },
    // Q14
    {
        question: "14.Why is a project evaluation conducted during closure?",
        options: [
            "A) To increase the project budget",
            "B) To evaluate project deliverables against objectives",
            "C) To assign new tasks to the team",
            "D) To approve the project charter"
        ],
        answer: "B",
        explanation: "Project evaluation assesses whether the project met its goals, objectives, and quality standards, and it helps identify improvements for future projects."
    },
    // Q15
    {
        question: "15.What is the purpose of a \"lessons learned\" document in project closure?",
        options: [
            "A) To allocate resources for future projects",
            "B) To document successes and challenges to improve future projects",
            "C) To record all project costs",
            "D) To track upcoming tasks"
        ],
        answer: "B",
        explanation: "The lessons learned document records the successes and challenges encountered during the project, providing valuable insights for future projects."
    },
    // Q16
    {
        question: "16.Which of the following occurs during project closure?",
        options: [
            "A) Ongoing risk monitoring",
            "B) Archiving project documents",
            "C) Developing the project charter",
            "D) Assigning new roles to team members"
        ],
        answer: "B",
        explanation: "During project closure, all project documents, reports, and records are archived for future reference or audits, marking the official end of the project."
    }
    // Add more questions here
];

function startQuiz() {
    // Hide the start button
    document.getElementById('startButton').style.display = 'none';

    const questionsContainer = document.getElementById("questionsContainer");
    questionsContainer.innerHTML = ''; // Clear container before starting the quiz
    questions.forEach((q, index) => {
        const questionHTML = `
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <h4>${q.question}</h4>
                        <ul>
                            ${q.options.map((option, i) => `
                                <li><input type="radio" name="q${index}" value="${String.fromCharCode(65 + i)}"> ${option}</li>
                            `).join('')}
                        </ul>
                        <!-- Initially hide the View Answer button -->
                        <button class="View-answer-button" onclick="flipCard(this)" style="display:none;">View Answer</button>
                    </div>
                    <div class="flip-card-back">
                        <h5>Answer: ${q.answer}</h5>
                        <p>Explanation: ${q.explanation}</p>
                        <button class="back-button" onclick="flipCard()">Back to Question</button>
                    </div>
                </div>
            </div>
        `;
        questionsContainer.insertAdjacentHTML('beforeend', questionHTML);
    });
    startCountdown();
}

function startCountdown() {
    const timerElement = document.querySelector('#timer');
    countdownInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            alert('Time is up!');
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    let totalQuestions = questions.length;
    let correctAnswers = 0;

    // Stop the countdown
    clearInterval(countdownInterval);

    // Loop through each question and compare answers
    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.answer) {
            score += 10; // Each correct answer gives 10 points
            correctAnswers++;
        }
    });

    quizSubmitted = true;
    alert(`Quiz submitted! You answered ${correctAnswers} out of ${totalQuestions} correctly. Your score is ${score} out of ${totalQuestions * 10}.`);

    // Enable all View Answer buttons after quiz submission
    document.querySelectorAll('.View-answer-button').forEach(button => {
        button.style.display = 'inline-block'; // Show the View Answer button
    });
}

function flipCard(button) {
    if (quizSubmitted) {
        const cardInner = button.closest('.flip-card-inner');
        cardInner.classList.toggle('flipped');
    }
}

document.getElementById('startButton').addEventListener('click', function () {
    startQuiz();
});