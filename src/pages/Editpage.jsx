import { Helmet } from 'react-helmet-async';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Headerback from '@/components/header/Headerback';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { toast } from 'react-hot-toast';
import pb from '@/api/pockethost';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { getUserInfoFromStorage } from '@/api/getUserInfo';
import DefaultEdit from '@/components/edit/DefaultEdit';
import EditImage from '@/components/edit/EditImage';
import socialImg from '@/assets/socialImg.png';

function Editpage() {
	const userUId = getUserInfoFromStorage();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [nickName, setnickName] = useState('');
	const [id, setId] = useState('');
	const [collectionId, setCollectionId] = useState('');
	const [data, setData] = useState('');
	const [avatar, setAvatar] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const photoRef = useRef(`${data.expand?.users?.avatar}`);
	const uploadPhotoRef = useRef(null);

	//이메일 상태 관리
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	//닉네임 상태 관리
	const handlenickName = (e) => {
		setnickName(e.target.value);
	};

	// 사진 상태 관리
	const handleUploadPhoto = (e) => {
		const photoFile = e.target.files[0];
		const photoUrl = URL.createObjectURL(photoFile);
		uploadPhotoRef.current.setAttribute('src', photoUrl);
	};

	//기존 데이터 가져오기
	useEffect(() => {
		const datalist = async () => {
			const resultList = await pb
				.collection('users')
				.getOne(`${userUId?.model.id}`);
			try {
				setEmail(resultList.email);
				setnickName(resultList.nickName);
				setAvatar(resultList.avatar);
				setId(resultList.id);
				setCollectionId(resultList.collectionId);
				setIsLoading(true);
				setData(resultList);
			} catch (error) {
				console.log(error);
			}
		};
		datalist();
	}, [userUId?.model.id]);

	// 수정 상태 변경
	const handleSave = async (e) => {
		e.preventDefault();
		const updateData = {
			email: email,
			nickName: nickName,
			avatar: photoRef.current.files[0],
		};

		try {
			await pb.collection('users').update(`${userUId?.model.id}`, updateData);

			toast('정보 수정이 완료되었습니다', {
				icon: '✨',
				duration: 2000,
			});

			navigate('/mypage');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Helmet>
				<title>정보 수정</title>
				<meta name="description" content="방탈러 홈페이지-정보 수정" />
				<meta property="og:title" content="방탈러 정보 수정" />
				<meta property="og:description" content="방탈러 정보 수정 페이지" />
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] flex flex-col items-center min-h-[100vh] m-auto pt-20 pb-28 relative bg-light-ec1 dark:bg-dark-ec4 text-light-ec4 dark:text-dark-ec1 text-lg">
				{/* header, headerback 맨 위 고정 */}
				<Headerback
					onClick={() => {
						navigate(-1);
					}}
				>
					정보 수정
				</Headerback>
				{!isLoading && (
					<div className="absolute top-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				)}
				{isLoading && (
					<>
						<form
							onSubmit={handleSave}
							className="text-center flex flex-col items-center"
						>
							<div className="w-40 h-40">
								<EditImage
									inputRef={photoRef}
									onChange={handleUploadPhoto}
									imgRef={uploadPhotoRef}
									src={
										data.avatar
											? `https://refresh.pockethost.io/api/files/${collectionId}/${id}/${avatar}`
											: !data.social ||
											  data.social ===
													'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'
											? `${socialImg}`
											: data.social
									}
									alt={data.nickName}
								/>
							</div>
							<DefaultEdit
								email={email}
								emailEvent={handleEmail}
								nickName={nickName}
								nickNameEvent={handlenickName}
							/>
							<Button type="submit" text="mt-4">
								저장
							</Button>
						</form>
						<footer className="mt-auto pt-5 text-center">
							<em>
								<Link
									to="https://github.com/FRONTENDSCHOOL6/escape12/"
									target="_blank"
									rel="noopenner noreferrer"
								>
									Copyright &copy; 2023 김건주, 김남진, 조수연
								</Link>
							</em>
						</footer>
					</>
				)}
			</div>
			<Nav />
		</>
	);
}

export default Editpage;
