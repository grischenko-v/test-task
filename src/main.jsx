import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css';

const DATA_URI = 'http://localhost:4000';

const client = new ApolloClient({
  uri: DATA_URI,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
       <App />
    </ApolloProvider>
  </StrictMode>,
);
