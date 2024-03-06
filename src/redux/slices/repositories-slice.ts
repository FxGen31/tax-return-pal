import { Repository } from '@/types';
import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { RepositoryService } from '@/services/repository-service';

// Repository entity adapter (Id - repository name, sortKey - repository incomeYear start date)
const repositoriesAdapter = createEntityAdapter<Repository>({
    selectId: (repository) => repository.id,
    sortComparer: (a, b) => a.incomeYear.from.localeCompare(b.incomeYear.from),
});

const initialState = repositoriesAdapter.addMany(
    repositoriesAdapter.getInitialState({
        status: 'idle',
        error: '',
    }),
    []
);

export const addRepository = createAsyncThunk<
    Repository,
    {
        repository: Omit<Repository,'id'>;
    },
    {
        rejectValue: string;
        state: RootState;
    }
>('repositories/addRepository', async ({ repository }, thunkAPI) => {
    try {
        const existingRepository =
            thunkAPI.getState().repositories.entities[repository.name];

        if (existingRepository) {
            // Reject
            return thunkAPI.rejectWithValue('Repository name has to be unique');
        }
        const repositoryService = new RepositoryService();
        const createdRepository = await repositoryService.addRepository(
            repository
        );
        return (
            createdRepository ||
            thunkAPI.rejectWithValue('Failed to add repository')
        );
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to add repository');
    }
});

export const initRepositories = createAsyncThunk<
    Repository[],
    void,
    {
        rejectValue: string;
        state: RootState;
    }
>('repositories/initRepositories', async (_, thunkAPI) => {
    try {
        const repositoryService = new RepositoryService();
        const existingRepositories = await repositoryService.getRepositories();
        const wait = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        // Prevent flashing when the loading speed is too fast
        await wait(1000);
        return (
            existingRepositories ||
            thunkAPI.rejectWithValue('Failed to init repositories')
        );
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to init repositories');
    }
});

export const deleteRepository = createAsyncThunk<
    Repository,
    {
        id: string;
    },
    {
        rejectValue: string;
        state: RootState;
    }
>('repositories/deleteRepository', async ({ id }, thunkAPI) => {
    try {
        const repositoryService = new RepositoryService();
        const deletedRepository = await repositoryService.deleteRepository(
            id
        );
        return (
            deletedRepository ||
            thunkAPI.rejectWithValue('Failed to delete repository')
        );
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to delete repository');
    }
});

export const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState: initialState,
    reducers: {
        addRepositories: (state, action: PayloadAction<Repository[]>) => {
            repositoriesAdapter.addMany(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        // Add repository cases
        builder.addCase(addRepository.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(addRepository.fulfilled, (state, { payload }) => {
            repositoriesAdapter.addOne(state, payload);
            state.status = 'succeeded';
        });
        builder.addCase(addRepository.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = 'Unknown Error';
            }
            state.status = 'failed';
        });
        // Delete repository cases
        builder.addCase(deleteRepository.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(deleteRepository.fulfilled, (state, { payload }) => {
            repositoriesAdapter.removeOne(state, payload.id);
            state.status = 'succeeded';
        });
        builder.addCase(deleteRepository.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = 'Unknown Error';
            }
            state.status = 'failed';
        });
        // Init repositories cases
        builder.addCase(initRepositories.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(initRepositories.fulfilled, (state, { payload }) => {
            repositoriesAdapter.addMany(state, payload);
            state.status = 'succeeded';
        });
        builder.addCase(initRepositories.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = 'Unknown Error';
            }
            state.status = 'failed';
        });
    },
});

export const { addRepositories } = repositoriesSlice.actions;
export const { selectAll: selectAllRepositories, selectById: selectRepositoryById } =
    repositoriesAdapter.getSelectors((state: RootState) => state.repositories);
export const repositoriesStatus = (state: RootState) =>
    state.repositories.status;
export default repositoriesSlice.reducer;
