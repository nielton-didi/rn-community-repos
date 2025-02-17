import axios, { AxiosResponse } from 'axios';
import { RepositoryResponse } from '../types';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const fetchRepositories = async (
  page = 1, 
  searchQuery = ''
): Promise<RepositoryResponse> => {
  const queryString = searchQuery
    ? `q=org:react-native-community+${searchQuery}+in:name&sort=stars&order=desc`
    : 'q=org:react-native-community';
    
  const response: AxiosResponse<RepositoryResponse> = await api.get(
    `/search/repositories?${queryString}&per_page=10&page=${page}`
  );
  return response.data;
};