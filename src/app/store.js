import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './reducer/counter';
// import fiveLeftForm from './reducer/5g/5gLeftForm';
// import threeDetail from './reducer/3k/detail';
// import threeLeftForm from './reducer/3k/3kLeftForm';
import location from './reducer/common/location';
import globalReducer from './reducer/global';
// import ncSelectReducer from './reducer/nc/ncSelect';
// import lySelect from './reducer/ly/lySelect';
// import yytSelect from './reducer/yyt/yytSelect';
import sp from './reducer/sp/index';
import spModal from './reducer/sp/spModal';


export default configureStore({
    reducer: {
        counter: counterReducer,
        // fiveLeftForm: fiveLeftForm,
        // threeDetail,
        location: location,
        global: globalReducer,
        // ncSelect: ncSelectReducer,
        // threeLeftForm: threeLeftForm,
        // lySelect,
        // yytSelect,
        sp,
        spModal,
    },
});
