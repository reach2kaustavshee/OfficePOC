import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface GeoPoint {
  latitude?: number;
  longitude?: number;
};

export interface HotelItem {
  id?: string;
  photos?: string;
  address?: string;
  title?: string;
  rating?: number;
  description?: string;
  pricePerNight:number;
  geoPoint?: GeoPoint;
  amenities?: string[];
  status: "Accepted" | "Rejected" | "Pending Confirmation" | null
};

export interface HotelListingState {
  listing: HotelItem[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: HotelListingState = {
  listing: [],
  loading: false,
  error: null,
};

export const fetchHotelList = createAsyncThunk<
  HotelItem[],
  void,
  { rejectValue: string }
>("fetchHotelList", async (_, thunkAPI) => {
  try {
    //const response = await fetch("https://api.github.com/repos/github/hub/issues");
    const json = await require("../../../../assets/hotelList.json");
    let arr = json as HotelItem[];
    arr = arr.map((obj) => {
      obj.status = null;
      return obj;
    });
    return arr;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
  }
});

export const fetchHotelListSlice = createSlice({
    name: 'fetchHotelListSliceName',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchHotelList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchHotelList.fulfilled, (state, action) => {
            state.loading = false;
            state.listing = action.payload;
        })
        .addCase(fetchHotelList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something is wrong, please try again later"
        })
    }
});

export default fetchHotelListSlice.reducer;
