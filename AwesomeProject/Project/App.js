
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
      if(!item.poster) return;
      var movieItem = {title: item.title, poster: item.poster};
      return movieItem;
    }
    var movieData = data.map(getTitleAndPoster);
    movieData = movieData.filter(function( item ) {
       return item !== undefined;
    });

    return (
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo}/>
          <Carousel MovieData = {movieData} DisplayNumber = {4}/>
        </SafeAreaView>

    );
  }
};

class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsToShow: {},
    };
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    let data =[];
    console.log(this.props.DisplayNumber);
    if(this.props.MovieData.length >= this.props.DisplayNumber) {
      for(let i = 0; i < this.props.DisplayNumber; i++) {
        data.push(this.props.MovieData[i]);

      }
      return data;
    }
  }
/*
  ComponentDidMount() {
    this.loadData();
  }
*/
  /*
  this.state.itemsToShow.map(function(item) {
    return <MovieItem MovieData = {item} />
    })
  */

  render() {
    var namesList = this.loadData().map(function(item) {
      return <MovieItem MovieData = {item} />
      });
    return (
      <View style={styles.carousel}>
         {namesList}
      </View>
    );
  }
}

class MovieItem extends Carousel {
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
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  carousel: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
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
    width: '25%',
    height: '25%',
    padding: 5,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }

});
