import { useState, useEffect } from 'react';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '@shared/schema';

// Local Storage Key
const TASKS_STORAGE_KEY = 'tasks';

// Since we are frontend-only, we mock the backend behavior here using localStorage.
// This hook creates an interface identical to what TanStack Query would return if we had an API.

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to local storage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  return { data: tasks, isLoading };
}

export function useCreateTask() {
  return {
    mutate: (newTask: CreateTaskRequest) => {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      const currentTasks: Task[] = stored ? JSON.parse(stored) : [];
      
      const task: Task = {
        id: Math.floor(Math.random() * 1000000), // Mock ID
        text: newTask.text,
        description: newTask.description ?? null,
        status: newTask.status ?? "Not Started",
      };

      const updatedTasks = [task, ...currentTasks];
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      
      // Dispatch event to notify other hooks
      window.dispatchEvent(new Event('storage-update'));
    },
    isPending: false
  };
}

export function useUpdateTask() {
  return {
    mutate: ({ id, ...updates }: { id: number } & UpdateTaskRequest) => {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!stored) return;
      
      const currentTasks: Task[] = JSON.parse(stored);
      const updatedTasks = currentTasks.map(t => 
        t.id === id ? { ...t, ...updates } : t
      );
      
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      window.dispatchEvent(new Event('storage-update'));
    },
    isPending: false
  };
}

export function useDeleteTask() {
  return {
    mutate: (id: number) => {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!stored) return;
      
      const currentTasks: Task[] = JSON.parse(stored);
      const updatedTasks = currentTasks.filter(t => t.id !== id);
      
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      window.dispatchEvent(new Event('storage-update'));
    },
    isPending: false
  };
}

// Advanced Hook for real-time local sync
export function useTasksSynced() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = () => {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse tasks", e);
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadTasks();

    const handleStorageChange = () => {
      console.log("Storage change detected, reloading tasks...");
      loadTasks();
    };
    
    // Listen for custom event within same window
    window.addEventListener('storage-update', handleStorageChange);
    // Listen for storage event across tabs
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage-update', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { tasks, isLoading };
}
