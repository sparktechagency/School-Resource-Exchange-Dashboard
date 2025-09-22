'use client';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { DNA } from 'react-loader-spinner';

export default function ReduxProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="h-[75vh] flex-center">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
