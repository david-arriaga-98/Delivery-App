import React, { useState } from 'react';

import GetDeliveryManTable from './GetDeliveryManTable';
import PaginatorComponent from '../../../Common/Paginator';

import { NoHayDatos } from '../../../Shipping/ShippingResponses';

import { setDelivery } from '../../../../services/Admin/orderService';
import Search from '../../../Common/Search';

const MainGetDeliveryMan = ({
	data,
	dataInfo,
	userStore,
	setModal
}) => {
	const [pData, setPData] = useState([]);
	const [page, setPage] = useState(1);
	const [charging, setCharging] = useState(false);
	const [searchData, setSearchData] = useState([]);
	const [useSearch, setUseSearch] = useState(false);

	const [range, setRange] = useState(10);

	const setDeliveryMan = async (idusuariorepartidor) => {
		setCharging(true);

		try {
			await setDelivery(
				dataInfo.idpedido,
				userStore,
				data[idusuariorepartidor].idusuario
			);
			setModal(false);
		} catch (error) {}
		setCharging(false);
	};

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
						<GetDeliveryManTable
							data={pData}
							setDeliveryMan={setDeliveryMan}
							charging={charging}
						/>
						<PaginatorComponent
							data={searchData}
							setPData={setPData}
							context={'repartidores'}
							page={page}
							setPage={setPage}
							range={range}
							setRange={setRange}
						/>
					</>
				)
			) : (
				<>
					<GetDeliveryManTable
						data={pData}
						setDeliveryMan={setDeliveryMan}
						charging={charging}
					/>
					<PaginatorComponent
						data={data}
						setPData={setPData}
						context={'repartidores'}
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

export default MainGetDeliveryMan;
