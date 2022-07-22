import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import heroBg from '../assets/hero-bg.png';
import sillyfroglogo from '../assets/sillyfroglogo.svg';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<>
			<Navbar bg="light" expand="lg" className="sticky-top">
				<Container>
					<Navbar.Brand href="/home" style={{ color: '#77b255' }}>
						<img src={sillyfroglogo} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mx-auto">Hi</Nav>
						<Nav>
							<Nav.Link>Hi</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{/* Hero */}
			<div className="hero-section d-flex justify-content-center align-items-center">
				<div style={{ marginBottom: '10em' }} className="text-center">
					<h1
						className="fw-bold display-3 text-center"
						style={{ color: '#264653' }}
					>
						{' '}
						<span>Jump</span> to the topic <br></br>and make - meet friends.
					</h1>
					<div className="my-3">
						<button className="google-hero-buttons m-2">
							<FcGoogle className="bg-white rounded me-3" size="30" />
							Continue with google
						</button>

						<Link to="/login">
							<button
								className="login-hero-buttons m-2"
								style={{ backgroundColor: '#2a9d8f' }}
							>
								Log in with email
							</button>
						</Link>
					</div>

					<br></br>
					<small className="fw-bold" style={{ color: '#52796f' }}>
						Don't have an account? <Link to="/register">Register here</Link>
					</small>
				</div>
			</div>
		</>
	);
};

export default LandingPage;
