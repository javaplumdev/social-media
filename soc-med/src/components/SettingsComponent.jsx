import React, { useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';
import { BsUpload, BsImage } from 'react-icons/bs';

const SettingsComponent = () => {
	const { currentUserData, updateProfilePicture, imageData, setImageData } =
		useContext(ContextVariable);

	console.log(currentUserData);

	return (
		<>
			{currentUserData?.map &&
				currentUserData.map((item) => {
					return (
						<div className="grey py-3" key={item.userID}>
							<Container>
								<div>
									{item.loginType === 'google' ? (
										<div>
											<p className="text-center">
												We can't change your account details. Since you logged
												in with your google account. Sorry.
											</p>
										</div>
									) : (
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
													value={item.name}
													onChange={(e) => console.log(e.target.value)}
												/>
												<Form.Text className="text-muted">
													We'll never share your email with anyone else.
												</Form.Text>
											</Form.Group>

											<button
												className="buttons"
												onClick={() => updateProfilePicture()}
											>
												Save
											</button>
										</div>
									)}
								</div>
							</Container>
						</div>
					);
				})}
		</>
	);
};

export default SettingsComponent;
