export const getEnv = () => {
  return process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'production'
    ? `http://127.0.0.1:${process.env.BACK_END_PORT}`
    : `http://127.0.0.1:${process.env.BACK_END_PORT}`
}
