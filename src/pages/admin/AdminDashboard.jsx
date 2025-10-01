// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Paper, Grid, Link as MuiLink, CircularProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import SchoolIcon from '@mui/icons-material/School';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import api from '../../api/api';

// const AdminDashboard = () => {
//     const { user } = useAuth();
//     const [stats, setStats] = useState({ courseCount: 0, subscriberCount: 0 });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const [coursesRes, statsRes] = await Promise.all([
//                     api.get('/Courses/mycourses'),
//                     api.get('/subscriptions/stats')
//                 ]);

//                 const subscriberCount = statsRes.data?.totalSubscribers || statsRes.data.data?.length || 0;

//                 setStats({
//                     courseCount: coursesRes.data.data?.length || 0,
//                     subscriberCount: subscriberCount,
//                 });
//             } catch (error) {
//                 console.error("Failed to fetch admin stats", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStats();
//     }, []);

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     // The entire return statement is one block of JSX.
//     return (
//         <Box>
//             <Typography variant="h4" gutterBottom>
//                 Admin Dashboard
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//                 Welcome back, {user?.name}. Manage your courses and users from here.
//             </Typography>
            
//             <Grid container spacing={3} sx={{ mt: 2 }}>
//                 <Grid item xs={12} md={4}>
//                     <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <SchoolIcon color="primary" sx={{ fontSize: 40 }}/>
//                         <Box>
//                             <Typography variant="h6">Total Courses</Typography>
//                             <Typography variant="h4">{stats.courseCount}</Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <PeopleIcon color="primary" sx={{ fontSize: 40 }}/>
//                         <Box>
//                             <Typography variant="h6">Total Subscribers</Typography>
//                             <Typography variant="h4">{stats.subscriberCount}</Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <BarChartIcon color="primary" sx={{ fontSize: 40 }}/>
//                         <Box>
//                             <Typography variant="h6">Reports</Typography>
//                              <MuiLink component={Link} to="/admin/reports">View Reports</MuiLink>
//                         </Box>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'; // ✅ Correct named imports
import useAuth from '../../hooks/useAuth';
import api from '../../api/api';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCourses: 0, totalSubscribers: 0 });
  const [subscriberList, setSubscriberList] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch courses created by admin
        const coursesRes = await api.get('/Courses/mycourses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const courses = coursesRes.data.data || [];

        // Fetch subscriber stats
        const subscribersRes = await api.get('/subscriptions/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subscribersData = subscribersRes.data || [];

        // Calculate totals
        const totalSubs = subscribersData.reduce(
          (sum, course) => sum + (course.totalSubscribers || 0),
          0
        );
        setStats({ totalCourses: courses.length, totalSubscribers: totalSubs });

        // Flatten subscriber list
        const allSubscribers = [];
        subscribersData.forEach((course) => {
          (course.subscribers || []).forEach((sub) => {
            allSubscribers.push({
              courseTitle: course.courseTitle,
              userName: sub.userName,
              subscribedAt: sub.subscribedAt,
              status: sub.isActive,
            });
          });
        });
        setSubscriberList(allSubscribers);

        // Chart data
        const formattedChartData = subscribersData.map((c) => ({
          courseTitle: c.courseTitle,
          subscribers: c.totalSubscribers || 0,
        }));
        setChartData(formattedChartData);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back, {user?.name || 'Admin'}. Here’s an overview of your courses and subscribers.
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Total Courses</Typography>
              <Typography variant="h4">{stats.totalCourses}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Total Subscribers</Typography>
              <Typography variant="h4">{stats.totalSubscribers}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Subscriber List */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Overall Subscriber List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: 'grey.100' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Course Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Subscribed At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriberList.length > 0 ? (
                subscriberList.map((sub, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{sub.courseTitle}</TableCell>
                    <TableCell>{sub.userName}</TableCell>
                    <TableCell>
                      {new Date(sub.subscribedAt).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={sub.status ? 'Active' : 'Inactive'}
                        color={sub.status ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No subscriber data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
