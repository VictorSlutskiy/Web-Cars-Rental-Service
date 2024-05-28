import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../../styles/Sidebar.module.css";

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          <li>
          <NavLink
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ""}`
      }
      to={`/products`}
    >
      All Cars
    </NavLink>
          </li>
        {list.map(({ _id, name }) => (
  <li key={_id}>
    <NavLink
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ""}`
      }
      to={`/categories/${_id}`}
    >
      {name}
    </NavLink>
  </li>
))}

        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" target="_blank" className={styles.link}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
