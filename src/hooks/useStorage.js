import { useCallback, useMemo, useState } from 'react';

function useStorage(key, defaultValue) {
	const [storageData, setStorageData] = useState(() => {
		try {
			return getData(key);
		} catch (error) {
			return defaultValue;
		}
	});

	const update = useCallback(
		(nextData) => {
			setData(key, nextData);
			setStorageData(nextData);
		},
		[key]
	);

	const remove = useCallback(() => {
		deleteData(key);
		setStorageData();
	}, [key]);

	return useMemo(
		() => ({
			storageData,
			update,
			remove,
		}),
		[remove, storageData, update]
	);
}

export default useStorage;

const {
	localStorage: storage,
	JSON: { stringify: serialize, parse: deserialize },
} = globalThis;

const setData = (key, nextData) => {
	storage.setItem(key, serialize(nextData));
};

const getData = (key) => {
	return deserialize(storage.getItem(key));
};

const deleteData = (key) => {
	storage.removeItem(key);
};
