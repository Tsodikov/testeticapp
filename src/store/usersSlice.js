import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    showLoginScreen: false,
    usersLoadingStatus: 'idle',
    registerStatus: null,
    editingUser: {
        // id: null,
        // name: '',
        // firstName: '',
        // lastName: '',
        // organization: '',
        // active: false,
        // role: '',
        // avatar: '',
        // departmentId: null,
        // jwt: ''
    },
    currentUser: {
        id: null,
        name: '',
        firstName: '',
        lastName: '',
        organization: '',
        active: false,
        role: '',
        avatar: '',
        departmentId: null,
        jwt: ''
    }
});

export const login = createAsyncThunk(
    'users/login',
    async (userData) => {
        const { request } = useHttp();
        const body = JSON.stringify(userData);
        return await request('https://testetic.herokuapp.com/users/login', 'POST', body);
    }
);

export const register = createAsyncThunk(
    'users/register',
    async (userData) => {
        const { request } = useHttp();
        const body = JSON.stringify(userData);
        return await request('https://testetic.herokuapp.com/users/register', 'POST', body);
    }
);

export const addUserToOrg = createAsyncThunk(
    'users/addUserToOrg',
    async ({userData, orgId}) => {
        const { request } = useHttp();
        const body = JSON.stringify(userData);
        return await request(`https://testetic.herokuapp.com/users/connectuser/${orgId}`, 'POST', body);
    }
);

export const fetchUsersToOrg = createAsyncThunk(
    'users/fetchUsersToOrg',
    async (orgId) => {
        const { request } = useHttp();
        return await request(`https://testetic.herokuapp.com/users/getusersorg/${orgId}`);
    }
);

export const getUserInfo = createAsyncThunk(
    'users/getUserInfo',
    async (jwt) => {
        const { request } = useHttp();
        const res = await request('https://testetic.herokuapp.com/users/info', 'GET', null, {
            'Authorization': `${jwt}`
        });
        return res
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearCurrentUser: (state, action) => {
            state.currentUser = {
                id: null,
                name: '',
                firstName: '',
                lastName: '',
                organization: '',
                active: false,
                role: '',
                jwt: ''
            }
        },
        setRegisterStatus: (state, action) => {
            state.registerStatus = action.payload;
        },
        setEditingUser: (state, action) => {
            state.editingUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.usersLoadingStatus = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.usersLoadingStatus = 'loaded';
            state.currentUser = {
                id: action.payload.userData.id,
                name: action.payload.userData.name,
                firstName: action.payload.userData.firstName,
                lastName: action.payload.userData.lastName,
                organization: action.payload.userData.Organization,
                active: action.payload.userData.active,
                role: action.payload.userData.role,
                departmentId: action.payload.userData.departmentId,
                avatar: action.payload.userData.avatar,
                jwt: `Bearer ${action.payload.jwt}`,
            };
            // localStorage.setItem('user', JSON.stringify({
            //     email: action.payload.userData.email,
            //     password: action.payload.userData.password,
            //     jwt: `Bearer ${action.payload.jwt}`,
            // }));
        })
        .addCase(login.rejected, (state) => {
            state.usersLoadingStatus = 'error';
        })
        .addCase(register.pending, (state) => {
            state.usersLoadingStatus = 'loading';
        })
        .addCase(register.fulfilled, (state, action) => {
            state.usersLoadingStatus = 'loaded';
            state.registerStatus = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.usersLoadingStatus = 'error';
            state.registerStatus = action.error;
        })
        .addCase(addUserToOrg.pending, (state) => {
            state.usersLoadingStatus = 'loading';
        })
        .addCase(addUserToOrg.fulfilled, (state, action) => {
            state.usersLoadingStatus = 'loaded';
            userAdapter.addOne(state, action.payload);
            // state.currentUser = {
            //     id: action.payload.id,
            //     name: action.payload.name,
            //     firstName: action.payload.firstName,
            //     lastName: action.payload.lastName,
            //     organization: action.payload.organization,
            //     active: action.payload.active,
            //     role: action.payload.role,
            //     jwt: '',
            // }
        })
        .addCase(addUserToOrg.rejected, (state, action) => {
            state.usersLoadingStatus = 'error';
            state.registerStatus = action.error.message;
        })
        .addCase(fetchUsersToOrg.pending, (state) => {
            state.usersLoadingStatus = 'loading';
        })
        .addCase(fetchUsersToOrg.fulfilled, (state, action) => {
            state.usersLoadingStatus = 'loaded';
            userAdapter.setAll(state, action.payload);
        })
        .addCase(fetchUsersToOrg.rejected, (state, action) => {
            state.usersLoadingStatus = 'error';
            state.registerStatus = action.payload;
        })
        .addCase(getUserInfo.rejected, (state) => {
            state.usersLoadingStatus = 'error';
        })
        .addCase(getUserInfo.pending, (state) => {
            state.usersLoadingStatus = 'loading';
        })
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.usersLoadingStatus = 'loaded';
            state.currentUser = {
                id: action.payload.id,
                name: action.payload.name,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                organization: action.payload.organization,
                active: action.payload.active,
                role: action.payload.role,
                departmentId: action.payload.departmentId,
                jwt: `Bearer ${action.payload.jwt}`,
            }
        })
        .addDefaultCase(() => {});
    }
})

const { reducer, actions } = usersSlice;

export const { selectAll } = userAdapter.getSelectors(state => state.users);

export const usersSelector = createSelector(
    state => state.users,
    selectAll,
    users => {
       return Object.values(users.entities);
    }
);

export const {
    userCreate,
    userRemove,
    userUpdate,
    // setShowLoginScreen,
    setCurrentUser,
    setRegisterStatus,
    setEditingUser,
    clearCurrentUser
} = actions;

export default reducer;