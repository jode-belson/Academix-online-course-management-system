// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { Container, Typography, Box, Button, Grid, Paper, List, ListItem, ListItemText, CircularProgress, Alert, Divider } from '@mui/material';
// // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // // import useAuth from '../../hooks/useAuth';
// // // import api from '../../api/api';

// // // const CourseDetailPage = () => {
// // //   const { courseId } = useParams();
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();

// // //   // --- STATE MANAGEMENT ---
// // //   // Store all data related to the course page
// // //   const [course, setCourse] = useState(null);
// // //   const [videos, setVideos] = useState([]);
// // //   const [isSubscribed, setIsSubscribed] = useState(false);
// // //   const [progress, setProgress] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');

// // //   // --- DATA FETCHING ---
// // //   // A single function to get all necessary data, wrapped in useCallback for efficiency
// // //   const fetchData = useCallback(async () => {
// // //     if (!user) return; // Don't fetch if the user isn't loaded yet
// // //     try {
// // //       setLoading(true);
// // //       setError('');

// // //       // 1. Fetch the main course details
// // //       const courseRes = await api.get(`/Courses/${courseId}`);
// // //       setCourse(courseRes.data.data);

// // //       // 2. Fetch all of the user's subscriptions to check if they are enrolled in this course
// // //       const subsRes = await api.get('/subscriptions');
// // //       const userSubscriptions = subsRes.data.data || [];
// // //       const subscribed = userSubscriptions.some(sub => sub.courseId.toString() === courseId);
// // //       setIsSubscribed(subscribed);

// // //       // 3. If the user is subscribed, fetch the videos and their progress
// // //       if (subscribed) {
// // //         const [videosRes, progressRes] = await Promise.all([
// // //           api.get(`/courses/${courseId}/videos`),
// // //           api.get(`/videoprogress/course/${courseId}`)
// // //         ]);
// // //         setVideos(videosRes.data.data || []);
// // //         setProgress(progressRes.data || []);
// // //       }
// // //     } catch (err) {
// // //       setError('Failed to load course data. Please try again.');
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [courseId, user]);

// // //   // Run the fetchData function when the component mounts or dependencies change
// // //   useEffect(() => {
// // //     fetchData();
// // //   }, [fetchData]);

// // //   // --- USER ACTIONS ---
// // //   // Handle clicking the "Subscribe" button
// // //   const handleSubscription = async () => {
// // //     try {
// // //       await api.post(`/subscriptions/${courseId}`);
// // //       alert('Subscribed successfully!');
// // //       fetchData(); // Refresh all data to show the video list
// // //     } catch (err) {
// // //       alert('Subscription failed.');
// // //       console.error(err);
// // //     }
// // //   };

// // //   // Handle clicking the "Watch" button
// // //   const handleWatchVideo = async (videoId, videoUrl) => {
// // //     try {
// // //       // Open the video URL in a new tab for the user to watch
// // //       window.open(videoUrl, '_blank');
// // //       // Mark the video as completed in the backend
// // //       await api.post(`/videoprogress/mark?VideoId=${videoId}`);
// // //       // Refresh the progress data to update the UI (e.g., change button to "Watched")
// // //       const progressRes = await api.get(`/videoprogress/course/${courseId}`);
// // //       setProgress(progressRes.data);
// // //       alert('Video progress saved!');
// // //     } catch (err) {
// // //       alert('Failed to mark video progress.');
// // //       console.error(err);
// // //     }
// // //   };
  
// // //   // Handle clicking the "Generate Certificate" button
// // //   const handleGenerateCertificate = async () => {
// // //     try {
// // //       const response = await api.post(`/certificate/generate/${courseId}`);
// // //       const certUrl = response.data.url;
// // //       alert(`Certificate generated! You can now download it from your dashboard or this link: ${certUrl}`);
// // //       window.open(certUrl, '_blank');
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || 'Failed to generate certificate. Ensure all videos are complete.');
// // //     }
// // //   };

// // //   // --- DERIVED STATE & RENDERING ---
// // //   // Calculate if the course is complete based on fetched data
// // //   const completedVideoIds = new Set(progress.filter(p => p.isCompleted).map(p => p.videoId));
// // //   const isCourseComplete = videos.length > 0 && videos.every(v => completedVideoIds.has(v.videoId));

// // //   // Render loading spinner or error message if needed
// // //   if (loading) return <Container sx={{textAlign: 'center', mt: 5}}><CircularProgress /></Container>;
// // //   if (error) return <Container><Alert severity="error">{error}</Alert></Container>;
// // //   if (!course) return <Container><Typography>Course not found.</Typography></Container>;

// // //   return (
// // //     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// // //       <Grid container spacing={5}>
// // //         {/* Left Column: Course Details & Video List */}
// // //         <Grid item xs={12} md={8}>
// // //           <Paper sx={{ p: 4, mb: 3 }}>
// // //             <Typography variant="h3" gutterBottom>{course.title}</Typography>
// // //             <Typography variant="body1" color="text.secondary" paragraph>{course.description}</Typography>
// // //           </Paper>
          
