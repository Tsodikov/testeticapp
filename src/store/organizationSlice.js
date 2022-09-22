import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const organizationAdapter = createEntityAdapter();

const clearOrganization = {
    id: '',
        name: '',
        category: '',
        description: '',
        country: '',
        state: '',
        city: '',
        website: '',
        phone: '',
        adress: '',
        zip: '',
        logo: '',
        backgroundImage: '',
        terms: false,
        specialUsers: [],
}

const initialState = organizationAdapter.getInitialState({
    organizationLoadingStatus: 'idle',
    currentOrganization: clearOrganization,
    editingOrganization: clearOrganization,
});

export const fetchOrganization = createAsyncThunk(
    'organization/fetchOrganization',
    async (userId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/get/${userId}`);
});

export const fetchAllOrganizations = createAsyncThunk(
    'organization/fetchAllOrganizations',
    async () => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/getall`);
});

export const addOrganization = createAsyncThunk(
    'organization/addOrganization',
    async (organization) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/add`, 'POST', JSON.stringify(organization));
});

export const deleteOrganization = createAsyncThunk(
    'organization/deleteOrganization',
    async (id) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/del/${id}`, 'DELETE');
});

export const getOrgByChapter = createAsyncThunk(
    'organization/getOrgByChapter',
    async (chapterId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/org/getbychapter/${chapterId}`);
});

export const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
        setCurrentOrganization: (state, action) => {
            state.currentOrganization = action.payload;
        },
        setEditingOrganization: (state, action) => {
            state.editingOrganization = action.payload;
        },
        // setCurrentUrlFs: (state, action) => {
        //     state.currentUrlFs = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrganization.pending, (state) => {
            state.organizationLoadingStatus = 'loading';
        })
        .addCase(fetchOrganization.fulfilled, (state, action) => {
            state.organizationLoadingStatus = 'loaded';
            organizationAdapter.setOne(state, action.payload);
        })
        .addCase(fetchOrganization.rejected, (state) => {
            state.organizationLoadingStatus = 'error';
        })
        .addCase(fetchAllOrganizations.pending, (state) => {
            state.organizationLoadingStatus = 'loading';
        })
        .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
            state.organizationLoadingStatus = 'loaded';
            organizationAdapter.setAll(state, action.payload);
        })
        .addCase(fetchAllOrganizations.rejected, (state) => {
            state.organizationLoadingStatus = 'error';
        })
        .addCase(getOrgByChapter.pending, (state) => {
            state.organizationLoadingStatus = 'loading';
        })
        .addCase(getOrgByChapter.fulfilled, (state, action) => {
            state.organizationLoadingStatus = 'loaded';
            state.currentOrganization = action.payload;
        })
        .addCase(getOrgByChapter.rejected, (state) => {
            state.organizationLoadingStatus = 'error';
        })
        .addCase(deleteOrganization.pending, (state) => {
            state.organizationLoadingStatus = 'loading';
        })
        .addCase(deleteOrganization.fulfilled, (state, action) => {
            state.mediaFilesLoadingStatus = 'loaded';
            organizationAdapter.removeOne(state, action.payload);
        })
        .addCase(deleteOrganization.rejected, (state) => {
            state.organizationLoadingStatus = 'error';
        })
        .addCase(addOrganization.pending, (state) => {
            state.organizationLoadingStatus = 'loading';
        })
        .addCase(addOrganization.fulfilled, (state, action) => {
            state.mediaFilesLoadingStatus = 'loaded';
            organizationAdapter.setOne(state, action.payload);
            state.currentOrganization = {
                id: action.payload.id,
                name: action.payload.name,
                category: action.payload.category,
                description: action.payload.description,
                country: action.payload.country,
                state: action.payload.state,
                city: action.payload.city,
                website: action.payload.website,
                phone: action.payload.phone,
                adress: action.payload.adress,
                zip: action.payload.zip,
                logo: action.payload.logo,
                backgroundImage: action.payload.backgroundImage,
                terms: action.payload.terms,
                specialUsers: action.payload.specialUsers
            }
        })
        .addCase(addOrganization.rejected, (state) => {
            state.organizationLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const { reducer, actions } = organizationSlice;

export const { selectAll } = organizationAdapter.getSelectors(state => state.organization);

export const organizationSelector = createSelector(
    state => state.organization,
    selectAll,
    organization => {
        return Object.values(organization.entities);
    }
);

export const orgForListing = createSelector(
    state => state.organization,
    selectAll,
    organization => {
        return Object.values(organization.entities).map(item => ({label: item.name, id: item.id}));
    }
);

export default reducer;

export const {
    setCurrentOrganization,
    setEditingOrganization,
} = actions