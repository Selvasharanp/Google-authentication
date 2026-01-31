import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="164444498134-p8jtt6u8e31lsgs7aih8lopi69pishdp.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);