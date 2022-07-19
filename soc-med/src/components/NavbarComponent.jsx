import { async } from '@firebase/util';
import React, { useContext, useState } from 'react';
import {
	Navbar,
	Container,
	Nav,
	NavDropdown,
	InputGroup,
	Form,
	Badge,
} from 'react-bootstrap';
import {
	BsFillPersonFill,
	BsGearFill,
	BsBoxArrowLeft,
	BsFillHouseFill,
	BsSearch,
	BsFillChatLeftFill,
	BsFillPeopleFill,
} from 'react-icons/bs';
import { ContextVariable } from '../context/context-config';
import { Link } from 'react-router-dom';
import sillyfroglogo from '../assets/sillyfroglogo.svg';
import { IoNotificationsSharp } from 'react-icons/io5';

const NavbarComponent = () => {
	const {
		logOut,
		user,
		search,
		searchVar,
		setSearchVar,
		navigateNotification,
		notificationsData,
	} = useContext(ContextVariable);

	const yourNotification =
		notificationsData?.filter &&
		notificationsData.filter((item) => item.userWhoPosts === user.uid);

	const handleLogout = async () => {
		try {
			await logOut();
		} catch (error) {
			console.warn(error.message);
		}
	};

	const unread =
		yourNotification?.filter &&
		yourNotification.filter((item) => item.isViewed === false);

	return (
		<Navbar bg="light" expand="lg" className="sticky-top">
			<Container>
				<Navbar.Brand href="/home" style={{ color: '#77b255' }}>
					<img src={sillyfroglogo} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<div className="d-none d-md-block my-1">
							<InputGroup>
								<Form.Control
									placeholder="Search"
									onChange={(e) => setSearchVar(e.target.value)}
								/>
								<div className="buttons" onClick={() => search(searchVar)}>
									<BsSearch />
								</div>
							</InputGroup>
						</div>
					</Nav>
					<Nav>
						<Nav.Link onClick={navigateNotification}>
							<IoNotificationsSharp className="icon" size="25" />

							{unread?.length === 0 ? (
								''
							) : (
								<Badge pill bg="danger" size="5">
									{unread?.length}
								</Badge>
							)}
						</Nav.Link>

						<Nav.Link href="/messages">
							<BsFillChatLeftFill className="icon" size="25" />
						</Nav.Link>
						<Nav.Link href="/suggested">
							<BsFillPeopleFill className="icon" size="25" />
						</Nav.Link>
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
