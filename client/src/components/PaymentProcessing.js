// client/src/components/PaymentProcessing.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  Grid
} from '@mui/material';
import { processPayment } from '../api/payments';

const PaymentProcessing = () => {
  const [paymentData, setPaymentData] = useState({
    member_id: '',
    amount: '',
    payment_method: 'cash',
    notes: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await processPayment({
        ...paymentData,
        amount: parseFloat(paymentData.amount)
      });
      setMessage('Payment processed successfully!');
      setPaymentData({ member_id: '', amount: '', payment_method: 'cash', notes: '' });
    } catch (err) {
      setMessage('Error processing payment: ' + err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Payment Processing</Typography>
      
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>Process New Payment</Typography>
        
        {message && (
          <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Member ID"
                value={paymentData.member_id}
                onChange={(e) => setPaymentData({ ...paymentData, member_id: e.target.value })}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Payment Method"
                value={paymentData.payment_method}
                onChange={(e) => setPaymentData({ ...paymentData, payment_method: e.target.value })}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={paymentData.notes}
                onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Process Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default PaymentProcessing;