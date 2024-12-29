import { Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledTextField } from '../styled_components/StyledTextField';

type ChoreFormFieldsProps = {
  choreInfo: { title: string; description: string | null; deadline: string; priorityLevel: number; done?: boolean };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
};

function ChoreFormFields(props: ChoreFormFieldsProps) {
  const { choreInfo, handleChange, handleSubmit, submitLabel } = props;
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
      <StyledTextField label="Title" name="title" value={choreInfo.title} onChange={handleChange} required />
      <StyledTextField
        label="Description"
        name="description"
        value={choreInfo.description || ''}
        onChange={handleChange}
        multiline
        rows={4}
      />
      <StyledTextField
        label="Deadline"
        name="deadline"
        type="date"
        value={choreInfo.deadline}
        onChange={handleChange}
        slotProps={{ inputLabel: { shrink: true } }}
        required
      />
      <StyledTextField
        label="Priority Level"
        name="priorityLevel"
        type="number"
        value={choreInfo.priorityLevel}
        onChange={handleChange}
        slotProps={{ htmlInput: { min: 1 } }}
        required
      />
      {choreInfo.done !== undefined && (
        <FormControlLabel
          control={<Checkbox name="done" checked={choreInfo.done} onChange={handleChange} />}
          label="Done"
        />
      )}
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {submitLabel}
        </Button>
        <Button component={Link} to={document.URL.substring(0, document.URL.lastIndexOf('/'))}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default ChoreFormFields;
