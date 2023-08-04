import ListScreen from './components/list/listTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalendarScreen from './components/calendar/calendarTab';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {

  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false, }}>
          <Tab.Screen 
            options={{
              tabBarLabel: 'Calendar',
              tabBarIcon: ({ color, size }) => (
                <Icon name="calendar" color={color} size={size} />
              ),
            }}
            name="Calendar"
            component={CalendarScreen}
          />
          <Tab.Screen 
            options={{
              tabBarLabel: 'Materials',
              tabBarIcon: ({ color, size }) => (
                <Icon name="list" color={color} size={size} />
              ),
            }}
            name="Materials"
            component={ListScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
