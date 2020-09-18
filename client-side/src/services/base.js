import axios from 'axios';
const base = async (httpMethod, requestHeaders, requestBody, requestUrl) => {
  const baseUrl = 'http://localhost:3000';
  const options = {
    method: httpMethod.toUpperCase(),
    headers: requestHeaders,
    url: `${baseUrl}${requestUrl}`,
  };
  if (requestBody) { options.data = requestBody; }
  try {
    return await axios(options);
  } catch (e) {
    if (e.response && e.response.data) { return e.response; }
    throw e;
  }
};
export default base;