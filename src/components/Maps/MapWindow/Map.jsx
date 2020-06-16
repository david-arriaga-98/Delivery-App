import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Api } from '../../../constants/Common';

import SearchWithLocale from './SearchWithLocale';
import SearchWithName from './SearchWithName';

const MapContainer = ({ google, type }) => {
	// Hooks
	const [gotData, setGotData] = useState(false);
	const [center, setCenter] = useState({
		lat: undefined,
		lng: undefined
	});
	const [marker, setMarker] = useState({
		lat: undefined,
		lng: undefined
	});
	const [indication, setIndication] = useState('');

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
			border: '3px solid rgba(0,0,0,.3)',
			borderRadius: '.5rem'
		},
		center: {
			lat: 14.601906,
			lng: -90.5817001
		},
		style: {
			width: '100%',
			height: '50vh'
		}
	};
	return (
		<React.Fragment>
			<SearchWithName setCenter={setCenter} center={center} />
			<Row className="justify-content-center mb-4 ">
				<Col md="11" className="px-0">
					<div style={mapProps.style}>
						<Map
							zoom={10}
							google={google}
							style={mapProps.mapStyle}
							onClick={handleClick}
							initialCenter={mapProps.center}
							center={center}>
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
				<SearchWithLocale
					marker={marker}
					type={type}
					store={store}
				/>
			</Row>
		</React.Fragment>
	);
};

export const LoadingContainer = () => {
	return <div>Cargando...</div>;
};

export default GoogleApiWrapper({
	LoadingContainer,
	apiKey: Api.GOOGLE_API_KEY
})(MapContainer);