// // //           {/* Conditionally render the video list ONLY if the user is subscribed */}
// // //           {isSubscribed && (
// // //             <Paper sx={{ p: 2 }}>
// // //               <Typography variant="h5" sx={{ p: 2 }}>Course Curriculum</Typography>
// // //               <List>
// // //                 {videos.map((video, index) => {
// // //                   const isWatched = completedVideoIds.has(video.videoId);
// // //                   return (
// // //                     <ListItem key={video.videoId} divider>
// // //                       <ListItemText 
// // //                         primary={`${index + 1}. ${video.title}`} 
// // //                         secondary={video.description} 
// // //                       />
// // //                       <Button 
// // //                         variant="contained" 
// // //                         startIcon={isWatched ? <CheckCircleIcon /> : null}
// // //                         color={isWatched ? "success" : "primary"}
// // //                         onClick={() => handleWatchVideo(video.videoId, video.videoUrl)}
// // //                       >
// // //                         {isWatched ? "Watched" : "Watch"}
// // //                       </Button>
// // //                     </ListItem>
// // //                   );
// // //                 })}
// // //               </List>
// // //             </Paper>
// // //           )}
// // //         </Grid>

// // //         {/* Right Column: Thumbnail and Action Buttons */}
// // //         <Grid item xs={12} md={4}>
// // //           <Paper sx={{ p: 3, position: 'sticky', top: '88px' }}>
// // //             <Box
// // //               component="img"
// // //               sx={{ width: '100%', borderRadius: 2, mb: 2 }}
// // //               src={course.thumbnailUrl}
// // //               alt={course.title}
// // //             />
            
// // //             {/* Logic for the main action button */}
// // //             {!isSubscribed ? (
// // //               // If not subscribed, show the "Subscribe" button
// // //               <Button fullWidth variant="contained" size="large" onClick={handleSubscription}>
// // //                 Subscribe to Start Learning
// // //               </Button>
// // //             ) : isCourseComplete ? (
// // //               // If subscribed AND course is complete, show the "Get Certificate" button
// // //               <Button fullWidth variant="contained" color="secondary" size="large" onClick={handleGenerateCertificate}>
// // //                 Generate Certificate
// // //               </Button>
// // //             ) : (
// // //               // If subscribed but not complete, show a disabled button
// // //               <Button fullWidth variant="outlined" size="large" disabled>
// // //                 Continue Learning
// // //               </Button>
// // //             )}
// // //           </Paper>
// // //         </Grid>
// // //       </Grid>
// // //     </Container>
// // //   );
// // // };

// // // export default CourseDetailPage;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useParams } from 'react-router-dom';
// // import {
// //   Container,
// //   Typography,
// //   Box,
// //   Button,
// //   Grid,
// //   Paper,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   CircularProgress,
// //   Alert,
// //   Divider,
// //   LinearProgress
// // } from '@mui/material';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// // import useAuth from '../../hooks/useAuth';
// // import api from '../../api/api';

// // const CourseDetailPage = () => {
// //   const { courseId } = useParams();
// //   const { user } = useAuth();

// //   const [course, setCourse] = useState(null);
// //   const [videos, setVideos] = useState([]);
// //   const [isSubscribed, setIsSubscribed] = useState(false);
// //   const [progress, setProgress] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   const fetchData = useCallback(async () => {
// //     if (!user) return;
// //     try {
// //       setLoading(true);
// //       setError('');

// //       // Course details
// //       const courseRes = await api.get(`/Courses/${courseId}`);
// //       setCourse(courseRes.data.data);

// //       // Subscriptions
// //       const subsRes = await api.get('/subscriptions');
// //       const subscribed = (subsRes.data.data || []).some(
// //         sub => sub.courseId.toString() === courseId
// //       );
// //       setIsSubscribed(subscribed);

// //       if (subscribed) {
// //         const [videosRes, progressRes] = await Promise.all([
// //           api.get(`/courses/${courseId}/videos`),
// //           api.get(`/videoprogress/course/${courseId}`)
// //         ]);
// //         setVideos(videosRes.data.data || []);
// //         setProgress(progressRes.data || []);
// //       }
// //     } catch (err) {
// //       setError('Failed to load course data. Please try again.');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [courseId, user]);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const handleSubscription = async () => {
// //     try {
// //       await api.post(`/subscriptions/${courseId}`);
// //       fetchData();
// //     } catch (err) {
// //       alert('Subscription failed.');
// //     }
// //   };

// //   const handleWatchVideo = async (videoId, videoUrl) => {
// //     try {
// //       window.open(videoUrl, '_blank');
// //       await api.post(`/videoprogress/mark?VideoId=${videoId}`);
// //       const progressRes = await api.get(`/videoprogress/course/${courseId}`);
// //       setProgress(progressRes.data);
// //     } catch (err) {
// //       alert('Failed to mark video progress.');
// //     }
// //   };
// //   // Handle clicking the "Generate Certificate" button
// // const handleGenerateCertificate = async () => {
// //   try {
// //     const response = await api.post(`/certificate/generate/${courseId}`);
// //     const data = response.data;

