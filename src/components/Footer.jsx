import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" bgcolor="primary.main" color="white" py={4}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          NourishMe
        </Typography>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} MyHealth. All rights reserved.
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Link href="#" color="inherit" style={{ margin: '0 10px' }}>
            Terms of Service
          </Link>
          <Link href="#" color="inherit" style={{ margin: '0 10px' }}>
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
