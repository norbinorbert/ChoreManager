import styled from '@emotion/styled';
import { TextField, TextFieldProps } from '@mui/material';

export const StyledTextField = styled((props: TextFieldProps) => <TextField {...props} variant="outlined" />)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
});
