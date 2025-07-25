import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/', // adjust if your API has a prefix like `/api`
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

export default axiosClient;