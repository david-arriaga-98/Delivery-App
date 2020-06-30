import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import RoutingMain from './RoutingMain';

const Routing = () => {
	const [modal, setModal] = useState(false);

	React.useEffect(() => {
		console.log('ok');
	}, []);

	return (
		<>
			<Button
				variant="primary"
				onClick={() => {
					setModal(true);
				}}>
				+ Agregar
			</Button>
			<RoutingMain modal={modal} setModal={setModal} />
		</>
	);
};

export default Routing;
