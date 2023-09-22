import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getPostPage = async () => {
	const data = await pb.collection('community').getFullList({
		expand: 'author',
		sort: '-created',
	});
	return data;
};

const usePostPage = ({ keys = [] } = {}) => {
	const queryKey = ['community', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getPostPage(),
		keepPreviousData: true,
	});

	return queryData;
};

export default usePostPage;
