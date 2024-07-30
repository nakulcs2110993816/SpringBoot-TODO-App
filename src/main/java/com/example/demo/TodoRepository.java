package com.example.demo;

import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class TodoRepository {

    private List<Todo> todos = new ArrayList<>();
    private long currentId = 1;

    public List<Todo> findAll() {
        return todos;
    }

    public Optional<Todo> findById(Long id) {
        return todos.stream().filter(todo -> todo.getId().equals(id)).findFirst();
    }

    public Todo save(Todo todo) {
        if (todo.getId() == null) {
            todo.setId(currentId++);
        }
        todos.add(todo);
        return todo;
    }

    public void deleteById(Long id) {
        todos.removeIf(todo -> todo.getId().equals(id));
    }
}
