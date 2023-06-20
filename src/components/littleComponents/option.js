import React from "react";
import styles from "../../styles/option.module.css";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";
export const Option = ({ href, optionName, hasOptions, subOptions, first }) => {
  const [showOptions, setShowOptions] = useState(false);
  if (hasOptions) {
    return (
      <div onClick={() => setShowOptions(!showOptions)}>
        <div
          className={`${styles.option} ${showOptions && styles.optionsOpened}`}
        >
          <label>{optionName}</label>
          {showOptions ? <BsChevronDown /> : <BsChevronRight />}
        </div>
        {showOptions &&
          subOptions.map((subOption) => {
            return (
              <div key={subOption.link} className={styles.subOption}>
                <label> {subOption.name}</label>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <Link href={href}>
      <div className={first ? styles.firstOption:styles.option}>
        <label>{optionName}</label>
        <BsChevronRight/>
      </div>
    </Link>
  );
};
