import React, { useState } from 'react';
import {
	Col,
	Row,
	InputGroup,
	FormControl,
	Spinner
} from 'react-bootstrap';
import { searchByName } from '../../../services/Map/searchLocation';

const SearchSearch = ({ searchLocale }) => (
	<InputGroup.Text
		className="bg-primary put-hand"
		onClick={searchLocale}>
		<i className="fas fa-search text-white"></i>
	</InputGroup.Text>
);

const SearchCharging = () => (
	<InputGroup.Text className="bg-primary put-hand">
		<Spinner
			variant="light"
			as="span"
			animation="border"
			size="sm"
			role="status"
			aria-hidden="true"
		/>
	</InputGroup.Text>
);

const SearchWithName = ({ setCenter, center }) => {
	const [name, setName] = useState('');
	const [request, setRequest] = useState({
		error: '',
		charging: false
	});

	const handleChange = (e) => {
		setName(e.target.value);
	};
	const handleClick = async () => {
		// Realizamos algunas validaciones
		setRequest({
			...request,
			error: ''
		});
		if (name === '') {
			setRequest({
				...request,
				error: 'Este campo no puede estar vacío'
			});
		} else {
			setRequest({
				...request,
				error: '',
				charging: true
			});
			// Realizamos la busqueda
			try {
				const data = await searchByName(name);

				if (data.status === 'ZERO_RESULTS') {
					setRequest({
						...request,
						error: 'No se ha encontrado esta ubicación'
					});
				} else {
					setCenter({
						...center,
						lat: data.results[0].geometry.location.lat,
						lng: data.results[0].geometry.location.lng
					});
				}
				setName('');
			} catch (e) {
				setRequest({
					...request,
					error: 'No se ha encontrado esta ubicación'
				});
			}
			setRequest({
				...request,
				charging: false
			});
		}
	};

	return (
		<Row className="justify-content-center">
			<Col md="5">
				<InputGroup className="mb-2">
					<FormControl
						onChange={handleChange}
						disabled={request.charging}
						type="text"
						placeholder="Ingrese el lugar a buscar"
						value={name}
					/>
					<InputGroup.Append>
						{!request.charging ? (
							<SearchSearch
								searchLocale={handleClick}
							/>
						) : (
							<SearchCharging />
						)}
					</InputGroup.Append>
				</InputGroup>
				<span className="error-message">{request.error}</span>
			</Col>
		</Row>
	);
};

export default React.memo(SearchWithName);
