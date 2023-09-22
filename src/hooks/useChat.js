import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getChat = async () => {
	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const day = new Date().getDate();

	const data = await pb.collection('chat').getFullList({
		sort: 'created',
		expand: 'author',
		filter: `created ~ "${year}-${
			month < 10 ? '0' + month : month.toString()
		}-${day < 10 ? '0' + day : day.toString()}"`,
	});
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
