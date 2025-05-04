import React, { useState } from 'react';
import { Box, Paper, Grid, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setUserData, setLoading, setError } from '../../store/slices/userDataSlice';
import { fetchUserData, updateUserData } from '../../apis/user';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import FormField from '../molecules/FormField';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { userData, loading, error } = useSelector((state: RootState) => state.userData);
  const [name, setName] = useState('');
  
  const handleFetchUserData = async () => {
    if (!user?.id || !user?.token) return;
    
    dispatch(setLoading(true));
    
    try {
      const data = await fetchUserData(user.id, user.token);
      dispatch(setUserData(data));
      setName(data.name);
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to fetch user data'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const handleUpdateUserData = async () => {
    if (!user?.id || !user?.token) return;
    
    dispatch(setLoading(true));
    
    try {
      const data = await updateUserData(user.id, { name }, user.token);
      dispatch(setUserData(data));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to update user data'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            User Profile
          </Typography>
          
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          
          <Box sx={{ mt: 3, mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFetchUserData}
              disabled={loading}
            >
              Fetch User Data
            </Button>
          </Box>
          
          {loading ? (
            <Box display="flex" justifyContent="center" mt={3}>
              <CircularProgress />
            </Box>
          ) : userData ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
              <Typography>
                ID: {userData.id}
              </Typography>
              <Typography>
                Email: {userData.email}
              </Typography>
              <Typography>
                Rating: {userData.totalAverageWeightRatings}
              </Typography>
              <Typography>
                Rents: {userData.numberOfRents}
              </Typography>
              <Typography gutterBottom>
                Last Active: {new Date(userData.recentlyActive * 1000).toLocaleString()}
              </Typography>
              
              <Box component="form" sx={{ mt: 3 }}>
                <FormField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleUpdateUserData}
                  disabled={loading}
                >
                  Update User Data
                </Button>
              </Box>
            </Box>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;