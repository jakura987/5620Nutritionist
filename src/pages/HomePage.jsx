import React from 'react';
import { Container, Button, Typography } from '@mui/material';

function HomePage() {
  return (
    <Container>
      
      <Typography variant="h4" align="center" marginBottom={3}>
        About us
      </Typography>

      <Typography variant="body1" paragraph>
      We are a company that focuses on health management, dedicated to providing personalized health advice for every user. Our team consists of professional nutritionists and health managers, all of whom possess extensive experience and expertise. We believe that everyone deserves a healthy lifestyle, and our goal is to help you achieve this aspiration. Our services go beyond offering health advice; they are about providing you with a holistic healthy way of life.
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" size="large" >
          Start Explore
        </Button>
      </div>
    </Container>
  );
}

export default HomePage;
