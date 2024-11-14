// Elements for display and input
const outputElement = document.getElementById("output");
const typedTextElement = document.getElementById("typed-text");
const cursorElement = document.querySelector(".cursor");

// Define the dialogue sequence exactly as specified
const dialogues = [
    { type: "input", text: "q&a 'who are you?'" },
    { type: "output", text: "Hi, I'm Eric Qiang Xu, a UCSC applied mathematics undergrad! \npsst...for more info about q&a, see man q&a" },
    { type: "input", text: "q&a 'tell me more about yourself'" },
    { type: "output", text: "Hmm, this one needs a GUI to show up properly." },
    { type: "output", text: "Detecting display server..." },
    { type: "output", text: "Display server detected: Wayland" },
    { type: "output", text: "Loading GUI modules..." },
    { type: "output", text: "GUI modules loaded successfully." },
    { type: "output", text: "Starting GUI session and redirecting, please wait..." }
];

// Typing speed in milliseconds
const typingSpeed = 50;
const outputDelay = 850; // Delay between input and output in milliseconds

// Function to get formatted CLI prompt
function getFormattedPrompt() {
    const now = new Date();
    const day = now.toLocaleString("en-US", { weekday: "short" });
    const month = now.toLocaleString("en-US", { month: "short" });
    const date = now.getDate();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Constructing the CLI prompt with styled elements
    return `[<span style="color: #2ee720">user</span>@<span style="color: #33bbc7">UbuntuServer</span>] - [<span style="color: #ffffff">~</span>] - [<span style="color: #afad24">${day} ${month} ${date}, ${hours}:${minutes}</span>] [$] `;
}

// Function to simulate typing text into the terminal with prompt visible
function typeTextWithPrompt(text, callback) {
    typedTextElement.innerHTML = getFormattedPrompt(); // Display prompt
    let index = 0;

    function type() {
        if (index < text.length) {
            typedTextElement.innerHTML = getFormattedPrompt() + text.slice(0, index + 1);
            index++;
            setTimeout(type, typingSpeed); // Continue typing each character
        } else if (callback) {
            cursorElement.style.display = "none"; // Hide cursor when done
            callback(); // Call callback when typing is complete
        }
    }

    cursorElement.style.display = "inline"; // Show cursor initially
    type();
}

// Function to add a line to the output instantly (no animation)
function addOutput(text) {
    const newLine = document.createElement("div");
    newLine.innerHTML = text;
    outputElement.appendChild(newLine);
}

// Function to process each dialogue step in sequence
function processDialogue(index) {
    if (index < dialogues.length) {
        const dialogue = dialogues[index];
        
        if (dialogue.type === "input") {
            // Display the CLI prompt and input text with typing animation
            typeTextWithPrompt(dialogue.text, () => {
                addOutput(getFormattedPrompt() + dialogue.text); // Add typed input to output instantly after typing completes
                typedTextElement.innerHTML = ""; // Clear input line for next entry
                cursorElement.style.display = "inline"; // Show cursor for next input
                
                // Delay before showing the next output type
                setTimeout(() => processDialogue(index + 1), outputDelay);
            });
        } else if (dialogue.type === "output") {
            // Display output instantly after delay
            addOutput(dialogue.text);
            processDialogue(index + 1); // Move to the next dialogue
            if (dialogue.text === "Starting GUI session and redirecting, please wait...") {
                setTimeout(() => {
                    window.location.href = "home.html"; // Redirect to home.html
                }, 2550); // Optional delay for better UX
            }
        }
    }
}

// Start the dialogue sequence
processDialogue(0);
