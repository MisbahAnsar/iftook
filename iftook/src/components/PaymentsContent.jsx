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
  Tabs,
  Tab
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PaymentsContent = () => {
  const [paymentsData, setPaymentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
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
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTable = (title, color, data) => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mt: 3, color, fontWeight: 'bold' }}>{title}</Typography>
      {data.length > 0 ? (
        <TableContainer component={Paper} sx={{ mb: 2, overflowX: 'auto', borderRadius: 2, boxShadow: 3 }}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[300] }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Sender</TableCell>
                {title === 'Wallet Transactions' && <TableCell sx={{ fontWeight: 'bold' }}>Receiver</TableCell>}
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id} sx={{ '&:nth-of-type(even)': { bgcolor: theme.palette.grey[100] }, '&:hover': { bgcolor: theme.palette.grey[200] } }}>
                  <TableCell>{item.sender?.name || 'N/A'}</TableCell>
                  {title === 'Wallet Transactions' && <TableCell>{item.receiver?.name || 'N/A'}</TableCell>}
                  <TableCell sx={{ fontWeight: 'bold', color: 'green' }}>₹{item.amount}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'inline-block', px: 2, py: 1, borderRadius: 2, bgcolor: item.paymentStatus === 'Completed' ? 'green' : 'orange', color: 'white' }}>
                      {item.paymentStatus}
                    </Box>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{new Date(item.paymentDate).toLocaleDateString()}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}> No {title.toLowerCase()}. </Typography>
      )}
    </>
  );

  return (
    <Container sx={{ mt: 3, p: isMobile ? 1 : 3 }}>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Payments Received" />
        <Tab label="Payments Withdrawn" />
        <Tab label="Wallet Transactions" />
      </Tabs>

      {tabValue === 0 && renderTable('Payments Received', '#000000', paymentsData.paymentsReceived)}
      {tabValue === 1 && renderTable('Payments Withdrawn', '#000000', paymentsData.paymentsWithdrawn)}
      {tabValue === 2 && renderTable('Wallet Transactions', '#000000', paymentsData.walletTransactions)}
    </Container>
  );
};

export default PaymentsContent;
