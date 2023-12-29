import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    // adds a photo to state.photos
    addPhoto: (state, action) =>{
      state.photos.unshift(action.payload);
    },
    // removes a photo from state.photos
    removePhoto: (state, action) => {
      const indexToRemove = state.photos.findIndex(photo => photo.id === action.payload);
      if(indexToRemove !== -1){
        state.photos.splice(indexToRemove, 1);
      }
    }
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;

// return a filtered list of photos whose captions match the user's search term
export const selectFilteredPhotos = createSelector(
  [selectAllPhotos, selectSearchTerm],
  (photos, searchTerm) => {
    return photos.filter((photo) => 
    photo.caption.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
)