// //     // ✅ Now matches backend response
// //     const certUrl = data.url;
// //     const issuedOn = new Date(data.issuedOn).toLocaleDateString();
// //     const courseTitle = data.courseTitle;

// //     alert(`🎉 Certificate generated for ${courseTitle} on ${issuedOn}!`);
// //     if (certUrl) {
// //       window.open(certUrl, '_blank');
// //     }
// //   } catch (err) {
// //     alert(err.response?.data?.message || 'Failed to generate certificate. Ensure all videos are complete.');
// //     console.error(err);
// //   }
// // };



// //   const completedVideoIds = new Set(progress.filter(p => p.isCompleted).map(p => p.videoId));
// //   const isCourseComplete = videos.length > 0 && videos.every(v => completedVideoIds.has(v.videoId));
// //   const completedCount = completedVideoIds.size;
// //   const progressPercent = videos.length > 0 ? Math.round((completedCount / videos.length) * 100) : 0;

// //   if (loading) return <Container sx={{ textAlign: 'center', mt: 5 }}><CircularProgress /></Container>;
// //   if (error) return <Container><Alert severity="error">{error}</Alert></Container>;
// //   if (!course) return <Container><Typography>Course not found.</Typography></Container>;

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// //       <Grid container spacing={4}>
// //         {/* Left Section */}
// //         <Grid item xs={12} md={8}>
// //           <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
// //             <Typography variant="h4" fontWeight="bold" gutterBottom>
// //               {course.title}
// //             </Typography>
// //             <Typography variant="body1" color="text.secondary" gutterBottom>
// //               {course.description}
// //             </Typography>
// //             {isSubscribed && (
// //               <>
// //                 <Divider sx={{ my: 2 }} />
// //                 <Typography variant="subtitle1" gutterBottom>
// //                   Progress: {completedCount}/{videos.length} videos completed
// //                 </Typography>
// //                 <LinearProgress
// //                   variant="determinate"
// //                   value={progressPercent}
// //                   sx={{ height: 10, borderRadius: 5, mb: 2 }}
// //                   color={isCourseComplete ? "success" : "primary"}
// //                 />
// //               </>
// //             )}
// //           </Paper>

// //           {/* Video List */}
// //           {isSubscribed && (
// //             <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
// //               <Typography variant="h5" fontWeight="bold" gutterBottom>
// //                 Course Curriculum
// //               </Typography>
// //               <List>
// //                 {videos.map((video, index) => {
// //                   const isWatched = completedVideoIds.has(video.videoId);
// //                   return (
// //                     <ListItem
// //                       key={video.videoId}
// //                       divider
// //                       secondaryAction={
// //                         <Button
// //                           variant="contained"
// //                           size="small"
// //                           color={isWatched ? "success" : "primary"}
// //                           startIcon={isWatched ? <CheckCircleIcon /> : <PlayCircleIcon />}
// //                           onClick={() => handleWatchVideo(video.videoId, video.videoUrl)}
// //                         >
// //                           {isWatched ? "Watched" : "Watch"}
// //                         </Button>
// //                       }
// //                     >
// //                       <ListItemText
// //                         primary={`${index + 1}. ${video.title}`}
// //                         secondary={video.description}
// //                       />
// //                     </ListItem>
// //                   );
// //                 })}
// //               </List>
// //             </Paper>
// //           )}
// //         </Grid>

// //         {/* Right Section */}
// //         <Grid item xs={12} md={4}>
// //           <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, position: 'sticky', top: 90 }}>
// //             <Box
// //               component="img"
// //               src={course.thumbnailUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
// //               alt={course.title}
// //               sx={{ width: '100%', height: 200, borderRadius: 2, objectFit: 'cover', mb: 3 }}
// //             />
// //             {!isSubscribed ? (
// //               <Button fullWidth variant="contained" size="large" onClick={handleSubscription}>
// //                 Subscribe to Start Learning
// //               </Button>
// //             ) : isCourseComplete ? (
// //               <Button fullWidth variant="contained" color="secondary" size="large" onClick={handleGenerateCertificate}>
// //                 Get Certificate
// //               </Button>
// //             ) : (
// //               <Button fullWidth variant="outlined" size="large" disabled>
// //                 Continue Learning
// //               </Button>
// //             )}
// //           </Paper>
// //         </Grid>
// //       </Grid>
// //     </Container>
// //   );
// // };

// // export default CourseDetailPage;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useParams } from 'react-router-dom';
// // import {
// //   Container, Typography, Box, Button, Grid, Card,
// //   CardMedia, CardContent, CardActions, LinearProgress,
// //   CircularProgress, Alert, Divider
// // } from '@mui/material';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// // import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// // import useAuth from '../../hooks/useAuth';
// // import api from '../../api/api';

// // const CourseDetailPage = () => {
// //   const { courseId } = useParams();
// //   const { user } = useAuth();

