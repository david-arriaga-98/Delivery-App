import React, { useState } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { Col, Row, Card, Button, FormControl } from 'react-bootstrap';
import { Api } from '../constants/Common';
import { EstaCargandoLosDatos } from '../components/Shipping/ShippingResponses';
import { useSelector, useDispatch } from 'react-redux';
import Axios from '../utils/Axios';
import Helper from '../constants/Helper';

const RoutingMap = (props) => {
	const { google, setModal } = props;

	const [error, setError] = useState('');
	const [showMap, setShowMap] = useState(false);

	const [ambito, setAmbito] = useState('');

	const [marker, setMarker] = useState({
		lat: undefined,
		lng: undefined,
		postal: '',
		direcction: ''
	});
	const dispatch = useDispatch();
	const [origin, setOrigin] = useState([]);
	const [destiny, setDestiny] = useState([]);

	const userID = useSelector(
		(state) => state.session.data.idusuario
	);

	const cambiarAmbito = (e) => {
		setAmbito(e);
	};

	const handleChange = (e) => {
		setMarker({
			...marker,
			[e.target.name]: e.target.value
		});
	};

	React.useEffect(() => {
		const ii = setTimeout(() => {
			setError('');
		}, 2500);
		return () => {
			clearTimeout(ii);
		};
	}, [error]);

	const Agregaraa = () => {
		// Validamos
		if (
			marker.lat === undefined ||
			marker.lng === undefined ||
			marker.direcction === ''
		) {
			setError('Verifique los datos a agregar');
		} else {
			if (ambito === 'Origin') {
				setOrigin([...origin, marker]);
			} else if (ambito === 'Destiny') {
				setDestiny([...destiny, marker]);
			}
			setShowMap(false);
			setMarker({
				direcction: '',
				postal: '',
				lat: undefined,
				lng: undefined
			});
			setError('');
		}
	};
	const enviarDatos = async () => {
		try {
			if (origin.length === 0 || destiny.length === 0) {
				setError('Debes agregar aunque sea un valor');
			} else {
				const nwww = {
					idusuario: userID,
					origen: origin.map((item, index) => {
						return {
							codigopostalorg: item.postal,
							direccionorg: item.direcction,
							latitudorg: item.lat,
							longitudorg: item.lng
						};
					}),
					destino: destiny.map((item, index) => {
						return {
							codigopostaldes: item.postal,
							direcciondes: item.direcction,
							latituddes: item.lat,
							longituddes: item.lng
						};
					})
				};

				await Axios.post('/Orden/InsertarParadas', nwww);
				setModal(false);
				dispatch({
					type: Helper.SHOW_SUCCESS_MODAL,
					payload: 'Guardado correctamente'
				});
			}
		} catch (error) {
			setError('Ha ocurrido un error');
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
	// Propiedades del mapa
	const mapProps = {
		mapStyle: {
			border: '2px solid rgba(0,0,0,.3)',
			borderRadius: '.5rem'
		},
		center: {
			lat: 14.601906,
			lng: -90.5817001
		},
		style: {
			width: '90%',
			height: '30vh'
		}
	};
	return (
		<Row className="justify-content-center">
			{showMap ? (
				<>
					{ambito === 'Origin' ? (
						<p>
							Seleccione un punto en el mapa para
							escoger el origen
						</p>
					) : (
						<p>
							Seleccione un punto en el mapa para
							escoger el destino
						</p>
					)}
					<Col
						xs="11"
						sm="11"
						md="11"
						className="px-0 mb-2">
						<div style={mapProps.style}>
							<Map
								zoom={15}
								google={google}
								style={mapProps.mapStyle}
								initialCenter={mapProps.center}
								onClick={handleClick}>
								<Marker position={marker} />
							</Map>
						</div>
					</Col>
					<Col md="6">
						<FormControl
							placeholder="Ingrese la dirección"
							name="direcction"
							onChange={handleChange}
						/>
					</Col>
					<Col md="6">
						<FormControl
							placeholder="Ingrese su código postal"
							name="postal"
							onChange={handleChange}
						/>
					</Col>
					<span className="error-message mt-2">
						{error}
					</span>
				</>
			) : (
				<>
					<Col md="6">
						<Button
							variant="success"
							size="sm"
							className="mb-2"
							disabled={
								origin.length === 0 ? false : true
							}
							onClick={() => {
								cambiarAmbito('Origin');
								setShowMap(true);
							}}>
							+ Agregar Origen
						</Button>
						{origin.map((item, index) => {
							return (
								<Card
									border="dark"
									key={index}
									className="mt-1">
									<Card.Body>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Latitud: ${item.lat}`}
										/>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Longitud: ${item.lng}`}
										/>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Dirección: ${item.direcction}`}
										/>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Postal: ${item.postal}`}
										/>
									</Card.Body>
								</Card>
							);
						})}
					</Col>
					<Col md="6">
						<Button
							variant="success"
							size="sm"
							className="mb-2"
							onClick={() => {
								cambiarAmbito('Destiny');
								setShowMap(true);
							}}>
							+ Agregar Destinos
						</Button>
						{destiny.map((item, index) => {
							return (
								<Card
									border="dark"
									key={index}
									className="mt-1">
									<Card.Body>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Latitud: ${item.lat}`}
										/>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Longitud: ${item.lng}`}
										/>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Dirección: ${item.direcction}`}
										/>
										<FormControl
											readOnly
											className="bg-secondary text-white"
											value={`Postal: ${item.postal}`}
										/>
									</Card.Body>
								</Card>
							);
						})}
					</Col>
					<span className="error-message mt-2 mb-2">
						{error}
					</span>
				</>
			)}
			<Col md="12" className="mt-2">
				<Button
					variant="success"
					size="sm"
					className="mr-2"
					onClick={() => {
						showMap ? Agregaraa() : enviarDatos();
					}}>
					{showMap ? (
						'+ Agregar'
					) : (
						<>
							<span>
								<i className="fas fa-save mr-2"></i>
							</span>
							Guardar
						</>
					)}
				</Button>
				<Button
					variant="danger"
					size="sm"
					onClick={() => {
						showMap ? setShowMap(false) : setModal(false);
					}}>
					<span>
						<i className="fas fa-arrow-left mr-2"></i>
					</span>
					{showMap ? 'Volver' : 'Cancelar'}
				</Button>
			</Col>
		</Row>
	);
};

export default GoogleApiWrapper({
	LoadingContainer: EstaCargandoLosDatos,
	apiKey: Api.GOOGLE_API_KEY
})(RoutingMap);
