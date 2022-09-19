import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const testSessionAdapter = createEntityAdapter();

const clearTestSession = {
    id: null,                   
    testId: '',          
    userId: '',          
    registrationDateTime: '', 
    confirmationRegister: '', 
    invitationSended: '',     
    confirmationInvite: '',   
    startTest: '',            
    endTest: '',
    status: '',
}

const initialState = testSessionAdapter.getInitialState({
    testSessionLoadingStatus: 'idle',
    currentTestSession: clearTestSession,
    currentTestSessionArr: [],
});

export const createTestSession = createAsyncThunk(
    'testSession/createTestSession',
    async (testSession) => {
            const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/create`, 'POST', JSON.stringify(testSession));
});

export const getByUserTestId = createAsyncThunk(
    'testSession/getByUserTestId',
    async (params) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/getbyusertest/${params.userId}/${params.testId}`);
});

export const getByUserId = createAsyncThunk(
    'testSession/getByUserId',
    async (params) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/getbyuser/${params.userId}/${params.status}`);
});

export const getByTestId = createAsyncThunk(
    'testSession/getByTestId',
    async (testId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/getbytest/${testId}`);
});

export const updateTestSession = createAsyncThunk(
    'testSession/updateTestSession',
    async (params) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/update/${params.id}`, 'PATCH', JSON.stringify(params.testSession));
});

export const testSessionSlice = createSlice({
    name: "testSession",
    initialState,
    reducers: {
        testSessionUpdate: (state, action) => {
            testSessionAdapter.updateOne(state, action.payload);
        },
        setCurrentTestSession: (state, action) => {
            state.currentTestSession = action.payload;
        },
        clearCurrentTestSession: (state) => {
            state.currentTestSession = clearTestSession;
        },
        // eraseTestSession: (state) => {
        //     testSessionAdapter.removeAll({});
        // },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTestSession.pending, (state) => {
            state.testSessionLoadingStatus = 'loading';
        })
        .addCase(createTestSession.fulfilled, (state, action) => {
            state.testSessionLoadingStatus = 'loaded';
            state.currentTestSession = action.payload;
            testSessionAdapter.addOne(state, action.payload);
        })
        .addCase(createTestSession.rejected, (state) => {
            state.testSessionLoadingStatus = 'error';
        })
        .addCase(getByUserTestId.pending, (state) => {
            state.testSessionLoadingStatus = 'loading';
        })
        .addCase(getByUserTestId.fulfilled, (state, action) => {
            state.testSessionLoadingStatus = 'loaded';
            if (action.payload) state.currentTestSessionArr.push(action.payload);
            // testSessionAdapter.addOne(state, action.payload? action.payload : {});
            state.currentTestSession = action.payload;
        })
        .addCase(getByUserTestId.rejected, (state) => {
            state.testSessionLoadingStatus = 'error';
        })
        .addCase(getByUserId.pending, (state) => {
            state.testSessionLoadingStatus = 'loading';
        })
        .addCase(getByUserId.fulfilled, (state, action) => {
            state.testSessionLoadingStatus = 'loaded';
            testSessionAdapter.setAll(state, action.payload);
        })
        .addCase(getByUserId.rejected, (state) => {
            state.testSessionLoadingStatus = 'error';
        })
        .addCase(getByTestId.pending, (state) => {
            state.testSessionLoadingStatus = 'loading';
        })
        .addCase(getByTestId.fulfilled, (state, action) => {
            state.testSessionLoadingStatus = 'loaded';
            testSessionAdapter.setAll(state, action.payload);
        })
        .addCase(getByTestId.rejected, (state) => {
            state.testSessionLoadingStatus = 'error';
        })
        .addCase(updateTestSession.pending, (state) => {
            state.testSessionLoadingStatus = 'loading';
        })
        .addCase(updateTestSession.fulfilled, (state, action) => {
            testSessionAdapter.updateOne(state, {id: action.payload.id, changes: action.payload});
            state.currentTestSession = action.payload;
            state.testSessionLoadingStatus = 'loaded';
        })
        .addCase(updateTestSession.rejected, (state) => {
            state.testSessionLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const { reducer, actions } = testSessionSlice;

export const { selectAll } = testSessionAdapter.getSelectors(state => state.testSession);

export default reducer;

export const testSessionSelector = createSelector(
    state => state.testSession,
    selectAll,
    testSession => {
        return Object.values(testSession.entities);
    }
)

export const {
    testSessionUpdate,
    clearCurrentTestSession,
    // eraseTestSession,
    setCurrentTestSession,
} = actions