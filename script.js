const questions = [
    {
        question:  
         "What color dress did I wear at Anna's reception when we first met?👗",
        options: [
            "White with Black🤍🖤",
            "Red with White❤️🤍",
            "Black with Red🖤❤️",
            "Red with Pink❤️🩷"
        ],
        answer: 2
    },
    {
        question: 
          "Who fell in love first?💗",

        options: [
            "You 😌",
            "Me 😉",
            "Both of us 💕",
            "Still a mystery 😂"
        ],
        answer: 2
    },
    {
        question:
          "What was the first thing that made you notice me?👀",

        options: [
            "My Smile ☺️",
            "My Eyes 👀",
            "My Voice ✨",
            "Everything 🥰"
        ],
        answer: 2
    },
    {
        question:
         "Which month you gift me a ring?💍",

        options: [
            "May",
            "July",
            "Oct",
            "Nov"
        ],
        answer: 2
    },
    {
        question:
         "In Which movie did our first Liplock happen?💋🙈",

        options: [
            "The King",
            "Dragon",
            "PT Sir",
            "Tourist Family"
        ],
        answer: 2
    },
    {
        question:
         "Where was this special photo taken?📸",
          image:
            "",
        options: [
            "Vdm",
            "Cdm",
            "Pondy",
            "Chennai"
        ],
        answer: 0
    },
    {
        question:
         "When you see this pic what gets you on mind?🩷",
         image:
          "",
        options: [
            "Just a Photo📷",
            "Anna's function✨",
            "Our First meet💝",
            "Nothing🙄"
        ],
        answer: 2
    },
    {
        question:
         "Which year was this memory?🗓️",
         image:
          "",
        options: [
            "2023",
            "2024",
            "2025",
            "2026"
        ],
        answer: 2
    },
    {
        question:
         "Do you remember this moment?💖",
         image:
          "",
        options: [
            "Of course 😍",
            "Maybe 😅",
            "Not really 🤔",
            "I forgot 🥲"
        ],
        answer: 0
    },
    {
        question:
         "What was special about this day?🤗",
         image:
          "",
        options: [
            "Our first meet 💖",
            "Our first trip 🚌",
            "Anniversary 💞",
            "Birthday 🎂"
        ],
        answer: 0
         
    }
]; 

let currentQuestion = 0;
let score = 0;

const romanticEmojis = [
    "❤️",
    "💕",
    "💗",
    "💘",
    "❤️‍🔥",
    "💖",
    "💝",
    "🩷",
    "🌹"
];

function createFloatingEmoji(){
    const container = document.getElementById("floating-emojis");
    if(!container) return;
    const emoji = document.createElement("span");
    emoji.className = "floating-emoji";
    emoji.innerText = romanticEmojis[
        Math.floor(Math.random() * romanticEmojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = (18 + Math.random() * 22) + "px";
    emoji.style.animationDuration = (6 + Math.random() * 5) + "s";
    container.appendChild(emoji);
    setTimeout(() => {
        emoji.remove();
    },1200);
}
setInterval(createFloatingEmoji, 700);

function showScreen(id){
    document.querySelectorAll(".screen")
    .forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

function startQuiz() {
    currentQuestion  = 0;
    score = 0;
    showScreen("quiz");
    loadQuestion();
}

function loadQuestion(){
    const q = questions[currentQuestion];
    document.getElementById("questionNumber").innerText =`Question ${currentQuestion + 1} / 10`;
    document.getElementById("score").innerText = `❤️ ${score}`;
    document.getElementById("progressBar").style.width = `${ ( (currentQuestion + 1) / questions.length) * 100}%`;
    document.getElementById("question").innerText = q.question;
    const imageContainer = document.getElementById("questionImageContainer");
    imageContainer.innerHTML = "";
    if(q.image){
        const img = document.createElement("img");
        img.src = q.image;
        imageContainer.appendChild(img);
    }
    const options = document.getElementById("options");
    options.innerHTML = "";
    q.options.forEach((option, index) => {
        const button = document.createElement("div");
        button.className = "option";
        button.innerText = option; 
        button.onclick = () =>
             checkAnswer(index);
        options.appendChild(button);
    });
    document.getElementById("feedback").innerHTML = "";
}

function checkAnswer(selected){
    const q = questions[currentQuestion];
    const options = document.querySelectorAll(".option");
    const feedback = document.getElementById("feedback");
    options.forEach(option => {
        option.style.pointerEvents = "none";
    });
    if(selected == q.answer){
        score++;
        options[selected].style.background = "rgba(0, 255, 120, 0.25)";
        options[selected].style.border = "2px solid #00ff78";
        feedback.innerHTML = "🫶🤩"
    }
    else{
        options[selected].style.background = "rgba(255, 0, 60, 0.25)";
        options[selected].style.border = "2px solid #ff1744"; 
        feedback.innerHTML = "🥲😱";
        options[q.answer].style.background = "rgba(255, 0, 120, 0.25)";
        options[q.answer].style.border = "2px solid #ff1744";
        setTimeout(() => {
            feedback.innerHTML = `🥲😱 Correct answer: ${q.options[q.answer]}`;
      }, 600);
    }
    document.getElementById("score").innerText = `❤️ ${score}`;

   setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
           loadQuestion();

        }
        else {
          showResult();
        }
   }, 1800);
}

function showResult(){
    alert("RESULT WORKING");
    showScreen("resultScreen");
    let message = "";
    if(score == 10){
        message = "OMG!  You Know me Perfectly! 😍";
    }
    else if(score >= 7){
        message = "Aww! You really Know us well!🥰";
    }
    else {
        message = "Not bad! But I still love you❤️😌";
    }
    document.getElementById("resultText").innerText = ` you go ${score} / 10 ❤️ ${message}`;
}

function showQR(){
    showScreen("qrScreen");
    const qr = document.getElementById("qrcode");
    qr.innerHTML = "";
    const surpriseURL = "https://neeru24-jn.github.io/anniversary-surprise/?surprise=rose";
    new QRCode(qr, {
        text: surpriseURL,
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff"
    });
}

function checkQRMode(){
    const params = new URLSearchParams(window.location.search);
    if(params.get("surprise") === "rose"){
        showScreen("roseScreen");
    }
}

function openRose(){
    const rose = document.querySelector(".anime-rose");
    if(rose) {
    rose.classList.add("opening");
    }
    const music = document.getElementById("music");
    if(music) {
    music.volume = 0.5;
    music.play().catch(() => {});
   }
    setTimeout(() => {
        showScreen("finalScreen");
        createConfetti();
    },2200);
}

function showMemories(){
    showScreen("memories");;
}

window.onload = function(){
    checkQRMode();
};
