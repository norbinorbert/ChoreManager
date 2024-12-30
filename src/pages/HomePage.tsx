import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('Home Page')}</title>
        <link type="image/png" rel="icon" href="/icons/home_page.png" />
      </Helmet>
      <Typography variant="h2">{t('Welcome to the ChoreManager')}</Typography>
    </>
  );
}
