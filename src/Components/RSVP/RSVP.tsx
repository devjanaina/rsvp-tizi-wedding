import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Form from "./Form/Form";
import styles from "./RSVP.module.scss";
import { IconButton, Switch } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";

export function RSVP() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
    confirmedFamily: Boolean,
  });

  const convertAge = (age: string) => {
    const ageNumber = Number(age);

    if (ageNumber < 13) {
      return "Criança";
    } else if (ageNumber >= 13 && ageNumber < 18) {
      return "Adolescente";
    } else if (ageNumber >= 18 && ageNumber < 60) {
      return "Adulto";
    } else if (ageNumber >= 60) {
      return "Idoso";
    }

    return age;
  };

  const inputs = [
    {
      id: 1,
      label: "Nome",
      type: "text",
      required: true,
      value: formValues.name,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, name: event.target.value });
      },
    },
    {
      id: 2,
      label: "Email",
      type: "email",
      required: true,
      value: formValues.email,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, email: event.target.value });
      },
    },
    {
      id: 3,
      label: "Idade",
      type: "number",
      required: true,
      min: 0,
      max: 100,
      value: formValues.age,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, age: event.target.value });
      },
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  const [familyConfirmed, setFamilyConfirmed] = useState(false);
  const [newFamiliar, setNewFamiliar] = useState([
    { name: formValues.name, age: formValues.age },
  ]);

  const addNewFamilyMember = () => {
    setNewFamiliar([
      ...newFamiliar,
      { name: formValues.name, age: formValues.age },
    ]);
  };

  const removeFamilyMember = (index: number) => {
    if (index !== 0) {
      const newFamiliarList = [...newFamiliar];
      newFamiliarList.splice(index, 1);
      setNewFamiliar(newFamiliarList);
    }
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Form
                    key={inputs[0].id}
                    label={inputs[0].label}
                    type={inputs[0].type}
                    id={inputs[0].id}
                    required={inputs[0].required}
                    value={inputs[0].value}
                    onChange={inputs[0].onChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Form
                    key={inputs[1].id}
                    label={inputs[1].label}
                    type={inputs[1].type}
                    id={inputs[1].id}
                    required={inputs[1].required}
                    value={inputs[1].value}
                    onChange={inputs[1].onChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Form
                    key={inputs[2].id}
                    label={inputs[2].label}
                    type={inputs[2].type}
                    id={inputs[2].id}
                    required={inputs[2].required}
                    min={inputs[2].min}
                    max={inputs[2].max}
                    value={convertAge(inputs[2].value)}
                    onChange={inputs[2].onChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={familyConfirmed}
                      onChange={() => setFamilyConfirmed(!familyConfirmed)}
                    />
                  }
                  value={familyConfirmed ? "Sim" : "Não"}
                  label="Confirmar Família?"
                  labelPlacement="start"
                />
              </Grid>

              {familyConfirmed && (
                <Grid item xs={1}>
                  <FormControl fullWidth>
                    <Tooltip title="Adicionar familiar">
                      <IconButton onClick={() => addNewFamilyMember()}>
                        <AddCircleOutline />
                      </IconButton>
                    </Tooltip>
                  </FormControl>
                </Grid>
              )}

              {familyConfirmed && (
                <Grid container spacing={2}>
                  {newFamiliar.map((familiar, index) => (
                    <span key={index}>
                      <Grid item xs={7}>
                        <FormControl fullWidth>
                          <Form
                            key={index}
                            label="Nome"
                            type="text"
                            id={index}
                            required={true}
                            value={familiar.name}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFormValues({
                                ...formValues,
                                name: event.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <Form
                            key={index}
                            label="Idade"
                            type="number"
                            id={index}
                            required={true}
                            min={0}
                            max={100}
                            value={convertAge(familiar.age)}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFormValues({
                                ...formValues,
                                age: event.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={1}>
                        <FormControl fullWidth>
                          <Tooltip title="Remover familiar">
                            <IconButton
                              onClick={() => removeFamilyMember(index)}
                            >
                              <RemoveCircleOutline />
                            </IconButton>
                          </Tooltip>
                        </FormControl>
                      </Grid>
                    </span>
                  ))}
                </Grid>
              )}
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
