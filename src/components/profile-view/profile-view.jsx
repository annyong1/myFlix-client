import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom"
import UserInfo from './user-info';

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
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
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://duncanflixapi-2df251ca79e4.herokuapp.com/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    .then((response) => {
        if (response.ok) {
            alert("Profile updated successfully");
            localStorage.setItem('user', JSON.stringify(data));
            window.location.reload();
        } else {
            alert("Profile update failed");
        }
    });
  };

  if (!user) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  useEffect(() => {
    setUsername(localUser.Username);
    setEmail(localUser.Email);
    setBirthday(localUser.Birthday ? localUser.Birthday.split('T')[0] : "");
  }, [localUser]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>
          <strong>Username:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='4'
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