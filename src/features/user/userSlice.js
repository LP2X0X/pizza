import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  userName: '',
  position: {},
  address: '',
  addressStatus: '',
};

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.latitude}&longitude=${position.longitude}`
    );

    const addressObj = await res.json();
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    createUser(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.addressStatus = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.addressStatus = 'fulfilled';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.addressStatus = 'error';
      }),
});

export default userSlice.reducer;
export const { createUser } = userSlice.actions;

export function getUserName(state) {
  return state.user.userName;
}
