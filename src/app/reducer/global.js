import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        isDrawingManagerOpen: false,
        isMenuMobileOpen: false,
        isSearchMobileOpen: false,
        polygon: null,
        selectedOptions: [],
        loadingCount: 0,
        isMobile: false,
    },
    reducers: {
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        openSearchMobile: state => {
            state.isSearchMobileOpen = true;
        },
        closeSearchMobile: state => {
            state.isSearchMobileOpen = false;
        },
        openMenuMobile: state => {
            state.isMenuMobileOpen = true;
        },
        closeMenuMobile: state => {
            state.isMenuMobileOpen = false;
        },
        updateMenuMobileVisible: (state, action) => {
            state.isMenuMobileOpen = action.payload.visible;
        },
        openDrawingManager: state => {
            state.isDrawingManagerOpen = true;
        },
        closeDrawingManager: state => {
            state.isDrawingManagerOpen = false;
        },
        updatePolygon: (state, action) => {
            state.polygon = action.payload.polygon;
        },
        changeSelectedOptions: (state, action) => {
            state.selectedOptions = [].concat(action.payload.selectedOptions);
        },
        requestLoading: (state, action) => {
            state.loadingCount++;
        },
        cancelRequestLoading: (state, action) => {
            state.loadingCount--;
        },
    },
});

export const {
    openSearchMobile,
    closeSearchMobile,
    openMenuMobile,
    closeMenuMobile,
    openDrawingManager,
    closeDrawingManager,
    updatePolygon,
    changeSelectedOptions,
    requestLoading,
    cancelRequestLoading,
    setIsMobile,
} = globalSlice.actions;

export default globalSlice.reducer;