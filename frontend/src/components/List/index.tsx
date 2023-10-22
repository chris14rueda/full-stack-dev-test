import * as cn from 'classnames';

import Icons from '../Icons';
import Checkbox from '../Checkbox';
import Loader from '../Loader';
import { Task } from '../../shared/hooks/useTasks';

import Styles from './List.module.scss';

interface ListProps {
  data: Task[];
  hasMore: boolean;
  isAdding: boolean;
  deletingIds: number[];
  updatingIds: number[];
  onDelete: (id: number | undefined) => void;
  onComplete: (task: Task) => void;
  onLoadMore: () => void;
}

const List = ({
  data = [],
  hasMore = false,
  isAdding,
  onComplete,
  onDelete,
  onLoadMore,
  deletingIds = [],
}: ListProps) => {
  return (
    <ul className={Styles.container}>
      {isAdding && (
        <li className={Styles.item}>
          <Loader />
        </li>
      )}
      {data.length > 0 ? (
        data.map(({ id, title, isCompleted }) => {
          return (
            id &&
            (deletingIds.includes(id) ? (
              <li className={Styles.item}>
                <Loader />
              </li>
            ) : (
              <li key={id} className={cn(Styles.item, isCompleted && Styles.completed)}>
                <Checkbox
                  label={title || ''}
                  checked={Boolean(isCompleted)}
                  onChange={(e) => onComplete({ id, title, isCompleted: e.target.checked })}
                />
                <div className={Styles.buttons}>
                  <button className={Styles.btn} onClick={() => onDelete(id)}>
                    <Icons.Trash />
                  </button>
                </div>
              </li>
            ))
          );
        })
      ) : (
        <div className={Styles.empty}>No task</div>
      )}
      {hasMore && (
        <li className={Styles.item}>
          <button className={Styles.loadMore} onClick={onLoadMore}>{`Load more`}</button>
        </li>
      )}
    </ul>
  );
};

export default List;
