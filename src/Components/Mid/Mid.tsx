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
    <div className={styles["mid-page-container"]} aria-label="Informações sobre o evento">
      {/* Wrapper */}
      <div className={styles["mid-page-wrapper"]}>
        <div className={styles["countdown-box"]} aria-label="Contagem regressiva">
          <Countdown targetDate={weddingDate} />
        </div>
        {/* Content Box */}
        <div className={styles["content-box"]} aria-labelledby="main-header">
            <h1 className={styles["header-text"]} id="main-header">O nosso grande dia</h1>
          <Grid
            container
            item
            direction="row"
            justifyContent="flex-start"
            spacing={0}
            alignItems="flex-start"
          >
            <Grid item sm={12} md={12} lg={5}>
              <h2 className={styles["subheader-text-date"]}aria-label="16 de julho de 2023 as 9 horas da manhã">
                <span className={styles["date-text"]} aria-hidden>
                  Data: {weddingDateString}
                </span>
                <br />
                <span className={styles["date-time"]} aria-hidden>Hora: {weddingTime}</span>
              </h2>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <h2 className={styles["subheader-text-location"]} aria-label="Local: Quinta dos Querubins, Chácaras Recreio São Joaquim, Goiânia, Goiás">
                <span className={styles["location-name"]} aria-hidden>
                  {locationName}
                </span>
                <br />
                <span className={styles["location-address"]} aria-hidden>
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
  return ["Quinta dos Querubins", "Chácaras Recreio São Joaquim, Goiânia"];
}
