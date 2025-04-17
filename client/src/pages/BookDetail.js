import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Rating,
  Divider,
  TextField,
  Button,
  Paper,
  Avatar,
} from '@mui/material';

// Mock book data
const mockBook = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  coverImage: 'https://example.com/gatsby.jpg',
  rating: 4.5,
  genre: 'Classic',
  description: 'A story of decadence and excess...',
  publishedYear: 1925,
  reviews: [
    {
      id: 1,
      user: {
        id: 1,
        username: 'john_doe',
        avatar: 'https://example.com/avatar1.jpg',
      },
      rating: 5,
      comment: 'A masterpiece of American literature...',
      createdAt: '2023-04-15T10:30:00Z',
    },
    // Add more mock reviews
  ],
};

function BookDetail() {
  const { id } = useParams();
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // TODO: Implement review submission
    console.log('Submitting review:', newReview);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Book Details Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={mockBook.coverImage}
              alt={mockBook.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {mockBook.title}
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            by {mockBook.author}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={mockBook.rating} precision={0.5} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>
              ({mockBook.rating} average rating)
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {mockBook.description}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Genre: {mockBook.genre}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Published: {mockBook.publishedYear}
          </Typography>
        </Grid>
      </Grid>

      {/* Review Form Section */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Write a Review
        </Typography>
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmitReview}>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend">Your Rating</Typography>
              <Rating
                value={newReview.rating}
                onChange={(event, newValue) => {
                  setNewReview({ ...newReview, rating: newValue });
                }}
                size="large"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit Review
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Reviews
        </Typography>
        {mockBook.reviews.map((review) => (
          <Paper key={review.id} sx={{ p: 3, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={review.user.avatar} alt={review.user.username} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1">{review.user.username}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
            <Typography variant="body1">{review.comment}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default BookDetail; 