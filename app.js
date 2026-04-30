const electionSteps = [
    {
        title: "Voter Registration",
        date: "Phase 1",
        description: "Ensure you are eligible and registered to vote. You must meet age and citizenship requirements. Check your local registration deadlines.",
        icon: "📝"
    },
    {
        title: "Candidate Nominations",
        date: "Phase 2",
        description: "Candidates file their nomination papers. Political parties announce their official representatives for the constituencies.",
        icon: "👥"
    },
    {
        title: "Campaign Period",
        date: "Phase 3",
        description: "Candidates share their manifestos, hold rallies, and engage with the public to secure votes. This period ends 48 hours before polling.",
        icon: "📢"
    },
    {
        title: "Polling Day",
        date: "Phase 4",
        description: "Voters visit designated polling stations to cast their ballots securely. Remember to carry a valid photo ID.",
        icon: "🗳️"
    },
    {
        title: "Counting & Results",
        date: "Phase 5",
        description: "Votes are counted under strict supervision. The candidate with the most valid votes in a constituency is declared the winner.",
        icon: "📊"
    }
];

const qaData = [
    {
        id: 'q1',
        q: "What ID do I need to vote?",
        a: "You typically need a government-issued photo ID. Common examples include a Voter ID card, Passport, Driving License, or a National Identity Card (like Aadhaar in India). Always check your specific local election commission guidelines."
    },
    {
        id: 'q2',
        q: "How do I find my polling station?",
        a: "You can usually find your polling booth location by visiting your national or state Election Commission website and searching your name or voter ID number in the electoral roll. They often provide a map or specific address."
    },
    {
        id: 'q3',
        q: "Can I vote online?",
        a: "Currently, most major national elections require in-person voting or mail-in/postal ballots for specific eligible groups (like overseas citizens or elderly). Fully online internet voting is very rare due to security concerns."
    },
    {
        id: 'q4',
        q: "What if I miss the registration deadline?",
        a: "If you miss the deadline, you generally will not be able to vote in the upcoming election. It is crucial to register well in advance. Check your local deadlines now!"
    }
];

// --- Initialize Timeline ---
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    electionSteps.forEach((step, index) => {
        const position = index % 2 === 0 ? 'left' : 'right';
        const stepHTML = `
            <div class="timeline-step ${position}">
                <div class="step-content glass-panel">
                    <span class="step-number">0${index + 1}</span>
                    <span class="step-date">${step.date}</span>
                    <h3>${step.icon} ${step.title}</h3>
                    <p>${step.description}</p>
                </div>
            </div>
        `;
        timelineContainer.insertAdjacentHTML('beforeend', stepHTML);
    });

    setupScrollAnimations();
}

// --- Scroll Animations (Intersection Observer) ---
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-step').forEach(step => {
        observer.observe(step);
    });
}

// --- Initialize Chatbot ---
const chatWindow = document.getElementById('chatWindow');
const quickQuestionsContainer = document.getElementById('quickQuestions');

function initChatbot() {
    if (!chatWindow || !quickQuestionsContainer) return;

    qaData.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'question-btn';
        btn.textContent = item.q;
        btn.onclick = () => handleUserQuestion(item);
        quickQuestionsContainer.appendChild(btn);
    });
}

function handleUserQuestion(item) {
    // 1. Add User Message
    addMessage(item.q, 'user-message');
    
    // Disable buttons temporarily
    toggleButtons(true);

    // 2. Show Typing Indicator
    const typingId = 'typing-' + Date.now();
    const typingHTML = `
        <div id="${typingId}" class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatWindow.insertAdjacentHTML('beforeend', typingHTML);
    scrollToBottom();

    // 3. Simulate Bot Response Delay
    setTimeout(() => {
        // Remove typing indicator
        document.getElementById(typingId).remove();
        
        // Add bot message
        addMessage(item.a, 'bot-message');
        
        // Re-enable buttons
        toggleButtons(false);
    }, 1500);
}

function addMessage(text, className) {
    const msgHTML = `<div class="message ${className}">${text}</div>`;
    chatWindow.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
}

function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function toggleButtons(disable) {
    const buttons = document.querySelectorAll('.question-btn');
    buttons.forEach(btn => {
        btn.disabled = disable;
        btn.style.opacity = disable ? '0.5' : '1';
        btn.style.cursor = disable ? 'not-allowed' : 'pointer';
    });
}

// --- Run on Load ---
document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initChatbot();
});
