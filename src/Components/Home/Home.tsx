import styles from "./Home.module.scss";

export interface HomeProps {
  onClick: () => void;
}

export function Home({ onClick }: HomeProps) {
  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles["content-wrapper"]}>
        <h1 className={styles["names-header"]}>
          Tiziana <br /> & Wagner
        </h1>
        <button className={styles["confirmation"]} onClick={onClick}>CONFIRMAR PRESENÇA</button>
      </div>
    </div>
  );
}

export default Home;
