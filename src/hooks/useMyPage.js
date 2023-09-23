import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getMyPage = async () => {
  const userUId = getUserInfoFromStorage();
	const data = await pb
		.collection('users')
		.getOne(`${userUId?.model.id}`, {
			expand: 'email',
		});
	return data;
};

const useMyPage = ({ keys = [] } = {}) => {
	const queryKey = ['users', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getMyPage(),
	});

	return queryData;
};

export default useMyPage;
