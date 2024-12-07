import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';

type ChoreFormFieldsProps = {
  choreInfo: { title: string; description: string | null; deadline: Date; priorityLevel: number; done?: boolean };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
};

function ChoreFormFields(props: ChoreFormFieldsProps) {
  const { choreInfo, handleChange, handleSubmit, submitLabel } = props;
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
      <TextField
        label="Title"
        name="title"
        value={choreInfo.title}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={choreInfo.description}
        onChange={handleChange}
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        label="Deadline"
        name="deadline"
        type="date"
        value={choreInfo.deadline}
        onChange={handleChange}
        slotProps={{ inputLabel: { shrink: true } }}
        variant="outlined"
        required
      />
      <TextField
        label="Priority Level"
        name="priorityLevel"
        type="number"
        value={choreInfo.priorityLevel}
        onChange={handleChange}
        variant="outlined"
        slotProps={{ htmlInput: { min: 1 } }}
        required
      />
      {choreInfo.done != undefined && (
        <FormControlLabel
          control={<Checkbox name="done" checked={choreInfo.done} onChange={handleChange} />}
          label="Done"
        />
      )}
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {submitLabel}
        </Button>
      </Box>
    </Box>
  );
}

export default ChoreFormFields;
