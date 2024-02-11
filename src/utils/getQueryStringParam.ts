/**
 *
 * https://stackoverflow.com/questions/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
 */
export const getQueryStringParam = (paramName: string) => {
  const location = global.location;
  let params = new URL(location.toString()).searchParams;
  if (!params.has(paramName)) {
    return null;
  } else {
    return params.get(paramName);
  }
};

export default getQueryStringParam;
