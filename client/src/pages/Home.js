import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Rating, Box } from '@mui/material';

// Mock data for featured books
const featuredBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://example.com/gatsby.jpg',
    rating: 4.5,
    description: 'A story of decadence and excess...',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://example.com/1984.jpg',
    rating: 4.8,
    description: 'A dystopian social science fiction...',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://example.com/mockingbird.jpg',
    rating: 4.7,
    description: 'A story of racial injustice...',
  },
];

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Book Review Platform
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Discover your next favorite book and share your thoughts with other readers.
        </Typography>
      </Box>

      <Typography variant="h4" component="h2" gutterBottom>
        Featured Books
      </Typography>
      
      <Grid container spacing={4}>
        {featuredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={book.coverImage}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  by {book.author}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                  <Rating value={book.rating} precision={0.5} readOnly />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                    {book.rating}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {book.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home; 