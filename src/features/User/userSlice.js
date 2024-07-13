import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../features/services/apiGeocoding";



function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


export const fetchAddress = createAsyncThunk("user/fetchAddress", async function () {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
});



const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        // Directly mutate the draft state
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        console.log(state.error);
      }),

});



export const { updateName } = userSlice.actions;
export const getUserName = (state) => state.user.username;
export default userSlice.reducer;
