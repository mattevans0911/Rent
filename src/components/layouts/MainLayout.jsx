import React, { useState } from 'react';
import { 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const drawerWidth = 240;

export default function MainLayout({ children, userRole = 'landlord' }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [navValue, setNavValue] = useState(0);

  // Navigation Items Mapping
  const navItems = [
    { label: 'Dashboard', icon: <HomeIcon /> },
    { label: userRole === 'landlord' ? 'Ledger' : 'Payments', icon: <ReceiptLongIcon /> },
    { label: 'Maintenance', icon: <ConstructionIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />

      {/* Top App Bar - Fixed for Mobile, offsets layout on Desktop */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#1976d2' 
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            PropSaaS Pro
          </Typography>
        </Toolbar>
      </AppBar>

      {/* DESKTOP NAVIGATION: Sidebar Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar /> {/* Spaces sidebar content down past the fixed AppBar */}
          <Box sx={{ overflow: 'auto', mt: 2 }}>
            <List>
              {navItems.map((item, index) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton 
                    selected={navValue === index}
                    onClick={() => setNavValue(index)}
                  >
                    <ListItemIcon sx={{ color: navValue === index ? '#1976d2' : 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}

      {/* Main App Content View Wrapper */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          mb: isMobile ? '56px' : 0 // Prevents bottom nav overlap on mobile viewports
        }}
      >
        <Toolbar /> {/* Spaces screen content down past the fixed AppBar */}
        {children}
      </Box>

      {/* MOBILE NAVIGATION: Bottom Navigation Bar */}
      {isMobile && (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={navValue}
            onChange={(event, newValue) => setNavValue(newValue)}
          >
            {navItems.map((item) => (
              <BottomNavigationAction 
                key={item.label} 
                label={item.label} 
                icon={item.icon} 
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
}