import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getUserCommunity = async () => {
	const userUId = getUserInfoFromStorage();
	const data = await pb.collection('users').getOne(`${userUId?.model.id}`);
	console.log(data);
	return data.community;
};

const useUserCommunity = ({ keys = [] } = {}) => {
	const queryKey = ['users', 'community', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getUserCommunity(),
		keepPreviousData: true,
		staleTime: Infinity,
	});

	return queryData;
};

export default useUserCommunity;
