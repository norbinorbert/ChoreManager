import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  handleNo: () => void;
  handleYes: () => void;
};

export function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogActions>
        <Button onClick={props.handleNo}>No</Button>
        <Button onClick={props.handleYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
