import React, { useState } from 'react';
import MainLayout from './components/layouts/MainLayout';
import AuthCard from './components/common/AuthCard';
import PropertyDashboard from './components/landlord/PropertyDashboard';
import PaymentSettings from './components/landlord/PaymentSettings';
import MaintenanceTracker from './components/landlord/MaintenanceTracker';
import FinancialLedger from './components/landlord/FinancialLedger';

// Clean Explicit Imports for the Tenant Module
import TenantDashboard from './components/tenant/TenantDashboard.jsx';
import { PaymentRouterModal, P2PProofUploaderModal } from './components/tenant/TenantPaymentModals.jsx';

import { AddPropertyModal, TenantInviteModal } from './components/landlord/LandlordModals';
import { Box, Alert, Snackbar } from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('landlord'); // 'landlord' or 'tenant'
  const [currentNavIndex, setCurrentNavIndex] = useState(0);

  // Administrative Landlord Overlay states
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Core Tenant Interactivity overlay states
  const [isPayRouterOpen, setIsPayRouterOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('venmo');
  const [toastOpen, setToastOpen] = useState(false);

  // Pre-configured landlord endpoint configuration settings profiles
  const [landlordProfile] = useState({
    venmoUser: 'AustinRentals',
    zelleHandle: 'payments@austinrentals.com',
    allowCards: true
  });

  const handleAuth = (authData) => {
    setUserRole(authData.type);
    setIsAuthenticated(true);
  };

  const handleMethodSelection = (method) => {
    setIsPayRouterOpen(false);
    if (method === 'card') {
      alert("Redirecting to external Stripe Checkout engine payment window...");
    } else {
      setSelectedMethod(method);
      setIsUploaderOpen(true);
    }
  };

  const handleProofSubmission = (payload) => {
    console.log("UPLOAD SUCCESS. ATTACHING RECEIPT METADATA OBJECT TO DB LEDGER:", payload);
    setToastOpen(true);
  };

  const renderActiveView = () => {
    // 1. EVALUATE TENANT RUNTIME RENDERS
    if (userRole === 'tenant') {
      return (
        <TenantDashboard 
          onPayRentClick={() => setIsPayRouterOpen(true)}
          onSubmitMaintenanceClick={() => alert("Opening maintenance request portal...")}
        />
      );
    }

    // 2. EVALUATE LANDLORD RUNTIME RENDERS
    switch (currentNavIndex) {
      case 0:
        return <PropertyDashboard onAddPropertyClick={() => setIsPropertyModalOpen(true)} onInviteTenantClick={() => setIsInviteModalOpen(true)} />;
      case 1:
        return <FinancialLedger />;
      case 2:
        return <MaintenanceTracker />;
      case 3:
        return <PaymentSettings initialSettings={landlordProfile} onSaveSettings={(d) => console.log(d)} />;
      default:
        return <PropertyDashboard />;
    }
  };

  return (
    <Box onClick={(e) => {
      const text = e.target.textContent;
      if (text === 'Dashboard') setCurrentNavIndex(0);
      if (text === 'Ledger') setCurrentNavIndex(1);
      if (text === 'Maintenance') setCurrentNavIndex(2);
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

        {/* Global Administrative Landlord overlays */}
        <AddPropertyModal open={isPropertyModalOpen} onClose={() => setIsPropertyModalOpen(false)} onSubmit={(d) => console.log(d)} />
        <TenantInviteModal open={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} onSubmit={(d) => console.log(d)} />

        {/* Global Operational Tenant overlays */}
        <PaymentRouterModal 
          open={isPayRouterOpen} 
          onClose={() => setIsPayRouterOpen(false)} 
          onSelectMethod={handleMethodSelection}
          landlordSettings={landlordProfile}
        />
        <P2PProofUploaderModal
          open={isUploaderOpen}
          method={selectedMethod}
          onClose={() => setIsUploaderOpen(false)}
          landlordSettings={landlordProfile}
          rentAmount={1200}
          onSubmitProof={handleProofSubmission}
        />

        {/* Successful verification confirmation notification tracker */}
        <Snackbar open={toastOpen} autoHideDuration={4000} onClose={() => setToastOpen(false)}>
          <Alert severity="success" variant="filled" sx={{ width: '100%', fontWeight: 'bold' }}>
            Payment Logged! Pending review confirmation by landlord.
          </Alert>
        </Snackbar>
      </MainLayout>
    </Box>
  );
}

export default App;