import { Link, Tabs } from "expo-router";
import { Button, useTheme } from "tamagui";
import { Home, NotebookPen, Cog } from "@tamagui/lucide-icons";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
          headerRight: () => (
            <Link href="/welcome" asChild>
              <Button mr="$4" bg="$purple8" color="$purple12">
                Boas vindas!
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="tasksDone"
        options={{
          title: "Tarefas Concluídas",
          tabBarIcon: ({ color }) => <NotebookPen color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => <Cog color={color} />,
        }}
      />
    </Tabs>
  );
}
