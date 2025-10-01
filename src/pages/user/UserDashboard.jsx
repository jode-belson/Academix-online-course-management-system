// // import React, { useState, useEffect } from 'react';
// // import { Typography, Box, Paper, Grid, CircularProgress, Alert, Button, LinearProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
// // import { Link } from 'react-router-dom';
// // import useAuth from '../../hooks/useAuth';
// // import SchoolIcon from '@mui/icons-material/School';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import DownloadIcon from '@mui/icons-material/Download';
// // import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Certificate Icon
// // import api from '../../api/api';

// // const UserDashboard = () => {
// //     const { user } = useAuth();
// //     const [enrolledCourses, setEnrolledCourses] = useState([]);
// //     // 1. Add new state to store certificates
// //     const [certificates, setCertificates] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         const fetchDashboardData = async () => {
// //             try {
// //                 // 2. Fetch subscriptions AND certificates at the same time for efficiency
// //                 const [subsResponse, certsResponse] = await Promise.all([
// //                     api.get('/subscriptions'),
// //                     api.get('/certificate/my-certificates')
// //                 ]);

// //                 const subscriptions = subsResponse.data.data || [];
// //                 setCertificates(certsResponse.data || []); // Set certificates state

// //                 if (subscriptions.length === 0) {
// //                     setLoading(false);
// //                     return;
// //                 }

// //                 const courseDetailsPromises = subscriptions.map(async (sub) => {
// //                     const { courseId, courseTitle } = sub;
// //                     const [courseRes, videosRes, progressRes] = await Promise.all([
// //                         api.get(`/Courses/${courseId}`),
// //                         api.get(`/courses/${courseId}/videos`),
// //                         api.get(`/videoprogress/course/${courseId}`)
// //                     ]);
                    
// //                     const thumbnailUrl = courseRes.data.data?.thumbnailUrl;
// //                     const videos = videosRes.data.data || [];
// //                     const progress = progressRes.data || [];
                    
// //                     const totalVideos = videos.length;
// //                     const completedVideos = progress.filter(p => p.isCompleted).length;
// //                     const progressPercent = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
                    
// //                     return { courseId, courseTitle, thumbnailUrl, progressPercent };
// //                 });
                
// //                 const detailedCourses = await Promise.all(courseDetailsPromises);
// //                 setEnrolledCourses(detailedCourses);

// //             } catch (err) {
// //                 setError('Failed to load dashboard data.');
// //                 console.error(err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchDashboardData();
// //     }, []);

// //     const totalSubscriptions = enrolledCourses.length;
// //     const coursesCompleted = enrolledCourses.filter(c => c.progressPercent === 100).length;

// //     if (loading) {
// //         return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
// //     }
    
// //     return (
// //         <Box>
// //             <Typography variant="h4" gutterBottom>My Dashboard</Typography>
// //             <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
// //                 Welcome back, {user?.name}. Let's continue learning!
// //             </Typography>

// //             {/* Summary Cards */}
// //             <Grid container spacing={3} sx={{ mb: 4 }}>
// //                 {/* Courses Enrolled Card */}
// //                 <Grid item xs={12} md={6}>
// //                     <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
// //                         <SchoolIcon color="primary" sx={{ fontSize: 40 }}/>
// //                         <Box>
// //                             <Typography variant="h6">Courses Enrolled</Typography>
// //                             <Typography variant="h4">{totalSubscriptions}</Typography>
// //                         </Box>
// //                     </Paper>
// //                 </Grid>
// //                 {/* Courses Completed Card */}
// //                 <Grid item xs={12} md={6}>
// //                     <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
// //                         <CheckCircleIcon color="success" sx={{ fontSize: 40 }}/>
// //                         <Box>
// //                             <Typography variant="h6">Courses Completed</Typography>
// //                             <Typography variant="h4">{coursesCompleted}</Typography>
// //                         </Box>
// //                     </Paper>
// //                 </Grid>
// //             </Grid>

// //             {/* My Courses List */}
// //             <Typography variant="h5" gutterBottom>My Courses</Typography>
// //             {error && <Alert severity="error">{error}</Alert>}
            
