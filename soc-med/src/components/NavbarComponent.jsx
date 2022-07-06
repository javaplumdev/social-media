import { async } from '@firebase/util';
import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {
	BsFillPersonFill,
	BsGearFill,
	BsBoxArrowLeft,
	BsFillHouseFill,
} from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';

const NavbarComponent = () => {
	const { logOut } = useContext(ContextVariable);

	const handleLogout = async () => {
		try {
			await logOut();
		} catch (error) {
			console.warn(error.message);
		}
	};

	return (
		<Navbar bg="white" variant="light">
			<Container>
				<Navbar.Brand href="/home" style={{ color: '#fb8500' }}>
					Di q alam
				</Navbar.Brand>
				<Nav className="mx-auto">
					<Nav.Link href="/home">
						<BsFillHouseFill color="#fb8500" /> Home
					</Nav.Link>
					<Nav.Link href="#features">Messages</Nav.Link>
					<Nav.Link href="#pricing">Friend requests</Nav.Link>
				</Nav>
				<Nav>
					<NavDropdown title="Profile" id="basic-nav-dropdown">
						<NavDropdown.Item href="/profile">
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
