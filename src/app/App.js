import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import MisAhorros from "./Screens/MisAhorros";
import TodosAhorros from "./Screens/TodosAhorros";
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Mis Ahorros">
          <Drawer.Screen name="Mis Ahorros" component={MisAhorros} />
          <Drawer.Screen name="Todos los Ahorros" component={TodosAhorros} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
