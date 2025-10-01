// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import api from '../../api/api';

// const SubscriberListPage = () => {
//     const [myCourses, setMyCourses] = useState([]);
//     const [selectedCourseId, setSelectedCourseId] = useState('');
//     const [subscribers, setSubscribers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     // Step 1: Fetch the admin's courses to populate the dropdown
//     useEffect(() => {
//         const fetchMyCourses = async () => {
//             try {
//                 const response = await api.get('/Courses/mycourses');
//                 setMyCourses(response.data.data || []);
//             } catch (err) {
//                 setError('Failed to load your courses.');
//                 console.error(err);
//             }
//         };
//         fetchMyCourses();
//     }, []);

//     // Step 2: When a course is selected, fetch its subscribers
//     useEffect(() => {
//         if (!selectedCourseId) {
//             setSubscribers([]);
//             return;
//         }

//         const fetchSubscribers = async () => {
//             setLoading(true);
//             setError('');
//             try {
//                 const response = await api.get(`/subscriptions/course/${selectedCourseId}/subscribers`);
//                 // Let's check the console to be sure of the response structure
//                 console.log('SUBSCRIBERS API RESPONSE:', response.data); 
//                 // Adjust if your data is nested, e.g., response.data.data
//                 setSubscribers(response.data || []); 
//             } catch (err) {
//                 setError(`Failed to load subscribers for the selected course.`);
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchSubscribers();
//     }, [selectedCourseId]);

//     return (
//         <Box>
//             <Typography variant="h4" gutterBottom>Subscriber List</Typography>
//             <Paper sx={{ p: 3 }}>
//                 <FormControl fullWidth sx={{ mb: 3 }}>
//                     <InputLabel id="course-select-label">Select a Course to View Subscribers</InputLabel>
//                     <Select
//                         labelId="course-select-label"
//                         value={selectedCourseId}
//                         label="Select a Course to View Subscribers"
//                         onChange={(e) => setSelectedCourseId(e.target.value)}
//                     >
//                         <MenuItem value=""><em>-- Select a Course --</em></MenuItem>
//                         {myCourses.map(course => (
//                             <MenuItem key={course.courseId} value={course.courseId}>{course.title}</MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 {error && <Alert severity="error">{error}</Alert>}

//                 {loading ? <CircularProgress /> : (
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>User Name</TableCell>
//                                     <TableCell>Subscribed At</TableCell>
//                                     <TableCell>Status</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {subscribers.map((sub) => (
//                                     <TableRow key={sub.SubscriptionId}>
//                                         <TableCell>{sub.UserName}</TableCell>
//                                         <TableCell>{new Date(sub.SubscribedAt).toLocaleDateString()}</TableCell>
//                                         <TableCell>
//                                             <Chip 
//                                                 label={sub.IsActive ? 'Active' : 'Inactive'} 
//                                                 color={sub.IsActive ? 'success' : 'default'}
//                                                 size="small"
//                                             />
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                         {!selectedCourseId && (
//                             <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
//                                 Please select a course to view its subscribers.
//                             </Typography>
//                         )}
//                         {subscribers.length === 0 && selectedCourseId && (
//                              <Typography sx={{ p: 2, textAlign: 'center' }}>
//                                 No subscribers found for this course.
//                              </Typography>
//                         )}
//                     </TableContainer>
//                 )}
//             </Paper>
//         </Box>
//     );
// };

// export default SubscriberListPage;

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
  Chip,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import api from '../../api/api';

const SubscriberListPage = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch courses created by the logged-in admin
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await api.get('/Courses/mycourses');
        setMyCourses(response.data.data || []);
      } catch (err) {
        setError('Failed to load your courses.');
        console.error(err);
      }
    };
    fetchMyCourses();
  }, []);

  // Fetch subscribers whenever course is selected
  useEffect(() => {
    if (!selectedCourseId) {
      setSubscribers([]);
      return;
    }

    const fetchSubscribers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/subscriptions/course/${selectedCourseId}/subscribers`);
        setSubscribers(response.data || []);
      } catch (err) {
        setError('Failed to load subscribers for the selected course.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [selectedCourseId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Subscriber List
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        {/* Course Selector */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="course-select-label">Select a Course</InputLabel>
          <Select
            labelId="course-select-label"
            value={selectedCourseId}
            label="Select a Course"
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <MenuItem value=""><em>-- Select a Course --</em></MenuItem>
            {myCourses.map(course => (
              <MenuItem key={course.courseId} value={course.courseId}>{course.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Error Message */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'grey.100' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Subscribed At</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscribers.length > 0 ? subscribers.map((sub) => (
                  <TableRow
                    key={sub.subscriptionId}
                    hover
                    sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
                  >
                    <TableCell>{sub.userName}</TableCell>
                    <TableCell>{new Date(sub.subscribedAt).toLocaleDateString('en-IN')}</TableCell>
                    <TableCell>
                      <Chip
                        label={sub.isActive ? 'Active' : 'Inactive'}
                        color={sub.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                      {selectedCourseId
                        ? 'No subscribers found for this course.'
                        : 'Please select a course to view subscribers.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default SubscriberListPage;
