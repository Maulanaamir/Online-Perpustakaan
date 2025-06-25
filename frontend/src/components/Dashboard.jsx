import React, { useEffect, useState } from 'react';
import { getUser } from '../api/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then(data => setUser(data))
      .catch(err => {
        console.error(err); 
        // Redirect ke login kalau token invalid (opsional)
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Selamat datang, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Dashboard;
