import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Typography variant="h2">Welcome to the ChoreManager</Typography>
    </>
  );
}
