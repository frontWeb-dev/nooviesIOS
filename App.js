import React, { useState } from 'react';
import { View, Text } from 'react-native';
// expo
import AppLoading from 'expo-app-loading';
import Asset from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch([image]);
    } else {
      return Asset.loadAsync([image]);
    }
  });
export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.fonts]);
    const images = loadImages([
      require('./1.png'),
      'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c48f324a0b9c48f77dbce3a43bd11ce785',
    ]);
    await Promise.all([...fonts, ...images]);
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return <Text>We are done loading!</Text>;
}

// const [assets] = useAssets([require('./1.png)]);
// const [loaded] = Font.useFonts(Ioncion.font);
// if(!assets || !loaded) [
//  return <AppLoading/>;
// ]
