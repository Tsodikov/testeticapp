import { createEntityAdapter, createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../hooks/http.hook.js';

const clearTest = {
    id: null,
    title: '',            
    description: '',                
    dateOfCreate: '',       
    readyToUse: false,
    qtnOfQuestion: 0,
    qtnUsers: 0,         
    testMediaFiles: [],
    creatorId: null,
    creatorName: '',            
    timeLimitPassTest: true,
    timeLimit: 0,                         
    preRegistration: true,                
    startAnyTime: false,                  
    currentActiveStart: '',            
    currentActiveEnd: '',              
    backToAnyQuestion: false,             
    showResultQuestion: false,             
    showResultTest: true,              
    organization: {
        organizationId: null,
    },
    department: {
        departmentId: null,       
    },        
    chapter: {
        chapterId: null,
        chapterTitle: '',
        qtnTests: null,
    }
}

const testAdapter = createEntityAdapter();

const initialState = testAdapter.getInitialState({
    testsLoadingStatus: 'idle',
    activeTest: {},
    editingTest: clearTest,
});

export const fetchTests = createAsyncThunk(
    'tests/fetchTests',
    async (chapterId) => {
        const { request } = useHttp();
        const result = await request(`https://testetic.herokuapp.com/tests/get/${chapterId}`);
        if (!result) return [];
        return result;
});

export const fetchTestsByOrg = createAsyncThunk(
    'tests/fetchTestsByOrg',
    async (orgId) => {
        const { request } = useHttp();
        const result = await request(`https://testetic.herokuapp.com/tests/gettestbyorg/${orgId}`);
        if (!result) return [];
        return result;
});

export const fetchTestsByDep = createAsyncThunk(
    'tests/fetchTestsByDep',
    async (depId) => {
        console.log(depId)
        const { request } = useHttp();
        const result = await request(`https://testetic.herokuapp.com/tests/getbydep/${depId}`);
        if (!result) return [];
        return result;
});

export const fetchTestsByOrgAndUser = createAsyncThunk(
    'tests/fetchTestsByOrgAndUser',
    async (params) => {
        const { request } = useHttp();
        const result = await request(`https://testetic.herokuapp.com/tests/getbyorg/${params.orgId}/${params.userId}`);
        if (!result) return [];
        return result;
});

export const getTestById = createAsyncThunk(
    'tests/getTestById',
    async (testId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/tests/getbyid/${testId}`);
    }
);

export const addTest = createAsyncThunk(
    'tests/addTest',
    async (newTest) => {
        const { request } = useHttp();
        const result = await request(`https://testetic.herokuapp.com/tests/add`, 'POST', JSON.stringify(newTest))
        if (!result) return [];
        return result;
});

export const deleteTest = createAsyncThunk(
    'tests/deleteTest',
    async (testId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/tests/del/${testId}`, 'DELETE');
    }
);

export const updateTest = createAsyncThunk(
    'tests/updateTest',
    async ({newTest, testId}) => {
        const { request } = useHttp();
        const result = await request(`https://testetic.herokuapp.com/tests/update/${testId}`, 'PATCH', JSON.stringify(newTest))
        if (!result) return [];
        return result;
});

export const testSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        testCreate: (state, action) => {
            testAdapter.addOne(state, action.payload);
        },
        allTestRemove: (state, action) => {
            testAdapter.removeAll(state);
        },
        testUpdate: (state, action) => {
            testAdapter.setOne(state, action.payload);
        },
        setActiveTest: (state, action) => {
            state.activeTest = action.payload;
        },
        clearActiveTest: (state) => {
            state.activeTest = clearTest;
        },
        setEditingTest: (state, action) => {
            state.editingTest = action.payload;
        },
        clearEditingTest: (state, action) => {
            state.editingTest = clearTest;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTests.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(fetchTests.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            testAdapter.setAll(state, action.payload);
        })
        .addCase(fetchTests.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addCase(fetchTestsByOrg.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(fetchTestsByOrg.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            testAdapter.setAll(state, action.payload);
        })
        .addCase(fetchTestsByOrg.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addCase(fetchTestsByDep.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(fetchTestsByDep.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            console.log(action.payload)
            testAdapter.setAll(state, action.payload);
        })
        .addCase(fetchTestsByDep.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addCase(fetchTestsByOrgAndUser.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(fetchTestsByOrgAndUser.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            testAdapter.setAll(state, action.payload);
        })
        .addCase(fetchTestsByOrgAndUser.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addCase(getTestById.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(getTestById.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            state.activeTest = action.payload;
        })
        .addCase(getTestById.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addCase(deleteTest.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(deleteTest.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            testAdapter.removeOne(state, action.payload);
        })
        .addCase(deleteTest.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addCase(addTest.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(addTest.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            testAdapter.addOne(state, action.payload);
        })
        .addCase(addTest.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addCase(updateTest.pending, (state, action) => {
            state.testsLoadingStatus = 'loading';
        })
        .addCase(updateTest.fulfilled, (state, action) => {
            state.testsLoadingStatus = 'loaded';
            testAdapter.updateOne(state, {id: action.payload.id, changes: action.payload});
            state.activeTest = {...action.payload, qtnOfQuestion: action.payload.qtnOfQuestion};
        })
        .addCase(updateTest.rejected, (state) => {
            state.testsLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
})

const { reducer, actions } = testSlice;

export const { selectAll } = testAdapter.getSelectors(state => state.tests);

export const testsSelector = createSelector(
    state => state.tests,
    selectAll,
    tests => {
        return Object.values(tests.entities);
    }
)

export const activeTest = createSelector(
    state => state.tests.activeTestId,
    selectAll,
    (activeTestId, filteredTestsSelector ) => {
        if (activeTestId) {
            return filteredTestsSelector.filter(item => item.id === activeTestId);
        }
        return null;
    }
)

export const {
    testCreate,
    allTestRemove,
    testUpdate,
    setActiveTest,
    clearActiveTest,
    setEditingTest,
    clearEditingTest,
} = actions;

export default reducer;