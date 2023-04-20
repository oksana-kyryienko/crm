import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import RegistrationPage from './components/RegistrartionPage/RegistrationPage';
import UserDashboardPage from './components/UserDashboardPage/UserDashboardPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {currentUser ? (
        <>
          <UserDashboardPage handleLogout={handleLogout} />
          <button className="btn btn-primary logout" onClick={handleLogout}>
            Вийти із акаунту
          </button>
        </>
      ) : (
        <RegistrationPage />
      )}
    </div>
  );
};

export default App;