// //             {enrolledCourses.length > 0 ? (
// //                 <Grid container spacing={3}>
// //                     {enrolledCourses.map(course => (
// //                         <Grid item xs={12} md={6} key={course.courseId}>
// //                             <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
// //                                 <Box component="img" src={course.thumbnailUrl || 'https://via.placeholder.com/160x90?text=No+Image'} alt={course.courseTitle} sx={{ width: 160, height: 90, borderRadius: 1, objectFit: 'cover' }} />
// //                                 <Box sx={{ flexGrow: 1 }}>
// //                                     <Typography variant="h6" gutterBottom>{course.courseTitle}</Typography>
// //                                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                                         <LinearProgress variant="determinate" value={course.progressPercent} sx={{ flexGrow: 1, height: 8, borderRadius: 5 }} />
// //                                         <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{course.progressPercent}%</Typography>
// //                                     </Box>
// //                                     <Button component={Link} to={`/course/${course.courseId}`} variant="contained" size="small">
// //                                         Continue Learning
// //                                     </Button>
// //                                 </Box>
// //                             </Paper>
// //                         </Grid>
// //                     ))}
// //                 </Grid>
// //             ) : (
// //                 <Paper sx={{p: 4, textAlign: 'center'}}>
// //                     <Typography color="text.secondary">You are not enrolled in any courses yet.</Typography>
// //                     <Button component={Link} to="/" variant="contained" sx={{mt: 2}}>Browse Courses</Button>
// //                 </Paper>
// //             )}

// //             {/* 3. New "My Certificates" Section */}
// //             <Box sx={{ mt: 5 }}>
// //                 <Typography variant="h5" gutterBottom>My Certificates</Typography>
// //                 {certificates.length > 0 ? (
// //                     <Paper>
// //                         <List>
// //                             {certificates.map((cert, index) => (
// //                                 <React.Fragment key={cert.certificateId}>
// //                                     <ListItem
// //                                         secondaryAction={
// //                                             <Button
// //                                                 variant="outlined"
// //                                                 startIcon={<DownloadIcon />}
// //                                                 href={cert.cloudUrl}
// //                                                 target="_blank"
// //                                                 rel="noopener noreferrer"
// //                                             >
// //                                                 Download
// //                                             </Button>
// //                                         }
// //                                     >
// //                                         <ListItemAvatar>
// //                                             <Avatar sx={{bgcolor: 'secondary.main'}}>
// //                                                 <EmojiEventsIcon />
// //                                             </Avatar>
// //                                         </ListItemAvatar>
// //                                         <ListItemText
// //                                             primary={cert.courseTitle}
// //                                             secondary={`Issued on: ${new Date(cert.issuedOn).toLocaleDateString('en-IN')}`}
// //                                         />
// //                                     </ListItem>
// //                                     {index < certificates.length - 1 && <Divider component="li" />}
// //                                 </React.Fragment>
// //                             ))}
// //                         </List>
// //                     </Paper>
// //                 ) : (
// //                     <Paper sx={{p: 4, textAlign: 'center'}}>
// //                         <Typography color="text.secondary">You have not earned any certificates yet.</Typography>
// //                     </Paper>
// //                 )}
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default UserDashboard;

// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Paper, Grid, CircularProgress, Alert, Button, LinearProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import SchoolIcon from '@mui/icons-material/School';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Certificate Icon
// import api from '../../api/api';

// const UserDashboard = () => {
//     const { user } = useAuth();
//     const [enrolledCourses, setEnrolledCourses] = useState([]);
//     const [certificates, setCertificates] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try {
//                 const [subsResponse, certsResponse] = await Promise.all([
//                     api.get('/subscriptions'),
//                     api.get('/certificate/my-certificates')
//                 ]);

//                 const subscriptions = subsResponse.data.data || [];
//                 setCertificates(certsResponse.data || []);

//                 if (subscriptions.length === 0) {
//                     setLoading(false);
//                     return;
//                 }

//                 const courseDetailsPromises = subscriptions.map(async (sub) => {
//                     const { courseId, courseTitle } = sub;
//                     const [courseRes, videosRes, progressRes] = await Promise.all([
//                         api.get(`/Courses/${courseId}`),
//                         api.get(`/courses/${courseId}/videos`),
//                         api.get(`/videoprogress/course/${courseId}`)
//                     ]);

//                     const thumbnailUrl = courseRes.data.data?.thumbnailUrl;
//                     const videos = videosRes.data.data || [];
//                     const progress = progressRes.data || [];
//                     const totalVideos = videos.length;
//                     const completedVideos = progress.filter(p => p.isCompleted).length;
//                     const progressPercent = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

//                     return { courseId, courseTitle, thumbnailUrl, progressPercent };
//                 });

//                 const detailedCourses = await Promise.all(courseDetailsPromises);
//                 setEnrolledCourses(detailedCourses);