// //   const [course, setCourse] = useState(null);
// //   const [videos, setVideos] = useState([]);
// //   const [isSubscribed, setIsSubscribed] = useState(false);
// //   const [progress, setProgress] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   const fetchData = useCallback(async () => {
// //     if (!user) return;
// //     try {
// //       setLoading(true);
// //       setError('');

// //       const courseRes = await api.get(`/Courses/${courseId}`);
// //       setCourse(courseRes.data.data);

// //       const subsRes = await api.get('/subscriptions');
// //       const subscribed = (subsRes.data.data || []).some(
// //         (sub) => sub.courseId.toString() === courseId
// //       );
// //       setIsSubscribed(subscribed);

// //       if (subscribed) {
// //         const [videosRes, progressRes] = await Promise.all([
// //           api.get(`/courses/${courseId}/videos`),
// //           api.get(`/videoprogress/course/${courseId}`),
// //         ]);
// //         setVideos(videosRes.data.data || []);
// //         setProgress(progressRes.data || []);
// //       }
// //     } catch (err) {
// //       setError('Failed to load course data.');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [courseId, user]);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const handleSubscription = async () => {
// //     try {
// //       await api.post(`/subscriptions/${courseId}`);
// //       fetchData();
// //     } catch (err) {
// //       alert('Subscription failed.');
// //     }
// //   };

// //   const handleWatchVideo = async (videoId, videoUrl) => {
// //     try {
// //       window.open(videoUrl, '_blank');
// //       await api.post(`/videoprogress/mark?VideoId=${videoId}`);
// //       const progressRes = await api.get(`/videoprogress/course/${courseId}`);
// //       setProgress(progressRes.data);
// //     } catch (err) {
// //       alert('Failed to mark video progress.');
// //     }
// //   };

// //   const handleGenerateCertificate = async () => {
// //     try {
// //       const response = await api.post(`/certificate/generate/${courseId}`);
// //       const { url, issuedOn, courseTitle } = response.data;
// //       alert(
// //         `Certificate generated for ${courseTitle} on ${new Date(
// //           issuedOn
// //         ).toLocaleDateString()}!`
// //       );
// //       if (url) window.open(url, '_blank');
// //     } catch (err) {
// //       alert(err.response?.data?.message || 'Failed to generate certificate.');
// //       console.error(err);
// //     }
// //   };

// //   const completedVideoIds = new Set(
// //     progress.filter((p) => p.isCompleted).map((p) => p.videoId)
// //   );
// //   const isCourseComplete =
// //     videos.length > 0 &&
// //     videos.every((v) => completedVideoIds.has(v.videoId));
// //   const completedCount = completedVideoIds.size;
// //   const progressPercent =
// //     videos.length > 0 ? Math.round((completedCount / videos.length) * 100) : 0;

// //   if (loading)
// //     return (
// //       <Container sx={{ textAlign: 'center', mt: 5 }}>
// //         <CircularProgress />
// //       </Container>
// //     );
// //   if (error)
// //     return (
// //       <Container>
// //         <Alert severity="error">{error}</Alert>
// //       </Container>
// //     );
// //   if (!course)
// //     return (
// //       <Container>
// //         <Typography>Course not found.</Typography>
// //       </Container>
// //     );

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
// //       <Grid container spacing={4}>
// //         {/* Course Main Card */}
// //         <Grid item xs={12}>
// //           <Card
// //             sx={{
// //               borderRadius: 3,
// //               boxShadow: 4,
// //               overflow: 'hidden',
// //             }}
// //           >
// //             <CardMedia
// //               component="img"
// //               height="400"
// //               image={
// //                 course.thumbnailUrl ||
// //                 'https://via.placeholder.com/800x400?text=No+Image'
// //               }
// //               alt={course.title}
// //               sx={{ objectFit: 'cover' }}
// //             />
// //             <CardContent sx={{ p: 4 }}>
// //               <Typography variant="h4" fontWeight="bold" gutterBottom>
// //                 {course.title}
// //               </Typography>
// //               <Typography variant="body1" color="text.secondary" gutterBottom>
// //                 {course.description}
// //               </Typography>

// //               {isSubscribed && (
// //                 <>
// //                   <Divider sx={{ my: 3 }} />
// //                   <Typography variant="subtitle1" gutterBottom>
// //                     Progress: {completedCount}/{videos.length} videos completed
// //                   </Typography>
// //                   <LinearProgress
// //                     variant="determinate"
// //                     value={progressPercent}
// //                     sx={{ height: 10, borderRadius: 5, mb: 2 }}
// //                     color={isCourseComplete ? 'success' : 'primary'}
// //                   />
// //                 </>
// //               )}
// //             </CardContent>
// //             <CardActions sx={{ p: 3, justifyContent: 'flex-end' }}>
// //               {!isSubscribed ? (
// //                 <Button
// //                   variant="contained"
// //                   size="large"
// //                   onClick={handleSubscription}
// //                 >
// //                   Subscribe & Start Learning
// //                 </Button>
// //               ) : isCourseComplete ? (
// //                 <Button
// //                   variant="contained"
// //                   color="secondary"
// //                   size="large"
// //                   startIcon={<EmojiEventsIcon />}
// //                   onClick={handleGenerateCertificate}
// //                 >
// //                   Get Certificate
// //                 </Button>
// //               ) : (
// //                 <Button variant="outlined" size="large" disabled>
// //                   Continue Learning
// //                 </Button>
// //               )}
// //             </CardActions>
// //           </Card>
// //         </Grid>

