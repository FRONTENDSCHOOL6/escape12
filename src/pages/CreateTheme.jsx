import pb from '@/api/pockethost';
import admin from '@/assets/admin.png';
import Button from '@/components/button/Button';
import Headerback from '@/components/header/Headerback';
import FormInput from '@/components/loginsignup/FormInput';
import Nav from '@/components/nav/Nav';
import DefaultThemeStore from '@/components/record/DefaultThemeStore';
import Grade from '@/components/record/Grade';
import SelectInput from '@/components/record/Select';
import Sup from '@/components/record/Sup';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateTheme() {
	const navigate = useNavigate();
	const [themeName, setThemeName] = useState('');
	const [store, setStore] = useState('');
	const [point, setPoint] = useState('');
	const [region, setRegion] = useState('');
	const [field, setField] = useState('');
	const [grade, setGrade] = useState('');
	const [level, setLevel] = useState('');
	const [link, setLink] = useState('');
	const [image, setImage] = useState('');

	// 테마명 상태 관리
	const handleTheme = (e) => {
		setThemeName(e.target.value);
	};
	const debounceTheme = debounce((e) => handleTheme(e), 2000);

	// 업체명 상태 관리
	const handleStore = (e) => {
		setStore(e.target.value);
	};
	const debounceStore = debounce((e) => handleStore(e), 2000);

	// 지점 상태 관리
	const pointEvent = (e) => {
		setPoint(e.target.value);
	};
	const debouncePoint = debounce((e) => pointEvent(e), 2000);

	// 예약 링크 상태 관리
	const linkEvent = (e) => {
		setLink(e.target.value);
	};
	const debounceLink = debounce((e) => linkEvent(e), 2000);

	// 테마 이미지 상태 관리
	const imageEvent = (e) => {
		setImage(e.target.value);
	};
	const debounceImage = debounce((e) => imageEvent(e), 2000);

	// 지역 상태 관리
	const handleRegion = (e) => {
		setRegion(e.target.value);
	};

	// 장르 상태 관리
	const handleField = (e) => {
		setField(e.target.value);
	};

	// 평점 상태 관리
	const handleRatingChange = (e) => {
		setGrade(e.target.value);
	};

	// 난이도 상태 관리
	const handleLevel = (e) => {
		setLevel(e.target.value);
	};

	// 테마 등록하기 이벤트
	const handleSubmitRecord = async (e) => {
		e.preventDefault();
		const themeData = {
			region: region,
			store: store,
			point: point,
			theme: themeName,
			field: field,
			grade: grade * 2,
			level: Number(level),
			image: image,
			link: link,
		};

		try {
			toast('등록되었습니다 :)', {
				icon: '💛',
				duration: 2000,
			});

			await pb.collection('escapeList').create(themeData);

			navigate(`/theme`);
		} catch (err) {
			console.log(`등록하기 에러: ${err}`);
		}
	};

	return (
		<>
			<Helmet>
				<title>테마 등록</title>
				<meta name="description" content="방탈러 홈페이지-테마 등록" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="테마 등록" />
				<meta property="og:description" content="테마 등록" />
				<meta property="og:image" content="https://user-images.githubusercontent.com/126174401/269517444-8d9acc2b-cf90-430e-b9af-a248a7d679e1.png" />
				<meta name="theme-color" content="#352F44" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#352F44" />
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col justify-center items-center min-h-[100vh] m-auto bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg pt-16">
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					테마 등록
				</Headerback>
				<img src={admin} alt="adminOnly" aria-hidden />
				<form
					className="flex flex-col gap-6 py-5 s:py-2 mb-24"
					onSubmit={handleSubmitRecord}
				>
					<fieldset className="flex flex-col gap-7">
						<DefaultThemeStore
							theme={themeName}
							themeEvent={debounceTheme}
							store={store}
							storeEvent={debounceStore}
						/>
						<FormInput
							name="point"
							placeholder="지점"
							maxLength="20"
							defaultValue={point}
							onChange={debouncePoint}
						>
							지점
						</FormInput>
						<FormInput
							name="link"
							placeholder="예약 링크"
							maxLength="100"
							defaultValue={link}
							onChange={debounceLink}
						>
							예약 링크
						</FormInput>
						<FormInput
							name="image"
							placeholder="테마 이미지"
							defaultValue={image}
							onChange={debounceImage}
						>
							테마이미지
						</FormInput>
						<div className="flex gap-5 text-ec1 relative px-2">
							<label htmlFor="region" className="w-32 s:min-w-fit">
								<Sup>지역</Sup>
							</label>
							<select
								name="region"
								id="region"
								onChange={handleRegion}
								className="w-[100px] s:w-[50%] dark:text-dark-ec4 text-light-ec4 text-center"
								required
							>
								<option value="">선택</option>
								<option value="강남">강남</option>
								<option value="홍대">홍대</option>
								<option value="건대">건대</option>
							</select>
						</div>
						<div className="flex gap-5 text-ec1 relative px-2">
							<label htmlFor="field" className="w-32 s:min-w-fit">
								<Sup>장르</Sup>
							</label>
							<select
								name="field"
								id="field"
								onChange={handleField}
								className="w-[100px] s:w-[50%] dark:text-dark-ec4 text-light-ec4 text-center"
								required
							>
								<option value="">선택</option>
								<option value="?">?</option>
								<option value="SF">SF</option>
								<option value="감성">감성</option>
								<option value="게임">게임</option>
								<option value="공포">공포</option>
								<option value="모험">모험</option>
								<option value="스릴러">스릴러</option>
								<option value="스토리">스토리</option>
								<option value="잠입">잠입</option>
								<option value="추리">추리</option>
								<option value="코믹">코믹</option>
								<option value="판타지">판타지</option>
								<option value="활동">활동</option>
							</select>
						</div>
						<div className="flex gap-5 text-ec1 relative px-2">
							<label htmlFor="level" className="w-32 s:min-w-fit">
								<Sup>난이도</Sup>
							</label>
							<SelectInput
								id="level"
								name="level"
								onChange={handleLevel}
								max={10}
								defaultValue={level}
								required
							/>
							<span className="s:min-w-fit">/ 10</span>
						</div>
						<Grade grade={grade} onChange={handleRatingChange} />
					</fieldset>
					<Button
						bg="bg-ec1 text-center mt-10"
						text="text-ec4 m-auto"
						type="submit"
					>
						등록
					</Button>
				</form>
			</div>
			<Nav />
		</>
	);
}

export default CreateTheme;
