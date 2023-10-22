import { useEffect } from 'react';

import useTasks, { Task } from '../../shared/hooks/useTasks';
import List from '../List';
import Form from '../Form';

import Styles from './Manager.module.scss';
import Header from '../Header';

const Manager = () => {
  const {
    loadTasks,
    tasks,
    addTask,
    deleteTask,
    updateTask,
    currentPage,
    hasMore,
    deletingIds,
    updatingIds,
    isAdding,
  } = useTasks();

  const handleComplete = ({ id, title, isCompleted }: Task) => {
    console.log('isCompleted', isCompleted);
    updateTask(id, { title, isCompleted });
  };

  const handleLoadMore = () => {
    loadTasks({ page: currentPage + 1 });
  };

  useEffect(() => {
    loadTasks({ page: 1 }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={Styles.container}>
      <Header />
      <List
        data={tasks}
        isAdding={isAdding}
        hasMore={hasMore}
        deletingIds={deletingIds}
        updatingIds={updatingIds}
        onDelete={deleteTask}
        onComplete={handleComplete}
        onLoadMore={handleLoadMore}
      />
      <Form onAdd={addTask} isAdding={isAdding} />
    </div>
  );
};

export default Manager;
