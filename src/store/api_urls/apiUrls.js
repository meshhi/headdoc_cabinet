const baseUrl = process.env.REACT_APP_BASE_URL
const baseEsiaUrl = process.env.REACT_APP_BASE_ESIA_URL

export const UPLOAD_BI_FILE_URL = `http://${baseUrl}/adminka/bi_file/`
export const GET_MO_LIST_URL = `http://${baseUrl}/api/bi/mo/`
export const GET_APPOINTMENTS_URL = `http://${baseUrl}/api/bi/med_records/`
export const LOGIN = `http://${baseUrl}/auth/token/login/`
export const GET_SIGNED_ESIA_URL = `http://${baseUrl}/esia_login/login/`
export const LOGIN_ESIA = `http://${baseUrl}/esia_login/callback/`
export const LOGOUT = `http://${baseUrl}/auth/token/logout/`
export const GET_DOCTOR_LIST = `http://${baseUrl}/api/doctor_list/`
// export const UPLOAD_BI_FILE_URL = `http://10.1.3.109:7000/`