
import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import api from '../../api/api';
import CourseCard from '../../components/CourseCard';
import { useNavigate } from 'react-router-dom';

const SubscribedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await api.get('/subscriptions');
                // The API returns courseId and courseTitle. We need to fetch full course details for the cards.
                // For simplicity here, we'll assume a new endpoint or map details. A better API would return full course objects.
                // Let's adapt to what we have. We'll fetch all courses and filter.
                const allCoursesRes = await api.get('/Courses');
                const subscribedIds = new Set(response.data.data.map(sub => sub.courseId));
                const subscribedCourses = allCoursesRes.data.data.filter(course => subscribedIds.has(course.courseId));
                setCourses(subscribedCourses);
            } catch (error) {
                console.error('Failed to fetch subscribed courses', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubscriptions();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Subscribed Courses</Typography>
            {courses.length > 0 ? (
                 <Grid container spacing={4}>
                    {courses.map(course => (
                        <Grid item key={course.courseId} xs={12} sm={6} md={4}>
                            <CourseCard course={course} onClick={() => navigate(`/course/${course.courseId}`)} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Alert severity="info">You are not subscribed to any courses yet. Browse the homepage to get started!</Alert>
            )}
        </Box>
    );
};

export default SubscribedCourses;