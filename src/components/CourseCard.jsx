import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';

const CourseCard = ({ course, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 260,          // 🔹 fix width for grid consistency
        height: 360,         // 🔹 fix height so all cards match
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#fff',
        boxShadow: 'rgba(0,0,0,0.08) 0px 2px 6px',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 'rgba(0,0,0,0.15) 0px 8px 24px',
        },
      }}
    >
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* 🔹 Fixed Thumbnail */}
        <CardMedia
          component="img"
          image={course.thumbnailUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={course.title}
          sx={{
            height: 150,       // same thumbnail height for all
            width: '100%',
            objectFit: 'cover',
          }}
        />

        {/* 🔹 Content (clamped text) */}
        <CardContent sx={{ flexGrow: 1, width: '100%', py: 1.5 }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,  // allow up to 2 lines
              WebkitBoxOrient: 'vertical',
            }}
          >
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.4,
              mt: 0.5,
            }}
          >
            {course.description}
          </Typography>
        </CardContent>

        {/* 🔹 Footer (pinned bottom) */}
        <Box sx={{ p: 2, pt: 0, width: '100%', mt: 'auto' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            📅 Created: {new Date(course.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
