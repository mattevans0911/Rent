import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  InputAdornment
} from '@mui/material';

/* =========================================================================
   COMPONENT 4: ADD PROPERTY MODAL
   ========================================================================= */
export function AddPropertyModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, address });
    setName('');
    setAddress('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Add New Property</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Property Name (e.g., Duplex Unit C)"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Full Physical Address"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained">Create Property</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

/* =========================================================================
   COMPONENT 5: TENANT INVITE MODAL
   ========================================================================= */
export function TenantInviteModal({ open, onClose, onSubmit }) {
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [rentAmount, setRentAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ tenantName, tenantPhone, rentAmount });
    setTenantName('');
    setTenantPhone('');
    setRentAmount('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Invite Tenant to Unit</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Tenant Full Name"
            fullWidth
            required
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Mobile Phone Number"
            placeholder="(555) 555-5555"
            fullWidth
            required
            value={tenantPhone}
            onChange={(e) => setTenantPhone(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Monthly Rent Rate"
            type="number"
            fullWidth
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" color="success">Send Invite Link</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}