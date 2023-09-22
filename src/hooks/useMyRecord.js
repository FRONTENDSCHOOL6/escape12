import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getMyRecord = async () => {
	const userUId = getUserInfoFromStorage();
	const data = await pb.collection('record').getFullList({
		filter: `author = "${userUId?.model.id}"`,
		expand: 'escapeList',
		sort: '-created',
	});
	return data;
};

const useMyRecord = ({ keys = [] } = {}) => {
	const queryKey = ['record', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getMyRecord(),
		keepPreviousData: true,
	});

	return queryData;
};

export default useMyRecord;
