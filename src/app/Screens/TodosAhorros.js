import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";
import { supabase } from "../supabase";

export default function TodosAhorros() {
  const [ahorros, setAhorros] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setAhorros(data);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Todos los Ahorros" />
      </Appbar.Header>

      <FlatList
        data={ahorros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>
                {item.usuario} - ${item.monto}
              </Text>
              <Text variant="bodySmall">
                {new Date(item.created_at).toLocaleString()}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: { marginBottom: 10 },
});
