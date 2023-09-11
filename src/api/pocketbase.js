import { PocketBase } from 'pocketbase';

function pb() {
	return new PocketBase('https://refresh.pockethost.io');
}

export default pb;
