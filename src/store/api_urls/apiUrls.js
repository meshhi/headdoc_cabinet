const baseUrl = process.env.REACT_APP_BASE_URL
const baseEsiaUrl = process.env.REACT_APP_BASE_ESIA_URL

// general
// api/global/mo-list
export const GET_MO_LIST_URL = `http://${baseUrl}/api/bi/mo/`
// api/global/doctor-list
export const GET_DOCTOR_LIST = `http://${baseUrl}/api/doctor_list/`

// auth
export const LOGIN = `http://${baseUrl}/auth/token/login/`
export const LOGOUT = `http://${baseUrl}/auth/token/logout/`
// esia/login
export const GET_SIGNED_ESIA_URL = `http://${baseUrl}/esia/login/`
// esia/callback
export const LOGIN_ESIA = `http://${baseUrl}/esia/callback/`
// auth/check-token
export const CHECK_AUTHENTICATION = `http://${baseUrl}/esia/check_token/`

// 1
// api/indicators/1/records
export const GET_APPOINTMENTS_URL = `http://${baseUrl}/api/bi/med_records/`

// 2
// api/indicators/2/mo-semd-spec-percent
export const GET_MO_MEDDOCS = `http://${baseUrl}/api/mo_med_docs/`
// api/indicators/2/doctor-semd-spec-percent
export const GET_DOCTOR_MEDDOCS = `http://${baseUrl}/api/doctor_med_docs/`

// adminka 
// upload file
// adminka/indicators/1/percent-appointments-upload-file
export const UPLOAD_BI_FILE_URL = `http://${baseUrl}/adminka/bi_file/`