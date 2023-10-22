import { useState } from 'react';
import { Task } from '../../shared/hooks/useTasks';
import Loader from '../Loader';
import Styles from './Form.module.scss';

interface FormProps {
  onAdd: (data: Task) => void;
  isAdding?: boolean;
}

const Form = ({ onAdd, isAdding }: FormProps) => {
  const [title, setTitle] = useState<string>('');

  const handleAdd = () => {
    onAdd({ title });
    setTitle('');
  };

  return (
    <div className={Styles.container}>
      <input
        type={'text'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Enter a task"
        className={Styles.input}
        disabled={isAdding}
      />
      <button onClick={handleAdd} className={Styles.btn} disabled={!title || isAdding}>
        {isAdding ? <Loader /> : 'Add'}
      </button>
    </div>
  );
};

export default Form;
