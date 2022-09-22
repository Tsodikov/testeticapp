import { createEntityAdapter, createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../hooks/http.hook.js';


const chapterAdapter = createEntityAdapter();

const initialState = chapterAdapter.getInitialState({
    chaptersLoadingStatus: 'idle',
    activeChapter: {},
    updatedChapter: {},
    qtnTestsCounter: 0,
});

export const fetchChapters = createAsyncThunk(
    'chapters/fetchChapters',
    async (orgId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/chapters/get/${orgId}`);
});

export const getChapter = createAsyncThunk(
    'chapters/getChapter',
    async (id) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/chapters/getchapter/${id}`);
});

export const addChapter = createAsyncThunk(
    'chapters/addChapter',
    async (chapter) => {
        const { request } = useHttp();
        return await request('https://testetic.herokuapp.com/chapters/add', 'POST', JSON.stringify(chapter));
});

export const delChapter = createAsyncThunk(
    'chapters/delChapter',
    async (chapterId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/chapters/del/${chapterId}`, 'DELETE');
});

export const updateChapter = createAsyncThunk(
    'chapters/updateChapter',
    async (chapter) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/chapters/update/${chapter.id}`, 'PATCH', JSON.stringify(chapter));
});

export const chapterSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        chapterCreate: (state, action) => {
            chapterAdapter.addOne(state, action.payload);
        },
        chapterRemove: (state, action) => {
            chapterAdapter.removeOne(state, action.payload);
        },
        chapterSetOne: (state, action) => {
            chapterAdapter.setOne(state, action.payload);
        },
        setActiveChapter: (state, action) => {
            state.activeChapter = action.payload;
        },
        clearActiveChapter: (state) => {
            state.activeChapter = {};
        },
        setQtnTestsCounter: (state, action) => {
            state.qtnTestsCounter = action.payload;
        },
        incrementQtnTestsCounter: (state) => {
            state.qtnTestsCounter = state.qtnTestsCounter + 1;
        },
        decrementQtnTestsCounter: (state) => {
            state.qtnTestsCounter !== 0? state.qtnTestsCounter = state.qtnTestsCounter - 1 : state.qtnTestsCounter = 0;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchChapters.pending, (state) => {
            state.chaptersLoadingStatus = 'loading';
        })
        .addCase(fetchChapters.fulfilled, (state, action) => {
            state.chaptersLoadingStatus = 'loaded';
            chapterAdapter.setAll(state, action.payload);
        })
        .addCase(fetchChapters.rejected, (state) => {
            state.chaptersLoadingStatus = 'error';
        })
        .addCase(getChapter.pending, (state) => {
            state.chaptersLoadingStatus = 'loading';
        })
        .addCase(getChapter.fulfilled, (state, action) => {
            state.chaptersLoadingStatus = 'loaded';
            state.updatedChapter = action.payload;
        })
        .addCase(getChapter.rejected, (state) => {
            state.chaptersLoadingStatus = 'error';
        })
        .addCase(addChapter.pending, (state) => {
            state.chaptersLoadingStatus = 'loading';
        })
        .addCase(addChapter.fulfilled, (state, action) => {
            state.chaptersLoadingStatus = 'loaded';
            chapterAdapter.addOne(state, action.payload);
        })
        .addCase(addChapter.rejected, (state) => {
            state.chaptersLoadingStatus = 'error';
        })
        .addCase(delChapter.pending, (state) => {
            state.chaptersLoadingStatus = 'loading';
        })
        .addCase(delChapter.fulfilled, (state, action) => {
            state.chaptersLoadingStatus = 'loaded';
            chapterAdapter.removeOne(state, action.payload);
        })
        .addCase(delChapter.rejected, (state) => {
            state.chaptersLoadingStatus = 'error';
        })
        .addCase(updateChapter.pending, (state) => {
            state.chaptersLoadingStatus = 'loading';
        })
        .addCase(updateChapter.fulfilled, (state, action) => {
            state.chaptersLoadingStatus = 'loaded';
            chapterAdapter.updateOne(state, {id: action.payload.id, changes: action.payload});
            state.activeChapter = {...action.payload, qtnTests: action.payload.qtnTests};
        })
        .addCase(updateChapter.rejected, (state) => {
            state.chaptersLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
})

const { actions, reducer } = chapterSlice;
const { selectAll } = chapterAdapter.getSelectors(state => state.chapters);

export const chaptersSelector = createSelector(
    state => state.chapters,
    selectAll,
    chapters => {
        return Object.values(chapters.entities);
    }
)

export const listChapterForListing = createSelector(
    state => state.chapters,
    selectAll,
    chapters => {
        return Object.values(chapters.entities).map(item => ({label: item.chapterTitle, id: item.id}));
    }
)

export const selectorQtnTests = createSelector(
    state => state.chapters,
    state => state.chapters.activeChapter.id,
    selectAll,
    (chapters, id) => {
        const chapter = Object.values(chapters).filter(item => item.id === id);
        return chapter[0].qtnTests;
    }
)

export const selectorChapterTitle = createSelector(
    state => state.chapters.activeChapter.id,
    state => state.chapters,
    selectAll,
    (chapters, id) => {
        const filteredChapter = id.entities?
            Object.values(id.entities).filter(item => item.id === chapters) : null;
            
        if (filteredChapter.length !== 0) {
            return filteredChapter[0].chapterTitle;
        }
        return null;
        
    }
)

export const {
    chapterCreate,
    chapterRemove,
    chapterSetOne,
    qtnTestsCounter,
    setActiveChapter,
    clearActiveChapter,
    setQtnTestsCounter,
    incrementQtnTestsCounter,
    decrementQtnTestsCounter
} = actions;

export default reducer;