import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const questionsAdapter = createEntityAdapter();

const initialState = questionsAdapter.getInitialState({
    questionsLoadingStatus: 'idle',
    activeQuestion: {},
    editQuestionMode: false,
    editingQuestion: {
        id: null,
        titleOfQuestion: '',
        explanationText: '',
        testID: null,
        weight: 1,
        oneAnswer: true,
        answerType: "text",
        answers: [],
    },
});

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async (testId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/questions/get/${testId}`);
});

export const addQuestions = createAsyncThunk(
    'questions/addQuestions',
    async (addingQuestion) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/questions/add`, 'POST', JSON.stringify(addingQuestion));
});

export const deleteQuestion = createAsyncThunk(
    'questions/deleteQuestions',
    async (id) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/questions/del/${id}`, 'DELETE');
});

export const updateQuestion = createAsyncThunk(
    'questions/updateQuestion',
    async ({question, id}) => {
        const { request } = useHttp();
        const result = await request(`https://testetic.herokuapp.com/questions/update/${id}`, 'PATCH', JSON.stringify(question))
        if (!result) return [];
        return result;
});

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        questionCreate: (state, action) => {
            questionsAdapter.addOne(state, action.payload);
        },
        allQuestionsRemove: (state, action) => {
            // console.log(current(state))
            questionsAdapter.removeAll(state);
            // console.log(current(state))
        },
        questionSetOne: (state, action) => {
            questionsAdapter.setOne(state, action.payload);
        },
        setQuestionsLoadingStatus: (state, action) => {
            state.questionsLoadingStatus = action.payload;
        },
        setActiveQuestion: (state, action) => {
            state.activeQuestion = action.payload;
        },
        setEditingQuestion: (state, action) => {
            state.editingQuestion = action.payload;
        },
        setEditQuestionMode: (state, action) => {
            state.editQuestionMode = action.payload;
        },
        clearEditingQuestion: (state, action) => {
            state.editingQuestion = {
                id: null,
                titleOfQuestion: '',
                explanationText: '',
                // testID: null,
                weight: 1,
                oneAnswer: true,
                answerType: "text",
                answers: [],
            };
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchQuestions.pending, (state) => {
            state.questionsLoadingStatus = 'loading';
        })
        .addCase(fetchQuestions.fulfilled, (state, action) => {
            state.questionsLoadingStatus = 'loaded';
            questionsAdapter.setAll(state, action.payload);
        })
        .addCase(fetchQuestions.rejected, (state) => {
            state.questionsLoadingStatus = 'error';
        })
        .addCase(deleteQuestion.pending, (state) => {
            state.questionsLoadingStatus = 'loading';
        })
        .addCase(deleteQuestion.fulfilled, (state, action) => {
            state.questionsLoadingStatus = 'loaded';
            questionsAdapter.removeOne(state, action.payload);
        })
        .addCase(deleteQuestion.rejected, (state) => {
            state.questionsLoadingStatus = 'error';
        })
        .addCase(addQuestions.pending, (state) => {
            state.questionsLoadingStatus = 'loading';
        })
        .addCase(addQuestions.fulfilled, (state, action) => {
            state.questionsLoadingStatus = 'loaded';
            questionsAdapter.addOne(state, action.payload);
        })
        .addCase(addQuestions.rejected, (state) => {
            state.questionsLoadingStatus = 'error';
        })
        .addCase(updateQuestion.pending, (state) => {
            state.questionsLoadingStatus = 'loading';
        })
        .addCase(updateQuestion.fulfilled, (state, action) => {
            state.questionsLoadingStatus = 'loaded';
            questionsAdapter.updateOne(state, {id: action.payload.id, changes: action.payload});
        })
        .addCase(updateQuestion.rejected, (state) => {
            state.questionsLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const { reducer, actions } = questionsSlice;

export const { selectAll } = questionsAdapter.getSelectors(state => state.questions);

export const questionsSelector = createSelector(
    state => state.questions,
    selectAll,
    questions => {
        return Object.values(questions.entities);
    }
)

export const minQuestionsSelector = createSelector(
    state => state.questions,
    selectAll,
    questions => {
        const result = Object.values(questions.entities);
        return result.map(item => ({
            id: item.id,
            titleOfQuestion: item.titleOfQuestion,
            weight: item.weight,
        }))
    }
)

export default reducer;

export const {
    setQuestionsLoadingStatus,
    setActiveQuestion,
    allQuestionsRemove,
    questionCreate,
    setEditQuestionMode,
    setEditingQuestion, 
    clearEditingQuestion,
} = actions