const content = [
    {
        text: `
            The Project Planning and Initiation phase is critical for laying a solid foundation for the successful delivery of a project. During this phase, the project's goals, scope, and objectives are clearly defined. The project team identifies the key deliverables, milestones, and the desired end state. It is essential to have a well-outlined project scope that outlines what is included and excluded from the project to prevent scope creep. Additionally, setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals ensures that the project stays on track and meets its intended outcomes. These initial steps create a structured plan that serves as a roadmap for the entire project lifecycle.
            <br><br>
            Once the project's objectives are established, developing a comprehensive timeline is the next crucial step. This involves breaking down the project's activities into manageable tasks, estimating the time required for each, and sequencing them logically. A well-defined timeline helps in allocating resources efficiently and ensures that the project remains on schedule. Project managers use tools like Gantt charts and PERT diagrams to visualize the timeline and dependencies between tasks. Regular monitoring of the timeline against actual progress is necessary to identify potential delays early and implement corrective measures. This structured approach minimizes risks associated with time overruns.
            <br><br>
            Budget planning is another vital component of the Project Planning and Initiation phase. A detailed budget estimate covers all project costs, including materials, labor, and contingencies. An accurate budget helps in securing funding and ensures that the project remains financially viable. It is crucial to involve stakeholders in budget discussions to align their expectations with the available resources. Effective budget management also requires identifying potential cost overruns early and taking corrective actions to stay within the approved budget. Tools like cost-benefit analysis and variance analysis can help project managers manage and control the budget throughout the project's lifecycle.
            <br><br>
            Stakeholder alignment is the final key aspect of the Project Planning and Initiation phase. This involves identifying all stakeholders, understanding their needs and expectations, and establishing clear communication channels. Effective stakeholder engagement ensures their support and commitment throughout the project. Regular updates and feedback loops help maintain transparency and trust, reducing the likelihood of conflicts. It is essential to develop a stakeholder management plan that outlines how to engage each stakeholder group at different stages of the project. Successfully managing stakeholder relationships can significantly enhance project outcomes and foster a collaborative environment.
          `,
        link: "https://www.smartsheet.com/critical-path-method"
    },
    {
        text: `<iframe width="880" height="600" src="https://www.youtube.com/embed/rBSCvPYGnTc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        link: ""
    },
    {
        text: `<iframe width="880" height="600" src="https://www.youtube.com/embed/rck3MnC7OXA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        link: ""
    },
    {
        text: `
            <div class="book-group">
              <div class="book-item">
                <img src="https://i.ebayimg.com/images/g/kwsAAOSwge9lc3IX/s-l500.webp" alt="Book 1" class="book-image">
                <div class="book-description">
                  <h4>PMBOK A Guide to the Project Management Body of Knowledge 7th edition Paperback</h4>
                  <p>PMBOK(R) Guide is the go-to resource for project management practitioners. The project management profession has significantly evolved due to emerging technology, new approaches and rapid market changes.</p>
                </div>
              </div>
              <div class="book-item">
                <img src="https://i.ebayimg.com/images/g/kwsAAOSwge9lc3IX/s-l500.webp" alt="Book 1" class="book-image">
                <div class="book-description">
                  <h4>PMBOK A Guide to the Project Management Body of Knowledge 7th edition Paperback</h4>
                  <p>PMBOK(R) Guide is the go-to resource for project management practitioners. The project management profession has significantly evolved due to emerging technology, new approaches and rapid market changes.</p>
                </div>
              </div>
            </div>`,
        link: ""
    }
];

let currentPageIndex = 0;

function updateContent() {
    const pageContent = document.getElementById('page-content');
    const additionalInfo = document.getElementById('additional-info');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    pageContent.innerHTML = content[currentPageIndex].text;


    if (content[currentPageIndex].link) {
        additionalInfo.innerHTML = `Want to know more? Have a look on: <a href='${content[currentPageIndex].link}' target='_blank'>${content[currentPageIndex].link}</a>`;
    } else {
        additionalInfo.innerHTML = '';
    }

    prevButton.disabled = currentPageIndex === 0;

    if (currentPageIndex === content.length - 1) {
        nextButton.style.display = 'none';

        if (!document.getElementById('jump-button')) {
            const jumpButton = document.createElement('button');
            jumpButton.textContent = 'Start Quiz';
            jumpButton.id = 'jump-button'; // 添加ID以便后续判断
            jumpButton.onclick = function () {
                window.location.href = '/game/quiz1';
            };
            document.querySelector('.pagination-buttons').appendChild(jumpButton);
        }
    } else {
        nextButton.style.display = 'block';

        const jumpButton = document.getElementById('jump-button');
        if (jumpButton) {
            jumpButton.remove();
        }
    }
}

function showNextPage() {
    if (currentPageIndex < content.length - 1) {
        currentPageIndex++;
        updateContent();
    }
}

function showPreviousPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updateContent();
    }
}

function navigateToPage(index) {
    currentPageIndex = index;
    updateContent();
}

updateContent();