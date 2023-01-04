import { FormControlLabel, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import styles from "./RSVP.module.scss";
import { useState } from "react";

export function RSVP() {
  const idade = [
    {
      value: "adulto",
      label: "Adulto",
    },
    {
      value: "crianca",
      label: "Criança",
    }
  ]

  const [confirmaFamilia, setConfirmarFamilia] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmarFamilia(event.target.checked);
  };
  return (
    <div className={styles["RSVP-container"]}>
      <div className={styles["RSVP-wrapper"]}>
        <div className={styles["RSVP-text"]}>
          <h1 className={styles["main-text"]}>
            Você faz parte da nossa história
          </h1>
          <p className={styles["subheader"]}>Com amor, Tiziana e Wagner</p>
        </div>
        <div className={styles["RSVP-form"]}>
          <Grid>
            <Grid container item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  margin="dense"
                />
              </FormControl>
            </Grid>

            <Grid container>
              <Grid item xs={7} sm={7}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="E-mail"
                    type={"email"}
                    variant="outlined"
                    margin="dense"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Idade"
                    select
                    variant="outlined"
                    margin="dense"
                  >
                    {idade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid container>
                <Grid item xs={6} sm={6}>
                  <FormControlLabel control={<Switch />} label="Confirmar família?" labelPlacement="start"/>
                </Grid>
              </Grid>
            </Grid>

            <button>Enviar</button>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
