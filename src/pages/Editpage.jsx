import { Helmet } from 'react-helmet-async';
import Button from '@/components/button/Button';
import Nav from '@/components/nav/Nav';
import Headerback from '@/components/header/Headerback';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import FormInput from '@/components/loginsignup/FormInput';
import pb from '@/api/pockethost';
import { useState } from 'react';
import { useEffect } from 'react';
import debounce from '@/utils/debounce';
import userUId from '@/api/userUid';
import DefaultEdit from '@/components/edit/DefaultEdit';

function Editpage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [nickName, setnickName] = useState('');
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	//닉네임 상태 관리
	const handlenickName = (e) => {
		setnickName(e.target.value);
	};
	const debouncenickName = debounce((e) => handlenickName(e), 2000);

	//정보수정
	const handleSave = () => {
		toast('정보 수정이 완료되었습니다', {
			icon: '✨',
			duration: 2000,
		});
		navigate('/mypage');
	}

	useEffect(() => {
		const datalist = async () => {
			const resultList = await pb.collection('users').getOne(`${userUId?.model.id}`);
			try {
				setData(resultList);
				setEmail(resultList.email);
				setnickName(resultList.nickName)
				setIsLoading(true);

			} catch (error) {
				console.log(error)
			}
		}
		datalist()
	}, [])
	console.log(nickName);

	return (
		<>
			<Helmet>
				<title>정보 수정</title>
			</Helmet>
			<div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col items-center min-h-[100vh] m-auto py-20 relative">
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
					<div className="flex-1 flex flex-col items-center my-14 s:px-3">
						<div className="s:px-12 p-12 text-xl space-y-10">
							<img
								className="w-[30%] mx-auto rounded-full"
								src="https://mblogthumb-phinf.pstatic.net/MjAxOTAxMjNfMjI5/MDAxNTQ4MTcxMTE2MTI4.nv3-mRR-cZiGBxCD_KuMH8OsQ-WDJEJ9kTTBwb2XlkUg.WKv1PpzrR2s0duklK1AemD8cmGDAvRre7yrJG1okdZ8g.JPEG.seooooya/IMG_2063.JPG?type=w800"
								alt="사용자 사진"
								aria-hidden
							/>
							<FormInput
								type="email"
								name="id"
								placeholder="변경할 이메일"
								value={email}>
								아이디(이메일)
							</FormInput>
							{/* 작성 기능 X */}
							<FormInput
								type="password"
								name="password"
								placeholder="🥲 비밀번호는 변경할 수 없습니다"
								readOnly
							>
								비밀번호
							</FormInput>
							<DefaultEdit
								nickName={nickName}
								nickNameEvent={debouncenickName}
							/>
						</div>
						<Button onClick={handleSave} bg="bg-ec1" text="text-ec4 mt-4">
							저장
						</Button>
						<footer className="mt-auto py-1 mb-2">
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
					</div>
				)}
			</div>
			<Nav />
		</>
	);
}

export default Editpage;
