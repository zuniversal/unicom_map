import {createSlice} from '@reduxjs/toolkit';

const specialCity = ['110000', '120000', '500000', '310000'];
export const locationSlice = createSlice({
    name: 'location',
    initialState: {
        location: [],
        adcode: '430000',
        adLevel: 1, // 1 省，2 市，3 区
        currentAdminName: '湖南省', // 网格名称
    },
    reducers: {
        changeLocation: (state, action) => {
            // console.log('common location changeLocation ==>', state, action)
            state.location = action.payload.location;
            state.adLevel = state.location.length;
            const baseAdcode = state.location[0];
            if (baseAdcode && specialCity.indexOf(baseAdcode) !== -1) {
                state.adLevel = 2;
                if (state.location.length > 1) {
                    state.adLevel = 3;
                }
            }
            state.adcode = action.payload.location[action.payload.location.length - 1];
        },
        updateCurrentAdminName: (state, action) => {
            state.currentAdminName = action.payload;
        },
    },
});

export const {
    changeLocation,
    updateCurrentAdminName,
} = locationSlice.actions;
export default locationSlice.reducer;
