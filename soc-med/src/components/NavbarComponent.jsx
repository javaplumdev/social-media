import { async } from '@firebase/util';
import React, { useContext } from 'react';
import {
	Navbar,
	Container,
	Nav,
	NavDropdown,
	InputGroup,
	Form,
	Button,
} from 'react-bootstrap';
import {
	BsFillPersonFill,
	BsGearFill,
	BsBoxArrowLeft,
	BsFillHouseFill,
	BsSearch,
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
		<Navbar bg="light" expand="lg" className="sticky-top">
			<Container>
				<Navbar.Brand href="/home" style={{ color: '#77b255' }}>
					<img src={sillyfroglogo} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<div className="d-none d-sm-block my-1">
							<InputGroup>
								<Form.Control
									placeholder="Seach"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
								/>
								<Button variant="outline-secondary" id="button-addon2">
									<BsSearch />
								</Button>
							</InputGroup>
						</div>
					</Nav>
					<Nav>
						<Nav.Link href="/home">
							<BsFillHouseFill className="icon" /> Home
						</Nav.Link>

						<Nav.Link href="#features">Messages</Nav.Link>
						<Nav.Link href="/suggested">Find friends</Nav.Link>
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
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