// //         {/* Videos Section */}
// //         {isSubscribed && (
// //           <Grid item xs={12}>
// //             <Typography
// //               variant="h5"
// //               fontWeight="bold"
// //               sx={{ mb: 3, textAlign: 'center' }}
// //             >
// //               Course Curriculum
// //             </Typography>
// //             <Grid container spacing={3}>
// //               {videos.map((video, index) => {
// //                 const isWatched = completedVideoIds.has(video.videoId);
// //                 return (
// //                   <Grid item xs={12} sm={6} md={4} key={video.videoId}>
// //                     <Card
// //                       sx={{
// //                         borderRadius: 3,
// //                         boxShadow: 3,
// //                         height: '100%',
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         justifyContent: 'space-between',
// //                         transition: 'transform 0.2s, box-shadow 0.2s',
// //                         '&:hover': {
// //                           transform: 'translateY(-5px)',
// //                           boxShadow: 6,
// //                         },
// //                       }}
// //                     >
// //                       <Box sx={{ position: 'relative', pt: '56.25%' }}>
// //                         <CardMedia
// //                           component="img"
// //                           image={
// //                             video.thumbnailUrl ||
// //                             'https://via.placeholder.com/400x225?text=Video'
// //                           }
// //                           alt={video.title}
// //                           sx={{
// //                             position: 'absolute',
// //                             top: 0,
// //                             left: 0,
// //                             width: '100%',
// //                             height: '100%',
// //                             objectFit: 'cover',
// //                           }}
// //                         />
// //                       </Box>
// //                       <CardContent sx={{ p: 2 }}>
// //                         <Typography
// //                           variant="subtitle1"
// //                           fontWeight="600"
// //                           gutterBottom
// //                           sx={{
// //                             height: 40,
// //                             overflow: 'hidden',
// //                             textOverflow: 'ellipsis',
// //                           }}
// //                         >
// //                           {index + 1}. {video.title}
// //                         </Typography>
// //                         <Typography
// //                           variant="body2"
// //                           color="text.secondary"
// //                           sx={{
// //                             height: 35,
// //                             overflow: 'hidden',
// //                             textOverflow: 'ellipsis',
// //                           }}
// //                         >
// //                           {video.description}
// //                         </Typography>
// //                       </CardContent>
// //                       <CardActions sx={{ p: 2 }}>
// //                         <Button
// //                           fullWidth
// //                           variant="contained"
// //                           size="small"
// //                           color={isWatched ? 'success' : 'primary'}
// //                           startIcon={
// //                             isWatched ? <CheckCircleIcon /> : <PlayCircleIcon />
// //                           }
// //                           onClick={() =>
// //                             handleWatchVideo(video.videoId, video.videoUrl)
// //                           }
// //                         >
// //                           {isWatched ? 'Watched' : 'Watch'}
// //                         </Button>
// //                       </CardActions>
// //                     </Card>
// //                   </Grid>
// //                 );
// //               })}
// //             </Grid>
// //           </Grid>
// //         )}
// //       </Grid>
// //     </Container>
// //   );
// // };

// // export default CourseDetailPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container, Typography, Box, Button, Grid, Card,
//   CardMedia, CardContent, CardActions, LinearProgress,
//   CircularProgress, Alert, Divider, Paper
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import useAuth from '../../hooks/useAuth';
// import api from '../../api/api';

// const CourseDetailPage = () => {
//   const { courseId } = useParams();
//   const { user } = useAuth();

//   const [course, setCourse] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [progress, setProgress] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchData = useCallback(async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       setError('');

//       const courseRes = await api.get(`/Courses/${courseId}`);
//       setCourse(courseRes.data.data);

//       const subsRes = await api.get('/subscriptions');
//       const subscribed = (subsRes.data.data || []).some(
//         (sub) => sub.courseId.toString() === courseId
//       );
//       setIsSubscribed(subscribed);

//       if (subscribed) {
//         const [videosRes, progressRes] = await Promise.all([
//           api.get(`/courses/${courseId}/videos`),
//           api.get(`/videoprogress/course/${courseId}`),
//         ]);
//         setVideos(videosRes.data.data || []);
//         setProgress(progressRes.data || []);
//       }
//     } catch (err) {
//       setError('Failed to load course data.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [courseId, user]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleSubscription = async () => {
//     try {
//       await api.post(`/subscriptions/${courseId}`);
//       fetchData();
//     } catch (err) {
//       alert('Subscription failed.');
//     }
//   };

