package com.task.task.service;

import com.task.task.model.Task;
import com.task.task.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    /*
    - Retrieving all tasks.
    - Creating a new task.
    - Retrieving a single task by its ID.
    - Updating an existing task.
    - Deleting a task.
     */

    public Task save(Task task) {
        return taskRepository.save(task);
    }
    public Task findById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task updateExistingTask(Long id, Task task) {
        Task taskToUpdate = findById(id);
        if (taskToUpdate != null) {
            taskToUpdate.setTitle(task.getTitle());
            taskToUpdate.setDescription(task.getDescription());
            taskToUpdate.setDueDate(task.getDueDate());
            taskRepository.save(taskToUpdate);
        }
        return taskToUpdate;
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

}
