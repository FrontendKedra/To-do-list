{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ]
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTasksDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map(task => ({
			...task,
			done: true,
		}));
		render();
    };

    const bindButtons = () => {
        const toggleTasksDoneButton = document.querySelector(".js-toggleDoneTasks");
        const markAllTasksDoneButton = document.querySelector(".js-markAllDone");

        if (toggleTasksDoneButton) {
            toggleTaskDone.addEventListener("click", toggleTasksDone);
        };

        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", markAllTasksDone)
        };
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");


        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const clearInputValue = () => {
        const input = document.querySelector(".js-newTask");
        input.value = "";

        input.focus();
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="list__button js-done">
            ${task.done ? "✔️" : ""}
            </button>
            <span class="${task.done ? "list__item--done" : ""}">
            ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">
            🗑
            </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsContainer = document.querySelector(".js-buttonsContainer");

        if (tasks.length === 0) {
            buttonsContainer.innerHTML = "";
            return;
        };
        buttonsContainer.innerHTML = `
        <button class="container__button" js-toggleDoneTasks>
        Pokaż ukończone
        </button>

        <button class="container__button" js-markAllDone>
        Ukończ wszystkie
        </button>
        `;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtons();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        clearInputValue();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}