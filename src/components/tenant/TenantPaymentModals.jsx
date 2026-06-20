import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Box,
  Divider
} from '@mui/material';
import {
  QrCodeScanner as VenmoIcon,
  AccountBalance as ZelleIcon,
  CreditCard as CardIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';

/* =========================================================================
   SUB-COMPONENT A: SELECT PAYMENT ROUTER
   ========================================================================= */
export function PaymentRouterModal({ open, onClose, onSelectMethod, landlordSettings = {} }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 'bold', pt: 3, pb: 1 }}>
        Select Payment Method
      </DialogTitle>
      <DialogContent sx={{ pb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select your preferred payment routing method below. P2P transfers avoid extra merchant charges.
        </Typography>
        
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton 
              onClick={() => onSelectMethod('venmo')}
              sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, '&:hover': { bgcolor: '#f4f9ff' } }}
            >
              <ListItemIcon><VenmoIcon sx={{ color: '#008CFF', fontSize: 28 }} /></ListItemIcon>
              <ListItemText primary="Pay via Venmo" secondary="Auto-opens native Venmo app" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton 
              onClick={() => onSelectMethod('zelle')}
              sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, '&:hover': { bgcolor: '#fbf7ff' } }}
            >
              <ListItemIcon><ZelleIcon sx={{ color: '#7414CA', fontSize: 28 }} /></ListItemIcon>
              <ListItemText primary="Pay via Zelle" secondary="Direct peer bank handle route" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>

          {landlordSettings.allowCards && (
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => onSelectMethod('card')}
                sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}
              >
                <ListItemIcon><CardIcon color="action" sx={{ fontSize: 28 }} /></ListItemIcon>
                <ListItemText primary="Credit / Debit Card" secondary="+2.9% convenience fee applied" primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================================
   SUB-COMPONENT B: DEEP LINK LAUNCHER & RECEIPT SNAPPER
   ========================================================================= */
export function P2PProofUploaderModal({ open, method, onClose, landlordSettings = {}, rentAmount = 1200, onSubmitProof }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleTriggerDeepLink = () => {
    if (method === 'venmo') {
      const venmoUrl = `venmo://paycharge?txn=pay&recipients=${landlordSettings.venmoUser}&amount=${rentAmount}&note=Rent%20Payment`;
      window.location.href = venmoUrl;
    } else {
      alert(`Copying Zelle handle target data: ${landlordSettings.zelleHandle}. Transfer $${rentAmount} using your banking app.`);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileName) return alert("Please snap or attach a verification screenshot first.");
    onSubmitProof({ method, fileName, amount: rentAmount });
    setFileName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        Confirm {method === 'venmo' ? 'Venmo' : 'Zelle'} Transfer
      </DialogTitle>
      <Box component="form" onSubmit={handleUploadSubmit}>
        <DialogContent dividers sx={{ py: 3 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            {method === 'venmo' 
              ? `Step 1: Click below to launch Venmo and transfer $${rentAmount} directly to @${landlordSettings.venmoUser}.`
              : `Step 1: Open your banking application and transfer $${rentAmount} via Zelle to: ${landlordSettings.zelleHandle}`
            }
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleTriggerDeepLink}
            sx={{ 
              mb: 3, py: 1.5, fontWeight: 'bold',
              bgcolor: method === 'venmo' ? '#008CFF' : '#7414CA',
              '&:hover': { bgcolor: method === 'venmo' ? '#0070cc' : '#5c10a1' }
            }}
          >
            {method === 'venmo' ? 'Launch Venmo App Now' : 'Copy Zelle Destination Info'}
          </Button>

          <Divider sx={{ my: 2 }}><Typography variant="caption" color="text.secondary">STEP 2</Typography></Divider>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Take a screenshot of your payment confirmation screen and upload it below to verify your transaction.
          </Typography>

          {/* Interactive photo bay configured to pop open smartphone environment lenses */}
          <Box sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 3, textAlign: 'center', bgcolor: '#fafafa', position: 'relative' }}>
            <input
              type="file"
              accept="image/*"
              capture="environment" 
              onChange={handleFileChange}
              style={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', cursor: 'pointer' }}
            />
            <UploadIcon sx={{ fontSize: 32, color: '#9e9e9e', mb: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
              {fileName ? fileName : 'Tap to Snap Receipt Photo'}
            </Typography>
            <Typography variant="caption" color="text.secondary">Supports camera uploads & image attachments</Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" color="success" disabled={!fileName}>
            Submit Payment Proof
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}