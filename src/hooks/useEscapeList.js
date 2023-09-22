import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getEscapeList = async (options = {}) => {
	const data = await pb.collection('escapeList').getFullList({ options });
	return data;
};

const useEscapeList = ({ keys = [], options = {} } = {}) => {
	const queryKey = ['escapeList', ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getEscapeList(options),
		keepPreviousData: true,
	});

	return queryData;
};

export default useEscapeList;
