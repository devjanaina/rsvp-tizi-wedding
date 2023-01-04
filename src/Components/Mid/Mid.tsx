import { Grid } from "@mui/material";
import Countdown from "./Countdown/Countdown";
import styles from "./Mid.module.scss";

export interface MidProps {
  weddingDate: Date;
}

export function Mid() {
  return (
    <div className={styles["mid-page-container"]}>
      {/* Wrapper */}
      <div className={styles["mid-page-wrapper"]}>
        <div className={styles["countdown-box"]}>
          <Countdown />
        </div>
        {/* Content Box */}
        <div className={styles["content-box"]}>
            <h1 className={styles["header-text"]}>O nosso grande dia</h1>
          <Grid
            container
            item
            direction="row"
            justifyContent="flex-start"
            spacing={0}
            alignItems="flex-start"
          >
            <Grid item sm={12} md={12} lg={5}>
              <h2 className={styles["subheader-text-date"]}>
                <span className={styles["date-text"]}>
                  Data: 16 de julho de 2023
                </span>
                <br />
                <span className={styles["date-time"]}>Hora: 9h</span>
              </h2>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <h2 className={styles["subheader-text-location"]}>
                <span className={styles["location-name"]}>
                  Quinta dos Querubins
                </span>
                <br />
                <span className={styles["location-address"]}>
                  Chácaras Recreio São Joaquim, Goiânia
                </span>
              </h2>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
