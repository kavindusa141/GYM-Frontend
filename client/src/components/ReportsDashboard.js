// client/src/components/ReportsDashboard.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { generateFinancialReport, generateMembershipReport } from '../api/reports';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [financialData, setFinancialData] = useState(null);
  const [membershipData, setMembershipData] = useState(null);

  const fetchReports = async () => {
    try {
      const [financial, membership] = await Promise.all([
        generateFinancialReport(dateRange),
        generateMembershipReport()
      ]);
      setFinancialData(financial);
      setMembershipData(membership);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const paymentMethodData = financialData?.paymentsByMethod ? 
    Object.entries(financialData.paymentsByMethod).map(([method, count]) => ({
      name: method.toUpperCase(),
      value: count
    })) : [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reports Dashboard</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Date Range</Typography>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <TextField
            type="date"
            label="Start Date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
          <TextField
            type="date"
            label="End Date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
          <Button variant="contained" onClick={fetchReports}>
            Generate Reports
          </Button>
        </Box>
      </Paper>

      {financialData && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Financial Summary</Typography>
                <Typography>Total Revenue: ${financialData.totalRevenue.toFixed(2)}</Typography>
                <Typography>Total Payments: {financialData.paymentCount}</Typography>
                <Typography>Average Payment: ${financialData.averagePayment.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Payment Methods</Typography>
                <PieChart width={300} height={200}>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {membershipData && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Membership Statistics</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Members</Typography>
                  <Typography variant="h4">{membershipData.totalMembers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Expiring Soon</Typography>
                  <Typography variant="h4">{membershipData.upcomingExpiries}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default ReportsDashboard;