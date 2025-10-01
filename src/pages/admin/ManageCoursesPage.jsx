// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Button, IconButton, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';

// const ManageCoursesPage = () => {
//     const [courses, setCourses] = useState([]);
//     const navigate = useNavigate();

//     const fetchCourses = async () => {
//         try {
//             const response = await api.get('/Courses/mycourses');
//             setCourses(response.data.data);
//         } catch (error) {
//             console.error("Failed to fetch courses", error);
//         }
//     };

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const handleDeleteCourse = async (courseId) => {
//         if (window.confirm("Are you sure you want to delete this entire course and all its videos? This action cannot be undone.")) {
//             try {
//                 await api.delete(`/Courses/${courseId}`);
//                 alert('Course deleted successfully.');
//                 fetchCourses();
//             } catch (error) {
//                 alert('Failed to delete course.');
//                 console.error(error);
//             }
//         }
//     };

//     return (
//         <Box>
//             <Typography variant="h4" gutterBottom>Manage Your Courses</Typography>
            
//             <Grid container spacing={3}>
//                 {courses.map((course) => (
//                     <Grid item key={course.courseId} xs={12} sm={6} md={4}>
//                         <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                             {/* --- THUMBNAIL STYLE CHANGES --- */}
//                             <CardMedia
//                                 component="div"
//                                 sx={{
//                                     height: 160,
//                                     backgroundSize: 'cover',
//                                     backgroundPosition: 'center',
//                                     backgroundColor: 'grey.300',
//                                 }}
//                                 image={course.thumbnailUrl || 'https://via.placeholder.com/300x160?text=No+Image'}
//                                 title={course.title}
//                             />
//                             {/* --- END OF CHANGES --- */}

//                             <CardContent sx={{ flexGrow: 1 }}>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     {course.title}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Created: {new Date(course.createdAt).toLocaleDateString()}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button
//                                     size="small"
//                                     startIcon={<EditIcon />}
//                                     onClick={() => navigate(`/admin/edit/${course.courseId}`)}
//                                 >
//                                     Manage
//                                 </Button>
//                                 <IconButton color="error" size="small" onClick={() => handleDeleteCourse(course.courseId)}>
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };

// export default ManageCoursesPage;

import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Button, IconButton, Grid, Card, CardMedia, CardContent, CardActions, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await api.get('/Courses/mycourses');
      setCourses(response.data.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course and all its videos?")) {
      try {
        await api.delete(`/Courses/${courseId}`);
        alert('Course deleted successfully.');
        fetchCourses();
      } catch (error) {
        alert('Failed to delete course.');
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5, mb: 10 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Manage Your Courses
      </Typography>

      {courses.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            You have no courses yet.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/admin/add-course')}
          >
            Add New Course
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item key={course.courseId} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* Thumbnail */}
                <Box sx={{ width: '100%', pt: '56.25%', position: 'relative', overflow: 'hidden', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                  <CardMedia
                    component="img"
                    image={course.thumbnailUrl || 'https://via.placeholder.com/400x225?text=No+Image'}
                    alt={course.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1, px: 2, py: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.3,
                      height: 40,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: 20,
                      lineHeight: 1.2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Created: {new Date(course.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/admin/edit/${course.courseId}`)}
                  >
                    Manage
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCourse(course.courseId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ManageCoursesPage;
