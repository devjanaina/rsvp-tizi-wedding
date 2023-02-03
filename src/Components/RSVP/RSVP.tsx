import React, { useState, useEffect } from "react";
import styles from "./RSVP.module.scss";
import { AgeGroup } from "./Types";

// Material UI imports
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  FormHelperText,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";


// Custom styles for the form fields
const FormField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F2C94C',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#F2C94C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F2C94C',
    },
  },
});

// Form data
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
  familyMembers: [{ name: "", age: 0 }],
};


// Component
export function RSVP() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  // Age conversion logic
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("criança");
  // Max family members error
  const [maxFamilyMembersError, setMaxFamilyMembersError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Checkbox logic that allows the user to add family members
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      hasFamily: event.target.checked,
      familyMembers: event.target.checked ? [{ name: "", age: 0 }] : [],
    });
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

  // Remove family member logic
  const removeFamilyMember = (index: number) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers.splice(index, 1);
    setFormData({ ...formData, familyMembers: updatedFamilyMembers });
  };

  // Age conversion logic
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


  // Add family member logic
  const handleAddFamilyMember = () => {
    if (formData.familyMembers.length >= 4) {
      setMaxFamilyMembersError(true);
      return;
    }
    setMaxFamilyMembersError(false);
    setFormData({
      ...formData,
      familyMembers: [...formData.familyMembers, { name: "", age: 0 }],
    });
  };

  // Form submit logic
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.age) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    if (
      formData.hasFamily &&
      formData.familyMembers.length >= 0 &&
      !formData.familyMembers[0].name &&
      !formData.familyMembers[0].age
    ) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }
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
          {/* Header */}
          <h1 className={styles["main-text"]} id="main-header">
            Você faz parte da nossa história
          </h1>
          {/* Subheader */}
          <p className={styles["subheader"]} id="subheading-text">
            Com amor, Tiziana e Wagner
          </p>
        </div>
        {/* Form */}
        <div className={styles["RSVP-form"]} aria-label="Formulário">
          <form onSubmit={handleFormSubmit}>
            {/* Name field */}
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <FormField
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
              {/* E-mail field */}
              <Grid item xs={8}>
                <FormField
                  label="E-mail"
                  type={"email"}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  aria-label="E-mail"
                  aria-errormessage="Por favor, preencha o seu e-mail"
                  required
                />
              </Grid>
              {/* Age field */}
              <Grid item xs={4}>
                <FormField
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
              {/* Allows user add family members to confirm presence */}
              <Grid item xs={11} marginLeft={-1}>
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Checkbox
                      checked={formData.hasFamily}
                      onChange={handleCheckboxChange}
                      aria-labelledby="hasFamilyCheckbox"
                      role="checkbox"
                      sx={{ "&.Mui-checked": { color: "#F2C94C" }}}
                    />
                  }
                  id="hasFamilyCheckbox"
                  label="Tenho familiares que também vão comparecer"
                />
              </Grid>
              {/* Family members logic after checkbox */}
              {formData.hasFamily && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    {/* Family members array */}
                    {formData.familyMembers.map((member, index) => (
                      <div key={index} className={styles["family-member"]}>
                        <Grid container spacing={1} marginBottom={2}>
                          <Grid item xs={7}>
                            <FormField
                              label="Nome"
                              name="name"
                              required
                              value={member.name}
                              aria-errormessage="Por favor, preencha o nome do membro da família"
                              onChange={handleFamilyMemberChange(index)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormField
                              type="number"
                              label="Idade"
                              name="age"
                              required
                              inputProps={{ min: 0, max: 100 }}
                              value={member.age}
                              arie-errormessage="Por favor, preencha a idade do membro da família"
                              onChange={handleFamilyMemberChange(index)}
                              fullWidth
                            />
                          </Grid>
                          {/* Disable remove button when it has only one item */}
                          <Grid item xs={1} alignSelf="center">
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
                          {/* Add new family member only shown on last array item */}
                          {index === formData.familyMembers.length - 1 && (
                            <Grid item xs={1} alignSelf="center">
                              <Tooltip title="Adicionar Membro da Família">
                                <IconButton
                                  onClick={handleAddFamilyMember}
                                  role="button"
                                  disabled={formData.familyMembers.length === 4}
                                  onError={handleAddFamilyMember}
                                >
                                  <AddCircleOutline />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          )}
                          {/* Family members limit */}
                          {formData.familyMembers.length === 4 &&
                            index === formData.familyMembers.length - 1 && (
                              <FormHelperText
                                className={styles["family-error-message"]}
                              >
                                Limite de 4 membros da família
                              </FormHelperText>
                            )}
                        </Grid>
                      </div>
                    ))}
                  </FormControl>
                </Grid>
              )}

              {/* Submit button */}
              <Grid item xs={12}>
              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="contained"
                  role="button"
                  aria-label="Enviar formulário"
                  className={styles["RSVP-button"]}
                  sx={{ backgroundColor: "#F2C94C", color: "#fff", '&:hover': { backgroundColor: "#f50057"}, width: "60%", alignSelf: "center" }}
                >
                  Enviar
                </Button>
              </FormControl>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
