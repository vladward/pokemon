import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import styles from './Container.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container: FC<Props> = ({ children, className }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
