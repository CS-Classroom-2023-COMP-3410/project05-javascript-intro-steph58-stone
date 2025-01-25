document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    // Load tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Function to save tasks to localStorage
    const saveTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Function to render tasks
    const renderTasks = (filter = "all") => {
        taskList.innerHTML = ""; // Clear the task list
      
        tasks
          .filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
          })
          .forEach(task => {
            const li = document.createElement("li");
            if (task.completed) {
              li.classList.add("completed"); // Add the "completed" class only if the task is completed
            }
            li.draggable = true;
            li.dataset.id = task.id;
      
            li.innerHTML = `
              <span class="task-text">${task.text}</span>
              <div class="task-actions">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
              </div>
            `;
      
            // Toggle task completion
            li.querySelector(".task-text").addEventListener("click", () => {
              task.completed = !task.completed;
              saveTasks();
              renderTasks(filter);
            });
      
            // Edit task
            li.querySelector(".edit-btn").addEventListener("click", () => {
              const newText = prompt("Edit task:", task.text);
              if (newText) {
                task.text = newText.trim();
                saveTasks();
                renderTasks(filter);
              }
            });
      
            // Delete task
            li.querySelector(".delete-btn").addEventListener("click", () => {
              tasks = tasks.filter(t => t.id !== task.id);
              saveTasks();
              renderTasks(filter);
            });
      
            taskList.appendChild(li);
          });
      };
  
    // Function to handle adding a new task
    addTaskBtn.addEventListener("click", () => {
      const text = taskInput.value.trim(); // Get the trimmed input value
      if (text) {
        tasks.push({ id: Date.now(), text, completed: false }); // Add the task to the array
        saveTasks(); // Save tasks to localStorage
        renderTasks(); // Re-render the task list
        taskInput.value = ""; // Clear the input field
      } else {
        alert("Please enter a task!"); // Show an alert if input is empty
      }
    });
  
    // Add event listeners to filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks(btn.dataset.filter);
      });
    });
  
    // Initial render of tasks
    renderTasks();
  });
  
  