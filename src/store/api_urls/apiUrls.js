const baseUrl = process.env.REACT_APP_BASE_URL
const baseEsiaUrl = process.env.REACT_APP_BASE_ESIA_URL

// general
export const GET_MO_LIST_URL = `http://${baseUrl}/api/global/mo-list/`
export const GET_DOCTOR_LIST = `http://${baseUrl}/api/global/doctor-list/`

// auth
export const LOGIN = `http://${baseUrl}/auth/token/login/`
export const LOGOUT = `http://${baseUrl}/auth/token/logout/`
export const CHECK_AUTHENTICATION = `http://${baseUrl}/auth/check-token/`
export const GET_SIGNED_ESIA_URL = `http://${baseUrl}/esia/login/`
export const LOGIN_ESIA = `http://${baseUrl}/esia/callback/`

// 1
export const GET_APPOINTMENTS_URL = `http://${baseUrl}/api/indicators/1/records/`

// 2
export const GET_MO_MEDDOCS = `http://${baseUrl}/api/indicators/2/mo-semd-spec-percent/`
export const GET_DOCTOR_MEDDOCS = `http://${baseUrl}/api/indicators/2/doctor-semd-spec-percent/`

// adminka 
// upload file
export const UPLOAD_BI_FILE_URL = `http://${baseUrl}/adminka/indicators/1/percent-appointments-upload-file/`