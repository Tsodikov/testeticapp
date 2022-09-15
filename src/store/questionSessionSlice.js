import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const questionSessionAdapter = createEntityAdapter();

const clearQuestionSession = {
    id: null,                                
    startQuestion: '',            
    endQuestion: '',
    result: false,
    choiceAnswerId: null,
    testSessionId: null,
    questionId: null,
}

const initialState = questionSessionAdapter.getInitialState({
    questionSessionLoadingStatus: 'idle',
    currentQuestionSession: clearQuestionSession,
});

export const createQuestionSession = createAsyncThunk(
    'questionSession/createQuestionSession',
    async (questionSession) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/createquestionsession`, 'POST', JSON.stringify(questionSession));
});

export const updateQuestionSession = createAsyncThunk(
    'questionSession/updateQuestionSession',
    async (params) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/updatequestionsession/${params.id}`, 'PATCH', JSON.stringify(params.questionSession));
});

export const fetchQSbYTsId = createAsyncThunk(
    'questionSession/fetchQSbYTsId',
    async (tSId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/testsession/getqsbytsid/${tSId}`);
});

export const questionSessionSlice = createSlice({
    name: "questionSession",
    initialState,
    reducers: {
        questionSessionUpdate: (state, action) => {
            questionSessionAdapter.updateOne(state, action.payload);
        },
        setCurrentQuestionSession: (state, action) => {
            state.currentQuestionSession = action.payload;
        },
        clearCurrentQuestionSession: (state) => {
            state.currentQuestionSession = clearQuestionSession;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createQuestionSession.pending, (state) => {
            state.questionSessionLoadingStatus = 'loading';
        })
        .addCase(createQuestionSession.fulfilled, (state, action) => {
            state.questionSessionLoadingStatus = 'loaded';
            state.currentQuestionSession = action.payload;
            questionSessionAdapter.addOne(state, action.payload);
        })
        .addCase(createQuestionSession.rejected, (state) => {
            state.questionSessionLoadingStatus = 'error';
        })
        .addCase(updateQuestionSession.pending, (state) => {
            state.questionSessionLoadingStatus = 'loading';
        })
        .addCase(updateQuestionSession.fulfilled, (state, action) => {
            questionSessionAdapter.updateOne(state, {id: action.payload.id, changes: action.payload});
            state.questionSessionLoadingStatus = 'loaded';
        })
        .addCase(updateQuestionSession.rejected, (state) => {
            state.questionSessionLoadingStatus = 'error';
        })
        .addCase(fetchQSbYTsId.pending, (state) => {
            state.questionSessionLoadingStatus = 'loading';
        })
        .addCase(fetchQSbYTsId.fulfilled, (state, action) => {
            questionSessionAdapter.setAll(state, action.payload);
            state.questionSessionLoadingStatus = 'loaded';
        })
        .addCase(fetchQSbYTsId.rejected, (state) => {
            state.questionSessionLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const { reducer, actions } = questionSessionSlice;

export const { selectAll } = questionSessionAdapter.getSelectors(state => state.questionSession);

export default reducer;

export const questionSessionSelector = createSelector(
    state => state.questionSession,
    selectAll,
    questionSession => {
        return Object.values(questionSession.entities);
    }
)

export const {
    questionSessionUpdate,
    clearCurrentQuestionSession,
    setCurrentQuestionSession,
} = actions