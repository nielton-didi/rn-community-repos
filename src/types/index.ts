import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
}

export interface RepositoryResponse {
  items: Repository[];
  total_count: number;
}

export interface RootState {
  repos: ReposState;
}

export interface ReposState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  searchQuery: string;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { repo: Repository };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
