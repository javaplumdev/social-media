import React, { useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ContextVariable } from '../context/context-config';

const SettingsComponent = () => {
	const { currentUserData } = useContext(ContextVariable);

	console.log(currentUserData);

	return (
		<>
			{currentUserData?.map &&
				currentUserData.map((item) => {
					return (
						<div className="grey py-5" key={item.userID}>
							<Container>
								<Form style={{ maxWidth: '520px' }}>
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

									<Button variant="danger" className="me-3" type="submit">
										Edit
									</Button>
									<button className="buttons" type="submit">
										Save
									</button>
								</Form>
							</Container>
						</div>
					);
				})}
		</>
	);
};

export default SettingsComponent;
