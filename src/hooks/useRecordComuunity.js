import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getRecordCommunity = async () => {
	const data = await pb.collection('record').getFullList({
    sort: '-created',
    expand: 'author, escapeList',
  });
	return data;
};

const useRecordCommunity = ({ keys = [] } = {}) => {
	const queryKey = ['record', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getRecordCommunity(),
		keepPreviousData: true,
	});

	return queryData;
};

export default useRecordCommunity;
