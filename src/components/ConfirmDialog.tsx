import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  handleNo: () => void;
  handleYes: () => void;
};

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog open={props.open}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogActions>
        <Button onClick={props.handleNo}>{t('No')}</Button>
        <Button onClick={props.handleYes} autoFocus>
          {t('Yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
