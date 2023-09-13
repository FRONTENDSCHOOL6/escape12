import Button from '@/components/Button';
import Headerback from '@/components/Headerback';
import Nav from '@/components/Nav';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function UploadRecord() {
	const navigate = useNavigate();

	return (
		<div>
			<Helmet>
				<title>업로드 기록</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center justify-center min-h-[100vh] m-auto relative s:py-20 text-lg gap-6 px-20 s:px-12">
				<Headerback
					onClick={() => {
						navigate('/theme');
					}}
				>
					삐릿뽀
				</Headerback>
				<section className="flex flex-row-reverse items-center gap-4">
					<div className="flex flex-col flex-1 gap-3">
						<h3 className="text-2xl">키이스케이프 홍대점</h3>
						<p>2013-09-13</p>
					</div>
					<img
						className="w-[20%] rounded-full"
						src="https://mblogthumb-phinf.pstatic.net/MjAxODA1MjhfNzYg/MDAxNTI3NDg3MTczOTA3.rqXa2Nu4aibueHoqj6KejnNJQw7fZZuGiMKKseBeCRkg.5U6O5JdlnxcVgHjqwpAaKyI-aLebo18ZxePfEHKUdvcg.JPEG.ehfkdl8989/KakaoTalk_Moim_4UjmLsR1AohJhEmSqqNZkX7uHKQHJv.jpg?type=w800"
						alt="사용자 닉네임"
						aria-hidden
					/>
				</section>
				<img
					className="w-[70%]"
					src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTlfMTQ3/MDAxNTgyMDQwNjUwMzM2.CqiOpvzLo5O5FBdB8kuuJKfZWhMzk_QHm1d7cy1qV5gg.FuB6wOe5OdkLxl075DRDuOEnGAoPWaZzoP4Ouj7o7F4g.JPEG.dbsdk0619/IMG_2655.jpg?type=w800"
					alt="삐릿뽀"
				/>
				<section>
					<ul className="flex justify-between pb-4 font-semibold">
						<li>⭐ 8</li>
						<li>2: 00 LEFT</li>
					</ul>
					<p className="min-h-[160px] bg-opacity border-2 p-4 rounded-lg">
						테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고 재밌다🌸테마가 귀엽고
						재밌다🌸
					</p>
				</section>
				<section className="w-full flex justify-between">
					<Button bg="bg-ec1" text="text-ec4">
						삭제
					</Button>
					<Button bg="bg-ec1" text="text-ec4">
						수정
					</Button>
				</section>
			</div>
			<Nav />
		</div>
	);
}

export default UploadRecord;