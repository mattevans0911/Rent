import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Stack, 
  Paper,
  Divider
} from '@mui/material';
import { 
  Apartment as PropertyIcon, 
  AttachMoney as MoneyIcon, 
  HourglassEmpty as PendingIcon, 
  Build as MaintenanceIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Mock data representing what will eventually pull from your Supabase PostgreSQL database
const mockSummary = {
  collected: 4200.00,
  pending: 1200.00,
  maintenanceCount: 2
};

const mockProperties = [
  { id: '1', name: 'Duplex Unit A', address: '104 Maple St, Austin, TX', tenant: 'Alex Smith', status: 'Paid' },
  { id: '2', name: 'Duplex Unit B', address: '104 Maple St, Austin, TX', tenant: 'Vacant', status: 'Vacant' },
  { id: '3', name: 'Suburban Family Home', address: '202 Oak Ave, Austin, TX', tenant: 'Sarah Jenkins', status: 'Pending' },
];

export default function PropertyDashboard({ onAddPropertyClick, onInviteTenantClick }) {
  return (
    <Box>
      {/* Top Banner Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            Property Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your real estate portfolio, check rent status, and track maintenance.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={onAddPropertyClick}
          sx={{ fontWeight: 'bold', py: 1.2, px: 3 }}
        >
          Add Property
        </Button>
      </Stack>

      {/* Financial Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, borderLeft: '6px solid #4caf50', borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2" color="text.secondary" uppercase>Rent Collected</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>${mockSummary.collected.toFixed(2)}</Typography>
              </Box>
              <MoneyIcon sx={{ fontSize: 40, color: '#4caf50' }} />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, borderLeft: '6px solid #ff9800', borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Pending Balances</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>${mockSummary.pending.toFixed(2)}</Typography>
              </Box>
              <PendingIcon sx={{ fontSize: 40, color: '#ff9800' }} />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, borderLeft: '6px solid #f44336', borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Active Maintenance</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>{mockSummary.maintenanceCount} Issues</Typography>
              </Box>
              <MaintenanceIcon sx={{ fontSize: 40, color: '#f44336' }} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
        Your Properties ({mockProperties.length})
      </Typography>

      {/* Grid List of Properties */}
      <Grid container spacing={3}>
        {mockProperties.map((property) => (
          <Grid item xs={12} md={4} key={property.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <PropertyIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {property.name}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {property.address}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">
                    Tenant: <strong>{property.tenant}</strong>
                  </Typography>
                  <Box 
                    sx={{ 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: 1, 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      bgcolor: property.status === 'Paid' ? '#e8f5e9' : property.status === 'Pending' ? '#fff3e0' : '#eceff1',
                      color: property.status === 'Paid' ? '#2e7d32' : property.status === 'Pending' ? '#ef6c00' : '#455a64'
                    }}
                  >
                    {property.status}
                  </Box>
                </Stack>
              </CardContent>
              <CardActions sx={{ bgcolor: '#fafafa', p: 1.5, justifyContent: 'flex-end' }}>
                {property.tenant === 'Vacant' ? (
                  <Button size="small" variant="outlined" onClick={onInviteTenantClick}>
                    Invite Tenant
                  </Button>
                ) : (
                  <Button size="small" variant="text" color="primary">
                    Manage Unit
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}