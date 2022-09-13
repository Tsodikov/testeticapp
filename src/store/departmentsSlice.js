import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const departmentAdapter = createEntityAdapter();

const initialState = departmentAdapter.getInitialState({
    departmentLoadingStatus: 'idle',
    currentDepartment: {
        id: null,
        name: '',
        organizationId: null,
    },
    editingDepartment: {
        name: '',
    }
});

export const fetchDepartment = createAsyncThunk(
    'department/fetchDepartment',
    async (orgId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/getdep/${orgId}`);
});

export const addDepartment = createAsyncThunk(
    'department/addDepartment',
    async (department) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/adddep`, 'POST', JSON.stringify(department));
});

export const deleteDepartment = createAsyncThunk(
    'department/deleteDepartment',
    async (id) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/deldep/${id}`, 'DELETE');
});

export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setEditingDepartment: (state, action) => {
            state.editingDepartment = action.payload;
        },
        clearEditingDepartment: (state, action) => {
            state.editingDepartment = {name: ''};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDepartment.pending, (state) => {
            state.departmentLoadingStatus = 'loading';
        })
        .addCase(fetchDepartment.fulfilled, (state, action) => {
            state.departmentLoadingStatus = 'loaded';
            departmentAdapter.setAll(state, action.payload);
        })
        .addCase(fetchDepartment.rejected, (state) => {
            state.departmentLoadingStatus = 'error';
        })
        .addCase(deleteDepartment.pending, (state) => {
            state.departmentLoadingStatus = 'loading';
        })
        .addCase(deleteDepartment.fulfilled, (state, action) => {
            state.mediaFilesLoadingStatus = 'loaded';
            departmentAdapter.removeOne(state, action.payload);
        })
        .addCase(deleteDepartment.rejected, (state) => {
            state.departmentLoadingStatus = 'error';
        })
        .addCase(addDepartment.pending, (state) => {
            state.departmentLoadingStatus = 'loading';
        })
        .addCase(addDepartment.fulfilled, (state, action) => {
            state.mediaFilesLoadingStatus = 'loaded';
            departmentAdapter.setOne(state, action.payload);
        })
        .addCase(addDepartment.rejected, (state) => {
            state.departmentLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const { reducer, actions } = departmentSlice;

export const { selectAll } = departmentAdapter.getSelectors(state => state.department);

export const departmentSelector = createSelector(
    state => state.department,
    selectAll,
    department => {
        return Object.values(department.entities);
    }
);

export const listDepartmentForListing = createSelector(
    state => state.department,
    selectAll,
    department => {
        return Object.values(department.entities).map(item => ({label: item.name, id: item.id}));
    }
);

export const departmentByIdSelector = createSelector(
    [
        state => state.department,
        (state, depId) => depId,
    ],
    (department, depId) => {
        return Object.values(department.entities).filter(item => (item.id === depId));
    }
);

export const depForListing = createSelector(
    state => state.department,
    selectAll,
    department => {
        return Object.values(department.entities).map(item => ({label: item.name, id: item.id}));
    }
);

export default reducer;

export const {
    setEditingDepartment,
    clearEditingDepartment,
} = actions