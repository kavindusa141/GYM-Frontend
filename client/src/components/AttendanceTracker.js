// client/src/components/AttendanceTracker.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { markAttendance, getTodaysAttendance } from '../api/attendance';

const AttendanceTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [memberId, setMemberId] = useState('');
  const [attendance, setAttendance] = useState([]);

  const handleMarkAttendance = async () => {
    try {
      await markAttendance({
        member_id: parseInt(memberId),
        date: selectedDate.toISOString().split('T')[0],
        check_in: new Date().toTimeString().split(' ')[0]
      });
      setMemberId('');
      alert('Attendance marked successfully!');
    } catch (err) {
      alert('Error marking attendance: ' + err.message);
    }
  };

  const fetchTodaysAttendance = async () => {
    try {
      const data = await getTodaysAttendance(selectedDate.toISOString().split('T')[0]);
      setAttendance(data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Attendance Tracking</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Mark Attendance</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            label="Member ID"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={handleMarkAttendance}>
            Mark Check-in
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Today's Attendance</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Check-in Time</TableCell>
                <TableCell>Check-out Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.Member.id}</TableCell>
                  <TableCell>{record.Member.name}</TableCell>
                  <TableCell>{record.check_in}</TableCell>
                  <TableCell>{record.check_out || 'Not checked out'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AttendanceTracker;