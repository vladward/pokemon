import styles from './BurgerButton.module.scss';

type BurgerButtonProps = {
  isActive: boolean;
  onClick: () => void;
};

export const BurgerButton = ({ isActive, onClick }: BurgerButtonProps) => (
  <button
    className={`${styles.burger} ${isActive ? styles.active : ''}`}
    onClick={onClick}
    aria-label="Toggle menu"
  >
    <span />
  </button>
);
