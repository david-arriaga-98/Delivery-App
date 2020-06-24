import React, { useState } from 'react';

import OrderTable from './OrderTable';
import OrderDeliveryMan from './OrderDeliveryMan';

import PaginationComponent from '../../Common/Pagination';
import Search from '../../Common/Search';
import { NoHayDatos } from '../../Shipping/ShippingResponses';

const OrderPagination = ({ data }) => {
	const [page, setPage] = useState(1);
	const [pData, setPData] = useState([]);
	const [modal, setModal] = useState(false);
	const [dataInfo, setDataInfo] = useState(0);

	// Search
	const [searchData, setSearchData] = useState([]);
	const [useSearch, setUseSearch] = useState(false);

	return (
		<>
			<Search
				data={data}
				fields={[
					'Buscar por...',
					'ID Orden~idorden',
					'ID Pedido~idpedido'
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
