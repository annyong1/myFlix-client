import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';
import UserInfo from './user-info';

export const ProfileView = ({
	user,
	token,
	movies,
	handleRemoveFromFavorites,
}) => {
	const [username, setUsername] = useState(user.Username || '');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState(user.Email || '');
	const [birthday, setBirthday] = useState(
		user.Birthday ? user.Birthday.split('T')[0] : ''
	);

  const handleDeleteProfile = async () => {
    const response = await fetch(
      `https://duncanflixapi-2df251ca79e4.herokuapp.com/users/${user.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.href='/';
  }

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		try {
			const response = await fetch(
				`https://duncanflixapi-2df251ca79e4.herokuapp.com/users/${user.Username}`,
				{
					method: 'PUT',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const contentType = response.headers.get('content-type');
			const responseText = await response.text();
			console.log('Response text:', responseText);

			if (!response.ok) {
				console.error(
					'Error updating profile:',
					response.status,
					response.statusText,
					responseText
				);
				if (response.status === 401 || response.status === 403) {
					throw new Error('Permission denied: Invalid or missing token');
				}
				throw new Error(responseText || 'Failed to update profile');
			}

			if (contentType && contentType.indexOf('application/json') !== -1) {
				const updatedUser = JSON.parse(responseText);
				console.log('Profile updated successfully:', updatedUser);
				alert('Profile updated successfully');
				localStorage.setItem('user', JSON.stringify(updatedUser));
				window.location.reload();
			} else {
				console.error('Response is not valid JSON:', responseText);
				throw new Error('Response is not valid JSON');
			}
		} catch (err) {
			console.error('Error during profile update:', err);
			alert(err.message);
		}
	};

	return (
    <>
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId='formUsername'>
				<Form.Label>
					<strong>Username:</strong>
				</Form.Label>
				<Form.Control
					type='text'
					name='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId='formPassword'>
				<Form.Label>
					<strong>Password:</strong>
				</Form.Label>
				<Form.Control
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formEmail'>
				<Form.Label>
					<strong>Email:</strong>
				</Form.Label>
				<Form.Control
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='formBdate'>
				<Form.Label>
					<strong>Birthday:</strong>
				</Form.Label>
				<Form.Control
					type='date'
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>
					<strong>Favorite Movies:</strong>
				</Form.Label>
				{user.FavoriteMovies.map((movieId) => {
					const movie = movies.find((movie) => movie._id === movieId);
					return movie ? (
						<MovieCard
							key={movie._id}
							user={user}
							movie={movie}
							handleRemoveFromFavorites={handleRemoveFromFavorites}
							title={movie.Title || 'No Title'}
						/>
					) : null;
				})}
			</Form.Group>
			<Button style={{ marginTop: '20px' }} variant='primary' type='submit'>
				Edit Profile
			</Button>
		</Form>
      <Button onClick={handleDeleteProfile} style={{ width: '150px' }} variant='danger' type='submit'>
				Delete Profile
			</Button>
    </>
	);
};

export default ProfileView;
