import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// ✅ Add Bootstrap JS support
// import 'bootstrap/dist/css/bootstrap.min.css';