//   const handleWatchVideo = async (videoId, videoUrl) => {
//     try {
//       window.open(videoUrl, '_blank');
//       await api.post(`/videoprogress/mark?VideoId=${videoId}`);
//       const progressRes = await api.get(`/videoprogress/course/${courseId}`);
//       setProgress(progressRes.data);
//     } catch (err) {
//       alert('Failed to mark video progress.');
//     }
//   };

//   const handleGenerateCertificate = async () => {
//     try {
//       const response = await api.post(`/certificate/generate/${courseId}`);
//       const { url, issuedOn, courseTitle } = response.data;
//       alert(
//         `Certificate generated for ${courseTitle} on ${new Date(
//           issuedOn
//         ).toLocaleDateString()}!`
//       );
//       if (url) window.open(url, '_blank');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to generate certificate.');
//       console.error(err);
//     }
//   };

//   const completedVideoIds = new Set(
//     progress.filter((p) => p.isCompleted).map((p) => p.videoId)
//   );
//   const isCourseComplete =
//     videos.length > 0 && videos.every((v) => completedVideoIds.has(v.videoId));
//   const completedCount = completedVideoIds.size;
//   const progressPercent =
//     videos.length > 0 ? Math.round((completedCount / videos.length) * 100) : 0;

//   if (loading)
//     return (
//       <Container sx={{ textAlign: 'center', mt: 5 }}>
//         <CircularProgress />
//       </Container>
//     );
//   if (error)
//     return (
//       <Container>
//         <Alert severity="error">{error}</Alert>
//       </Container>
//     );
//   if (!course)
//     return (
//       <Container>
//         <Typography>Course not found.</Typography>
//       </Container>
//     );

//   return (
//     <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
//       {/* Course Header Section */}
//       <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', mb: 5 }}>
//         <Grid container>
//           <Grid item xs={12} md={5}>
//             <CardMedia
//               component="img"
//               height="100%"
//               image={
//                 course.thumbnailUrl ||
//                 'https://via.placeholder.com/800x400?text=No+Image'
//               }
//               alt={course.title}
//               sx={{ objectFit: 'cover', height: '100%', minHeight: 300 }}
//             />
//           </Grid>
//           <Grid item xs={12} md={7}>
//             <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 {course.title}
//               </Typography>
//               <Typography variant="body1" color="text.secondary" gutterBottom>
//                 {course.description}
//               </Typography>

//               {isSubscribed && (
//                 <>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="subtitle1" gutterBottom>
//                     Progress: {completedCount}/{videos.length} videos completed
//                   </Typography>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progressPercent}
//                     sx={{ height: 12, borderRadius: 6, mb: 2 }}
//                     color={isCourseComplete ? 'success' : 'primary'}
//                   />
//                   {isCourseComplete && (
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       startIcon={<EmojiEventsIcon />}
//                       onClick={handleGenerateCertificate}
//                     >
//                       Get Certificate
//                     </Button>
//                   )}
//                 </>
//               )}

//               <Box sx={{ mt: 'auto', textAlign: 'right' }}>
//                 {!isSubscribed ? (
//                   <Button
//                     variant="contained"
//                     size="large"
//                     onClick={handleSubscription}
//                   >
//                     Subscribe & Start Learning
//                   </Button>
//                 ) : !isCourseComplete && (
//                   <Button variant="outlined" size="large" disabled>
//                     Continue Learning
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Videos Section */}
//       {isSubscribed && (
//         <>
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             sx={{ mb: 3, textAlign: 'center' }}
//           >
//             Course Curriculum
//           </Typography>
//           <Grid container spacing={3}>
//             {[...videos].sort((a, b) => a.order - b.order).map((video, index) => {
//               const isWatched = completedVideoIds.has(video.videoId);
//               return (
//                 <Grid item xs={12} sm={6} md={4} key={video.videoId}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       boxShadow: 3,
//                       height: '100%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'space-between',
//                       transition: 'transform 0.2s, box-shadow 0.2s',
//                       '&:hover': {
//                         transform: 'translateY(-5px)',
//                         boxShadow: 6,
//                       },
//                     }}
//                   >
//                     <Box sx={{ position: 'relative', pt: '56.25%' }}>
//                       <CardMedia
//                         component="img"
//                         image={
//                           video.thumbnailUrl ||
//                           'https://via.placeholder.com/400x225?text=Video'
//                         }
//                         alt={video.title}
//                         sx={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover',
//                         }}
//                       />
//                     </Box>
//                     <CardContent sx={{ p: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         fontWeight="600"
//                         gutterBottom
//                         sx={{
//                           height: 40,
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}
//                       >
//                         {index + 1}. {video.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           height: 35,
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}
//                       >
//                         {video.description}
//                       </Typography>
//                     </CardContent>
//                     <CardActions sx={{ p: 2 }}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         size="small"
//                         color={isWatched ? 'success' : 'primary'}
//                         startIcon={isWatched ? <CheckCircleIcon /> : <PlayCircleIcon />}
//                         onClick={() => handleWatchVideo(video.videoId, video.videoUrl)}
//                       >
//                         {isWatched ? 'Rewatch' : 'Watch'}
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </>
//       )}
//     </Container>
//   );
// };

