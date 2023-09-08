import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" style={{ backgroundColor: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%" maxWidth={1280} margin="15px auto" padding="0 35px">
            {/* Logo */}
            <Typography variant="h4" color="primary" style={{ fontWeight: 'bold' }}>
              NourishMe
            </Typography>

            {/* Navigation links */}
            <Box display="flex" gap={6}>
              {[{ text: 'Home', path: '/' }, { text: 'KnowledgeBase', path: '/knowledgeBase' }, { text: 'Dietary Analysis', path: '/dietaryAnalysis' }].map(link => (
                <Button
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  style={{
                    color: 'black',
                    textTransform: 'none',
                    fontSize: '1.1rem'
                  }}
                  onMouseEnter={e => (e.target.style.color = theme.palette.primary.main)}
                  onMouseLeave={e => (e.target.style.color = 'black')}
                  disableRipple={true}
                >
                  {link.text}
                </Button>
              ))}

              {/* Services */}
              <Button
                style={{
                  color: 'black',
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
                onMouseEnter={e => (e.target.style.color = theme.palette.primary.main)}
                onMouseLeave={e => (e.target.style.color = 'black')}
                disableRipple={true}
                onClick={handleClick}
              >
                Services
              </Button>

              {/* dropdown */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {[{ text: 'Food Warehouse', path: '/services/food-warehouse' },
                { text: 'Dietary Records', path: '/' },
                { text: 'Recipe Recommendations', path: '/' }].map(service => (
                  <MenuItem
                    key={service.text}
                    component={RouterLink}
                    to={service.path}
                    onClick={handleClose}
                    style={{
                      color: 'black',
                      textTransform: 'none',
                      fontSize: '1.1rem'
                    }}
                    onMouseEnter={e => (e.target.style.color = theme.palette.primary.main)}
                    onMouseLeave={e => (e.target.style.color = 'black')}
                  >
                    {service.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Login/Register */}
            <Box display="flex" gap={4}>
              <Button
                component={RouterLink}
                to="/sign-in"
                style={{
                  color: 'black',
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
                onMouseEnter={e => (e.target.style.color = theme.palette.primary.main)}
                onMouseLeave={e => (e.target.style.color = 'black')}
                disableRipple={true}
              >
                Sign in
              </Button>
              <Button
                component={RouterLink}
                to="/sign-up"
                variant="contained"
                style={{
                  backgroundColor: 'primary',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      );
}

      export default Header;
