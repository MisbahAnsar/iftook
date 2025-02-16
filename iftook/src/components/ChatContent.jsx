import React, { useEffect, useState } from 'react';
import { fetchChatRoomData } from '../utils/api';
import { Container, Typography, Grid, Paper, CircularProgress, Alert, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ChatContent = () => {
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const getChatRoomData = async () => {
      try {
        const data = await fetchChatRoomData();
        setChatData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getChatRoomData();
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

  const stats = [
    { label: 'Total Chat Rooms', value: chatData.totalChatRooms, color: theme.palette.primary.main },
    { label: 'Paid Chat Rooms', value: chatData.totalPaidChatRooms, color: '#4caf50' },
    { label: 'Unpaid Chat Rooms', value: chatData.totalUnpaidChatRooms, color: '#f44336' },
    { label: 'Total Calls', value: chatData.totalCalls, color: '#ff9800' },
    { label: 'Voice Calls', value: chatData.totalVoiceCalls, color: '#9c27b0' },
    { label: 'Video Calls', value: chatData.totalVide0Calls, color: '#e91e63' },
  ];

  return (
    <Container sx={{ mt: 4, p: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: theme.palette.background.paper,
                transition: '0.3s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h6" color={theme.palette.text.secondary}>
                {stat.label}
              </Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ color: stat.color }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ChatContent;
