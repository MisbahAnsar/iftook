import React, { useEffect, useState } from 'react';
import { fetchChatRoomData } from '../utils/api'; // Import the API service
import { Container, Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material';

const ChatContent = () => {
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChatRoomData = async () => {
      try {
        const data = await fetchChatRoomData();
        setChatData(data.data); // Set the data to state
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getChatRoomData();
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
      <Container style={{ marginTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Chat Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Total Chat Rooms */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Total Chat Rooms
            </Typography>
            <Typography variant="h4" style={{ color: '#3f51b5' }}>
              {chatData.totalChatRooms}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Paid Chat Rooms */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Paid Chat Rooms
            </Typography>
            <Typography variant="h4" style={{ color: '#4caf50' }}>
              {chatData.totalPaidChatRooms}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Unpaid Chat Rooms */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Unpaid Chat Rooms
            </Typography>
            <Typography variant="h4" style={{ color: '#f44336' }}>
              {chatData.totalUnpaidChatRooms}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Calls */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Total Calls
            </Typography>
            <Typography variant="h4" style={{ color: '#ff9800' }}>
              {chatData.totalCalls}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Voice Calls */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Voice Calls
            </Typography>
            <Typography variant="h4" style={{ color: '#9c27b0' }}>
              {chatData.totalVoiceCalls}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Video Calls */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Video Calls
            </Typography>
            <Typography variant="h4" style={{ color: '#e91e63' }}>
              {chatData.totalVide0Calls}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatContent;