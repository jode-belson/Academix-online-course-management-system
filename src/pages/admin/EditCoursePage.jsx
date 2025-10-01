// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { Typography, Box, Paper, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, ListItemAvatar, Avatar } from '@mui/material';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import AddIcon from '@mui/icons-material/Add';
// // import VideocamIcon from '@mui/icons-material/Videocam';
// // import api from '../../api/api';

// // // Main Component
// // const EditCoursePage = () => {
// //     const { courseId } = useParams();
// //     const [course, setCourse] = useState(null);
// //     const [videos, setVideos] = useState([]);
// //     const [openEditCourse, setOpenEditCourse] = useState(false);
// //     const [openVideoModal, setOpenVideoModal] = useState(false);
// //     const [currentVideo, setCurrentVideo] = useState(null);

// //     const fetchData = useCallback(async () => {
// //         try {
// //             const courseRes = await api.get(`/Courses/${courseId}`);
// //             const videosRes = await api.get(`/courses/${courseId}/videos`);
// //             setCourse(courseRes.data.data);
// //             setVideos(videosRes.data.data || []);
// //         } catch (error) {
// //             console.error("Failed to fetch data", error);
// //         }
// //     }, [courseId]);

// //     useEffect(() => {
// //         fetchData();
// //     }, [fetchData]);

// //     const handleOpenAddVideo = () => {
// //         setCurrentVideo({ title: '', description: '' });
// //         setOpenVideoModal(true);
// //     };
// //     const handleOpenEditVideo = (video) => {
// //         setCurrentVideo(video);
// //         setOpenVideoModal(true);
// //     };
// //     const handleDeleteVideo = async (videoId) => {
// //         if (window.confirm("Delete this video?")) {
// //             await api.delete(`/courses/${courseId}/videos/${videoId}`);
// //             fetchData();
// //         }
// //     };
    
// //     if (!course) return <Typography>Loading...</Typography>;

// //     return (
// //         <Box>
// //             {/* 4a. Uniform Course Header using Grid */}
// //             <Paper sx={{ p: 3, mb: 4 }}>
// //                 <Grid container spacing={3} alignItems="center">
// //                     <Grid item xs={12} md={4}>
// //                         <Box
// //                             component="img"
// //                             src={course.thumbnailUrl}
// //                             alt={course.title}
// //                             sx={{ width: '100%', borderRadius: 2, height: 'auto' }}
// //                         />
// //                     </Grid>
// //                     <Grid item xs={12} md={8}>
// //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //                             <Box>
// //                                 <Typography variant="h4">{course.title}</Typography>
// //                                 <Typography color="text.secondary">{course.description}</Typography>
// //                             </Box>
// //                             <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpenEditCourse(true)}>Edit</Button>
// //                         </Box>
// //                     </Grid>
// //                 </Grid>
// //             </Paper>

// //             <Paper sx={{ p: 3 }}>
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //                     <Typography variant="h5">Course Videos</Typography>
// //                     <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddVideo}>Add Video</Button>
// //                 </Box>
// //                 {/* 4c. Video list with icons */}
// //                 <List>
// //                     {videos.map(video => (
// //                         <ListItem key={video.videoId} divider secondaryAction={
// //                             <>
// //                                 <IconButton edge="end" onClick={() => handleOpenEditVideo(video)}><EditIcon /></IconButton>
// //                                 <IconButton edge="end" onClick={() => handleDeleteVideo(video.videoId)} sx={{ ml: 1 }} color="error"><DeleteIcon /></IconButton>
// //                             </>
// //                         }>
// //                             <ListItemAvatar>
// //                                 <Avatar><VideocamIcon /></Avatar>
// //                             </ListItemAvatar>
// //                             <ListItemText primary={video.title} secondary={video.description} />
// //                         </ListItem>
// //                     ))}
// //                 </List>
// //             </Paper>

// //             {openEditCourse && <EditCourseModal open={openEditCourse} onClose={() => setOpenEditCourse(false)} course={course} refresh={fetchData} />}
// //             {openVideoModal && <VideoModal open={openVideoModal} onClose={() => setOpenVideoModal(false)} video={currentVideo} courseId={courseId} refresh={fetchData} />}
// //         </Box>
// //     );
// // };

// // // Sub-component for Editing Course Details
// // const EditCourseModal = ({ open, onClose, course, refresh }) => {
// //     const [title, setTitle] = useState(course.title);
// //     const [description, setDescription] = useState(course.description);
// //     const [thumbnail, setThumbnail] = useState(null);
// //     const [isSubmitting, setIsSubmitting] = useState(false);

// //     const handleUpdate = async () => {
// //         setIsSubmitting(true);
// //         try {
// //             const formData = new FormData();
// //             formData.append('Title', title);
// //             formData.append('Description', description);
// //             if (thumbnail) {
// //                 formData.append('thumbnail', thumbnail);
// //             }
// //             await api.patch(`/Courses/${course.courseId}`, formData);
// //             refresh();
// //             onClose();
// //         } catch (error) {
// //             console.error("Failed to update course:", error.response);
// //             alert("Failed to update course. The server rejected the request.");
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     return (
// //         <Dialog open={open} onClose={onClose} fullWidth>
// //             <DialogTitle>Edit Course Details</DialogTitle>
// //             <DialogContent>
// //                 <TextField fullWidth label="Course Title" defaultValue={title} onChange={e => setTitle(e.target.value)} margin="normal" />
// //                 <TextField fullWidth label="Course Description" multiline rows={4} defaultValue={description} onChange={e => setDescription(e.target.value)} margin="normal" />
// //                 <Button variant="outlined" component="label" sx={{ mt: 1 }}>
// //                     Upload New Thumbnail
// //                     <input type="file" hidden accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
// //                 </Button>
// //                 {thumbnail && <Typography sx={{display: 'inline', ml: 2, fontStyle: 'italic'}}>{thumbnail.name}</Typography>}
// //             </DialogContent>
// //             <DialogActions>
// //                 <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
// //                 <Button onClick={handleUpdate} variant="contained" disabled={isSubmitting}>
// //                     {isSubmitting ? 'Saving...' : 'Save Changes'}
// //                 </Button>
// //             </DialogActions>
// //         </Dialog>
// //     );
// // };

// // // Sub-component for Adding/Editing a Video
// // const VideoModal = ({ open, onClose, video, courseId, refresh }) => {
// //     const [title, setTitle] = useState('');
// //     const [description, setDescription] = useState('');
// //     const [file, setFile] = useState(null);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const isEditing = !!video?.videoId;

// //     useEffect(() => {
// //         setTitle(video?.title || '');
// //         setDescription(video?.description || '');
// //         setFile(null);
// //     }, [video]);

// //     const handleSave = async () => {
// //         if (!title.trim()) {
// //             alert('Video title cannot be empty.');
// //             return;
// //         }
// //         if (!isEditing && !file) {
// //             alert('You must select a video file to upload.');
// //             return;
// //         }

// //         setIsSubmitting(true);
// //         try {
// //             // 4b. To allow file changes on edit, we ALWAYS use FormData now for consistency
// //             const formData = new FormData();
// //             formData.append('Title', title);
// //             formData.append('Description', description);
// //             if (file) {
// //                 formData.append('file', file);
// //             }

// //             if (isEditing) {
// //                 await api.patch(`/courses/${courseId}/videos/${video.videoId}`, formData);
// //             } else {
// //                 await api.post(`/courses/${courseId}/videos/upload`, formData);
// //             }
// //             refresh();
// //             onClose();
// //         } catch (error) {
// //             console.error("API Error:", error.response);
// //             alert(`Failed to save video. Server responded with: ${error.response.status}`);
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     return (
// //         <Dialog open={open} onClose={onClose} fullWidth>
// //             <DialogTitle>{isEditing ? 'Edit Video' : 'Add New Video'}</DialogTitle>
// //             <DialogContent>
// //                 <TextField fullWidth label="Video Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" required/>
// //                 <TextField fullWidth label="Video Description" value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
                
// //                 {/* 4b. Show the file upload button for both adding AND editing */}
// //                 <Button variant="outlined" component="label" sx={{ mt: 1 }}>
// //                     {isEditing ? 'Upload New Video (Optional)' : 'Upload Video File'}
// //                     <input type="file" hidden accept="video/*" onChange={e => setFile(e.target.files[0])} />
// //                 </Button>
                
// //                 {file && <Typography sx={{mt: 1, display: 'inline', ml: 2}} variant="body2">{file.name}</Typography>}
// //             </DialogContent>
// //             <DialogActions>
// //                 <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
// //                 <Button onClick={handleSave} variant="contained" disabled={isSubmitting}>
// //                     {isSubmitting ? 'Saving...' : 'Save'}
// //                 </Button>
// //             </DialogActions>
// //         </Dialog>
// //     );
// // };

// // export default EditCoursePage;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Typography, Box, Paper, Button, Grid, Dialog, DialogTitle, DialogContent,
//   DialogActions, TextField
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import api from '../../api/api';

// const EditCoursePage = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [openEditCourse, setOpenEditCourse] = useState(false);
//   const [openVideoModal, setOpenVideoModal] = useState(false);
//   const [currentVideo, setCurrentVideo] = useState(null);

//   const fetchData = useCallback(async () => {
//     try {
//       const courseRes = await api.get(`/Courses/${courseId}`);
//       const videosRes = await api.get(`/courses/${courseId}/videos`);
//       setCourse(courseRes.data.data);
//       setVideos(videosRes.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch data", error);
//     }
//   }, [courseId]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleOpenAddVideo = () => {
//     setCurrentVideo({ title: '', description: '' });
//     setOpenVideoModal(true);
//   };

//   const handleOpenEditVideo = (video) => {
//     setCurrentVideo(video);
//     setOpenVideoModal(true);
//   };

//   const handleDeleteVideo = async (videoId) => {
//     if (window.confirm("Delete this video?")) {
//       await api.delete(`/courses/${courseId}/videos/${videoId}`);
//       fetchData();
//     }
//   };

//   if (!course) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, mb: 10 }}>
//       {/* Course Card Header */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Box sx={{ width: '100%', height: 250, position: 'relative', overflow: 'hidden', borderRadius: 2, mb: 2 }}>
//           <img
//             src={course.thumbnailUrl || 'https://via.placeholder.com/400x225?text=No+Image'}
//             alt={course.title}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//             }}
//           />
//         </Box>
//         <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{course.title}</Typography>
//         <Typography variant="body2" color="text.secondary">{course.description}</Typography>
//         <Box sx={{ mt: 2 }}>
//           <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpenEditCourse(true)}>
//             Edit Course
//           </Button>
//         </Box>
//       </Paper>

//       {/* Video List */}
//       <Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6">Course Videos</Typography>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddVideo}>Add Video</Button>
//         </Box>

//         {videos.length === 0 ? (
//           <Typography color="text.secondary">No videos added yet.</Typography>
//         ) : (
//           videos.map(video => (
//             <Paper key={video.videoId} variant="outlined" sx={{ mb: 2, p: 1 }}>
//               <Grid container alignItems="center" spacing={2}>
//                 {/* Video Player */}
//                 <Grid item xs={12} sm={4}>
//                   {video.videoUrl ? (
//                     <video
//                       src={video.videoUrl}
//                       controls
//                       style={{ width: '100%', borderRadius: 8, maxHeight: 150, objectFit: 'cover' }}
//                     />
//                   ) : (
//                     <Box
//                       sx={{
//                         width: '100%',
//                         height: 120,
//                         backgroundColor: 'grey.300',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         borderRadius: 2,
//                       }}
//                     >
//                       <VideocamIcon sx={{ fontSize: 40, color: 'grey.600' }} />
//                     </Box>
//                   )}
//                 </Grid>

//                 {/* Video Info */}
//                 <Grid item xs={12} sm={5}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{video.title}</Typography>
//                   <Typography variant="body2" color="text.secondary">{video.description}</Typography>
//                 </Grid>

//                 {/* Actions */}
//                 <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
//                   <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditVideo(video)} sx={{ mr: 1 }}>Edit</Button>
//                   <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteVideo(video.videoId)}>Delete</Button>
//                 </Grid>
//               </Grid>
//             </Paper>
//           ))
//         )}
//       </Box>

//       {/* Modals */}
//       {openEditCourse && (
//         <EditCourseModal open={openEditCourse} onClose={() => setOpenEditCourse(false)} course={course} refresh={fetchData} />
//       )}
//       {openVideoModal && (
//         <VideoModal open={openVideoModal} onClose={() => setOpenVideoModal(false)} video={currentVideo} courseId={courseId} refresh={fetchData} />
//       )}
//     </Box>
//   );
// };

// // Edit Course Modal
// const EditCourseModal = ({ open, onClose, course, refresh }) => {
//   const [title, setTitle] = useState(course.title);
//   const [description, setDescription] = useState(course.description);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleUpdate = async () => {
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append('Title', title);
//       formData.append('Description', description);
//       if (thumbnail) formData.append('thumbnail', thumbnail);
//       await api.patch(`/Courses/${course.courseId}`, formData);
//       refresh();
//       onClose();
//     } catch (error) {
//       console.error("Failed to update course:", error.response);
//       alert("Failed to update course.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth>
//       <DialogTitle>Edit Course Details</DialogTitle>
//       <DialogContent>
//         <TextField fullWidth label="Course Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
//         <TextField fullWidth label="Course Description" multiline rows={4} value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
//         <Button variant="outlined" component="label" sx={{ mt: 1 }}>
//           Upload New Thumbnail
//           <input type="file" hidden accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
//         </Button>
//         {thumbnail && <Typography sx={{ display: 'inline', ml: 2, fontStyle: 'italic' }}>{thumbnail.name}</Typography>}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
//         <Button onClick={handleUpdate} variant="contained" disabled={isSubmitting}>
//           {isSubmitting ? 'Saving...' : 'Save Changes'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Add/Edit Video Modal
// const VideoModal = ({ open, onClose, video, courseId, refresh }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const isEditing = !!video?.videoId;

//   useEffect(() => {
//     setTitle(video?.title || '');
//     setDescription(video?.description || '');
//     setFile(null);
//   }, [video]);

//   const handleSave = async () => {
//     if (!title.trim()) return alert('Video title cannot be empty.');
//     if (!isEditing && !file) return alert('You must select a video file.');

//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append('Title', title);
//       formData.append('Description', description);
//       if (file) formData.append('file', file);

//       if (isEditing) {
//         await api.patch(`/courses/${courseId}/videos/${video.videoId}`, formData);
//       } else {
//         await api.post(`/courses/${courseId}/videos/upload`, formData);
//       }
//       refresh();
//       onClose();
//     } catch (error) {
//       console.error("API Error:", error.response);
//       alert(`Failed to save video. Server responded with: ${error.response?.status}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth>
//       <DialogTitle>{isEditing ? 'Edit Video' : 'Add New Video'}</DialogTitle>
//       <DialogContent>
//         <TextField fullWidth label="Video Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" required />
//         <TextField fullWidth label="Video Description" value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
//         <Button variant="outlined" component="label" sx={{ mt: 1 }}>
//           {isEditing ? 'Upload New Video (Optional)' : 'Upload Video File'}
//           <input type="file" hidden accept="video/*" onChange={e => setFile(e.target.files[0])} />
//         </Button>
//         {file && <Typography sx={{ mt: 1, display: 'inline', ml: 2 }} variant="body2">{file.name}</Typography>}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
//         <Button onClick={handleSave} variant="contained" disabled={isSubmitting}>
//           {isSubmitting ? 'Saving...' : 'Save'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditCoursePage;

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography, Box, Paper, Button, Grid, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VideocamIcon from '@mui/icons-material/Videocam';
import api from '../../api/api';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [openEditCourse, setOpenEditCourse] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const courseRes = await api.get(`/Courses/${courseId}`);
      const videosRes = await api.get(`/courses/${courseId}/videos`);
      setCourse(courseRes.data.data);
      setVideos(videosRes.data.data || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }, [courseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenAddVideo = () => {
    setCurrentVideo({ title: '', description: '' });
    setOpenVideoModal(true);
  };

  const handleOpenEditVideo = (video) => {
    setCurrentVideo(video);
    setOpenVideoModal(true);
  };

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm("Delete this video?")) {
      await api.delete(`/courses/${courseId}/videos/${videoId}`);
      fetchData();
    }
  };

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, mb: 10 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ width: '100%', height: 250, position: 'relative', overflow: 'hidden', borderRadius: 2, mb: 2 }}>
          <img
            src={course.thumbnailUrl || 'https://via.placeholder.com/400x225?text=No+Image'}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">{course.description}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpenEditCourse(true)}>
            Edit Course
          </Button>
        </Box>
      </Paper>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Course Videos</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddVideo}>Add Video</Button>
        </Box>
        {videos.map(video => (
          <Paper key={video.videoId} variant="outlined" sx={{ mb: 2, p: 1 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={4}>
                {video.videoUrl ? (
                  <video src={video.videoUrl} controls style={{ width: '100%', borderRadius: 8, maxHeight: 150, objectFit: 'cover' }} />
                ) : (
                  <Box sx={{ width: '100%', height: 120, backgroundColor: 'grey.300', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}>
                    <VideocamIcon sx={{ fontSize: 40, color: 'grey.600' }} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{video.title}</Typography>
                <Typography variant="body2" color="text.secondary">{video.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditVideo(video)} sx={{ mr: 1 }}>Edit</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteVideo(video.videoId)}>Delete</Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>

      {openEditCourse && (<EditCourseModal open={openEditCourse} onClose={() => setOpenEditCourse(false)} course={course} refresh={fetchData} />)}
      {openVideoModal && (<VideoModal open={openVideoModal} onClose={() => setOpenVideoModal(false)} video={currentVideo} courseId={courseId} refresh={fetchData} />)}
    </Box>
  );
};

// No changes needed for this modal
const EditCourseModal = ({ open, onClose, course, refresh }) => {
    // ... code for this modal is unchanged
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [thumbnail, setThumbnail] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('Title', title);
            formData.append('Description', description);
            if (thumbnail) formData.append('thumbnail', thumbnail);
            
            await api.patch(`/Courses/${course.courseId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            refresh();
            onClose();
        } catch (error) {
            alert("Failed to update course.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Edit Course Details</DialogTitle>
            <DialogContent>
                <TextField fullWidth label="Course Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
                <TextField fullWidth label="Course Description" multiline rows={4} value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
                <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                    Upload New Thumbnail
                    <input type="file" hidden accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
                </Button>
                {thumbnail && <Typography sx={{ display: 'inline', ml: 2 }}>{thumbnail.name}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpdate} variant="contained" disabled={isSubmitting}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};


// --- THIS MODAL CONTAINS THE FIX ---
const VideoModal = ({ open, onClose, video, courseId, refresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!video?.videoId;

  useEffect(() => {
    setTitle(video?.title || '');
    setDescription(video?.description || '');
    setFile(null);
  }, [video]);

  const handleSave = async () => {
    if (!title.trim()) return alert('Video title cannot be empty.');
    
    setIsSubmitting(true);
    try {
      if (isEditing) {
        // ✅ EDITING LOGIC: Send only JSON data for title/description update.
        const updateData = { title, description };
        // This sends as application/json, which your backend accepts for updates.
        await api.patch(`/courses/${courseId}/videos/${video.videoId}`, updateData);

      } else {
        // ✅ ADDING LOGIC: Send FormData with the file.
        if (!file) {
            alert('You must select a video file.');
            setIsSubmitting(false);
            return;
        }
        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('file', file);

        // This sends as multipart/form-data, which your backend accepts for new uploads.
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        await api.post(`/courses/${courseId}/videos/upload`, formData, config);
      }
      refresh();
      onClose();
    } catch (error) {
      console.error("API Error:", error.response);
      alert(`Failed to save video. Server responded with: ${error.response?.status}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? 'Edit Video Details' : 'Add New Video'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Video Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Video Description" value={description} onChange={e => setDescription(e.target.value)} margin="normal" />

        {/* ✅ FIX: Only show the file upload button when ADDING a new video */}
        {!isEditing && (
            <>
                <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                    Upload Video File
                    <input type="file" hidden accept="video/*" onChange={e => setFile(e.target.files[0])} />
                </Button>
                {file && <Typography sx={{ mt: 1, display: 'inline', ml: 2 }} variant="body2">{file.name}</Typography>}
            </>
        )}
        {isEditing && (
            <Typography variant="caption" color="text.secondary" sx={{display: 'block', mt: 2}}>
                To replace the video file, please delete this video and upload a new one.
            </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCoursePage;