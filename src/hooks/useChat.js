import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getChat = async () => {
	const data = await pb
		.collection('chat')
		.getFullList({ sort: 'created', expand: 'author' });
	return data;
};

const useChat = ({ keys = [] } = {}) => {
	const queryKey = ['chat', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getChat(),
		keepPreviousData: true,
	});

	return queryData;
};

export default useChat;
