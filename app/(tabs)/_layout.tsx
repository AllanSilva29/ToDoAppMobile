import { Link, Tabs } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Home, NotebookPen, CalendarDays, Cog } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Seja bem-vindo(a)!',
          tabBarIcon: ({ color }) => <Home color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Button mr="$4" bg="$purple8" color="$purple12">
                Hello!
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color }) => <NotebookPen color={color} />,
        }}
      />
      <Tabs.Screen
        name="lula"
        options={{
          title: 'Calendário',
          tabBarIcon: ({ color }) => <CalendarDays color={color} />,
        }}
      />
       <Tabs.Screen
        name="four"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <Cog color={color} />,
        }}
      />
    </Tabs>
    
  )
}
