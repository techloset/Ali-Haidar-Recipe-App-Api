// mealSlice.tsx
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface MealState {
  meals: any[];
  loading: boolean;
  error: string | null;
  searchResults:any  [],
}

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    console.log('data', response.data.categories
    );
    return response.data.categories;
  } catch (error: any) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error occurred';
    } else {
      return 'Error occurred';
    }
  }
});
export const searchRecipes = createAsyncThunk('meals/searchRecipes', async (searchQuery: string) => {
  try {
    console.log('searchRecipes async thunk called with query:', searchQuery);
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php`,
      {
        params: { q: searchQuery },
      }
    );

    const allRecipes = response.data.categories as any[];
    const filteredRecipes = allRecipes.filter(recipe => {
      return recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase());
    });
    console.log('filtered recipes', filteredRecipes);
    return filteredRecipes;
  } catch (error) {
    throw new Error("Error searching recipes");
  }
});

// console.log('yahoo', searchRecipes)
const initialState: MealState = {
  meals: [],
  loading: false,
  error: null,
  searchResults: [],
};

export const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const meals = action.payload?.meals || action.payload || [];
        state.meals = Array.isArray(meals) ? meals : [meals];
      })
      .addCase(fetchMeals.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

      //search meals
      builder
  .addCase(searchRecipes.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<any>) => {
    state.loading = false;
    const recipes: any[] = action.payload || [];
    state.searchResults = recipes;
  })
  .addCase(searchRecipes.rejected, (state, action: PayloadAction<any>) => {
    state.loading = false;
    state.error = action.payload;
  });
  },
});

export default mealSlice.reducer;
