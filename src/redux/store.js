import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
	key: "user",
	storage,
};
  
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({ 
    reducer: persistedReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false,
    	}),
});

const persistor = persistStore(store);
  
export default store;

export { persistor };
