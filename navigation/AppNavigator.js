import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import {AsyncStorage} from 'react-native';

import React, {useState, useEffect, createContext} from 'react';

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChanged = (result) => {
    setUser(result);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const authSubscriber = false;
    if (AsyncStorage.getItem('access_token')) {
      authSubscriber = onAuthStateChanged(true);
    }
    // unsubscribe on unmount
    return authSubscriber;
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <MainNavigator />
    </AuthContext.Provider>
  ) : (
    <AuthNavigator />
  );
}
