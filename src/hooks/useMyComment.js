import { getUserInfoFromStorage } from '@/api/getUserInfo';
import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getMyComment = async () => {
	const userUId = getUserInfoFromStorage();
	const data = await pb.collection('comment').getList(1, 200, {
		filter: `author="${userUId?.model.id}"`,
		expand: 'author , community , record',
		sort: '-created',
	});
	return data;
};

const useMyComment = ({ keys = [] } = {}) => {
	const queryKey = ['comment', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getMyComment(),
	});

	return queryData;
};

export default useMyComment;
