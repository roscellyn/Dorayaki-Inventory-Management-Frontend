import http from '../http-common';

class StoreDataService {
	getAll() {
		return http.get('/stores');
	}

	getAllSortedAZ() {
		return http.get('/stores/so=AZ');
	}

	getAllSortedZA() {
		return http.get('/stores/so=ZA');
	}

	get(id) {
		return http.get(`/stores/${id}`);
	}

	find(query) {
		return http.get(`/stores/nama=${query}`);
	}

	createStore(data) {
		return http.post('/stores/add', data);
	}

	updateStore(id, data) {
		return http.put(`/stores/update/${id}`, data);
	}

	deleteStore(id) {
		return http.delete(`/stores/${id}`);
	}

	addStoreVariant(id, data) {
		return http.put(`/stores/${id}/addVariant`, data);
	}

	updateStoreVariant(id, data) {
		return http.put(`/stores/${id}/updateVariant`, data);
	}

	deleteStoreVariant(id, stokId) {
		return http.put(`/stores/${id}/deleteVariant/${stokId}`);
	}
}

export default new StoreDataService();
