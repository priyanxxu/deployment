const quiz = [
{
    question:"What does HTML stand for?",
    answers:["Hyper Text Markup Language","High Text Machine Language","Home Tool Markup Language"],
    correct:0
},
{
    question:"Which language is used for styling?",
    answers:["HTML","CSS","Python"],
    correct:1
},
{
    question:"Which language is used for web interactivity?",
    answers:["JavaScript","C++","Java"],
    correct:0
}
];

let current = 0;
let score = 0;

function loadQuestion(){
    let q = quiz[current];
    document.getElementById("question").innerText = q.question;

    let options = "";
    q.answers.forEach((ans,index)=>{
        options += `
        <label>
        <input type="radio" name="answer" value="${index}">
        ${ans}
        </label>
        `;
    });

    document.getElementById("answers").innerHTML = options;
}

function nextQuestion(){
    let selected = document.querySelector('input[name="answer"]:checked');

    if(selected){
        if(Number(selected.value) === quiz[current].correct){
            score++;
        }
    }

    current++;

    if(current < quiz.length){
        loadQuestion();
    }else{
        document.getElementById("question").innerText = "Quiz Completed!";
        document.getElementById("answers").innerHTML = "";
        document.getElementById("score").innerText =
        "Your Score: " + score + "/" + quiz.length;
    }
}
loadQuestion();