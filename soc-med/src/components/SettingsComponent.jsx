import React, { useContext, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { BsUpload, BsImage } from 'react-icons/bs';

const SettingsComponent = () => {
	const { currentUserData, updateUserDetails, imageData, setImageData } =
		useContext(ContextVariable);

	const [username, setUserName] = useState('');

	useEffect(() => {
		setUserName(
			currentUserData?.map && currentUserData.map((item) => item.name)[0]
		);
	}, []);

	console.log(username);

	return (
		<>
			{currentUserData?.map &&
				currentUserData.map((item) => {
					return (
						<div className="grey py-3" key={item.userID}>
							<Container>
								<div>
									<div style={{ maxWidth: '520px' }}>
										<div className="my-3">
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

										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Fist name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter first name"
												onChange={(e) => setUserName(e.target.value)}
											/>
											<Form.Text className="text-muted">
												We'll never share your private details with anyone else.
											</Form.Text>
										</Form.Group>

										<button
											className="buttons"
											onClick={() => updateUserDetails(username)}
										>
											Save
										</button>
									</div>
								</div>
							</Container>
						</div>
					);
				})}
		</>
	);
};

export default SettingsComponent;
