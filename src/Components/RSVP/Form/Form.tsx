import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export interface FormProps {
    label: string,
    type: string,
    id: number,
    required?: boolean,
    min?: number,
    max?: number,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Form(props: FormProps) {

    return (
        <FormControl fullWidth>
            <TextField
                id={props.id.toString()}
                label={props.label}
                type={props.type}
                required={props.required}
                variant="outlined"
                margin="dense"
                inputProps={{ min: props.min, max: props.max }}
                value={props.value}
                onChange={props.onChange}
            />
        </FormControl>
    )
}

export default Form;