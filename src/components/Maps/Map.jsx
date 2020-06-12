import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import {
	Row,
	Col,
	FormControl,
	Button,
	Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

import MapConstants from '../../constants/Map';
import { Api } from '../../constants/Common';

const MapContainer = (props) => {
	// Props
	const { google, type } = props;

	// Hooks

	const [gotData, setGotData] = useState(false);

	const [charging, setCharging] = useState(false);

	const [marker, setMarker] = useState({
		lat: undefined,
		lng: undefined
	});
	const [error, setError] = useState('');
	const [indication, setIndication] = useState('');
	const dispatch = useDispatch();

	const store = useSelector((state) => state.map);

	// eslint-disable-next-line
	useEffect(() => {
		if (type === 'ORIGIN') {
			if (
				store.origin.position.lat !== undefined &&
				store.origin.position.lng !== undefined &&
				marker.lat === undefined &&
				marker.lng === undefined
			) {
				setMarker({
					...marker,
					lat: store.origin.position.lat,
					lng: store.origin.position.lng
				});
			} else if (
				store.origin.indications !== '' &&
				indication === '' &&
				!gotData
			) {
				setIndication(store.origin.indications);
				setGotData(true);
			}
		} else if (type === 'DESTINY') {
			if (
				store.destiny.position.lat !== undefined &&
				store.destiny.position.lng !== undefined &&
				marker.lat === undefined &&
				marker.lng === undefined
			) {
				setMarker({
					...marker,
					lat: store.destiny.position.lat,
					lng: store.destiny.position.lng
				});
			} else if (
				store.destiny.indications !== '' &&
				indication === '' &&
				!gotData
			) {
				setIndication(store.destiny.indications);
				setGotData(true);
			}
		}
	});

	// Functions
	const dispatchAction = async () => {
		// 1. Validamos que haya escogido un lugar
		if (marker.lat === undefined || marker.lng === undefined) {
			setError('Debes marcar un lugar en el mapa');
		} else {
			// 2. Validamos que donde va el texto no este vacío
			if (indication === '') {
				setError('Debes ingresar una indicación');
			} else {
				// 3. Hacemos la llamada al api
				try {
					setCharging(true);
					const values = {
						position: {
							...marker
						},
						direcction: '',
						indications: indication
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
							const { results } = await getDirection();
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
							const { results } = await getDirection();
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
					setError(
						'Ha ocurrido un error al obtener su direccion'
					);
				}
				setCharging(false);
			}
		}
	};
	const getDirection = async () => {
		try {
			const url = `${Api.GEOCODING_URL}${marker.lat},${marker.lng}&key=${Api.GOOGLE_API_KEY}`;
			const { data } = await Axios.get(url);
			return data;
		} catch (error) {
			throw error;
		}
	};
	const handleClick = (mapProps, map, clickEvent) => {
		// Aqui debemos validar que no se salga del rango
		setMarker({
			...marker,
			lat: clickEvent.latLng.lat(),
			lng: clickEvent.latLng.lng()
		});
	};

	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			dispatchAction();
		}
	};

	const handleChange = (e) => {
		setIndication(e.target.value);
	};

	// Estilos del contenedor del mapa
	const style = {
		width: '100%',
		height: '50vh'
	};

	// Propiedades del mapa
	const mapProps = {
		mapStyle: {
			border: '3px solid rgba(0,0,0,.3)',
			borderRadius: '.5rem'
		},
		center: {
			lat: 14.601906,
			lng: -90.5817001
		}
	};
	return (
		<Row className="justify-content-center mb-4 ">
			<Col md="11" className="px-0">
				<div style={style}>
					<Map
						zoom={10}
						google={google}
						style={mapProps.mapStyle}
						onClick={handleClick}
						initialCenter={mapProps.center}>
						{google === undefined ? (
							<Marker position={marker} />
						) : (
							<Marker
								icon={{
									url:
										'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/7576997921582962152-512.png',
									anchor: new google.maps.Point(
										16,
										16
									),
									scaledSize: new google.maps.Size(
										32,
										32
									)
								}}
								position={marker}
							/>
						)}
					</Map>
				</div>
			</Col>
			<Col md="11">
				<FormControl
					type="text"
					className="mt-2"
					placeholder="Indicaciones de ubicación"
					name="indications"
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					value={indication}
				/>
				<span className="error-message">{error}</span>
			</Col>
			<Col md="8" className="mt-2">
				{charging ? (
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
						onClick={dispatchAction}>
						Fijar ubicación
					</Button>
				)}
			</Col>
		</Row>
	);
};

export const LoadingContainer = () => {
	return <div>Cargando...</div>;
};

export default GoogleApiWrapper({
	LoadingContainer,
	apiKey: Api.GOOGLE_API_KEY
})(MapContainer);
