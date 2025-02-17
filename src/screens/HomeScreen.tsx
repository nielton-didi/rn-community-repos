import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ListRenderItem,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { HomeScreenProps, Repository, RootState } from "../types";
import {
  fetchRepositoriesRequest,
  setSearchQuery,
  incrementPage,
} from "../store/reposSlice";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { repositories, loading, error, hasMore, searchQuery } = useSelector(
    (state: RootState) => state.repos
  );

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(fetchRepositoriesRequest());
  }, [dispatch, debouncedSearchQuery]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(incrementPage());
      dispatch(fetchRepositoriesRequest());
    }
  };

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const renderItem: ListRenderItem<Repository> = ({ item }) => (
    <TouchableOpacity
      style={styles.repoItem}
      onPress={() => navigation.navigate("Details", { repo: item })}
    >
      <Text style={styles.repoName}>{item.name}</Text>
      <Text style={styles.repoDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#24292e" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <FlatList<Repository>
          data={repositories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  searchInput: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  listContainer: {
    padding: 12,
  },
  repoItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  repoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24292e",
    marginBottom: 4,
  },
  repoDescription: {
    fontSize: 14,
    color: "#586069",
  },
  footer: {
    padding: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    margin: 16,
  },
});

export default HomeScreen;
