import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom"
import UserInfo from './user-info';

export const ProfileView = ({ user, movies, handleRemoveFromFavorites }) => {

  const [username, setUsername] = useState(user.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email || "");
  const [birthday, setBirthday] = useState(user.Birthday ? user.Birthday.split('T')[0] : "");
  const [favorites, setFavorites] = useState(user.FavoriteMovies);  
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);
    console.log(favorites);    

  //generate list of the users favorites as objects array of favorites
  
 
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
      const response = await fetch(`https://duncanflixapi-2df251ca79e4.herokuapp.com/users/${user.Username}`, {
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
  
  const favoriteMovies = currentUser && currentUser.FavoriteMovies
  ? Array.from(currentUser.FavoriteMovies).map((movieId) => {
      const movie = movies.find((movie) => movie._id === movieId);
      return movie ? (
        <div key={movie._id}>
          <h4>{movie.Title}</h4>
          <p>{movie.Description}</p>
        </div>
      ) : null;
    })
  : [];
  
  if (!currentUser) return <div>Loading...</div>;
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
      <Form.Group>
  <Form.Label>
    <strong>Favorite Movies:</strong>
  </Form.Label>
  {favorites.map((movieId) => {
    const movie = movies.find((movie) => movie._id === movieId);
    return movie ? (
      <MovieCard
        key={movie._id}
        user={currentUser}
        movie={movie}
        handleRemoveFromFavorites={ handleRemoveFromFavorites(movie) }
        title={movie.Title || 'No Title'}
      />
    ) : null;
  })}
</Form.Group>
      {/* <Form.Group controlId="formFavorites">
        <Form.Label>
          <strong>Favorite Movies:</strong>
        </Form.Label>
        {movies.map((movie) => (
          <Form.Check
            key={movie._id}
            type="checkbox"
            label={movie.Title}
            checked={fav.includes(movie._id)}
            onChange={() => handleFavoriteToggle(movie._id)}
          />
        ))}
      </Form.Group> */}
      <div style={{ marginTop: '20px' }}></div>
      <Button variant="primary" type="submit">Edit Profile</Button>
    </Form>
  )};


export default ProfileView;