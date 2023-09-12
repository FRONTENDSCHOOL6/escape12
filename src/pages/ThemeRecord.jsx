import pb from '@/api/pockethost';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ThemeRecord() {
	const { dataId } = useParams();
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log(dataId);
		const dataList = async () => {
			const record = await pb.collection('escapeList').getOne(`${dataId}`);
			try {
				setData(record);
				console.log(record);
			} catch (err) {
				console.log(`에러 내용: ${err}`);
			}
		};
		dataList();
	}, [dataId]);

	return (
		<div>
			<p>{data.theme}</p>
			<p>{data.store}</p>
			<p>{data.grade}</p>
			<img src={data.image} alt={data.theme} />
		</div>
	);
}

export default ThemeRecord;
