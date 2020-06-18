import React, { useState } from 'react';
import { Col, FormControl, Button, Spinner } from 'react-bootstrap';
import { searchByLocation } from '../../../services/Map/searchLocation';
import { useDispatch } from 'react-redux';
import MapConstants from '../../../constants/Map';

const SearchWithLocale = ({ marker, type, store }) => {
	const [indications, setIndications] = useState('');
	const [petitions, setPetitions] = useState({
		error: '',
		charging: false
	});
	const dispatch = useDispatch();

	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			// dispatchAction();
		}
	};

	const handleChange = (e) => {
		setIndications(e.target.value);
	};

	const handleClick = async () => {
		// 1. Validamos que haya escogido un lugar
		if (marker.lat === undefined || marker.lng === undefined) {
			setPetitions({
				...petitions,
				error: 'Debes marcar un lugar en el mapa'
			});
		} else {
			// 2. Validamos que donde va el texto no este vacío
			if (indications === '') {
				setPetitions({
					...petitions,
					error: 'Debes ingresar una indicación'
				});
			} else {
				try {
					// 3. Hacemos la llamada al api
					setPetitions({
						...petitions,
						charging: true
					});
					const values = {
						position: {
							...marker
						},
						direcction: '',
						indications
					};

					if (type === 'DESTINY') {
						// Validamos que los datos ya no esten ingresados
						if (
							store.destiny.direcction !== '' &&
							store.destiny.position.lat ===
								marker.lat &&
							store.destiny.position.lng === marker.lng
						) {
							values.direcction =
								store.destiny.direcction;
						} else {
							const {
								results
							} = await searchByLocation(marker);
							values.direcction =
								results[1].formatted_address;
						}
						dispatch({
							type:
								MapConstants.REGISTER_DESTINY_DIRECTION,
							payload: values
						});
						dispatch({
							type:
								MapConstants.OPEN_CLOSE_DESTINY_MODAL
						});
					} else if (type === 'ORIGIN') {
						if (
							store.origin.direcction !== '' &&
							store.origin.position.lat ===
								marker.lat &&
							store.origin.position.lng === marker.lng
						) {
							values.direcction =
								store.origin.direcction;
						} else {
							const {
								results
							} = await searchByLocation(marker);
							values.direcction =
								results[1].formatted_address;
						}
						dispatch({
							type:
								MapConstants.REGISTER_ORIGIN_DIRECTION,
							payload: values
						});
						dispatch({
							type: MapConstants.OPEN_CLOSE_ORIGIN_MODAL
						});
					}
				} catch (error) {
					setPetitions({
						...petitions,
						error:
							'Ha ocurrido un error al obtener su direccion'
					});
				}
				setPetitions({
					...petitions,
					charging: false
				});
			}
		}
	};

	return (
		<React.Fragment>
			<Col md="11">
				<FormControl
					type="text"
					className="mt-2"
					placeholder="Indicaciones de ubicación"
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					value={indications}
				/>
				<span className="error-message">
					{petitions.error}
				</span>
			</Col>
			<Col md="8" className="mt-2">
				{petitions.charging ? (
					<Button
						variant="primary"
						type="submit"
						disabled
						block>
						Fijando ubicación
						<Spinner
							className="ml-2"
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
					</Button>
				) : (
					<Button
						variant="primary"
						type="submit"
						block
						onClick={handleClick}>
						Fijar ubicación
					</Button>
				)}
			</Col>
		</React.Fragment>
	);
};

export default React.memo(SearchWithLocale);
