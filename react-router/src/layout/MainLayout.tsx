import { Link, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout: React.FC = () => {
  return (
    <div>
      <header className={styles.gnb}>
        <nav>
          this is GNB area.
          <ul>
            <li>
              <Link to={"/"}>Main</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/detail/1"}>D1</Link>
            </li>
            <li>
              <Link to={"/detail/2"}>D2</Link>
            </li>
            <li>
              <Link to={"/write"}>Write</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.contentArea}>
        <nav>this is LNB area.</nav>
        <main>
          this is main content area.
          <Outlet />
        </main>
        <aside>this is aside.</aside>
      </div>
      <footer>this is footer</footer>
    </div>
  );
};

export default MainLayout;
