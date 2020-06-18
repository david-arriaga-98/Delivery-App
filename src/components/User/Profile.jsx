import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
	FormGroup,
	FormLabel,
	FormControl,
	Card,
	Button
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../services/User/user.session';

export default () => {
	const userState = useSelector((state) => state.session);
	const [error, setError] = useState('');
	const [gotData, setGotData] = useState(false);
	const [user, setUser] = useState({
		user: '...',
		name: '...',
		lastname: '...',
		phone: '...',
		email: '...'
	});

	React.useEffect(() => {
		const execute = async () => {
			if (!gotData) {
				setGotData(true);
				try {
					const data = await getCurrentUser(
						userState.data.idusuario
					);

					setUser({
						...user,
						name: data[0].nombres,
						lastname: data[0].apellidos
					});
				} catch (error) {
					setError('Ha ocurrido un error');
				}
			}
		};
		execute();
	});

	return (
		<Row className="justify-content-center mb-4">
			<Card border="secondary">
				<Card.Header>
					<h4 className="text-black-50">
						<i className="far fa-address-card mr-2"></i>
						Mi Perfil
					</h4>
				</Card.Header>
				<Card.Body>
					<FormGroup>
						<FormLabel className="text-black-50">
							Usuario:
						</FormLabel>
						<FormControl
							readOnly
							type="text"
							value={user.user}
							className="bg-secondary text-white"
						/>
					</FormGroup>

					<Row>
						<Col md="6">
							<FormGroup>
								<FormLabel className="text-black-50">
									Nombres:
								</FormLabel>
								<FormControl
									readOnly
									type="text"
									value={user.name}
									className="bg-secondary text-white"
								/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<FormLabel className="text-black-50">
									Apellidos:
								</FormLabel>
								<FormControl
									readOnly
									type="text"
									value={user.lastname}
									className="bg-secondary text-white"
								/>
							</FormGroup>
						</Col>
					</Row>

					<FormGroup>
						<FormLabel className="text-black-50">
							Teléfono:
						</FormLabel>

						<FormControl
							readOnly
							type="text"
							value={user.phone}
							className="bg-secondary text-white"
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel className="text-black-50">
							Correo electrónico:
						</FormLabel>
						<FormControl
							readOnly
							type="text"
							value={user.email}
							className="bg-secondary text-white"
						/>
					</FormGroup>
					<FormGroup className="text-right">
						<Button size="sm">
							<i className="far fa-edit mr-2"></i>
							Editar mi información
						</Button>
					</FormGroup>
				</Card.Body>
			</Card>
		</Row>
	);
};
