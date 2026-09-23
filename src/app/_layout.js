import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{ title: "Mis Ahorros", drawerLabel: "Mis Ahorros" }}
      />
      <Drawer.Screen
        name="todos-ahorros"
        options={{
          title: "Todos los Ahorros",
          drawerLabel: "Todos los Ahorros",
        }}
      />
    </Drawer>
  );
}