import http from '../http-common';

class VariantDataService {
	getAll() {
		return http.get('/variants');
	}

	getAllSortedAZ() {
		return http.get('/variants/so=AZ');
	}

	getAllSortedZA() {
		return http.get('/variants/so=ZA');
	}

	get(id) {
		return http.get(`/variants/${id}`);
	}

	find(query) {
		return http.get(`/variants/rasa=${query}`);
	}

	createVariant(data) {
		return http.post('/variants/add', data);
	}

	updateVariant(id, data) {
		return http.put(`/variants/update/${id}`, data);
	}

	deleteVariant(id) {
		return http.delete(`/variants/${id}`);
	}
}

export default new VariantDataService();
