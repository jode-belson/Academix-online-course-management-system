// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
// // import { motion } from 'framer-motion';
// // import { useNavigate } from 'react-router-dom';
// // import api from '../../api/api';
// // import useAuth from '../../hooks/useAuth';
// // import CourseCard from '../../components/CourseCard';
// // import SearchSortBar from '../../components/SearchSortBar';
// // import Footer from '../../components/Footer';

// // const HomePage = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [sortOrder, setSortOrder] = useState('desc');
// //   const { user } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await api.get('/Courses');
// //         setCourses(response.data.data || []);
// //       } catch (err) {
// //         setError('Failed to fetch courses.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchCourses();
// //   }, []);

// //   const filteredAndSortedCourses = useMemo(() => {
// //     return courses
// //       .filter(course =>
// //         course.title.toLowerCase().includes(searchTerm.toLowerCase())
// //       )
// //       .sort((a, b) => {
// //         const dateA = new Date(a.createdAt);
// //         const dateB = new Date(b.createdAt);
// //         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
// //       });
// //   }, [courses, searchTerm, sortOrder]);

// //   const handleCardClick = (courseId) => {
// //     if (user) {
// //       navigate(`/course/${courseId}`);
// //     } else {
// //       const destination = `/course/${courseId}`;
// //       navigate('/login', { state: { from: destination } });
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
// //       <Container 
// //         maxWidth="xl" 
// //         sx={{ 
// //           flexGrow: 1, 
// //           py: 4, 
// //           // --- THIS IS THE UPDATED LINE ---
// //           // Reduced horizontal padding (px) to decrease side margins
// //           px: { xs: 2, sm: 3, md: 4 } 
// //         }}
// //       >
// //         <motion.div
// //           initial={{ opacity: 0, y: -50 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           <Box sx={{ textAlign: 'center', my: 8 }}>
// //             <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
// //               Academix
// //             </Typography>
// //             <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
// //               Your Gateway to Modern Learning.
// //             </Typography>
// //           </Box>
// //         </motion.div>

// //         <SearchSortBar
// //           searchTerm={searchTerm}
// //           setSearchTerm={setSearchTerm}
// //           sortOrder={sortOrder}
// //           setSortOrder={setSortOrder}
// //           totalCourses={filteredAndSortedCourses.length}
// //         />

// //         {loading ? (
// //           <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
// //         ) : error ? (
// //           <Alert severity="error">{error}</Alert>
// //         ) : (
// //           <Grid container spacing={4} sx={{ mt: 2 }}>
// //             {filteredAndSortedCourses.map(course => (
// //               <Grid item key={course.courseId} xs={12} sm={6} md={3}>
// //                 <motion.div whileHover={{ y: -5 }} style={{ width: '100%', height: '100%' }}>
// //                   <CourseCard course={course} onClick={() => handleCardClick(course.courseId)} />
// //                 </motion.div>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         )}
// //       </Container>
// //       <Footer />
// //     </Box>
// //   );
// // };

// // export default HomePage;

// import React, { useState, useEffect, useMemo } from 'react';
// import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';
// import useAuth from '../../hooks/useAuth';
// import CourseCard from '../../components/CourseCard';
// import SearchSortBar from '../../components/SearchSortBar';
// import Footer from '../../components/Footer';

// const HomePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/Courses');
//         setCourses(response.data.data || []);
//       } catch (err) {
//         setError('Failed to fetch courses.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const filteredAndSortedCourses = useMemo(() => {
//     return courses
//       .filter(course =>
//         course.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       .sort((a, b) => {
//         const dateA = new Date(a.createdAt);
//         const dateB = new Date(b.createdAt);
//         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//       });
//   }, [courses, searchTerm, sortOrder]);

//   const handleCardClick = (courseId) => {
//     if (user) {
//       navigate(`/course/${courseId}`);
//     } else {
//       const destination = `/course/${courseId}`;
//       navigate('/login', { state: { from: destination } });
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
//       <Container 
//         maxWidth="xl" 
//         sx={{ 
//           flexGrow: 1, 
//           py: 4, 
//           px: { xs: 2, sm: 3, md: 4 } 
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Box sx={{ textAlign: 'center', my: 8 }}>
//             <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//               Academix
//             </Typography>
//             <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
//               Your Gateway to Modern Learning.
//             </Typography>
//           </Box>
//         </motion.div>

//         <SearchSortBar
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           sortOrder={sortOrder}
//           setSortOrder={setSortOrder}
//           totalCourses={filteredAndSortedCourses.length}
//         />

//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
//         ) : error ? (
//           <Alert severity="error">{error}</Alert>
//         ) : (
//           <Grid container spacing={4} sx={{ mt: 2 }}>
//             {filteredAndSortedCourses.map(course => (
//               // --- THIS IS THE FIX ---
//               // Added sx={{ display: 'flex' }} to make all cards in a row have the same height.
//               <Grid item key={course.courseId} xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
//                 <motion.div whileHover={{ y: -5 }} style={{ width: '100%', height: '100%' }}>
//                   <CourseCard course={course} onClick={() => handleCardClick(course.courseId)} />
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>
//       <Footer />
//     </Box>
//   );
// };

// export default HomePage;

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from '../../context/AuthProvider'; // Corrected path
import CourseCard from '../../components/CourseCard';
import SearchSortBar from '../../components/SearchSortBar';
import Footer from '../../components/Footer';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/Courses');
        setCourses(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    return courses
      .filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [courses, searchTerm, sortOrder]);

  // Handle card click with role-based routing
  const handleCardClick = (courseId) => {
    if (!user) {
      // Not logged in → go to login page
      navigate('/login', { state: { from: `/course/${courseId}` } });
      return;
    }

    if (user.role === 'admin') {
      // ✅ FIX: Navigate to the correct admin edit page URL
      navigate(`/admin/edit/${courseId}`);
    } else {
      // Normal user → go to course detail page
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <Container 
        maxWidth="xl" 
        sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', my: 8 }}>
            <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Academix
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Your Gateway to Modern Learning.
            </Typography>
          </Box>
        </motion.div>

        {/* Search & Sort */}
        <SearchSortBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          totalCourses={filteredAndSortedCourses.length}
        />

        {/* Courses Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {filteredAndSortedCourses.map(course => (
              <Grid item key={course.courseId} xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                <motion.div whileHover={{ y: -5 }} style={{ width: '100%', height: '100%' }}>
                  <CourseCard course={course} onClick={() => handleCardClick(course.courseId)} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
