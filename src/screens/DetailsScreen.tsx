import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DetailsScreenProps } from "../types";

type DetailItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
};

const DetailItem: React.FC<DetailItemProps> = ({ icon, value, label }) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={24} color="#24292e" />
    <View style={styles.detailText}>
      <Text style={styles.detailValue}>{value}</Text>
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
  </View>
);

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { repo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{repo.name}</Text>
        <Text style={styles.description}>{repo.description}</Text>
      </View>

      <View style={styles.statsContainer}>
        <DetailItem
          icon="star-outline"
          value={repo.stargazers_count}
          label="Stars"
        />
        <DetailItem
          icon="git-branch-outline"
          value={repo.forks_count}
          label="Forks"
        />
        <DetailItem
          icon="eye-outline"
          value={repo.watchers_count}
          label="Watchers"
        />
      </View>

      <View style={styles.languageContainer}>
        <Ionicons name="code-outline" size={24} color="#24292e" />
        <Text style={styles.language}>
          {repo.language || "No language specified"}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#24292e",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#586069",
  },
  statsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e1e4e8",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailText: {
    marginLeft: 12,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#24292e",
  },
  detailLabel: {
    fontSize: 14,
    color: "#586069",
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e1e4e8",
  },
  language: {
    marginLeft: 12,
    fontSize: 16,
    color: "#24292e",
  },
});

export default DetailsScreen;
