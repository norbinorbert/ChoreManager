import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hu', label: 'Magyar' },
    { code: 'ro', label: 'Română' },
  ];

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    handleCloseMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} aria-controls="language-menu" aria-haspopup="true" color="inherit">
        <LanguageIcon style={{ color: 'darkgray' }} />
      </IconButton>
      <Menu id="language-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
            selected={i18n.language === lang.code}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
