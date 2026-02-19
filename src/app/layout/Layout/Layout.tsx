import React, { FC } from 'react';

import styles from './Layout.module.scss';

export const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
