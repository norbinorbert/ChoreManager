import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <link type="image/png" rel="icon" href="/src/assets/home_page.png" />
      </Helmet>
      <Typography variant="h2">Welcome to the ChoreManager</Typography>
    </>
  );
}
