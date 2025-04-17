import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Box,
  Rating,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Mock user data
const mockUser = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar1.jpg',
  bio: 'Avid reader and book enthusiast',
  joinedDate: '2023-01-15T00:00:00Z',
  reviews: [
    {
      id: 1,
      book: {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverImage: 'https://example.com/gatsby.jpg',
      },
      rating: 5,
      comment: 'A masterpiece of American literature...',
      createdAt: '2023-04-15T10:30:00Z',
    },
    // Add more mock reviews
  ],
};

function UserProfile() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* User Info Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={mockUser.avatar}
              alt={mockUser.username}
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto',
                mb: 2,
              }}
            />
            <Typography variant="h5" gutterBottom>
              {mockUser.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {mockUser.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
              {mockUser.bio}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Member since {new Date(mockUser.joinedDate).toLocaleDateString()}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Paper>

          {/* Reading Stats */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Reading Stats
            </Typography>
            <List>
              <ListItem sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2">Reviews Written</Typography>
                <Typography variant="body2">{mockUser.reviews.length}</Typography>
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2">Average Rating</Typography>
                <Typography variant="body2">4.5</Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* User Reviews Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            My Reviews
          </Typography>
          {mockUser.reviews.map((review) => (
            <Card key={review.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <img
                      src={review.book.coverImage}
                      alt={review.book.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '150px',
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="h6" gutterBottom>
                      {review.book.title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      by {review.book.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{review.comment}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserProfile; 