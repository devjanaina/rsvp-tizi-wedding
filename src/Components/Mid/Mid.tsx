import { Grid } from "@mui/material";
import Countdown from "./Countdown/Countdown";
import styles from "./Mid.module.scss";

export interface MidProps {
  weddingDate: Date;
}

export function Mid({ weddingDate }: MidProps) {
  const weddingTime = weddingDate.toLocaleTimeString();
  const weddingDateString = weddingDate.toLocaleDateString();
  const [locationName, locationAddress] = getWeddingLocation();

  return (
    <div className={styles["mid-page-container"]}>
      {/* Wrapper */}
      <div className={styles["mid-page-wrapper"]}>
        <div className={styles["countdown-box"]}>
          <Countdown targetDate={weddingDate} />
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
                  Data: {weddingDateString}
                </span>
                <br />
                <span className={styles["date-time"]}>Hora: {weddingTime}</span>
              </h2>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <h2 className={styles["subheader-text-location"]}>
                <span className={styles["location-name"]}>
                  {locationName}
                </span>
                <br />
                <span className={styles["location-address"]}>
                  {locationAddress}
                </span>
              </h2>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

function getWeddingLocation() {
  // replace this with your own code to get the location name and address
  return ["Quinta dos Querubins", "Chácaras Recreio São Joaquim, Goiânia"];
}