// export default CourseDetailPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container, Typography, Box, Button, Grid, CardMedia,
//   LinearProgress, CircularProgress, Alert, Divider, Paper, Checkbox
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import useAuth from '../../hooks/useAuth';
// import api from '../../api/api';

// const CourseDetailPage = () => {
//   const { courseId } = useParams();
//   const { user } = useAuth();

//   const [course, setCourse] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [progress, setProgress] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchData = useCallback(async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       setError('');

//       const courseRes = await api.get(`/Courses/${courseId}`);
//       setCourse(courseRes.data.data);

//       const subsRes = await api.get('/subscriptions');
//       const subscribed = (subsRes.data.data || []).some(
//         (sub) => sub.courseId.toString() === courseId
//       );
//       setIsSubscribed(subscribed);

//       if (subscribed) {
//         const [videosRes, progressRes] = await Promise.all([
//           api.get(`/courses/${courseId}/videos`),
//           api.get(`/videoprogress/course/${courseId}`),
//         ]);
//         setVideos(videosRes.data.data || []);
//         setProgress(progressRes.data || []);
//       }
//     } catch (err) {
//       setError('Failed to load course data.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [courseId, user]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleSubscription = async () => {
//     try {
//       await api.post(`/subscriptions/${courseId}`);
//       fetchData();
//     } catch (err) {
//       alert('Subscription failed.');
//     }
//   };

//   const handleWatchVideo = async (videoId, videoUrl) => {
//     try {
//       window.open(videoUrl, '_blank');
//       await api.post(`/videoprogress/mark?VideoId=${videoId}`);
//       const progressRes = await api.get(`/videoprogress/course/${courseId}`);
//       setProgress(progressRes.data);
//     } catch (err) {
//       alert('Failed to mark video progress.');
//     }
//   };

//   const handleGenerateCertificate = async () => {
//     try {
//       const response = await api.post(`/certificate/generate/${courseId}`);
//       const { url, issuedOn, courseTitle } = response.data;
//       alert(
//         `Certificate generated for ${courseTitle} on ${new Date(
//           issuedOn
//         ).toLocaleDateString()}!`
//       );
//       if (url) window.open(url, '_blank');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to generate certificate.');
//       console.error(err);
//     }
//   };

//   const completedVideoIds = new Set(
//     progress.filter((p) => p.isCompleted).map((p) => p.videoId)
//   );
//   const isCourseComplete =
//     videos.length > 0 && videos.every((v) => completedVideoIds.has(v.videoId));
//   const completedCount = completedVideoIds.size;
//   const progressPercent =
//     videos.length > 0 ? Math.round((completedCount / videos.length) * 100) : 0;

//   if (loading)
//     return (
//       <Container sx={{ textAlign: 'center', mt: 5 }}>
//         <CircularProgress />
//       </Container>
//     );
//   if (error)
//     return (
//       <Container>
//         <Alert severity="error">{error}</Alert>
//       </Container>
//     );
//   if (!course)
//     return (
//       <Container>
//         <Typography>Course not found.</Typography>
//       </Container>
//     );

//   return (
//     <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
//       {/* Course Header Section */}
//       <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', mb: 5 }}>
//         <CardMedia
//           component="img"
//           height="250"
//           image={
//             course.thumbnailUrl ||
//             'https://via.placeholder.com/800x300?text=Course+Banner'
//           }
//           alt={course.title}
//           sx={{ objectFit: 'cover' }}
//         />
//         <Box sx={{ p: 4 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             {course.title}
//           </Typography>
//           <Typography variant="body1" color="text.secondary" gutterBottom>
//             {course.description}
//           </Typography>

//           {isSubscribed && (
//             <>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="subtitle1" gutterBottom>
//                 Progress: {completedCount}/{videos.length} videos completed
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={progressPercent}
//                 sx={{ height: 12, borderRadius: 6, mb: 2 }}
//                 color={isCourseComplete ? 'success' : 'primary'}
//               />
//               {isCourseComplete && (
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   startIcon={<EmojiEventsIcon />}
//                   onClick={handleGenerateCertificate}
//                 >
//                   Get Certificate
//                 </Button>
//               )}
//             </>
//           )}

//           <Box sx={{ mt: 3 }}>
//             {!isSubscribed ? (
//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={handleSubscription}
//               >
//                 Subscribe & Start Learning
//               </Button>
//             ) : !isCourseComplete && (
//               <Button variant="outlined" size="large" disabled>
//                 Continue Learning
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Paper>

//       {/* Videos Section */}
//       {isSubscribed && (
//         <>
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             sx={{ mb: 3, textAlign: 'center' }}
//           >
//             Course Curriculum
//           </Typography>

