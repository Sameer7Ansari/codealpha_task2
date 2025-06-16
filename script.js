document.addEventListener("DOMContentLoaded", showTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  showTasks();
}

function showTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}
