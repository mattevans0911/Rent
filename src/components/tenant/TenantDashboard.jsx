import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Build as MaintenanceIcon,
  CheckCircle as SuccessIcon,
  ArrowForwardIos as ArrowIcon
} from '@mui/icons-material';

// Mock data reflecting what is passed via a unique tenant invite token link
const mockTenantData = {
  name: 'Alex Smith',
  address: '104 Maple St, Unit A, Austin, TX',
  balanceDue: 1200.00,
  dueDate: 'July 1, 2026',
  isOverdue: false,
  history: [
    { id: 1, date: 'June 01, 2026', amount: 1200.00, method: 'Venmo', status: 'Completed' },
    { id: 2, date: 'May 02, 2026', amount: 1200.00, method: 'Zelle', status: 'Completed' }
  ]
};

export default function TenantDashboard({ onPayRentClick, onSubmitMaintenanceClick }) {
  const data = mockTenantData;

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', px: 1 }}>
      
      {/* Property Badge Card Header */}
      <Box sx={{ mb: 3, mt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          Hello, {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.address}
        </Typography>
      </Box>

      {/* Dynamic Urgency Status Banner */}
      {data.balanceDue > 0 ? (
        <Alert 
          severity={data.isOverdue ? "error" : "warning"} 
          variant="filled"
          sx={{ mb: 3, borderRadius: 2, fontWeight: 'bold' }}
        >
          {data.isOverdue ? 'Rent is OVERDUE' : `Rent due by ${data.dueDate}`}
        </Alert>
      ) : (
        <Alert 
          icon={<SuccessIcon fontSize="inherit" />} 
          severity="success"
          variant="filled"
          sx={{ mb: 3, borderRadius: 2, fontWeight: 'bold' }}
        >
          All caught up! No balance due.
        </Alert>
      )}

      {/* Core Balance Presentation Frame */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3, overflow: 'hidden' }}>
        <CardContent sx={{ p: 4, textAlign: 'center', bgcolor: '#fafafa' }}>
          <WalletIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
          <Typography variant="body2" color="text.secondary" uppercase sx={{ letterSpacing: 1 }}>
            Current Balance Due
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1.5, color: '#212121' }}>
            ${data.balanceDue.toFixed(2)}
          </Typography>
          
          {data.balanceDue > 0 && (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={onPayRentClick}
              sx={{ py: 1.8, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 2, mt: 1 }}
            >
              Pay Rent Now
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Maintenance Quick Action Link Bar */}
      <Paper 
        elevation={1} 
        component={Button}
        fullWidth
        onClick={onSubmitMaintenanceClick}
        sx={{ 
          p: 2.5, 
          borderRadius: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          textTransform: 'none',
          color: 'inherit',
          mb: 4,
          border: '1px solid #e0e0e0'
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <MaintenanceIcon sx={{ color: '#757575' }} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Report an Issue</Typography>
            <Typography variant="body2" color="text.secondary">Request fixes or track ongoing jobs</Typography>
          </Box>
        </Stack>
        <ArrowIcon sx={{ fontSize: 16, color: '#bdbdbd' }} />
      </Paper>

      {/* Micro-Ledger Payment Receipts */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5, px: 0.5 }}>
        Payment History
      </Typography>
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #e0e0e0' }} elevation={0}>
        <List disablePadding>
          {data.history.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem sx={{ py: 2 }}>
                <ListItemText 
                  primary={`Rent Paid via ${item.method}`} 
                  secondary={item.date} 
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  -${item.amount.toFixed(2)}
                </Typography>
              </ListItem>
              {index < data.history.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

    </Box>
  );
}