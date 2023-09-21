import pb from '@/api/pockethost';
import { useQuery } from '@tanstack/react-query';

function useEscapeList() {
	async function fetchTheme() {
		try {
			const escapeList = await pb.collection('escapeList').getFullList({
				sort: 'theme',
			});
			return escapeList;
		} catch (error) {
			console.log(error);
		}
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['escapeList'],
		queryFn: fetchTheme,
	});

	if (error) console.log(error);

	return { data, isLoading };
}

export default useEscapeList;
