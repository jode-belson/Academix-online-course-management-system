import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button, IconButton, Grid, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const AddCoursePage = () => {
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [videos, setVideos] = useState([]);
    const [showVideos, setShowVideos] = useState(false);

    const handleVideoChange = (index, event) => {
        const newVideos = [...videos];
        if (event.target.name === 'file') {
            newVideos[index][event.target.name] = event.target.files[0];
        } else {
            newVideos[index][event.target.name] = event.target.value;
        }
        setVideos(newVideos);
    };

    const addVideoField = () => {
        setVideos([...videos, { title: '', description: '', file: null }]);
        setShowVideos(true);
    };

    const removeVideoField = (index) => {
        const newVideos = videos.filter((_, i) => i !== index);
        setVideos(newVideos);
        if (newVideos.length === 0) setShowVideos(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const courseFormData = new FormData();
        courseFormData.append('Title', courseTitle);
        courseFormData.append('Description', courseDesc);
        courseFormData.append('thumbnail', thumbnail);

        try {
            const courseResponse = await api.post('/Courses', courseFormData);
            const newCourseId = courseResponse.data.courseId;

            if (!newCourseId) {
                throw new Error("Course ID not found in API response.");
            }

            for (const video of videos) {
                if (video.file && video.title) {
                    const videoFormData = new FormData();
                    videoFormData.append('Title', video.title);
                    videoFormData.append('Description', video.description);
                    videoFormData.append('file', video.file);
                    await api.post(`/courses/${newCourseId}/videos/upload`, videoFormData);
                }
            }

            alert('Course and videos created successfully!');
            navigate('/admin/manage');

        } catch (error) {
            alert('An error occurred. Please check your data and try again.');
            console.error('Failed to create course', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 5, mb: 10 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Add New Course</Typography>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
                
                {/* Course Details */}
                <Typography variant="h6" gutterBottom>Course Details</Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField
                    fullWidth
                    label="Course Title"
                    value={courseTitle}
                    onChange={e => setCourseTitle(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Course Description"
                    multiline
                    rows={4}
                    value={courseDesc}
                    onChange={e => setCourseDesc(e.target.value)}
                    margin="normal"
                    required
                />
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    Upload Thumbnail
                    <input type="file" hidden accept="image/*" onChange={e => setThumbnail(e.target.files[0])} required />
                </Button>
                {thumbnail && <Typography sx={{ display: 'inline', ml: 2 }}>{thumbnail.name}</Typography>}

                {/* Add Videos Button */}
                <Box sx={{ mt: 4 }}>
                    <Button startIcon={<AddIcon />} variant="outlined" onClick={addVideoField}>
                        Add Video
                    </Button>
                </Box>

                {/* Video Upload Section */}
                {showVideos && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>Videos</Typography>
                        {videos.map((video, index) => (
                            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            fullWidth
                                            label="Video Title"
                                            name="title"
                                            value={video.title}
                                            onChange={e => handleVideoChange(index, e)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            fullWidth
                                            label="Video Description"
                                            name="description"
                                            value={video.description}
                                            onChange={e => handleVideoChange(index, e)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <IconButton onClick={() => removeVideoField(index)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" component="label" size="small">
                                            Upload Video File
                                            <input type="file" hidden accept="video/*" name="file" onChange={e => handleVideoChange(index, e)} required />
                                        </Button>
                                        {video.file && <Typography sx={{ display: 'inline', ml: 2 }}>{video.file.name}</Typography>}
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Box>
                )}

                {/* Submit Button */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button type="submit" variant="contained" size="large">
                        Create Course
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddCoursePage;
