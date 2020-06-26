import React, { useState } from 'react';

import OrderTable from './OrderTable';
import OrderDeliveryMan from './OrderDeliveryMan';

import PaginationComponent from '../../Common/Pagination';
import Search from '../../Common/Search';
import { NoHayDatos } from '../../Shipping/ShippingResponses';

const OrderPagination = ({ data }) => {
	const [modal, setModal] = useState(false);
	const [dataInfo, setDataInfo] = useState(0);

	// Paginación
	const [page, setPage] = useState(1);
	const [pData, setPData] = useState([]);

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
						/>

						<PaginationComponent
							data={searchData}
							setPData={setPData}
							context={'pedidos'}
							range={10}
							page={page}
							setPage={setPage}
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
					/>

					<PaginationComponent
						data={data}
						setPData={setPData}
						context={'pedidos'}
						range={10}
						page={page}
						setPage={setPage}
					/>
				</>
			)}
			<OrderDeliveryMan
				modal={modal}
				setModal={setModal}
				dataInfo={data[dataInfo]}
			/>
		</>
	);
};

export default OrderPagination;
