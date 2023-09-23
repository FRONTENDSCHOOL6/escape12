import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getEscapeList = async () => {
	const data = await pb.collection('escapeList').getFullList({ sort: 'theme' });
	return data;
};

const useEscapeList = ({ keys = [] } = {}) => {
	const queryKey = ['escapeList', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getEscapeList(),
		keepPreviousData: true,
	});

	return queryData;
};

export default useEscapeList;
