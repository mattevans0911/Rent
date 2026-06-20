import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Tabs, 
  Tab 
} from '@mui/material';
import { VpnKey as MagicIcon, Login as LockIcon } from '@mui/icons-material';

export default function AuthCard({ onAuthSubmit }) {
  // 0 = Landlord, 1 = Tenant
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 0) {
      // Pass data up to parent view for Landlord Login
      onAuthSubmit({ type: 'landlord', email, password });
    } else {
      // Pass data up to parent view for Tenant Magic Link
      onAuthSubmit({ type: 'tenant', phone });
    }
  };

  return (
    <Card sx={{ maxWidth: 450, mx: 'auto', mt: 8, boxShadow: 3, borderRadius: 2 }}>
      {/* Tab Switcher */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth" 
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Landlord Portal" icon={<LockIcon />} iconPosition="start" />
        <Tab label="Tenant Portal" icon={<MagicIcon />} iconPosition="start" />
      </Tabs>

      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          {activeTab === 0 ? 'Welcome Back' : 'Sign In Instantly'}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          {activeTab === 0 
            ? 'Access your properties, ledger, and view active tasks.' 
            : 'Enter your phone number to receive your passwordless magic access link.'
          }
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {activeTab === 0 ? (
            /* LANDLORD FORM FIELDS */
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            /* TENANT PASSWORDLESS FIELD */
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mobile Phone Number"
              placeholder="(555) 555-5555"
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 1, py: 1.5, fontWeight: 'bold' }}
          >
            {activeTab === 0 ? 'Log In' : 'Send Magic Link'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}