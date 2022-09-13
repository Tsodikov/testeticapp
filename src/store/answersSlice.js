import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
// import { useStringOperation } from "../hooks/string.hook";

const answersAdapter = createEntityAdapter();

const initialState = answersAdapter.getInitialState({
    answersLoadingStatus: 'idle',
    // activeAnswer: {},
    editAnswerMode: false,
    editingAnswer: {
        id: null,
        textAnswer: '',
        answerRight: false
    },
});

export const fetchAnswers = createAsyncThunk(
    'answers/fetchAnswers',
    async (questId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/answers/get/${questId}`);
});

export const addAnswers = createAsyncThunk(
    'answers/addAnswers',
    async (addingAnswer) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/answers/add`, 'POST', JSON.stringify(addingAnswer));
});

export const deleteAnswer = createAsyncThunk(
    'answers/deleteAnswers',
    async (id) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/answers/del/${id}`, 'DELETE');
});

export const updateAnswer = createAsyncThunk(
    'answers/updateAnswer',
    async ({newAnswer, id}) => {
        const { request } = useHttp();
        // console.log(answer)
        const result = await request(`https://testetic.herokuapp.com/answers/update/${id}`, 'PATCH', JSON.stringify(newAnswer))
        if (!result) return [];
        return result;
});

export const answersSlice = createSlice({
    name: "answers",
    initialState,
    reducers: {
        answerCreate: (state, action) => {
            answersAdapter.addOne(state, action.payload);
        },
        allAnswersRemove: (state, action) => {
            answersAdapter.removeAll();
        },
        answerSetOne: (state, action) => {
            answersAdapter.setOne(state, action.payload);
        },
        setAnswersLoadingStatus: (state, action) => {
            state.answersLoadingStatus = action.payload;
        },
        clearEditingAnswer: (state, action) => {
            state.editingAnswer = {
                id: null,
                textAnswer: '',
                answerRight: false,
            };
        },
        setEditingAnswer: (state, action) => {
            state.editingAnswer = action.payload;
        },
        setEditAnswerMode: (state, action) => {
            state.editAnswerMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAnswers.pending, (state) => {
            state.answersLoadingStatus = 'loading';
        })
        .addCase(fetchAnswers.fulfilled, (state, action) => {
            state.answersLoadingStatus = 'loaded';
            answersAdapter.setAll(state, action.payload);
        })
        .addCase(fetchAnswers.rejected, (state) => {
            state.answersLoadingStatus = 'error';
        })
        .addCase(deleteAnswer.pending, (state) => {
            state.answersLoadingStatus = 'loading';
        })
        .addCase(deleteAnswer.fulfilled, (state, action) => {
            state.answersLoadingStatus = 'loaded';
            answersAdapter.removeOne(state, action.payload)
        })
        .addCase(deleteAnswer.rejected, (state) => {
            state.answersLoadingStatus = 'error';
        })
        .addCase(addAnswers.pending, (state) => {
            state.answersLoadingStatus = 'loading';
        })
        .addCase(addAnswers.fulfilled, (state, action) => {
            state.answersLoadingStatus = 'loaded';
            // state.activeAnswerId = action.payload.id;
            console.log(action.payload)
            answersAdapter.addOne(state, action.payload);
        })
        .addCase(addAnswers.rejected, (state) => {
            state.answersLoadingStatus = 'error';
        })
        .addCase(updateAnswer.pending, (state) => {
            state.answersLoadingStatus = 'loading';
        })
        .addCase(updateAnswer.fulfilled, (state, action) => {
            state.answersLoadingStatus = 'loaded';
            answersAdapter.updateOne(state, {id: action.payload.id, changes: action.payload});
        })
        .addCase(updateAnswer.rejected, (state) => {
            state.answersLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const { reducer, actions } = answersSlice;

export const { selectAll } = answersAdapter.getSelectors(state => state.answers);

export const answersSelector = createSelector(
    state => state.answers,
    selectAll,
    answers => {
        return Object.values(answers.entities);
    }
)

export default reducer;

export const {
    setAnswersLoadingStatus,
    // setActiveAnswer,
    allAnswersRemove,
    clearEditingAnswer,
    answerCreate,
    setEditAnswerMode,
    setEditingAnswer, 
} = actions