let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

showTasks();

function addTask(){
    let text = document.getElementById("problem").value.trim();

    if(text === ""){
        alert("Enter a task");
        return;
    }

    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("problem").value = "";
    showTasks();
}

function showTasks(){
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task,index) => {
        list.innerHTML += `
            <li>
                ${task}
                <button onclick="deleteTask(${index})">x</button>
            </li>
        `;
    });
}

function deleteTask(index){
    tasks.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

function toggleTasks(){
    let list = document.getElementById("taskList");

    if(list.style.display === "none"){
        list.style.display = "block";
    }else{
        list.style.display = "none";
    }
}

function resetTasks(){
    tasks = [];
    localStorage.removeItem("tasks");
    showTasks();
}