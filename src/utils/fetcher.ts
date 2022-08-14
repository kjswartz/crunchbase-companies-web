export const fetcher = async (model: string, page: number) =>
  await fetch(`http://localhost:3001/api/${model}/?page=${page}`);