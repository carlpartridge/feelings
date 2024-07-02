/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import {RealmProvider} from '@realm/react';
import {Result} from './src/models/Result';

export default function Main() {
  return (
    <RealmProvider schema={[Result]} deleteRealmIfMigrationNeeded={true}>
      <NavigationContainer>
        <PaperProvider>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </RealmProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
