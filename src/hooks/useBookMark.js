import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getBookMark = async () => {
	const userUId = getUserInfoFromStorage();
	const data = await pb.collection('users').getOne(`${userUId?.model.id}`, {
		expand: 'bookmark, escapeList',
	});
	return data;
};

const useBookMark = ({ keys = [] } = {}) => {
	const queryKey = ['users', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getBookMark(),
		keepPreviousData: true,
	});

	return queryData;
};

export default useBookMark;
