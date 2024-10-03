import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HotelItem, HotelListingState } from "./HotelReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HotelBookingListingState {
  bookingListing: HotelItem[];
  loading: boolean;
}

const initialState: HotelBookingListingState = {
  bookingListing: [],
  loading: false
};

export const acceptBookingRequest = createAsyncThunk(
  "acceptBookingRequest",
  async (item: HotelItem, thunkAPI) => {
    //USER
    const localItem = {
      id: item.id,
      photos: item.photos,
      address: item.address,
      title: item.title,
      rating: item.rating,
      description: item.description,
      pricePerNight: item.pricePerNight,
      geoPoint: item.geoPoint,
      amenities: item.amenities,
      status: item.status
    };
    try {
      let bookedHotelList: HotelItem[] = [];
      let temp = await AsyncStorage.getItem("bookedHotelList");
      if (temp !== null) {
        bookedHotelList = JSON.parse(temp);
        bookedHotelList = bookedHotelList.map((obj) => {
          if (obj.id === item.id) {
            obj.status = "Accepted";
          }
          return obj;
        });
      }
      await AsyncStorage.removeItem("bookedHotelList");
      await AsyncStorage.setItem(
        "bookedHotelList",
        JSON.stringify(bookedHotelList)
      );
      return bookedHotelList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
    }
  }
);

export const rejectBookingRequest = createAsyncThunk(
  "rejectBookingRequest",
  async (item: HotelItem, thunkAPI) => {
    //USER
    const localItem = {
      id: item.id,
      photos: item.photos,
      address: item.address,
      title: item.title,
      rating: item.rating,
      description: item.description,
      pricePerNight: item.pricePerNight,
      geoPoint: item.geoPoint,
      amenities: item.amenities,
      status: item.status
    };
    try {
      let bookedHotelList: HotelItem[] = [];
      let temp = await AsyncStorage.getItem("bookedHotelList");
      if (temp !== null) {
        bookedHotelList = JSON.parse(temp);
        bookedHotelList = bookedHotelList.map((obj) => {
          if (obj.id === item.id) {
            obj.status = "Rejected";
          }
          return obj;
        });
      }
      await AsyncStorage.removeItem("bookedHotelList");
      await AsyncStorage.setItem(
        "bookedHotelList",
        JSON.stringify(bookedHotelList)
      );
      return bookedHotelList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
    }
  }
);

export const createBookNowRequest = createAsyncThunk(
  "createBookNowRequest",
  async (item: HotelItem, thunkAPI) => {
    //USER
    const localItem = {
      id: item.id,
      photos: item.photos,
      address: item.address,
      title: item.title,
      rating: item.rating,
      description: item.description,
      pricePerNight: item.pricePerNight,
      geoPoint: item.geoPoint,
      amenities: item.amenities,
      status: item.status
    };
    try {
      let bookedHotelList: HotelItem[] = [];
      let temp = await AsyncStorage.getItem("bookedHotelList");
      if (temp !== null) {
        bookedHotelList = JSON.parse(temp);
        await AsyncStorage.removeItem("bookedHotelList");
      }
      localItem.status = "Pending Confirmation";
      bookedHotelList.push(localItem);

      await AsyncStorage.setItem(
        "bookedHotelList",
        JSON.stringify(bookedHotelList)
      );
      return bookedHotelList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
    }
  }
);

export const cancelBookingFromAdminHotelList = createAsyncThunk(
  "cancelBookingFromAdminHotelList",
  async (item: HotelItem, thunkAPI) => {
    //USER
    try {
      let val = await AsyncStorage.getItem("bookedHotelList");
      if (val !== null) {
        let bookedHotelList: HotelItem[] = await JSON.parse(val);
        bookedHotelList = bookedHotelList.filter((obj) => {
          if (obj.id === item.id) {
            return false;
          }
          return true;
        });
        await AsyncStorage.removeItem("bookedHotelList");
        await AsyncStorage.setItem(
          "bookedHotelList",
          JSON.stringify(bookedHotelList)
        );
        return bookedHotelList;
      }
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
    }
  }
);

export const fetchLocalSavedHotelList = createAsyncThunk(
  "fetchAdminHotelList",
  async (_, thunkAPI) => {
    // COMMON
    try {
      const val = await AsyncStorage.getItem("bookedHotelList");
      if (val !== null) {
        const bookedHotelList: HotelItem[] = await JSON.parse(val);
        return bookedHotelList;
      }
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
    }
  }
);

export const fetchSavedHotelListSlice = createSlice({
  name: "fetchHotelListSliceName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(acceptBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingListing = action.payload;
      })
      .addCase(rejectBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingListing = action.payload;
      })
      .addCase(fetchLocalSavedHotelList.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingListing = action.payload;
      })
      .addCase(cancelBookingFromAdminHotelList.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingListing = action.payload;
      })
      .addCase(createBookNowRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingListing = action.payload;
      });
  }
});

export default fetchSavedHotelListSlice.reducer;
