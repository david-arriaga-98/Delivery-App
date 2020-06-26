import React, { useState } from 'react';
import { Col, FormControl, InputGroup } from 'react-bootstrap';

const Search = ({
	data,
	fields,
	fieldsToSearch,
	setSearchData,
	setUseSearch
}) => {
	const [canWrite, setCanWrite] = useState(false);
	const [search, setSearch] = useState('');
	const [objItem, setObjItem] = useState('');

	const handleChange = (position) => {
		setUseSearch(false);

		if (fields[position] === 'Buscar por...') {
			setCanWrite(false);
			setObjItem();
		} else {
			setCanWrite(true);
			setObjItem(fieldsToSearch[position - 1]);
		}
		setSearch('');
	};

	const handleWriteField = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const handleKeyUp = () => {
		if (canWrite && search.length !== 0) {
			handleSearchData();
			setUseSearch(true);
		} else {
			setUseSearch(false);
		}
	};

	const handleSearchData = () => {
		try {
			const newData = [];
			let len = search.length;
			data.forEach((item) => {
				let itemToFind = item[objItem].toString();
				let str = itemToFind.substring(0, len).toLowerCase();
				if (
					search.length <= itemToFind.length &&
					search.length !== 0 &&
					search.length !== 0
				) {
					if (search === str) {
						newData.push(item);
					}
				}
			});
			setSearchData(newData);
		} catch (error) {
			setSearchData([]);
		}
	};

	return (
		<>
			<Col md="6">Realizar una búsqueda</Col>
			<Col md="6">
				<InputGroup>
					<FormControl
						disabled={!canWrite}
						value={search}
						onChange={handleWriteField}
						onKeyUp={handleKeyUp}
						type="text"
						placeholder="Digite los parámetros"
						name="params"
					/>
					<InputGroup.Append>
						<FormControl
							as="select"
							style={{
								borderRadius: '0'
							}}
							onChange={(e) => {
								handleChange(e.target.selectedIndex);
							}}>
							{fields.map((item, index) => {
								return (
									<option key={index}>
										{item}
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
