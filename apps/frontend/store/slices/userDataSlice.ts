import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'shared';

interface UserDataState {
  userData: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserDataState = {
  userData: null,
  loading: false,
  error: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUserData, setLoading, setError } = userDataSlice.actions;
export default userDataSlice.reducer;