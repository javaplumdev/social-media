import { async } from '@firebase/util';
import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, NavLink } from 'react-bootstrap';
import {
	BsFillPersonFill,
	BsGearFill,
	BsBoxArrowLeft,
	BsFillHouseFill,
} from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';
import sillyfroglogo from '../assets/sillyfroglogo.svg';

const NavbarComponent = () => {
	const { logOut, user } = useContext(ContextVariable);

	const handleLogout = async () => {
		try {
			await logOut();
		} catch (error) {
			console.warn(error.message);
		}
	};

	return (
		<Navbar bg="white" variant="light" className="sticky-top">
			<Container>
				<Navbar.Brand href="/home" style={{ color: '#77b255' }}>
					<img src={sillyfroglogo} />
				</Navbar.Brand>

				<Nav className="mx-auto">
					<Nav.Link href="/home">
						<BsFillHouseFill className="icon" /> Home
					</Nav.Link>

					<Nav.Link href="#features">Messages</Nav.Link>
					<Nav.Link href="/suggested">Find friends</Nav.Link>
				</Nav>
				<Nav>
					<NavDropdown title="Profile" id="basic-nav-dropdown">
						<NavDropdown.Item href={`/profile/${user.uid}`}>
							<BsFillPersonFill /> Profile
						</NavDropdown.Item>

						<NavDropdown.Item href="/settings">
							<BsGearFill /> Settings
						</NavDropdown.Item>

						<NavDropdown.Item onClick={handleLogout}>
							<BsBoxArrowLeft /> Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
