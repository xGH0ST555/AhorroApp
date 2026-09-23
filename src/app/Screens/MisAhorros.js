import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text, TextInput } from "react-native-paper";
import { supabase } from "../../supabase";

export default function MisAhorros() {
  const [usuario, setUsuario] = useState("");
  const [monto, setMonto] = useState("");
  const [ahorros, setAhorros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (usuario.trim() !== "") {
      fetchAhorros();
    }
  }, [usuario]);

  const fetchAhorros = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("usuario", usuario.trim())
      .order("created_at", { ascending: false });
    if (error) {
      Alert.alert("Error al consultar", error.message);
      return;
    }
    setAhorros(data ?? []);
  };

  const addAhorro = async () => {
    const montoNumerico = Number.parseFloat(monto.replace(",", "."));

    if (!usuario.trim() || !monto.trim()) {
      Alert.alert("Datos incompletos", "Escribe un usuario y un monto.");
      return;
    }

    if (!Number.isFinite(montoNumerico) || montoNumerico <= 0) {
      Alert.alert("Monto inválido", "Escribe un monto mayor que cero.");
      return;
    }

    setGuardando(true);
    const { data, error } = await supabase
      .from("users")
      .insert([{ usuario: usuario.trim(), monto: montoNumerico }])
      .select()
      .single();
    setGuardando(false);

    if (error) {
      Alert.alert("No se pudo guardar", error.message);
      return;
    }

    if (data) {
      setMonto("");
      fetchAhorros();
      Alert.alert("Guardado", "El ahorro se guardó correctamente.");
    }
  };

  const total = ahorros.reduce((sum, item) => sum + parseFloat(item.monto), 0);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Mis Ahorros" />
      </Appbar.Header>

      <TextInput
        label="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        label="Monto de ahorro"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={addAhorro}
        loading={guardando}
        disabled={guardando}
        style={styles.button}
      >
        Guardar
      </Button>

      <Text style={styles.total}>Total ahorrado: {total}</Text>

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
  input: { marginBottom: 10 },
  button: { marginBottom: 20 },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  card: { marginBottom: 10 },
});
