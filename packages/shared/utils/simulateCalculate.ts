const executeStringAsFunction = (codeString: string, ...params: any) => {
  try {
    // Construct the function with parameters
    return new Function(...params, `return (${codeString})(...arguments);`);
  } catch (error) {
    console.error('Error executing string as function:', error);
    return null;
  }
};

export const handleExecute = (codeString: string, R: any, n: any, P: any) => {
  const resultFunction = executeStringAsFunction(codeString, 'R', 'n', 'P');
  if (resultFunction) {
    return resultFunction(R, n, P);
  }
};
