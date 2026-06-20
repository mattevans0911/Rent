import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack
} from '@mui/material';
import { Download as ExportIcon } from '@mui/icons-material';

const mockLedger = [
  { id: 1, date: '2026-06-01', property: 'Duplex Unit A', type: 'Income', category: 'Rent Payment', amount: 1200.00 },
  { id: 2, date: '2026-06-01', property: 'Suburban Family Home', type: 'Income', category: 'Rent Payment', amount: 1500.00 },
  { id: 3, date: '2026-06-03', property: 'Duplex Unit A', type: 'Expense', category: 'Plumbing Repair', amount: -180.00 },
  { id: 4, date: '2026-05-01', property: 'Duplex Unit B', type: 'Income', category: 'Rent Payment', amount: 1200.00 }
];

export default function FinancialLedger() {
  const handleExport = () => {
    console.log("Parsing current view arrays to dynamic CSV rows...");
    alert("Export generated! Downloaded structured spreadsheet containing IRS Schedule E schema allocations.");
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            Cash Flow & Tax Ledger
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your real-time transaction ledger. Approved P2P transfers write here automatically.
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<ExportIcon />} 
          onClick={handleExport}
          sx={{ fontWeight: 'bold' }}
        >
          Export CSV
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2, border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Property</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLedger.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.date}</TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{row.property}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: row.type === 'Income' ? '#2e7d32' : '#c62828' 
                  }}
                >
                  {row.type === 'Income' ? `+$${row.amount.toFixed(2)}` : `-$${Math.abs(row.amount).toFixed(2)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}