
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';



export default class App extends Component {

  render() {
    const data = require('./moviesdetails.json');
    const logo = require('./images/netflix.png');

    function getTitleAndPoster(item) {
      var movieItem = {title: item.title, poster: item.poster};
      return movieItem;
    }
    var movieData = data.map(getTitleAndPoster);

    return (
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo}/>
          <Carousel MovieData = {movieData} DisplayNumber = {4}/>
        </SafeAreaView>

    );
  }
};

class Carousel extends App {

  constructor(props) {
    super(props);
    this.state = {
      itemsToShow: {},
    };
    this.loadData = this.loadData.bind(this);

  }

  loadData() {
    let ItemsToShow = {};
    if(this.props.MovieData.length > this.props.DisplayNumber) {
      for(let i = 0; i < this.props.DisplayNumber; i++) {
        ItemsToShow[i] = this.props.MovieData[i];
        console.log("hej");
      }
      this.setState({itemsToShow: ItemsToShow}) ;
    }
  }
  componentDidMount()  {
    loadData();
  }

  render() {
    return (
      this.state.itemsToShow.map(function(item) {
        return <MovieItem MovieData = {item} />
        })
    );
  }
}

class MovieItem extends App {
  render () {
    console.log(this.props.MovieData.poster);
    return (
      <View style={styles.item}>
      <Image source={{uri: this.props.MovieData.poster}} style={styles.itemImage}/>
        <Text style={styles.title}>
        {this.props.MovieData.title}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    justifyContent: 'center',

  },
  logo: {
    width: '100%',
    height: '30%',
  },
  item: {
    width: '40%',
    height: '25%',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }

});
