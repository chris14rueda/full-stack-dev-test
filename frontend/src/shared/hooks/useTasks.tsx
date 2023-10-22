import { useState } from 'react';
import TaskApiService from '../service/TaskApiService';

export type Task = {
  id?: number | undefined;
  title?: string | null | undefined;
  isCompleted?: boolean | number;
};

const useTasks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const loadTasks = async (params: object, reset: boolean = false) => {
    try {
      setIsLoading(true);
      const { data: { data = [], meta: { currentPage = 1, lastPage = 1 } = {} } = {} } =
        await TaskApiService.getAll(params);
      setHasMore(currentPage < lastPage);
      setCurrentPage(currentPage);
      setTasks(reset ? data : [...tasks, ...data]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: number | undefined) => {
    try {
      setIsDeleting(true);
      if (id) setDeletingIds([...deletingIds, id]);
      await TaskApiService.delete(id);
      setTasks(tasks.filter((task) => task.id !== id));
      setDeletingIds(deletingIds.filter((item) => item !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const updateTask = async (id: number | undefined, task: Task) => {
    try {
      setIsUpdating(true);
      if (id) setUpdatingIds([...updatingIds, id]);
      // to reflect changes immediately
      setTasks(tasks.map((v) => (v.id === id ? { ...task, id } : v)));
      const { data } = await TaskApiService.update(id, task);
      setTasks(tasks.map((v) => (v.id === id ? { ...task, ...data } : v)));
      setUpdatingIds(updatingIds.filter((item) => item !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const addTask = async (task: Task) => {
    try {
      setIsAdding(true);
      const { data } = await TaskApiService.add(task);
      setTasks([data, ...tasks]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return {
    isLoading,
    setIsLoading,
    isAdding,
    setIsAdding,
    isUpdating,
    setIsUpdating,
    isDeleting,
    setIsDeleting,
    hasMore,
    setHasMore,
    currentPage,
    setCurrentPage,
    tasks,
    loadTasks,
    deleteTask,
    updateTask,
    addTask,
    updatingIds,
    deletingIds,
  };
};

export default useTasks;
