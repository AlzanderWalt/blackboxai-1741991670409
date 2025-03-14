import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import App from './App';

// Ignore specific warnings that might not be relevant for the app
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycle:', // Ignore require cycle warnings
]);

// Register the main component
registerRootComponent(App);

// Initialize any global configurations or services here
if (__DEV__) {
  // Development-only code
  console.log('Running in development mode');
}

// Handle any uncaught errors
if (!__DEV__) {
  // Production error handling
  ErrorUtils.setGlobalHandler((error) => {
    // Log error to your error reporting service
    console.error('Uncaught error:', error);
  });
}
