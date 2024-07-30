document.addEventListener('DOMContentLoaded', function () {
    fetchTodos();
});

function fetchTodos() {
    fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const todoItem = createTodoItem(todo);
                todoList.appendChild(todoItem);
            });
        });
}

function createTodo() {
    const todoTitle = document.getElementById('todoTitle').value;
    if (todoTitle.trim() === '') return;

    const todo = {
        title: todoTitle,
        completed: false
    };

    fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
        .then(response => response.json())
        .then(newTodo => {
            const todoList = document.getElementById('todoList');
            const todoItem = createTodoItem(newTodo);
            todoList.appendChild(todoItem);
            document.getElementById('todoTitle').value = '';
        });
}

function createTodoItem(todo) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    li.className = todo.completed ? 'completed' : '';

    li.addEventListener('click', () => {
        toggleTodoCompletion(todo.id, !todo.completed);
        li.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteTodoById(todo.id, li);
    });

    li.appendChild(deleteButton);

    return li;
}

function toggleTodoCompletion(id, completed) {
    fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: completed })
    });
}

function deleteTodoById(id, todoItem) {
    fetch(`/api/todos/${id}`, {
        method: 'DELETE'
    }).then(() => {
        todoItem.remove();
    });
}
