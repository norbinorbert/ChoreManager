import { FormControlLabel, FormGroup, Switch } from '@mui/material';

export function Header(props: { showFavorites: boolean, toggleFavorites: () => void }) {
    return (
        <FormGroup style={{ alignContent: 'center' }}>
            <FormControlLabel
                control={<Switch checked={props.showFavorites} onChange={props.toggleFavorites} />}
                label="Toggle favorites"
            />
        </FormGroup>
    )
}