//             } catch (err) {
//                 setError('Failed to load dashboard data.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDashboardData();
//     }, []);

//     const totalSubscriptions = enrolledCourses.length;
//     const coursesCompleted = enrolledCourses.filter(c => c.progressPercent === 100).length;

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//     }

//     return (
//         <Box>
//             <Typography variant="h4" gutterBottom>My Dashboard</Typography>
//             <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
//                 Welcome back, {user?.name}. Let's continue learning!
//             </Typography>

//             {/* Summary Cards */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12} md={6}>
//                     <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, minHeight: 120 }}>
//                         <SchoolIcon color="primary" sx={{ fontSize: 40 }}/>
//                         <Box>
//                             <Typography variant="h6">Courses Enrolled</Typography>
//                             <Typography variant="h4">{totalSubscriptions}</Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, minHeight: 120 }}>
//                         <CheckCircleIcon color="success" sx={{ fontSize: 40 }}/>
//                         <Box>
//                             <Typography variant="h6">Courses Completed</Typography>
//                             <Typography variant="h4">{coursesCompleted}</Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//             </Grid>

//             {/* Courses List */}
//             <Typography variant="h5" gutterBottom>My Courses</Typography>
//             {error && <Alert severity="error">{error}</Alert>}

//             <Grid container spacing={3}>
//                 {enrolledCourses.length > 0 ? enrolledCourses.map(course => (
//                     <Grid item xs={12} md={6} key={course.courseId}>
//                         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 220 }}>
//                             <Box component="img"
//                                 src={course.thumbnailUrl || 'https://via.placeholder.com/160x90?text=No+Image'}
//                                 alt={course.courseTitle}
//                                 sx={{ width: '100%', height: 120, borderRadius: 1, objectFit: 'cover' }}
//                             />
//                             <Typography variant="h6">{course.courseTitle}</Typography>
//                             <LinearProgress variant="determinate" value={course.progressPercent} sx={{ height: 8, borderRadius: 5 }} />
//                             <Typography variant="body2" color="text.secondary">{course.progressPercent}% completed</Typography>
//                             <Button component={Link} to={`/course/${course.courseId}`} variant="contained">Continue Learning</Button>
//                         </Paper>
//                     </Grid>
//                 )) : (
//                     <Grid item xs={12}>
//                         <Paper sx={{p: 4, textAlign: 'center'}}>
//                             <Typography color="text.secondary">You are not enrolled in any courses yet.</Typography>
//                             <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>Browse Courses</Button>
//                         </Paper>
//                     </Grid>
//                 )}
//             </Grid>

//             {/* Certificates */}
//             <Box sx={{ mt: 5 }}>
//                 <Typography variant="h5" gutterBottom>My Certificates</Typography>
//                 <Grid container spacing={3}>
//                     {certificates.length > 0 ? certificates.map(cert => (
//                         <Grid item xs={12} md={6} key={cert.certificateId}>
//                             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 180 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     <EmojiEventsIcon color="secondary" sx={{ fontSize: 30 }} />
//                                     <Typography variant="h6">{cert.courseTitle}</Typography>
//                                 </Box>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Issued on: {new Date(cert.issuedOn).toLocaleDateString('en-IN')}
//                                 </Typography>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={() => window.open(cert.cloudUrl, '_blank')}
//                                 >
//                                     View Certificate
//                                 </Button>
//                             </Paper>
//                         </Grid>
//                     )) : (
//                         <Grid item xs={12}>
//                             <Paper sx={{p: 4, textAlign: 'center'}}>
//                                 <Typography color="text.secondary">You have not earned any certificates yet.</Typography>
//                             </Paper>
//                         </Grid>
//                     )}
//                 </Grid>
//             </Box>
//         </Box>
//     );
// };

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, CircularProgress, Alert, Button, LinearProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SchoolIcon from '@mui/icons-material/School';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import api from '../../api/api';

