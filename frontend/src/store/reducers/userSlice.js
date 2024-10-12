import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase.config';

// Helper function to save user data to local storage
const saveUserToLocalStorage = (userData) => {
  localStorage.setItem('cachedUser', JSON.stringify(userData));
};

// Helper function to get user data from local storage
const getUserFromLocalStorage = () => {
  const cachedUser = localStorage.getItem('cachedUser');
  return cachedUser ? JSON.parse(cachedUser) : null;
};

// Thunk to fetch user data from Firestore, checking both students and instructors collections
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (uid, { rejectWithValue }) => {
    try {
      const studentDoc = doc(firestore, 'students', uid);
      const instructorDoc = doc(firestore, 'instructors', uid);

      const studentSnapshot = await getDoc(studentDoc);
      const instructorSnapshot = await getDoc(instructorDoc);

      let userData;
      if (studentSnapshot.exists()) {
        userData = { ...studentSnapshot.data(), role: 'student' };
      } else if (instructorSnapshot.exists()) {
        userData = { ...instructorSnapshot.data(), role: 'instructor' };
      } else {
        return rejectWithValue('User not found in students or instructors');
      }

      saveUserToLocalStorage(userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to check if user is already signed in and fetch user data
export const checkUserSignedIn = createAsyncThunk(
  'user/checkUserSignedIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(fetchUserData(user.uid));
            resolve(user);
          } else {
            const cachedUser = getUserFromLocalStorage();
            if (cachedUser) {
              resolve(cachedUser);
            } else {
              resolve(null);
            }
          }
        }, reject);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to store user data (role, name, plan, etc.)
export const storeUserData = createAsyncThunk(
  'user/storeUserData',
  async ({ uid, role, name, plan, email, isSubscribedToEmail, privacyAcceptee }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(firestore, role === 'student' ? 'students' : 'instructors', uid);
      const userData = {
        uid,
        name,
        plan,
        email,
        role,
        isSubscribedToEmail,
        privacyAcceptee,
        updatedAt: new Date().toISOString(),
      };

      await setDoc(userDocRef, userData, { merge: true });
      
      saveUserToLocalStorage(userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleSignOut = createAsyncThunk(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.removeItem('cachedUser');
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: getUserFromLocalStorage(),
    loading: false,
    error: null,
    profileCompleted: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.profileCompleted = !!(
          action.payload &&
          action.payload.name &&
          action.payload.email &&
          action.payload.role
        );
        saveUserToLocalStorage(action.payload);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkUserSignedIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserSignedIn.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(checkUserSignedIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(storeUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(storeUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.profileCompleted = true;
        saveUserToLocalStorage(state.user);
      })
      .addCase(storeUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleSignOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSignOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.profileCompleted = false;
        localStorage.removeItem('cachedUser');
      })
      .addCase(handleSignOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;