//           <Box>
//             {[...videos].sort((a, b) => a.order - b.order).map((video, index) => {
//               const isWatched = completedVideoIds.has(video.videoId);
//               return (
//                 <Paper
//                   key={video.videoId}
//                   elevation={2}
//                   sx={{
//                     mb: 2,
//                     p: 2,
//                     borderRadius: 2,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   {/* Left preview / icon */}
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <PlayCircleIcon color="primary" fontSize="large" />
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight="600">
//                         {index + 1}. {video.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {video.description}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Right buttons */}
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       size="small"
//                       color={isWatched ? 'success' : 'primary'}
//                       onClick={() => handleWatchVideo(video.videoId, video.videoUrl)}
//                     >
//                       {isWatched ? 'Rewatch' : 'Watch'}
//                     </Button>
//                     <Checkbox
//                       checked={isWatched}
//                       icon={<CheckCircleIcon color="disabled" />}
//                       checkedIcon={<CheckCircleIcon color="success" />}
//                       disabled
//                     />
//                   </Box>
//                 </Paper>
//               );
//             })}
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };

// export default CourseDetailPage;

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  LinearProgress,
  CircularProgress,
  Alert,
  Checkbox,
  Divider,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /** Fetch course + subscription + videos + progress */
  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError("");

      // Fetch course
      const courseRes = await api.get(`/Courses/${courseId}`);
      setCourse(courseRes.data.data);

      // Check subscription
      const subsRes = await api.get("/subscriptions");
      const subscribed = (subsRes.data.data || []).some(
        (s) => s.courseId.toString() === courseId
      );
      setIsSubscribed(subscribed);

      // If subscribed, fetch videos + progress
      if (subscribed) {
        const [videosRes, progressRes] = await Promise.all([
          api.get(`/courses/${courseId}/videos`),
          api.get(`/videoprogress/course/${courseId}`),
        ]);
        setVideos(videosRes.data.data || []);
        setProgress(progressRes.data || []);
      }
    } catch (err) {
      setError("Failed to load course data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [courseId, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /** Subscribe */
  const handleSubscription = async () => {
    try {
      await api.post(`/subscriptions/${courseId}`);
      fetchData();
    } catch {
      alert("Subscription failed.");
    }
  };

  /** Watch + mark video */
  const handleWatchVideo = async (videoId, videoUrl) => {
    try {
      window.open(videoUrl, "_blank");
      await api.post(`/videoprogress/mark?VideoId=${videoId}`);
      const progressRes = await api.get(`/videoprogress/course/${courseId}`);
      setProgress(progressRes.data || []);
    } catch {
      alert("Failed to mark video progress.");
    }
  };

  /** Generate certificate */
  const handleGenerateCertificate = async () => {
    try {
      const res = await api.post(`/certificate/generate/${courseId}`);
      const { url, issuedOn, courseTitle } = res.data;
      alert(
        `Certificate generated on ${new Date(
          issuedOn
        ).toLocaleDateString()}. View and Download it from Dashboard`
      );
      if (url) window.open(url, "_blank");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to generate certificate.");
    }
  };

  /** Progress calculation */
  const completedVideoIds = new Set(
    progress.filter((p) => p.isCompleted).map((p) => p.videoId)
  );
  const completedCount = completedVideoIds.size;
  const progressPercent =
    videos.length > 0 ? (completedCount / videos.length) * 100 : 0;
  const isCourseComplete =
    videos.length > 0 && videos.every((v) => completedVideoIds.has(v.videoId));

  /** Loading + error + not found */
  if (loading)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  if (!course)
    return (
      <Container>
        <Typography>Course not found.</Typography>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
          backgroundImage: `url(${
            course.thumbnailUrl ||
            "https://via.placeholder.com/1200x400?text=Course+Banner"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          boxShadow: 3,
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          }}
        />

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 2, color: "white", p: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 2 }}>
            {course.description}
          </Typography>

          {isSubscribed && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
                color={isCourseComplete ? "success" : "primary"}
              />
              {isCourseComplete && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<EmojiEventsIcon />}
                  sx={{ borderRadius: "20px", px: 3 }}
                  onClick={handleGenerateCertificate}
                >
                  Get Certificate
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Subscription button */}
      {!isSubscribed && (
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSubscription}
          >
            Subscribe & Start Learning
          </Button>
        </Box>
      )}

      {/* Course Curriculum */}
      {isSubscribed && (
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Course Curriculum
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {videos.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No videos available yet.
            </Typography>
          ) : (
            [...videos].sort((a, b) => a.videoId - b.videoId).map((video, i) => {
              const isWatched = completedVideoIds.has(video.videoId);
              return (
                <Paper
                  key={video.videoId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  {/* Video info */}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {i + 1}. {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.description || "No description"}
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                      variant="contained"
                      color={isWatched ? "success" : "primary"}
                      startIcon={<PlayCircleIcon />}
                      onClick={() =>
                        handleWatchVideo(video.videoId, video.videoUrl)
                      }
                    >
                      {isWatched ? "Rewatch" : "Watch"}
                    </Button>
                    <Checkbox
                      checked={isWatched}
                      icon={<CheckCircleIcon color="disabled" />}
                      checkedIcon={<CheckCircleIcon color="success" />}
                      disabled
                    />
                  </Box>
                </Paper>
              );
            })
          )}
        </Paper>
      )}
    </Container>
  );
};

export default CourseDetailPage;
