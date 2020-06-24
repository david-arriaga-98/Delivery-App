import React, { useState } from 'react';
import { Col, FormControl, InputGroup } from 'react-bootstrap';

const Search = ({ data, fields, setSearchData, setUseSearch }) => {
	const [cantWrite, setCantWrite] = useState(true);
	const [dataToSearch, setDataToSearch] = useState('');
	const [objF, setObjF] = useState('');

	const handleSearch = () => {
		try {
			const newData = [];
			let len = dataToSearch.length;

			data.forEach((item) => {
				let itemToFind = item[objF];
				let str = itemToFind.substring(0, len).toLowerCase();

				if (
					dataToSearch.length <= dataToSearch.length &&
					dataToSearch.length !== 0 &&
					dataToSearch.length !== 0
				) {
					if (dataToSearch === str) {
						newData.push(item);
					}
				}
			});
			return newData;
		} catch (error) {
			return [];
		}
	};

	const handleKeyUp = () => {
		if (dataToSearch.length === 0) {
			setUseSearch(false);
			setSearchData([]);
		} else {
			setUseSearch(true);
			setSearchData(handleSearch());
		}
	};

	const handleChange = (e) => {
		setDataToSearch(e.target.value.toLowerCase());
	};

	const handleChangeSelect = (val, objField) => {
		if (val !== 'Buscar por...') {
			setObjF(objField);
			setCantWrite(false);
			setDataToSearch('');
			setSearchData([]);
			setUseSearch(false);
		} else {
			setCantWrite(true);
			setDataToSearch('');
			setUseSearch(false);
		}
	};

	return (
		<>
			<Col md="6">Filtro</Col>
			<Col md="6">
				<InputGroup>
					<FormControl
						onChange={handleChange}
						onKeyUp={handleKeyUp}
						type="text"
						placeholder="Digite los parámetros"
						name="params"
						disabled={cantWrite}
						value={dataToSearch}
					/>
					<InputGroup.Append>
						<FormControl
							as="select"
							style={{ borderRadius: '0' }}>
							{fields.map((item, index) => {
								let newss = item.split('~');
								return (
									<option
										key={index}
										onClick={() => {
											handleChangeSelect(
												newss[0],
												newss[1]
											);
										}}>
										{newss[0]}
									</option>
								);
							})}
						</FormControl>
					</InputGroup.Append>
				</InputGroup>
			</Col>
		</>
	);
};

export default React.memo(Search);
