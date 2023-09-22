import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getMyCommunity = async () => {
	const userUId = getUserInfoFromStorage();
  
	const data = await pb.collection('community').getFullList({
		filter: `author = "${userUId?.model.id}"`,
		expand: 'author',
		sort: '-created',
	});
	return data;
};

const useMyCommunity = ({ keys = [] } = {}) => {
	const queryKey = ['community', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getMyCommunity(),
		keepPreviousData: true,
	});

	return queryData;
};

export default useMyCommunity;
