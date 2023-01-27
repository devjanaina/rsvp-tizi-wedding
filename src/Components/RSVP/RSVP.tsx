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
      alert("Please fill in all required fields");
      return;
    }
    // Send data to server here
    console.log(formData);
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
          <form onSubmit={handleFormSubmit}>
            <Grid container>
              <FormControl fullWidth>
                <TextField
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </FormControl>
              <Grid item xs={8}>
                <TextField
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Idade"
                  name="age"
                  inputProps={{ min: 0, max: 100, maxLength: 3 }}
                  value={formData.age}
                  onChange={handleAgeGroupChange}
                  fullWidth
                  required
                />
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.hasFamily}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Tenho familiares que também vão comparecer"
              />
              {formData.hasFamily && (
                <FormControl fullWidth>
                <Grid container>
                  {formData.familyMembers.map((member, index) => (
                    <div key={index} className={styles["family-member"]}>
                      <Grid item xs={8}>
                        <TextField
                          label="Nome"
                          name="name"
                          value={member.name}
                          onChange={handleFamilyMemberChange(index)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          type="number"
                          label="Idade"
                          name="age"
                          inputProps={{ min: 0, max: 100, maxLength: 3 }}
                          value={member.age}
                          onChange={handleFamilyMemberChange(index)}
                          fullWidth
                        />
                      </Grid>
                      <Tooltip title="Remover Membro da Família">
                        <IconButton onClick={() => removeFamilyMember(index)}>
                          <RemoveCircleOutline />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))}
                  <Tooltip title="Adicionar Membro da Família">
                    <IconButton onClick={handleAddFamilyMember}>
                      <AddCircleOutline />
                    </IconButton>
                  </Tooltip>
                </Grid>
                </FormControl>
              )}
              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={styles["RSVP-button"]}
                >
                  Enviar
                </Button>
              </FormControl>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
