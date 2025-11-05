import { store } from '../store';
import { updateTokens, signout } from '../reducers/user';
import { EventEmitter } from 'eventemitter3';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

const navigationEmitter = new EventEmitter(); 

export const fetchWithAuth = async (endpoint: string, options: any = {}) => {
  
  try{
    const state = store.getState();
    console.log('Redux state:', state);

  const { token: accessToken, refreshToken } = state.user.value;

  if (!accessToken || !refreshToken) {
      navigationEmitter.emit('REDIRECT_TO_LOGIN');
      return new Response(JSON.stringify({ error: 'No tokens' }), { status: 401 });
    }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { Authorization: `Bearer ${accessToken}`, ...options.headers }
  });

  // Si 401 → refresh
  if (response.status === 401) {

    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })

    if(!refreshResponse.ok){
        store.dispatch(signout());

        navigationEmitter.emit('REDIRECT_TO_LOGIN')
        return refreshResponse;
        }
    
    const newToken = await refreshResponse.json();

    if (newToken.tokens.token) {
      console.log('New tokens received:', newToken.tokens);
      store.dispatch(updateTokens(newToken.tokens));;
      response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: { Authorization: `Bearer ${newToken.tokens.token}`, ...options.headers }
      });
    } else {
      store.dispatch(signout());
      navigationEmitter.emit('REDIRECT_TO_LOGIN')
    }
  }
  return response;
    } catch (error) {
        // gestion globale des erreurs
        console.error('fetchWithAuth error:', error);
        throw error;
    }
};

export { navigationEmitter };