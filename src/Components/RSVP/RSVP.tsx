import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
} from "@mui/material";
import { AgeGroup } from "./Types";
import React, { useState, useEffect } from "react";
import styles from "./RSVP.module.scss";
import Grid from "@mui/material/Grid";

import { IconButton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

interface FormData {
  name: string;
  email: string;
  age: number;
  hasFamily: boolean;
  familyMembers: FamilyMember[];
}

interface FamilyMember {
  name: string;
  age: number;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  age: 0,
  hasFamily: false,
  familyMembers: [],
};

export function RSVP() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("criança");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, hasFamily: event.target.checked });
  };

  const handleFamilyMemberChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const updatedFamilyMembers = [...formData.familyMembers];
      updatedFamilyMembers[index] = {
        ...updatedFamilyMembers[index],
        [name]: value,
      };
      setFormData({ ...formData, familyMembers: updatedFamilyMembers });
    };

  const removeFamilyMember = (index: number) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers.splice(index, 1);
    setFormData({ ...formData, familyMembers: updatedFamilyMembers });
  };

  const handleAgeGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(event.target.value);
    setFormData({ ...formData, age });
  };

  useEffect(() => {
    if (formData.age < 13) {
      setAgeGroup("criança");
    } else if (formData.age >= 13 && formData.age < 18) {
      setAgeGroup("adolescente");
    } else if (formData.age >= 18 && formData.age < 60) {
      setAgeGroup("adulto");
    } else if (formData.age >= 60) {
      setAgeGroup("idoso");
    }
  }, [formData.age]);

  const handleAddFamilyMember = () => {
    setFormData({
      ...formData,
      familyMembers: [...formData.familyMembers, { name: "", age: 0 }],
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform form validation here
    if (!formData.name || !formData.email || !formData.age) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }
    // Send data to server here
    console.log(formData);
  };

  return (
    <div className={styles["RSVP-container"]}>
      <div
        className={styles["RSVP-wrapper"]}
        aria-label="Página de cadastro e confirmação da presença"
      >
        <div
          className={styles["RSVP-text"]}
          aria-labelledby="main-header"
          aria-describedby="subheading-text"
        >
          <h1 className={styles["main-text"]} id="main-header">
            Você faz parte da nossa história
          </h1>
          <p className={styles["subheader"]} id="subheading-text">
            Com amor, Tiziana e Wagner
          </p>
        </div>
        <div className={styles["RSVP-form"]} aria-label="Formulário">
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  aria-label="Nome"
                  aria-errormessage="Por favor, preencha o seu nome"
                  required
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  aria-label="E-mail"
                  aria-errormessage="Por favor, preencha o seu e-mail"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Idade"
                  name="age"
                  inputProps={{ min: 0, max: 100 }}
                  value={formData.age}
                  onChange={handleAgeGroupChange}
                  fullWidth
                  aria-label="Idade"
                  aria-errormessage="Por favor, preencha a sua idade"
                  required
                />
              </Grid>
              <Grid item xs={11} marginLeft={-1}>
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Checkbox
                      checked={formData.hasFamily}
                      onChange={handleCheckboxChange}
                      aria-labelledby="hasFamilyCheckbox"
                      role="checkbox"
                    />
                  }
                  id="hasFamilyCheckbox"
                  label="Tenho familiares que também vão comparecer"
                />
              </Grid>
              {formData.hasFamily && (
                <Grid item xs={1}>
                  <Tooltip title="Adicionar Membro da Família">
                    <IconButton onClick={handleAddFamilyMember} role="button">
                      <AddCircleOutline />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}
              {formData.hasFamily && (
                <Grid item xs={12} marginBottom={2}>
                  <FormControl fullWidth>
                    {formData.familyMembers.map((member, index) => (
                      <div key={index} className={styles["family-member"]}>
                        <Grid container spacing={2} marginBottom={2}>
                          <Grid item xs={1}>
                            <Tooltip title="Remover Membro da Família">
                              <IconButton
                                onClick={() => removeFamilyMember(index)}
                                role="button"
                                disabled={formData.familyMembers.length === 1}
                              >
                                <RemoveCircleOutline />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              label="Nome"
                              name="name"
                              value={member.name}
                              aria-errormessage="Por favor, preencha o nome do membro da família"
                              onChange={handleFamilyMemberChange(index)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              type="number"
                              label="Idade"
                              name="age"
                              inputProps={{ min: 0, max: 100 }}
                              value={member.age}
                              arie-errormessage="Por favor, preencha a idade do membro da família"
                              onChange={handleFamilyMemberChange(index)}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </FormControl>
                </Grid>
              )}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      role="button"
                      aria-label="Enviar formulário"
                      className={styles["RSVP-button"]}
                    >
                      Enviar
                    </Button>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
