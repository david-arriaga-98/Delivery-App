import React, { useState } from 'react';

import PaginationComponent from '../../Common/Paginator';
import Search from '../../Common/Search';
import { NoHayDatos } from '../../Shipping/ShippingResponses';
import DeliveryManTable from './DeliveryManTable';

const DeliveryManPagination = ({ data }) => {
	// Paginación
	const [page, setPage] = useState(1);
	const [pData, setPData] = useState([]);
	const [range, setRange] = useState(10);

	// Search
	const [searchData, setSearchData] = useState([]);
	const [useSearch, setUseSearch] = useState(false);

	return (
		<>
			<Search
				data={data}
				fields={[
					'Buscar por...',
					'Nombres',
					'Apellidos',
					'Usuario',
					'N° de Viajes'
				]}
				fieldsToSearch={[
					'nombres',
					'apellidos',
					'usuario',
					'viajes'
				]}
				setSearchData={setSearchData}
				setUseSearch={setUseSearch}
			/>

			{useSearch ? (
				searchData.length === 0 ? (
					<NoHayDatos />
				) : (
					<>
						<DeliveryManTable pData={pData} page={page} />

						<PaginationComponent
							data={searchData}
							setPData={setPData}
							context={'pedidos'}
							range={range}
							setRange={setRange}
							page={page}
							setPage={setPage}
						/>
					</>
				)
			) : (
				<>
					<DeliveryManTable pData={pData} page={page} />

					<PaginationComponent
						data={data}
						setPData={setPData}
						context={'pedidos'}
						range={range}
						setRange={setRange}
						page={page}
						setPage={setPage}
					/>
				</>
			)}
		</>
	);
};

export default DeliveryManPagination;
