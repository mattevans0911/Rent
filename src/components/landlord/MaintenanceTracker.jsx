import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import { 
  Build as FixIcon, 
  CheckCircle as DoneIcon, 
  PriorityHigh as UrgentIcon 
} from '@mui/icons-material';

const mockTickets = [
  { id: 1, property: 'Duplex Unit A', title: 'Water leak under kitchen sink', status: 'open', priority: 'high', date: 'June 18, 2026' },
  { id: 2, property: 'Suburban Family Home', address: '202 Oak Ave', title: 'HVAC unit short cycling', status: 'in_progress', priority: 'medium', date: 'June 19, 2026' },
  { id: 3, property: 'Duplex Unit A', title: 'Broken bedroom blinds', status: 'resolved', priority: 'low', date: 'May 14, 2026' }
];

export default function MaintenanceTracker() {
  const [tabIndex, setTabIndex] = useState(0);

  const filteredTickets = mockTickets.filter(ticket => {
    if (tabIndex === 0) return ticket.status === 'open' || ticket.status === 'in_progress';
    return ticket.status === 'resolved';
  });

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          Maintenance Work Requests
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review issues sent by tenants, upload receipts, and update repair status logs.
        </Typography>
      </Box>

      <Tabs 
        value={tabIndex} 
        onChange={(e, v) => setTabIndex(v)} 
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Active Requests" />
        <Tab label="Resolved Archive" />
      </Tabs>

      <Grid container spacing={2}>
        {filteredTickets.map(ticket => (
          <Grid item xs={12} key={ticket.id}>
            <Card sx={{ borderLeft: `5px solid ${ticket.priority === 'high' ? '#f44336' : '#ff9800'}`, boxShadow: 1 }}>
              <CardContent sx={{ p: 3, '&:last-child': { pb: 2 } }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {ticket.property}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={ticket.priority.toUpperCase()} 
                        color={ticket.priority === 'high' ? 'error' : 'warning'}
                        variant="outlined"
                        icon={ticket.priority === 'high' ? <UrgentIcon /> : undefined}
                      />
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {ticket.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submitted: {ticket.date}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    {ticket.status !== 'resolved' ? (
                      <>
                        <Button size="small" variant="outlined" color="primary">Update Status</Button>
                        <Button size="small" variant="contained" color="success" startIcon={<DoneIcon />}>Resolve</Button>
                      </>
                    ) : (
                      <Chip label="Completed" color="success" icon={<DoneIcon />} />
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}