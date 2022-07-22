import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import heroBg from '../assets/hero-bg.png';
import ribbitSample from '../assets/ribbit-sample.PNG';
import sillyfroglogo from '../assets/sillyfroglogo.svg';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { GrMenu } from 'react-icons/gr';

const LandingPage = () => {
	const { googleSignIn, users } = useContext(ContextVariable);
	let navigate = useNavigate();

	const handleGoogleSignIn = async (e) => {
		e.preventDefault();

		try {
			await googleSignIn();
			navigate('/home');
		} catch (error) {
			console.warn(error.message);
		}
	};

	const fakeData = [
		{
			id: 1,
			name: 'Adina Barbosa',
			content: 'Ang utot pinasok sa ref, tumigas.',
			profilePicture: 'https://randomuser.me/api/portraits/med/men/25.jpg',
		},
		{
			id: 2,
			name: 'Rudi Droste',
			content: 'Ang utot pinasok sa ref, tumigas.',
			profilePicture: 'https://randomuser.me/api/portraits/med/women/28.jpg',
		},
		{
			id: 3,
			name: ' Valentin Ortega',
			content: 'Ang utot pinasok sa ref, tumigas.',
			profilePicture: 'https://randomuser.me/api/portraits/med/men/83.jpg',
		},
		{
			id: 4,
			name: 'Karoline Sviggum',
			content: 'Ang utot pinasok sa ref, tumigas.',
			profilePicture: 'https://randomuser.me/api/portraits/med/men/7.jpg',
		},
		{
			id: 5,
			name: 'Nuria Leon',
			content: 'Ang utot pinasok sa ref, tumigas.',
			profilePicture: 'https://randomuser.me/api/portraits/med/women/5.jpg',
		},
	];

	return (
		<>
			<Navbar expand="lg" className="sticky-top bg-white">
				<Container>
					<Navbar.Brand
						href="/home"
						style={{ color: '#77b255' }}
						className="mt-2"
					>
						<img src={sillyfroglogo} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav">
						<GrMenu />
					</Navbar.Toggle>

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mx-auto"></Nav>
						<Nav>
							<Link to="/register" className="mt-2">
								<button
									className="buttons"
									style={{ borderRadius: '2em', padding: '.5em 2em' }}
								>
									Get started
								</button>
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{/* Hero */}
			<div className="hero-section d-flex justify-content-center align-items-center">
				<div style={{ marginBottom: '5em' }} className="text-center">
					<h1
						className="fw-bold display-3 text-center px-2"
						style={{ color: '#264653' }}
					>
						{' '}
						<span>Jump</span> to the topic <br></br>and make - meet friends.
					</h1>
					<div className="my-3">
						<button
							className="google-hero-buttons m-2"
							onClick={handleGoogleSignIn}
						>
							<FcGoogle className="bg-white rounded me-1" size="20" />
							Sign in with google
						</button>

						<Link to="/login">
							<button
								className="login-hero-buttons m-2"
								style={{
									backgroundColor: '#2a9d8f',
									border: 'none',
									color: '#fff',
								}}
							>
								Log in with email
							</button>
						</Link>
					</div>

					<br></br>
					<small style={{ color: '#52796f' }} className="text-white">
						Don't have an account? <Link to="/register">Register here</Link>
					</small>
				</div>
			</div>
			<div className="my-5" style={{ marginTop: '2em' }}>
				<Container>
					<div className="text-center">
						<h1 className="fw-bold" style={{ color: '#264653' }}>
							Engage with people and tell the world what you <span>feel</span>.
						</h1>

						<div style={{ overflowX: 'hidden' }}>
							<img src={ribbitSample} style={{ borderRadius: '3em' }} />
							<img src={ribbitSample} style={{ borderRadius: '3em' }} />
							<img src={ribbitSample} style={{ borderRadius: '3em' }} />
						</div>
					</div>
				</Container>
				<div className="text-center">
					<h1
						className="fw-bold"
						style={{ color: '#264653', marginTop: '2em' }}
					>
						With over {users.length - 1}+ users across the country
					</h1>
				</div>
				<div className="d-flex flex-wrap justify-content-center my-3">
					{fakeData.map((item) => {
						return (
							<div
								key={item.id}
								className="bg-white p-3 m-2 rounded"
								style={{ maxWidth: '320px' }}
							>
								<div className="d-flex ">
									<img
										src={item.profilePicture}
										className="me-3"
										style={{
											width: '50px',
											height: '50px',
											borderRadius: '50%',
											objectFit: 'cover',
										}}
									/>
									<p>{item.name}</p>
								</div>

								<div className="my-2">{item.content}</div>
							</div>
						);
					})}
				</div>
				<hr></hr>
			</div>

			<div
				className="bg-white p-2 d-flex justify-content-center flex-wrap "
				style={{ marginTop: '10em' }}
			>
				<p className="my-2">Silyfrog © All Rights Reserved</p>
			</div>
		</>
	);
};

export default LandingPage;
