import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<
  {
    children?: ReactNode | string;
  } & ButtonProps
> = ({ className, children, ...rest }) => {
  return (
    <button
      className={clsx(className, styles.btn)}
      {...rest}
    >
      {children}
    </button>
  );
};
