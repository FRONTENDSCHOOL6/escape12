import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

const getEscapeList = async (page = 1, perPage = 10, options = {}) => {
	const data = await pb
		.collection('escapeList')
		.getList(page, perPage, options);
	return data;
};

const useEscapeList = ({
	page = 1,
	perPage = 10,
	keys = [],
	options = {},
} = {}) => {
	const queryKey = ['escapeList', page, perPage, ...keys];

	const queryData = useQuery({
		queryKey,
		queryFn: () => getEscapeList(page, perPage, options),
		keepPreviousData: true,
	});

	return queryData;
};

export default useEscapeList;
