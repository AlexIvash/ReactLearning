import React from "react";
import preloader from './preloader.gif';
import styles from "./preloader.module.css";

let Preloader = (props) => {
    return <div className={styles.preloader}><img src={preloader}/></div>
}

export default Preloader;