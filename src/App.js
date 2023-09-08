import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import theme from './theme';
import DietaryAnalysisPage from './pages/DietaryAnalysisPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: '100px', marginBottom: '10px'}}> {/* 添加间距 */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dietaryAnalysis" element={<DietaryAnalysisPage />} />
            <Route path="/knowledgeBase" element={<KnowledgeBasePage />}/>
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
