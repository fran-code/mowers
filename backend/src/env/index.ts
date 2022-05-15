import local from './local'
import production from './production'

const joinEnv = { local, production }
const processVar = process.env.NODE_ENV === "local" ? "local" : "production"
const envVars = joinEnv[processVar]

export default envVars