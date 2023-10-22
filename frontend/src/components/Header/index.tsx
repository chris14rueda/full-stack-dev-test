import { useState } from 'react';
import { Task } from '../../shared/hooks/useTasks';
import Styles from './Header.module.scss';

interface HeaderProps {
  title?: string;
}

const Header = ({ title = 'My Tasks' }: HeaderProps) => {
  return (
    <div className={Styles.container}>
      <span className={Styles.title}>{title}</span>
    </div>
  );
};

export default Header;
