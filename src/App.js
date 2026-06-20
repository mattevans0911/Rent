import React, { useState } from 'react';
import MainLayout from './components/layouts/MainLayout';
import AuthCard from './components/common/AuthCard';
import PropertyDashboard from './components/landlord/PropertyDashboard';
import PaymentSettings from './components/landlord/PaymentSettings';
import { AddPropertyModal, TenantInviteModal } from './components/landlord/LandlordModals';
import { Box } from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('landlord');
  
  // Track which view state is active (0 = Dashboard, 3 = Settings based on layout indexing)
  const [currentNavIndex, setCurrentNavIndex] = useState(0);

  // Modal Open/Closed States
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Mock profile state to pass into settings
  const [savedSettings, setSavedSettings] = useState({
    venmoUser: 'AustinRentals',
    zelleHandle: 'payments@austinrentals.com',
    allowCards: false
  });

  const handleAuth = (authData) => {
    setUserRole(authData.type);
    setIsAuthenticated(true);
  };

  const handleSaveSettingsSubmit = (newSettings) => {
    console.log("UPDATING ROUTING PROFILE IN POSTGRES:", newSettings);
    setSavedSettings(newSettings);
  };

  /* Override the default container routing rules based on active sidebar tab clicks */
  const renderActiveView = () => {
    if (currentNavIndex === 3) {
      return (
        <PaymentSettings 
          initialSettings={savedSettings} 
          onSaveSettings={handleSaveSettingsSubmit} 
        />
      );
    }
    // Default fallback to central dashboard grid
    return (
      <PropertyDashboard 
        onAddPropertyClick={() => setIsPropertyModalOpen(true)}
        onInviteTenantClick={() => setIsInviteModalOpen(true)}
      />
    );
  };

  return (
    /* Add a small trick to capture the active tab click straight out of MainLayout */
    <Box onClick={(e) => {
      // Small DOM interceptor to update view states for MVP demo wireframes
      const text = e.target.textContent;
      if (text === 'Dashboard') setCurrentNavIndex(0);
      if (text === 'Settings') setCurrentNavIndex(3);
    }}>
      <MainLayout userRole={userRole}>
        {!isAuthenticated ? (
          <Box sx={{ py: 4 }}>
            <AuthCard onAuthSubmit={handleAuth} />
          </Box>
        ) : (
          renderActiveView()
        )}

        <AddPropertyModal 
          open={isPropertyModalOpen} 
          onClose={() => setIsPropertyModalOpen(false)} 
          onSubmit={(data) => console.log('Saved Property:', data)}
        />

        <TenantInviteModal 
          open={isInviteModalOpen} 
          onClose={() => setIsInviteModalOpen(false)} 
          onSubmit={(data) => console.log('Sent Invite Link:', data)}
        />
      </MainLayout>
    </Box>
  );
}

export default App;