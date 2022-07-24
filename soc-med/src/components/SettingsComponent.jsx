import React, { useContext, useState, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { BsUpload, BsImage } from 'react-icons/bs';

const SettingsComponent = () => {
	const {
		currentUserData,
		updateUserDetails,
		imageData,
		setImageData,
		username,
		setUserName,
		users,
		user,
		isLoading,
	} = useContext(ContextVariable);

	useEffect(() => {
		setUserName(
			currentUserData?.map && currentUserData.map((item) => item.name)[0]
		);
	}, []);

	return (
		<div>
			<Container>
				{isLoading ? (
					<div
						style={{ height: '30vh' }}
						className="d-flex justify-content-center align-items-center"
					>
						<Spinner animation="border" variant="success" />
					</div>
				) : (
					currentUserData?.map &&
					currentUserData.map((item) => {
						return (
							<div className="p-3 bg-white mt-5 rounded" key={item.userID}>
								<Container>
									<div style={{ maxWidth: '520px' }}>
										<div className=" my-3">
											<h6>Change profile: </h6>
											<img
												src={item.profilePicture}
												className="me-3"
												style={{
													width: '160px',
													height: '160px',
													borderRadius: '50%',
													objectFit: 'cover',
												}}
											/>
											<label htmlFor="file-input" className="me-3">
												<BsImage size="20" className="icons me-2" />
												{imageData && imageData.name}
											</label>
										</div>

										<input
											id="file-input"
											type="file"
											className="d-none"
											onChange={(e) => setImageData(e.target.files[0])}
										/>
									</div>

									<input
										id="file-input"
										type="file"
										className="d-none"
										onChange={(e) => setImageData(e.target.files[0])}
									/>

									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>User name</Form.Label>{' '}
										<p
											className={
												username?.length > 15
													? `text-danger mt-3`
													: 'text-dark mt-3'
											}
										>
											{username?.length} / 15
										</p>
										<Form.Control
											type="text"
											placeholder="Enter user name"
											onChange={(e) => setUserName(e.target.value)}
										/>
										<Form.Text className="text-muted">
											We'll never share your private details with anyone else.
										</Form.Text>
									</Form.Group>

									<button
										className="buttons"
										onClick={() => updateUserDetails()}
									>
										Save
									</button>
								</Container>
							</div>
						);
					})
				)}
			</Container>
		</div>
	);
};

export default SettingsComponent;
