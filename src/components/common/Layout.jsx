import React from 'react';
import {
  Container,
  Box,
  Paper,
  useTheme,
} from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%, 
          ${theme.palette.grey[50]} 50%, 
          ${theme.palette.background.default} 100%)`,
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            minHeight: '70vh',
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            },
          }}
        >
          <Box sx={{ p: 4 }}>
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Layout;