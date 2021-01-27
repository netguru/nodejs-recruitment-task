const getSecretJWT = () => {
  const {JWT_SECRET} = process.env;
  if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
  }
  return JWT_SECRET
}
export default getSecretJWT;