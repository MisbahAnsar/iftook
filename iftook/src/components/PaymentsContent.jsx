import React, { useEffect, useState } from 'react';
import { fetchPaymentsData } from '../utils/api';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PaymentsContent = () => {
  const [paymentsData, setPaymentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getPaymentsData = async () => {
      const result = await fetchPaymentsData();
      console.log('API Response:', result);
      if (result.success) {
        setPaymentsData(result.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };
    getPaymentsData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#eef2ff] to-[#f8f9fc] p-6 rounded-2xl shadow-md space-y-6">
          {/* Skeleton for Header */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
  
          {/* Skeleton for Block Reason Input */}
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
  
          {/* Skeleton for Buttons */}
          <div className="flex gap-2 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-24"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const renderTable = (title, color, data) => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mt: 3, color }}> {title} </Typography>
      {data.length > 0 ? (
        <TableContainer component={Paper} sx={{ mb: 2, overflowX: isMobile ? 'auto' : 'visible' }}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.grey[200] }}>
                <TableCell><strong>Sender</strong></TableCell>
                {title === 'Wallet Transactions' && <TableCell><strong>Receiver</strong></TableCell>}
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Notes</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id} sx={{ '&:nth-of-type(even)': { bgcolor: theme.palette.grey[100] } }}>
                  <TableCell>{item.sender?.name || 'N/A'}</TableCell>
                  {title === 'Wallet Transactions' && <TableCell>{item.receiver?.name || 'N/A'}</TableCell>}
                  <TableCell>${item.amount}</TableCell>
                  <TableCell>{item.paymentStatus}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{new Date(item.paymentDate).toLocaleDateString()}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 1 }}> No {title.toLowerCase()}. </Typography>
      )}
    </>
  );

  return (
    <Container sx={{ mt: 3, p: isMobile ? 1 : 3 }}>
      {renderTable('Payments Received', '#4caf50', paymentsData.paymentsReceived)}
      {renderTable('Payments Withdrawn', '#f44336', paymentsData.paymentsWithdrawn)}
      {renderTable('Wallet Transactions', '#ff9800', paymentsData.walletTransactions)}
    </Container>
  );
};

export default PaymentsContent;
