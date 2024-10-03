import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Rating } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import bgImage from '../assets/bg2.jpg'; 
import FavoriteIcon from '@mui/icons-material/Favorite';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0,  
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (event, newRating) => {
    setFeedback({
      ...feedback,
      rating: newRating,  
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSubmitted(true);
        setFeedback({
          name: '',
          email: '',
          message: '',
          rating: 0,  
        });
        setError('');
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to send feedback. Please try again later.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {!submitted ? (
          <>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              We'd Love to Hear Your Feedback<FavoriteIcon color="error" sx={{ fontSize: '1.8rem' }}/>!
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={feedback.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Message"
                name="message"
                value={feedback.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />


              <Typography component="legend" sx={{ marginTop: '20px', textAlign: 'center' }}>How would your rate your experience?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Rating 
                name="rating"
                value={feedback.rating}
                onChange={handleRatingChange}
                precision={1}
                sx={{ fontSize: '2rem' }}

              />
              </Box>
              <Typography sx={{ marginTop: '20px', textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                sx={{ marginTop: '20px' }}
              >
                Send Feedback
              </Button>
              </Typography>
            </form>
          </>
        ) : (
          <Typography variant="h5" color="success.main" sx={{ textAlign: 'center' }}>
            Thank you for your feedback!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FeedbackPage;
