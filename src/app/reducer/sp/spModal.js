import {createSlice} from '@reduxjs/toolkit';

export const spModal = createSlice({
    name: 'spModal',
    initialState: {
        PROVINCE_CODE: 74, // 省分编码
        EPARCHY_CODE: 'V0430100', // 地市编码，-1为省分调配
        isShowModal: false,
    },
    reducers: {
        changeModalState: (state, action) => {
            state.isShowModal = action.payload;
        },
        changeCodeState: (state, action) => {
            state.EPARCHY_CODE = action.payload.EPARCHY_CODE;
            state.PROVINCE_CODE = action.payload.PROVINCE_CODE;
        },
    },
});
export const {
    changeModalState,
    changeCodeState,
} = spModal.actions;

export default spModal.reducer;
