import { TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { AgeGroup } from "./Types";
import React, { useState } from "react";
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
  familyMembers: []
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
    if (index === 0) {
      return alert("Você não pode remover o unico familiar");
    } else {
      const updatedFamilyMembers = [...formData.familyMembers];
      updatedFamilyMembers.splice(index, 1);
      setFormData({ ...formData, familyMembers: updatedFamilyMembers });
    }
  };

  const handleAgeGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(event.target.value);
    if (age < 13) {
      setAgeGroup("criança");
    } else if (age >= 13 && age < 18) {
      setAgeGroup("adolescente");
    } else if (age >= 18 && age < 60) {
      setAgeGroup("adulto");
    } else if (age >= 60) {
      setAgeGroup("idoso");
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // will put server data here
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
            <Grid container spacing={2}>
              <TextField
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="E-mail"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                type="number"
                label="Idade"
                name="age"
                inputProps={{ min: 0, max: 100} }
                value={formData.age}
                onChange={handleAgeGroupChange}
                fullWidth
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.hasFamily}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Confirmar presença de familiares"
              />
              {formData.hasFamily && (
                <>
                  {formData.familyMembers.map((member, index) => (
                    <div key={index}>
                      <TextField
                        label={`Familiar ${index + 1}: Nome`}
                        name="name"
                        value={member.name}
                        onChange={handleFamilyMemberChange(index)}
                        fullWidth
                        required
                      />
                      <TextField
                        label={`Familiar ${index + 1}: Idade`}
                        name="age"
                        value={member.age}
                        onChange={handleFamilyMemberChange(index)}
                        fullWidth
                        required
                      />
                    </div>
                  ))}
                  <Tooltip title="Adicionar familiar">
                    <IconButton
                      onClick={() =>
                        setFormData({
                          ...formData,
                          familyMembers: [
                            ...formData.familyMembers,
                            { name: "", age: 0 },
                          ],
                        })
                      }
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Remover familiar">
                    <IconButton
                      onClick={() =>
                        removeFamilyMember(formData.familyMembers.length - 1)
                      }
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
