import styles from "./social.module.css";

export const SocialContainer = ({children}) => {
  return <div className={styles.social_container}>{children}</div>;
};

export const Social = ({ children }) => {
  return <div className={styles.social}>{children}</div>;
}

