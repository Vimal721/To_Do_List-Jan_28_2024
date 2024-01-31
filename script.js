let editItem = null;
let showValue = document.querySelector('.show-value');
let tasks = [];

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    }
});

function addBtn() {
    let inputValue = document.getElementById('input-value').value.trim();

    if (inputValue !== '') {
        if (editItem) {
            let index = editItem.parentElement.parentElement.dataset.id;
            tasks[index] = inputValue;
            editItem = null;
        } else {
            tasks.push(inputValue);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTasks();

        document.getElementById('input-value').value = '';

        taskAdded.style.display = 'block';
        setTimeout(function() {
            taskAdded.style.display = 'none';
        }, 2000); 
    } else {
        taskAlert.style.display = 'block';
        setTimeout(function() {
            taskAlert.style.display = 'none';
        }, 2000);
    }
}

function renderTasks() {
    showValue.innerHTML = '';

    tasks.forEach((task, index) => {
        let newElement = document.createElement('div');
        newElement.className = 'list-item';
        newElement.dataset.id = index;

        let itemText = document.createElement('span');
        itemText.className = 'item-text';
        itemText.textContent = task;
        newElement.appendChild(itemText);

        let btnContainer = document.createElement('div');
        btnContainer.className = 'btn-container';

        let editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';

        editBtn.addEventListener('click', function (event) {
            event.stopPropagation(); 

            let listItem = this.parentElement.parentElement;
            let taskTextElement = listItem.querySelector('.item-text');
            let taskText = taskTextElement.textContent.trim();
            document.getElementById('input-value').value = taskText;

            editItem = event.target;
        });

        let delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';

        delBtn.onclick = function () {
            let index = this.parentElement.parentElement.dataset.id;
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        };

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(delBtn);
        newElement.appendChild(btnContainer);
        showValue.appendChild(newElement);
    });
}
