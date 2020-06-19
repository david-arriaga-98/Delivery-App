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
	<InputGroup.Text className="put-hand" onClick={searchLocale}>
		<i className="fas fa-search text-black-50"></i>
	</InputGroup.Text>
);

const SearchCharging = () => (
	<InputGroup.Text>
		<Spinner
			variant="dark"
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

	const [charging, setCharging] = useState(false);
	const [error, setError] = useState('');

	React.useEffect(() => {
		const clearError = setTimeout(() => {
			setError('');
		}, 2000);

		return () => {
			clearTimeout(clearError);
		};
	}, [error]);

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			handleClick();
		}
	};

	const handleClick = async () => {
		// Realizamos algunas validaciones
		setError('');
		if (name === '') {
			setError('Este campo no puede estar vacío');
		} else {
			setCharging(true);
			// Realizamos la busqueda
			try {
				const data = await searchByName(name);
				setCharging(false);
				if (
					data.status === 'ZERO_RESULTS' ||
					data.results.length === 0
				) {
					setError('No se ha encontrado esta ubicación');
				} else {
					setCenter({
						...center,
						lat: data.results[0].geometry.location.lat,
						lng: data.results[0].geometry.location.lng
					});
				}
				setName('');
			} catch (e) {
				setError('No se ha encontrado esta ubicación');
			}
		}
	};

	return (
		<Row className="justify-content-center">
			<Col md="5">
				<InputGroup className="mb-2">
					<FormControl
						onChange={handleChange}
						disabled={charging}
						type="text"
						placeholder="Ingrese el lugar a buscar"
						value={name}
						isInvalid={!!error}
						onKeyUp={handleKeyUp}
					/>
					<InputGroup.Append>
						{!charging ? (
							<SearchSearch
								searchLocale={handleClick}
							/>
						) : (
							<SearchCharging />
						)}
					</InputGroup.Append>
					<FormControl.Feedback type="invalid">
						{error}
					</FormControl.Feedback>
				</InputGroup>
			</Col>
		</Row>
	);
};

export default React.memo(SearchWithName);