const UserDashboard = () => {
    const { user } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const [subsResponse, certsResponse] = await Promise.all([
                api.get('/subscriptions'),
                api.get('/certificate/my-certificates')
            ]);

            const subscriptions = subsResponse.data.data || [];
            setCertificates(certsResponse.data || []);

            if (subscriptions.length === 0) {
                setLoading(false);
                return;
            }

            const courseDetailsPromises = subscriptions.map(async (sub) => {
                const { courseId, courseTitle } = sub;
                const [courseRes, videosRes, progressRes] = await Promise.all([
                    api.get(`/Courses/${courseId}`),
                    api.get(`/courses/${courseId}/videos`),
                    api.get(`/videoprogress/course/${courseId}`)
                ]);
                
                const thumbnailUrl = courseRes.data.data?.thumbnailUrl;
                const videos = videosRes.data.data || [];
                const progress = progressRes.data || [];
                
                const totalVideos = videos.length;
                const completedVideos = progress.filter(p => p.isCompleted).length;
                const progressPercent = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
                
                return { courseId, courseTitle, thumbnailUrl, progressPercent };
            });
            
            const detailedCourses = await Promise.all(courseDetailsPromises);
            setEnrolledCourses(detailedCourses);

        } catch (err) {
            setError('Failed to load dashboard data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    // --- NEW: FUNCTION TO HANDLE UNSUBSCRIBE ---
    const handleUnsubscribe = async (courseId) => {
        if (window.confirm('Are you sure you want to unsubscribe from this course?')) {
            try {
                await api.delete(`/subscriptions/${courseId}`);
                // Refresh the list by filtering out the unsubscribed course
                setEnrolledCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseId));
                alert('Unsubscribed successfully.');
            } catch (err) {
                alert('Failed to unsubscribe.');
            }
        }
    };

    const totalSubscriptions = enrolledCourses.length;
    const coursesCompleted = enrolledCourses.filter(c => c.progressPercent === 100).length;

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }
    
    return (
        <Box>
            <Typography variant="h4" gutterBottom>My Dashboard</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>Welcome back, {user?.name}.</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}><Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}><SchoolIcon color="primary" sx={{ fontSize: 40 }}/><Box><Typography variant="h6">Courses Enrolled</Typography><Typography variant="h4">{totalSubscriptions}</Typography></Box></Paper></Grid>
                <Grid item xs={12} md={6}><Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}><EmojiEventsIcon color="secondary" sx={{ fontSize: 40 }}/><Box><Typography variant="h6">Certificates Earned</Typography><Typography variant="h4">{certificates.length}</Typography></Box></Paper></Grid>
            </Grid>
            
            <Typography variant="h5" gutterBottom>My Courses</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            
            {enrolledCourses.length > 0 ? (
                <Grid container spacing={3}>
                    {enrolledCourses.map(course => (
                        <Grid item xs={12} md={6} key={course.courseId}>
                            <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Box component="img" src={course.thumbnailUrl || 'https://via.placeholder.com/160x90?text=No+Image'} alt={course.courseTitle} sx={{ width: 160, height: 90, borderRadius: 1, objectFit: 'cover' }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>{course.courseTitle}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LinearProgress variant="determinate" value={course.progressPercent} sx={{ flexGrow: 1, height: 8, borderRadius: 5 }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{course.progressPercent}%</Typography>
                                    </Box>
                                    <Box>
                                        <Button component={Link} to={`/course/${course.courseId}`} variant="contained" size="small" sx={{ mr: 1 }}>Continue Learning</Button>
                                        {/* --- NEW: UNSUBSCRIBE BUTTON --- */}
                                        <Button onClick={() => handleUnsubscribe(course.courseId)} variant="outlined" color="error" size="small">Unsubscribe</Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{p: 4, textAlign: 'center'}}><Typography color="text.secondary">You are not enrolled in any courses yet.</Typography><Button component={Link} to="/" variant="contained" sx={{mt: 2}}>Browse Courses</Button></Paper>
            )}
            
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" gutterBottom>My Certificates</Typography>
                {certificates.length > 0 ? (
                    <Paper><List>{certificates.map((cert, index) => (<React.Fragment key={cert.certificateId}><ListItem secondaryAction={<Button variant="outlined" startIcon={<DownloadIcon />} href={cert.cloudUrl} target="_blank" rel="noopener noreferrer">Download</Button>}><ListItemAvatar><Avatar sx={{bgcolor: 'secondary.main'}}><EmojiEventsIcon /></Avatar></ListItemAvatar><ListItemText primary={cert.courseTitle} secondary={`Issued on: ${new Date(cert.issuedOn).toLocaleDateString('en-IN')}`} /></ListItem>{index < certificates.length - 1 && <Divider component="li" />}</React.Fragment>))}</List></Paper>
                ) : (
                    <Paper sx={{p: 4, textAlign: 'center'}}><Typography color="text.secondary">You have not earned any certificates yet.</Typography></Paper>
                )}
            </Box>
        </Box>
    );
};

export default UserDashboard;