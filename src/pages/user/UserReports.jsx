import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, LinearProgress, Link as MuiLink, Alert } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import api from '../../api/api';

const UserReports = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const generateReport = async () => {
            try {
                setLoading(true);

                // Step 1: Fetch initial data (all subscriptions and all certificates)
                const [subsRes, certsRes] = await Promise.all([
                    api.get('/subscriptions'),
                    api.get('/certificate/my-certificates')
                ]);

                const subscriptions = subsRes.data.data || [];
                const certificates = certsRes.data || [];

                // Step 2: For each subscription, fetch its video list and user's progress
                const detailedSubscriptionsPromises = subscriptions.map(async (sub) => {
                    const [videosRes, progressRes] = await Promise.all([
                        api.get(`/courses/${sub.courseId}/videos`),
                        api.get(`/videoprogress/course/${sub.courseId}`)
                    ]);

                    const videos = videosRes.data.data || [];
                    const progress = progressRes.data || [];
                    
                    // Step 3: Calculate the progress percentage
                    const totalVideos = videos.length;
                    const completedVideos = progress.filter(p => p.isCompleted).length;
                    const progressPercent = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
                    
                    // Step 4: Find the matching certificate for this course
                    const certificate = certificates.find(cert => cert.courseId === sub.courseId);

                    return {
                        ...sub,
                        progressPercent,
                        certificateUrl: certificate?.cloudUrl,
                    };
                });

                // Wait for all the detailed subscription data to be fetched and processed
                const detailedSubscriptions = await Promise.all(detailedSubscriptionsPromises);
                setReportData(detailedSubscriptions);

            } catch (err) {
                setError('Failed to generate reports. Please try again later.');
                console.error("Report generation error:", err);
            } finally {
                setLoading(false);
            }
        };

        generateReport();
    }, []);

    // Helper component for the progress bar
    const ProgressBar = ({ value }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>My Learning Summary</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course Name</TableCell>
                            <TableCell>Subscribed Date</TableCell>
                            <TableCell sx={{ minWidth: 200 }}>Progress</TableCell>
                            <TableCell align="center">Certificate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((row) => (
                            <TableRow key={row.courseId}>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">{row.courseTitle}</Typography>
                                </TableCell>
                                <TableCell>{new Date(row.subscribedAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <ProgressBar value={row.progressPercent} />
                                </TableCell>
                                <TableCell align="center">
                                    {row.certificateUrl ? (
                                        <Button
                                            variant="contained"
                                            startIcon={<DownloadIcon />}
                                            href={row.certificateUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Download
                                        </Button>
                                    ) : row.progressPercent === 100 ? (
                                        <Typography variant="body2" color="success.main">Completed</Typography>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">In Progress</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserReports;