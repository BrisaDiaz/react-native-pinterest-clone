import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { store } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigation colorScheme={colorScheme} />
          </GestureHandlerRootView>
        </Provider>

        <StatusBar backgroundColor="#fff" />
      </SafeAreaProvider>
    );
  }
}
