import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

// Telas
import BibleScreen from './modules/bible/BibleScreen';
import FeedScreen from './modules/feed/FeedScreen';
import CreateScreen from './modules/create/CreateScreen';
import AIHubScreen from './modules/ai-hub/AIHubScreen';
import ProfileScreen from './modules/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#D4AF37',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E0E0E0',
            borderTopWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: -5,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'home';

            if (route.name === 'Bible') iconName = 'book';
            else if (route.name === 'Feed') iconName = 'video';
            else if (route.name === 'Create') iconName = 'plus-circle';
            else if (route.name === 'AIHub') iconName = 'zap';
            else if (route.name === 'Profile') iconName = 'user';

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Bible"
          component={BibleScreen}
          options={{
            tabBarLabel: '📖 Bíblia',
          }}
        />
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarLabel: '🎬 Feed',
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            tabBarLabel: '✨ Criar',
          }}
        />
        <Tab.Screen
          name="AIHub"
          component={AIHubScreen}
          options={{
            tabBarLabel: '🤖 IA',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: '👤 Perfil',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
