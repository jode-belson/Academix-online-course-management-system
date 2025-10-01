
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

const MainLayout = () => {
  const { user } = useAuth();
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar userRole={user?.role} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar /> {/* This is to offset the content below the app bar if you had one */}
        <Outlet /> {/* This is where the nested page content will be rendered */}
      </Box>
    </Box>
  );
};

export default MainLayout;