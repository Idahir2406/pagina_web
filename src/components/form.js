import styles from "./form.module.css";

export const FormContainer = ({ children }) => {
  return <div className={styles.formContainer}>{children}</div>;
};

export const Input = ({ error,autoComplete, name, type, placeholder, onChange }) => {
  return (
    <>
      <input
        type={type}
        autoComplete={autoComplete}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        error={error}
      />
      
      <div className={styles.rightContainer}>
        <p className={styles.error}>{error}</p>
      </div>

    </>

  );
};

export const Button = ({ label, onClick,type }) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {label}
    </button>
  );
};

export const Form=({children,onSubmit})=>{
  return <form className={styles.form} onSubmit={onSubmit}>{children}</form>
}
