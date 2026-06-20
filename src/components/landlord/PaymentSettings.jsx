import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  InputAdornment
} from '@mui/material';
import { 
  QrCodeScanner as VenmoIcon, 
  AccountBalance as ZelleIcon, 
  CreditCard as CardIcon,
  Save as SaveIcon 
} from '@mui/icons-material';

export default function PaymentSettings({ initialSettings = {}, onSaveSettings }) {
  const [venmoUser, setVenmoUser] = useState(initialSettings.venmoUser || '');
  const [zelleHandle, setZelleHandle] = useState(initialSettings.zelleHandle || '');
  const [allowCards, setAllowCards] = useState(initialSettings.allowCards || false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({
      venmoUser,
      zelleHandle,
      allowCards
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000); // Clear alert after 4 seconds
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          Payment Method Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure how your tenants pay rent. Your handles will be securely shared inside the tenant payment router.
        </Typography>
      </Box>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3, fontWeight: 'bold' }}>
          Payment configurations updated and locked successfully!
        </Alert>
      )}

      <Card component="form" onSubmit={handleSave} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 4 }}>
          
          {/* ZELLE ROUTING SECTION */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <ZelleIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Zelle Settings</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Tenants will be prompted to send manual bank transfers to this destination handle.
          </Typography>
          <TextField
            fullWidth
            label="Zelle Email or Phone Number"
            placeholder="billing@myrentals.com or (555) 555-5555"
            value={zelleHandle}
            onChange={(e) => setZelleHandle(e.target.value)}
            sx={{ mb: 4 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* VENMO ROUTING SECTION */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <VenmoIcon sx={{ color: '#008CFF' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Venmo Settings</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enables mobile deep-linking. Your tenant's device will launch their native Venmo app auto-targeted to your handle.
          </Typography>
          <TextField
            fullWidth
            label="Venmo Username"
            placeholder="e.g., @Landlord-Joe"
            value={venmoUser}
            onChange={(e) => setVenmoUser(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>,
            }}
            sx={{ mb: 4 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* STRIPE CREDIT CARD PASS-THROUGH OPTION */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <CardIcon color="action" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Credit/Debit Card Payments</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Accept direct processing via standard Stripe Checkout. 
            <strong> Note:</strong> A 2.9% convenience fee will automatically pass through to the tenant's transaction bill.
          </Typography>
          
          <FormControlLabel
            control={
              <Switch 
                checked={allowCards} 
                onChange={(e) => setAllowCards(e.target.checked)} 
                color="primary"
              />
            }
            label={allowCards ? "Credit Card payments ENABLED" : "Credit Card payments DISABLED"}
            sx={{ mb: 2, '& .MuiFormControlLabel-label': { fontWeight: 'medium', fontSize: '0.95rem' } }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            sx={{ mt: 3, display: 'flex', ml: 'auto', px: 4, fontWeight: 'bold' }}
          >
            Save Account Handles
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
}