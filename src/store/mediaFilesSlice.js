import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import { useStringOperation } from "../hooks/string.hook";

const mediaFilesAdapter = createEntityAdapter();

const initialState = mediaFilesAdapter.getInitialState({
    mediaFilesLoadingStatus: 'idle',
    fileServerLoadingStatus: 'idle',
    currentUrlFs: '',
    tempMediaFilesArray: [],
    activeMedia: null
});

export const fetchMediaFiles = createAsyncThunk(
    'mediafiles/fetchMediaFiles',
    async (questionId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/media/get/${questionId}`);
});

export const addMediaFile = createAsyncThunk(
    'mediafiles/addMediaFile',
    async (file) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/media/add`, 'POST', JSON.stringify(file));
});

export const deleteMediaFile = createAsyncThunk(
    'mediafiles/deleteMediaFile',
    async (id) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/media/del/${id}`, 'DELETE');
});

export const addMediaToFileServer = createAsyncThunk(
    'mediafiles/addMediaToFileServer',
    async (file) => {
        const { request } = useHttp();
        const { createPushUrl } = useStringOperation();
        return await request(createPushUrl(), 'POST', file, {'Content-Type': file.type});
});

export const delMediaFromFileServer = createAsyncThunk(
    'mediafiles/delMediaFromFileServer',
    async (url) => {
        const { request } = useHttp();
        const { createDelUrl } = useStringOperation();
        console.log(createDelUrl(url));
        return await request(createDelUrl(url), 'DELETE');
});

export const mediaFilesSlice = createSlice({
    name: "mediafiles",
    initialState,
    reducers: {
        setActiveMidia: (state, action) => {
            state.activeMedia = action.payload;
        },
        setCurrentUrlFs: (state, action) => {
            state.currentUrlFs = action.payload;
        },
        setTempMediaFileArray: (state, action) => {
            state.tempMediaFilesArray = action.payload;
        },
        clearTempMediaFileArray: (state, action) => {
            state.tempMediaFilesArray = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMediaFiles.pending, (state) => {
            state.mediaFilesLoadingStatus = 'loading';
        })
        .addCase(fetchMediaFiles.fulfilled, (state, action) => {
            state.mediaFilesLoadingStatus = 'loaded';
            mediaFilesAdapter.setAll(state, action.payload);
        })
        .addCase(fetchMediaFiles.rejected, (state) => {
            state.mediaFilesLoadingStatus = 'error';
        })
        .addCase(deleteMediaFile.pending, (state) => {
            state.mediaFilesLoadingStatus = 'loading';
        })
        .addCase(deleteMediaFile.fulfilled, (state, action) => {
            state.mediaFilesLoadingStatus = 'loaded';
            mediaFilesAdapter.removeOne(state, action.payload);
        })
        .addCase(deleteMediaFile.rejected, (state) => {
            state.mediaFilesLoadingStatus = 'error';
        })
        .addCase(delMediaFromFileServer.pending, (state) => {
            state.fileServerLoadingStatus = 'loading';
        })
        .addCase(delMediaFromFileServer.fulfilled, (state, action) => {
            state.fileServerLoadingStatus = 'loaded';
            // state.resultDeleting = action.payload;
            console.log(action.payload);
            // mediaFilesAdapter.removeOne(state, action.payload);
        })
        .addCase(delMediaFromFileServer.rejected, (state) => {
            state.fileServerLoadingStatus = 'error';
        })
        .addCase(addMediaFile.pending, (state) => {
            state.mediaFilesLoadingStatus = 'loading';
        })
        .addCase(addMediaFile.fulfilled, (state, action) => {
            state.mediaFilesLoadingStatus = 'loaded';
            mediaFilesAdapter.addOne(state, action.payload);
        })
        .addCase(addMediaFile.rejected, (state) => {
            state.mediaFilesLoadingStatus = 'error';
        })
        .addCase(addMediaToFileServer.pending, (state) => {
            state.fileServerLoadingStatus = 'loading';
        })
        .addCase(addMediaToFileServer.fulfilled, (state, action) => {
            state.fileServerLoadingStatus = 'loaded';
            const { createGetUrl } = useStringOperation();
            state.currentUrlFs = createGetUrl(action.payload.url);
            state.tempMediaFilesArray.push({...action.payload, url: state.currentUrlFs});
        })
        .addCase(addMediaToFileServer.rejected, (state) => {
            state.fileServerLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const { reducer, actions } = mediaFilesSlice;

export const { selectAll } = mediaFilesAdapter.getSelectors(state => state.questions);

export const mediaFilesSelector = createSelector(
    state => state.mediafiles,
    selectAll,
    mediafiles => {
        return Object.values(mediafiles.entities);
    }
)

export default reducer;

export const {
    setActiveMidia,
    setCurrentUrlFs,
    setTempMediaFileArray,
    clearTempMediaFileArray,
} = actions