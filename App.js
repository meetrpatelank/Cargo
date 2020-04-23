import { AppLoading, registerRootComponent } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {AsyncStorage, Platform, StatusBar, StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import AppTabNavigator from './navigation/AppTabNavigator';
import * as Sentry from 'sentry-expo';
import AppIntroSlider from 'react-native-app-intro-slider';

// import { SentrySeverity, SentryLog } from 'react-native-sentry';
//Sentry.config('https://18325944fed842348b66ce82bf59467d@sentry.io/1727748').install();
Sentry.init({
  dsn: 'https://18325944fed842348b66ce82bf59467d@sentry.io/1727748',
  enableInExpoDevelopment: false,
  debug: true
});

const customViewProps = {
  style: {
    backgroundColor: '#d3d3d3' // light gray
  }
};


export default class App extends React.Component {
//export default function App(props) {
//const [isLoadingComplete, setLoadingComplete] = useState(false);


  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete:false,
      showRealApp: false,
      firstLaunch: null,
    }
  }

  componentDidMount(){
    AsyncStorage.getItem("alreadyLaunched").then(value => {
        if(value == null){
             AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
             this.setState({firstLaunch: true});
        }
        else{
             this.setState({firstLaunch: false});
        }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
  }

  handleFinishLoading() {
       this.setState({
       isLoadingComplete: true,
       
     });
  }

  async loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'origo':require('./assets/fonts/Origo.ttf'),
        'nunito-Black':require('./assets/fonts/nunito/Nunito-Black.ttf'),
        'nunito-Bold':require('./assets/fonts/nunito/Nunito-Bold.ttf'),
        'nunito-ExtraBold':require('./assets/fonts/nunito/Nunito-ExtraBold.ttf'),
        'nunito-ExtraLight':require('./assets/fonts/nunito/Nunito-ExtraLight.ttf'),
        'nunito-Light':require('./assets/fonts/nunito/Nunito-Light.ttf'),
        'nunito-Medium':require('./assets/fonts/nunito/Nunito-Medium.ttf'),
        'nunito-Regular':require('./assets/fonts/nunito/Nunito-Regular.ttf'),
        'nunito-SemiBold':require('./assets/fonts/nunito/Nunito-SemiBold.ttf'),
        'Roboto': require('./node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
      }),
    ]);
  }
  
    handleLoadingError(error) {
      // In this case, you might want to report the error to your error reporting
      // service, for example Sentry
      console.warn(error);
    }

    _onDone = () => {
      console.log('Done pressed')
      this.setState({ showRealApp: true });
    };
    _onSkip = () => {
      console.log('Skip pressed')
      this.setState({ showRealApp: true });
    };

    _renderItem = ({ item }) => {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 100
          }}>
          <Text style={styles.title}>{item.title}</Text>
          <Image style={styles.image} source={item.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );
    };


  render() {
  if (!this.state.isLoadingComplete && !this.state.showRealApp) {
    return (
      <AppLoading
        startAsync={this.loadResourcesAsync}
        onFinish={() => this.setState({ isLoadingComplete: true })}
        onError={console.warn}
      />
    );
  } 
  
  else {

    if(this.state.firstLaunch === null){
      return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
    }else if(this.state.firstLaunch == true && this.state.showRealApp == false){
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
      }else{
        return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar hidden={false} barStyle="default" />}
            <AppTabNavigator />
          </View>
        );
      }
    }
  
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
  },
  image: {
    width:Dimensions.get('window').width,
    height: 300,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginTop: 25,
    fontWeight: 'bold',
  },

});

const slides = [
  {
    key: 's1',
    title: 'Welcome to CarGo',
    text: 'CarGo is a next generation marketplace for new and used furniture.\nCreate an account and get started today.\nStart shopping now, stress free.',
    image: require('./assets/images/welcome.png'),
    backgroundColor: '#f6437b',
    
  },
  {
    key: 's2',
    title: 'Post, Buy and Sell',
    text: 'Simply post any pieces of furniture you wish to sell.\nBrowse and buy furniture using our extensive marketplace.\nWatch as your items leave your hands and arrive in another.',
    image: require('./assets/images/pay.png'),
    backgroundColor: '#3395ff',
  },
  {
    key: 's3',
    title: 'Delivery on Demand',
    text: 'Our drivers deliver your items to your doorstep.\nPurchase an item and have it delivered directly to you.\nOur reliable drivers deliver items quickly and efficiently.',
    image: require('./assets/images/delivery.png'),
    backgroundColor: '#febe29',
  },
];

registerRootComponent(App);