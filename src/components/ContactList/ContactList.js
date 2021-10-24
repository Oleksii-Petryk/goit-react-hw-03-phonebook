import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={styles.contactItem} key={id}>
            <p className={styles.text}>{name}</p>
            <p className={styles.number}>{number}</p>
            <button
              className={styles.button}
              type="button"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ContactList;

ContactList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.number,
};
