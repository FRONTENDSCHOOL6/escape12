import SmallButton from '@/components/button/SmallButton';
import { array, number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import MedalButton from '../button/MedalButton';
import Span from './Span';
import { useEffect } from 'react';
import pb from '@/api/pockethost';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import { useState } from 'react';
import { Tooltip } from '@mui/material';

ThemeItem.propTypes = {
	store: string,
	point: string,
	theme: string,
	grade: number,
	level: number,
	image: string,
	link: string,
	field: string,
	dataid: string,
	clear: array,
};

function ThemeItem({
	store,
	point,
	theme,
	grade,
	level,
	image,
	link,
	field,
	dataid,
	clear,
}) {
	const userUId = getUserInfoFromStorage();
	const [recordId, setRecordId] = useState('');

	useEffect(() => {
		const handleRecordId = async () => {
			const user = await pb.collection('escapeList').getOne(`${dataid}`, {
				expand: 'author,record',
				sort: 'theme',
			});

			try {
				const userRecord = user.expand?.record.find(
					(item) => item.nickName === `${userUId?.model.nickName}`
				);

				setRecordId(userRecord?.id);
			} catch (err) {
				console.log(err);
			}
		};
		handleRecordId();
	}, []);
	return (
		<figure className="my-4 border-2 border-ec1 p-4 s:p-3 rounded-xl flex gap-3 s:gap-2 text-lg s:text-base relative h-[180px] w-full">
			<div className="flex w-[25%] s:min-w-[25%]">
				<img src={image} alt={theme} aria-hidden className="w-full" />
			</div>
			<figcaption className="flex flex-col justify-between s:justify-around w-[75%]">
				<section className="flex items-end gap-4 s:gap-2 w-full">
					<h2
						className="s:max-w-[90px] max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis text-2xl s:text-lg font-semibold"
						aria-label={'테마 제목 ' + theme}
						tabIndex="0"
					>
						{theme}
					</h2>
					<Span text="font-semibold">
						{grade === 0 || grade === 1 || grade === 2 || grade === 3
							? '😱흙길'
							: grade === 4 || grade === 5 || grade === 6 || grade === 7
								? '🌿풀길'
								: '🌸꽃길'}
					</Span>
				</section>
				<section className="flex justify-between items-center">
					<Tooltip title={`업체명 ${store}`} placement="right">
						<h3 className="s:max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">
							<span aria-label={'업체명 ' + store} tabIndex="0">
								{store}
							</span>
							<Span text="pl-1" ariaLabel={'위치 ' + point} tabIndex="0">
								{point}점
							</Span>
						</h3>
					</Tooltip>
					<Span text="font-semibold" ariaLabel={'장르 ' + field} tabIndex="0">
						{field}
					</Span>
				</section>
				<section className="flex justify-between">
					{level === 1 || level === 2 || level === 3 ? (
						<SmallButton
							bg="dark:bg-dark-googleline bg-light-googleline text-light-ec4"
							ariaLabel="난이도 쉬움"
						>
							<span aria-hidden="true">♣</span> 쉬움
						</SmallButton>
					) : level === 4 || level === 5 || level === 6 || level === 7 ? (
						<SmallButton
							bg="dark:bg-dark-kakaoline bg-light-kakaoline text-light-ec4"
							ariaLabel="난이도 보통"
						>
							<span aria-hidden="true">♣</span> 보통
						</SmallButton>
					) : (
						<SmallButton
							bg="dark:bg-dark-sweetred bg-light-sweetred text-light-ec4"
							ariaLabel="난이도 어려움"
						>
							<span aria-hidden="true">♣</span> 어려움
						</SmallButton>
					)}
					{clear && clear.findIndex((item) => item.id === `${dataid}`) >= 0 && (
						<Link to={`/upload/${recordId}`}>
							<MedalButton theme={theme} />
						</Link>
					)}

					{clear && clear.findIndex((item) => item.id === `${dataid}`) < 0 && (
						<Link to={dataid}>
							<SmallButton>기록하기</SmallButton>
						</Link>
					)}

					{!clear && (
						<Link to={dataid}>
							<SmallButton>기록하기</SmallButton>
						</Link>
					)}

					<Link to={link} target="_blank" rel="noopenner noreferrer">
						<SmallButton>예약하기</SmallButton>
					</Link>
				</section>
			</figcaption>
		</figure>
	);
}

export default ThemeItem;
