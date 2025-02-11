import { Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function UnauthorizedPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('Unauthenticated')}</title>
      </Helmet>
      <Alert severity="error">{t("You can't view this page because you aren't logged in. Please log in")}</Alert>
    </>
  );
}
