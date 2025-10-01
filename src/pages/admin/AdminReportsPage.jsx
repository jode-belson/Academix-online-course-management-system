// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert, Grid } from '@mui/material';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import api from '../../api/api';

// // Register the necessary components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AdminReportsPage = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const generateReport = async () => {
//             try {
//                 // 1. Fetch all courses created by the admin
//                 const coursesRes = await api.get('/Courses/mycourses');
//                 const myCourses = coursesRes.data.data || [];

//                 // 2. For each course, fetch its details (video count and subscriber count)
//                 const detailedCoursePromises = myCourses.map(async (course) => {
//                     const [videosRes, subscribersRes] = await Promise.all([
//                         api.get(`/courses/${course.courseId}/videos`),
//                         api.get(`/subscriptions/course/${course.courseId}/subscribers`)
//                     ]);
                    
//                     return {
//                         ...course,
//                         videoCount: videosRes.data.data?.length || 0,
//                         subscriberCount: subscribersRes.data?.length || 0,
//                     };
//                 });

//                 // 3. Wait for all detailed data to be fetched
//                 const finalReportData = await Promise.all(detailedCoursePromises);
//                 setReportData(finalReportData);

//             } catch (err) {
//                 setError('Failed to generate reports. Please try again later.');
//                 console.error("Report generation error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         generateReport();
//     }, []);

//     // Prepare data for the bar chart
//     const chartData = {
//         labels: reportData.map(course => course.title),
//         datasets: [
//             {
//                 label: '# of Subscribers',
//                 data: reportData.map(course => course.subscriberCount),
//                 backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const chartOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Subscribers per Course',
//             },
//         },
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//     }

//     return (
//         <Box>
//             <Typography variant="h4" gutterBottom>Course Performance Reports</Typography>
//             {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
//             <Grid container spacing={4}>
//                 {/* Performance Summary Table */}
//                 <Grid item xs={12}>
//                     <Typography variant="h5" gutterBottom>Performance Summary</Typography>
//                     <TableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Course Title</TableCell>
//                                     <TableCell>Created Date</TableCell>
//                                     <TableCell align="center"># Videos</TableCell>
//                                     <TableCell align="center"># Subscribers</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {reportData.map((course) => (
//                                     <TableRow key={course.courseId}>
//                                         <TableCell>
//                                             <Typography variant="subtitle1" fontWeight="bold">{course.title}</Typography>
//                                         </TableCell>
//                                         <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
//                                         <TableCell align="center">{course.videoCount}</TableCell>
//                                         <TableCell align="center">{course.subscriberCount}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Grid>

//                 {/* Engagement Chart */}
//                 <Grid item xs={12}>
//                     <Typography variant="h5" gutterBottom>Engagement</Typography>
//                     <Paper sx={{p: 3}}>
//                         {reportData.length > 0 ? (
//                            <Bar options={chartOptions} data={chartData} />
//                         ) : (
//                            <Typography>No data available to display chart.</Typography>
//                         )}
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default AdminReportsPage;

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import api from '../../api/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminReportsPage = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const coursesRes = await api.get('/Courses/mycourses');
        const myCourses = coursesRes.data.data || [];

        const detailedCoursePromises = myCourses.map(async (course) => {
          const [videosRes, subscribersRes] = await Promise.all([
            api.get(`/courses/${course.courseId}/videos`),
            api.get(`/subscriptions/course/${course.courseId}/subscribers`)
          ]);

          return {
            ...course,
            videoCount: videosRes.data.data?.length || 0,
            subscriberCount: subscribersRes.data?.length || 0,
          };
        });

        const finalData = await Promise.all(detailedCoursePromises);
        setReportData(finalData);

      } catch (err) {
        setError('Failed to load report. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const chartData = {
    labels: reportData.map(course => course.title),
    datasets: [
      {
        label: 'Subscribers',
        data: reportData.map(course => course.subscriberCount),
        backgroundColor: 'rgba(33, 150, 243, 0.7)',
        borderColor: 'rgba(33, 150, 243, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Subscribers per Course', font: { size: 18 } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { title: { display: true, text: 'Courses' } },
      y: { title: { display: true, text: 'Subscribers' }, beginAtZero: true }
    },
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Overall Course Report
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Table of Courses */}
      <TableContainer component={Paper} sx={{ mb: 5, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'grey.100' }}>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Course Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Videos</TableCell>
              <TableCell align="center">Subscribers</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No courses found
                </TableCell>
              </TableRow>
            ) : (
              reportData.map(course => (
                <TableRow key={course.courseId} hover>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={course.thumbnailUrl || 'https://via.placeholder.com/100x60?text=No+Image'}
                      alt={course.title}
                      sx={{ width: 100, height: 60, objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description || 'No description'}</TableCell>
                  <TableCell align="center">{course.videoCount}</TableCell>
                  <TableCell align="center">{course.subscriberCount}</TableCell>
                  <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chart */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Subscribers Engagement Chart
        </Typography>
        {reportData.length > 0 ? (
          <Bar options={chartOptions} data={chartData} />
        ) : (
          <Typography align="center" color="text.secondary">
            No data available for chart
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AdminReportsPage;
