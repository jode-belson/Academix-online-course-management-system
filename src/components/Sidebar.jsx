
import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';

const userNavItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Subscribed Courses', icon: <SchoolIcon />, path: '/dashboard/courses' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/dashboard/reports' },
];

const adminNavItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Add Course', icon: <AddCircleOutlineIcon />, path: '/admin/add' },
  { text: 'Manage Courses', icon: <EditIcon />, path: '/admin/manage' },
  { text: 'Subscribers', icon: <PeopleIcon />, path: '/admin/subscribers' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/admin/reports' },
];

const Sidebar = ({ userRole, drawerWidth }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const navItems = userRole === 'admin' ? adminNavItems : userNavItems;
  
  const handleLogout = () => {
    if(window.confirm('Are you sure you want to log out?')) {
        logout();
        navigate('/');
    }
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={NavLink} to={item.path} 
                style={({ isActive }) => ({ backgroundColor: isActive ? '#edf2ff' : 'transparent' })}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;