import * as React from 'react';
import { useState, useEffect } from 'react';
import RenderedItem from './RenderedItem';
import { isID, isEmail, isDate } from './helper';

function RendererComponent() {
	const [loaded, setLoaded] = useState<ArrayBuffer | undefined | string>();
	const [loadedArray, setloadedArray] = useState<JSON[]>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		setloadedArray([]);
		e.preventDefault();
		const reader = new FileReader();
		reader.onload = async (e) => {
			const text = (e?.target?.result);
			if (text) setLoaded(text);
		};
		if (e.target.files) reader.readAsText(e.target.files[0]);
	};

	useEffect(() => {
		let obj;
		if (typeof loaded === 'string') {
			obj = JSON.parse(loaded);
		}
		setloadedArray(obj);
		setIsLoading(false);
	}, [loaded]);

	const generateInput = (value: unknown) => {
		if (typeof value === 'string') {
			if (isID(value)) return 'id';
			if (isEmail(value)) return 'email';
			if (isDate(value)) return 'date';
			if (value?.length > 30) return 'longText';
			return 'text';
		} if (typeof value === 'number') {
			return 'number';
		} if (typeof value === 'boolean') {
			return 'radio';
		}
		return '';
	};
	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			<div>
				Please select JSON file to load
			</div>
			<span>
				<input
					type="file"
					name="myFile"
					onChange={e => uploadFile(e)}
				/>
			</span>
			{loadedArray?.map((item: any, id: number) => {
				const keysList = Object.keys(item);
				return (
					<table key={id.toString()}>
						<tbody>
							<tr>
								{keysList?.map((obj: string, index: number) => {
									const inputSetup = generateInput(item[obj]);

									return (
										<RenderedItem
											key={id.toString() + index.toString()}
											index={index}
											id={id}
											obj={obj}
											objValue={item[obj]}
											inputSetup={inputSetup}
										/>
									);
								})}
							</tr>
						</tbody>
					</table>
				);
			})}
		</>
	);
}

export default RendererComponent;
