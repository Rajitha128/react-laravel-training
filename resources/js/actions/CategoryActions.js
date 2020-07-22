/**
 * Add category
 */
export const addCategory = (data) => {
    return axios.post('http://127.0.0.1:8001/api/category/store', data)
                    .then(result => {
                        return result.data.data
                    })
                    .catch(err => {
                        console.warn(err);
                    });
}

/**
 * Delete category
 */
export const deleteCategory = (id) => {

	return axios
		.delete('http://127.0.0.1:8001/api/category/'+id+'/delete')
		.then(function(response) {
		    return response;
		})
		.catch(function(error) {
			console.warn(error);
		});
};

/**
 * Update category
 */
export const updateCategory = (id,data) => {
    return axios.put('http://127.0.0.1:8001/api/category/update/'+id,data)
                    .then(result => {
                        return result.data.data
                    })
                    .catch(err => {
                        console.warn(err);
                    });
}

/**
 * Edit category
 */
export const editCategory = (id) => {
	return axios
		.get('http://127.0.0.1:8001/api/category/edit/'+id)
		.then((res) => {
			return res;
        })
        .catch(err => {
            console.warn(err);
        });
};

/**
 * List category
 */
export const listCategory = () => {
	return axios
		.get('http://127.0.0.1:8001/api/category')
		.then((res) => {
			return res;
        })
        .catch(err => {
            console.warn(err);
        });
};

/**
 * List paginated category
 */
export const listCategoryPaginated = (num) => {
	return axios
		.get('http://127.0.0.1:8001/api/category?page='+num)
		.then((res) => {
			return res;
        })
        .catch(err => {
            console.warn(err);
        });
};