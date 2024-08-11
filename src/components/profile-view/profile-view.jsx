import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom"
import UserInfo from './user-info';

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
    console.log(localUser);
  const userId = localUser ? localUser._id : null;
  const token = localStorage.getItem("token");
  const fav = movies.filter((movie) => {
    return localUser.FavoriteMovies.includes(movie._id);
  });

  const [username, setUsername] = useState(localUser.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(localUser.Email || "");
  const [birthday, setBirthday] = useState(localUser.Birthday ? localUser.Birthday.split('T')[0] : "");
  const [user, setUser] = useState(localUser);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("https://duncanflixapi-2df251ca79e4.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }     

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
  
    console.log("Sending data:", data);
    console.log("Token:", token);
    console.log("User ID:", userId);
  
    try {
      const response = await fetch(`https://duncanflixapi-2df251ca79e4.herokuapp.com/users/${localUser.Username}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
  
      const contentType = response.headers.get("content-type");
      const responseText = await response.text();
      console.log("Response text:", responseText);
  
      if (!response.ok) {
        console.error("Error updating profile:", response.status, response.statusText, responseText);
        if (response.status === 401 || response.status === 403) {
          throw new Error('Permission denied: Invalid or missing token');
        }
        throw new Error(responseText || 'Failed to update profile');
      }
  
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const updatedUser = JSON.parse(responseText);
        console.log("Profile updated successfully:", updatedUser);
        alert("Profile updated successfully");
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload();
      } else {
        console.error('Response is not valid JSON:', responseText);
        throw new Error('Response is not valid JSON');
      }
    } catch (err) {
      console.error("Error during profile update:", err);
      alert(err.message);
    }
  };  
  
  if (!user) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>
          <strong>Username:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>
          <strong>Password:</strong>
        </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>
          <strong>Email:</strong>
        </Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBdate">
        <Form.Label>
          <strong>Birthday:</strong>
        </Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <div style={{ marginTop: '20px' }}></div>
      <Button variant="primary" type="submit">Edit Profile</Button>
      {fav.length > 0 && (
        <div>
          <h4>Favorite Movies</h4>
          {fav.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </Form>
  );
};

export default ProfileView;