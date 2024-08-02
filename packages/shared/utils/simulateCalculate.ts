const executeStringAsFunction = (codeString: string, ...params: any) => {
  console.log('codeString', codeString), console.log('params', params);
  try {
    // Construct the function with parameters
    const functionWithParams = new Function(
      ...params,
      `return (${codeString})(...arguments);`,
    );
    return functionWithParams;
  } catch (error) {
    console.error('Error executing string as function:', error);
    return null;
  }
};

export const handleExecute = (codeString: string, R: any, n: any, P: any) => {
  const resultFunction = executeStringAsFunction(codeString, 'R', 'n', 'P');
  if (resultFunction) {
    const result = resultFunction(R, n, P);
    console.log('result', result);
    return result;
  }
};
