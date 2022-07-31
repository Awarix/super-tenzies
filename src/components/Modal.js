import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen }) => {
    return (
      <div>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
                <div className={styles.centered}>
                    <div className={styles.modal}>
                        
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <RiCloseLine style={{ marginBottom: "-3px" }} />
                        </button>
                        <div className={styles.modalContent}>
                            Are you sure you want to delete the item?
                        </div>
                    </div>
                </div>
          </div>
    )
  }
  
  export default Modal;