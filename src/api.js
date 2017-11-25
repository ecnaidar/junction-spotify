// @flow
import axios from 'axios'

const baseRoute = "BASE_ROUTE_STUB";

const configuredAxios = axios.create({
    baseURL: baseRoute,
    timeout: 5000,
});

export default configuredAxios
