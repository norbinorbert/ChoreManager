import { FormControlLabel, FormGroup, Switch } from '@mui/material';

export function Header() {
    return (
        <header>
            <FormGroup style={{alignContent:'center'}}>
                <FormControlLabel control={<Switch />} label="Toggle favorites" />
            </FormGroup>
        </header>
    )
}