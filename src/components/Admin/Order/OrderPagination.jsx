import React, { useState } from 'react';

import OrderTable from './OrderTable';

import PaginationComponent from '../../Common/Paginator';
import Search from '../../Common/Search';
import { NoHayDatos } from '../../Shipping/ShippingResponses';

const OrderPagination = ({ data, setLoadData }) => {
	const [modal, setModal] = useState(false);
	const [dataInfo, setDataInfo] = useState(0);

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
					'ID Orden',
					'ID Pedido',
					'Estado',
					'Usuario'
				]}
				fieldsToSearch={[
					'idorden',
					'idpedido',
					'nombreestado',
					'usuario'
				]}
				setSearchData={setSearchData}
				setUseSearch={setUseSearch}
			/>

			{useSearch ? (
				searchData.length === 0 ? (
					<NoHayDatos />
				) : (
					<>
						<OrderTable
							pData={pData}
							page={page}
							setDataInfo={setDataInfo}
							setModal={setModal}
							range={range}
							setLoadData={setLoadData}
						/>

						<PaginationComponent
							data={searchData}
							setPData={setPData}
							context={'pedidos'}
							page={page}
							setPage={setPage}
							range={range}
							setRange={setRange}
						/>
					</>
				)
			) : (
				<>
					<OrderTable
						pData={pData}
						page={page}
						setDataInfo={setDataInfo}
						setModal={setModal}
						range={range}
						setLoadData={setLoadData}
					/>

					<PaginationComponent
						data={data}
						setPData={setPData}
						context={'pedidos'}
						page={page}
						setPage={setPage}
						range={range}
						setRange={setRange}
					/>
				</>
			)}
		</>
	);
};

export default OrderPagination;
