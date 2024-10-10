window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const pendingTasksEl = document.querySelector("#pending-tasks");
	const completedTasksEl = document.querySelector("#completed-tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
		if (!task) {
			alert("Please fill out the task");
			return;
		}

		// Create a new task element and add it to the pending list
		const taskEl = createTaskElement(task);
		pendingTasksEl.appendChild(taskEl);

		// Clear the input field after adding a task
		input.value = '';
	});

	// Function to create a task element with buttons and inside the colored container
	function createTaskElement(taskText, isCompleted = false, timeAdded = new Date().toLocaleString()) {
		// Create the main task container
		const taskEl = document.createElement('div');
		taskEl.classList.add('task');

		// Create content wrapper
		const taskContentEl = document.createElement('div');
		taskContentEl.classList.add('content');

		// Create input element for task text
		const taskInputEl = document.createElement('input');
		taskInputEl.classList.add('text');
		taskInputEl.type = 'text';
		taskInputEl.value = taskText;
		taskInputEl.setAttribute('readonly', 'readonly');

		// Add strike-through for completed tasks
		if (isCompleted) {
			taskInputEl.style.textDecoration = 'line-through';
		}

		// Create time display
		const taskTimeEl = document.createElement('div');
		taskTimeEl.classList.add('time');
		taskTimeEl.innerText = `Added: ${timeAdded}`;

		// Append task text and time to the content section
		taskContentEl.appendChild(taskInputEl);
		taskContentEl.appendChild(taskTimeEl);
		taskEl.appendChild(taskContentEl);

		// Create the actions container (edit, delete, complete)
		const taskActionsEl = document.createElement('div');
		taskActionsEl.classList.add('actions');

		// Create edit button
		const taskEditEl = document.createElement('button');
		taskEditEl.classList.add('edit');
		taskEditEl.innerText = 'Edit';

		// Create delete button
		const taskDeleteEl = document.createElement('button');
		taskDeleteEl.classList.add('delete');
		taskDeleteEl.innerText = 'Delete';

		// Create complete button (only if task is pending)
		if (!isCompleted) {
			const taskCompleteEl = document.createElement('button');
			taskCompleteEl.classList.add('complete');
			taskCompleteEl.innerText = 'Complete';
			taskActionsEl.appendChild(taskCompleteEl);

			// Complete task event: Move to completed tasks
			taskCompleteEl.addEventListener('click', () => {
				const completedTaskEl = createTaskElement(taskText, true, timeAdded);
				pendingTasksEl.removeChild(taskEl);
				completedTasksEl.appendChild(completedTaskEl);
			});
		}

		// Add edit and delete buttons to actions container
		taskActionsEl.appendChild(taskEditEl);
		taskActionsEl.appendChild(taskDeleteEl);

		// Append actions section to the task container
		taskEl.appendChild(taskActionsEl);

		// Edit button event listener
		taskEditEl.addEventListener('click', () => {
			if (taskEditEl.innerText.toLowerCase() === "edit") {
				taskEditEl.innerText = "Save";
				taskInputEl.removeAttribute("readonly");
				taskInputEl.focus();
			} else {
				taskEditEl.innerText = "Edit";
				taskInputEl.setAttribute("readonly", "readonly");
			}
		});

		// Delete button event listener
		taskDeleteEl.addEventListener('click', () => {
			if (taskEl.parentElement === pendingTasksEl) {
				pendingTasksEl.removeChild(taskEl);
			} else {
				completedTasksEl.removeChild(taskEl);
			}
		});

		return taskEl;
	}
});
