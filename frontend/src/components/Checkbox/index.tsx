import { ChangeEvent } from 'react';
import * as cn from 'classnames';
import Styles from './Checkbox.module.scss';

interface CheckboxProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
  labelClass?: string;
}

const Checkbox = ({ label, onChange, labelClass, checked = false }: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    onChange?.(e);
  };

  return (
    <label className={Styles.container}>
      <input type={`checkbox`} checked={checked} onChange={handleChange} />
      <span className={cn(Styles.text, labelClass)}>{label}</span>
      <span className={Styles.checkmark} />
    </label>
  );
};

export default Checkbox;
