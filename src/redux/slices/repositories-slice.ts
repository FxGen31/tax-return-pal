import { Repository } from '@/types';
import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { RepositoryService } from '@/services/repository-service';

const repositoriesAdapter = createEntityAdapter<Repository>({
    selectId: (repository) => repository.name,
    sortComparer: (a, b) => a.incomeYear.from.localeCompare(b.incomeYear.from),
});

const initialState = repositoriesAdapter.addMany(
    repositoriesAdapter.getInitialState({
        status: 'idle',
        error: '',
    }),
    await new RepositoryService().getRepositories()
);

export const addRepository = createAsyncThunk<
    Repository,
    {
        repository: Repository;
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

export const deleteRepository = createAsyncThunk<
    Repository,
    {
        name: string;
    },
    {
        rejectValue: string;
        state: RootState;
    }
>('repositories/deleteRepository', async ({ name }, thunkAPI) => {
    try {
        const repositoryService = new RepositoryService();
        console.log('here');
        const deletedRepository = await repositoryService.deleteRepository(
            name
        );
        console.log(deletedRepository);
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
        builder.addCase(addRepository.fulfilled, (state, { payload }) => {
            repositoriesAdapter.addOne(state, payload);
        });
        builder.addCase(addRepository.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = 'Unknown Error';
            }
        });
        builder.addCase(deleteRepository.fulfilled, (state, { payload }) => {
            repositoriesAdapter.removeOne(state, payload.name);
        });
        builder.addCase(deleteRepository.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = 'Unknown Error';
            }
        });
    },
});

export const { addRepositories } = repositoriesSlice.actions;
export const { selectAll: selectAllRepositories } =
    repositoriesAdapter.getSelectors((state: RootState) => state.repositories);
export default repositoriesSlice.reducer;
