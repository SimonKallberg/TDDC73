
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';

function getData() {
  const data = require('./moviesdetails.json');

  function getSelectedData(item) {
    if(item.poster == "na") return; //Remove empty images
    var movieItem = ({title: item.title, poster: item.poster, director: item.directed_by, description: item.description});
    return movieItem;
  }
  var movieData = data.map(getSelectedData);
  //Remove empty data
  movieData = movieData.filter(function( item ) {
     return item !== undefined;
  });
  //Add index
  movieData = movieData.map((currElement, index) => {
    currElement["index"] = index;
    currElement["isStarred"] = false;
    return currElement;
  });
  return movieData;
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: getData(),
    };
    this.selectedData = this.selectedData.bind(this);
  }

  selectedData(selectedElement) {
    var i = selectedElement.index;
    this.state.data[i].isStarred = !this.state.data[i].isStarred;
    this.forceUpdate()
  }

  render() {

    const logo = require('./images/netflix.png');

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>
          <WishList />
          </View>
          <Carousel MovieData = {this.state.data} DisplayNumber = {4} star={true} selectedData={this.selectedData}/>
        </SafeAreaView>

    );
  }
};

class WishList extends Component {

  render() {
    return(
      <View style={WishListStyles.wishListIcon}>
        <Text style={WishListStyles.star}>★</Text>
      </View>

    );
  }
}

class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modalIsOpen: false,
      selectedItemData: {},
    };
    this.loadData = this.loadData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
  }

  loadData(index) {
    let data =[];

    if(this.props.MovieData.length >= this.props.DisplayNumber + index) {
      for(let i = index; i < this.props.DisplayNumber + index; i++) {
        data.push(this.props.MovieData[i]);
      }
      return data;
    }
  }

  changeIndexBackwards(){
    var newIndex = this.state.index - this.props.DisplayNumber;
      this.setState({index: newIndex})
  }

  changeIndexForward(){
    this.refs.touch.setOpacityTo(0.8, 1);
    var newIndex = this.state.index + this.props.DisplayNumber;
      this.setState({index: newIndex})
  }

  toggleModal() {
    this.setState({isOpen: !this.state.isOpen});
  }

  selectedItem(data) {
    //console.log(data);
    //console.log(this.state.selectedItemData);

    if(Object.entries(this.state.selectedItemData).length === 0) {
      this.setState({selectedItemData: data});
      this.toggleModal();
    }
    else if(this.state.selectedItemData === data) {
      this.toggleModal();
      this.setState({selectedItemData: {}});
    }
    else {
      this.setState({selectedItemData: data});
    }
  }

  render() {
    var numberOfElements = this.props.DisplayNumber;  //To make sure elements won't appear too small
    var functionHandle = this.selectedItem;
    var displayData = (numberOfElements > 8 || numberOfElements < 3) ?
    <Text style = {styles.title}>Use a display number between 3 and 8! Your display number was: {numberOfElements}</Text>
    : this.loadData(this.state.index).map(function(item) {
      return <MovieItem MovieData = {item} DisplayNumber = {numberOfElements} selectedItem = {functionHandle}/>
      });
    return (
        <View style={styles.carouselContainer}>
          <View style={styles.carousel} >
            <TouchableOpacity
             style={this.state.index == 0 ? styles.disabledButton : styles.buttonStyle}
             onPress={() => this.changeIndexBackwards()}
             disabled = {this.state.index == 0 ? true : false}
             activeOpacity={1.0}
             ref="touch"
             >
             <Text style = {styles.title}> ◀ </Text>
           </TouchableOpacity>
            <View style={styles.allItems}>
               {displayData}
            </View>
            <TouchableOpacity
             style={this.state.index > this.props.MovieData.length - this.props.DisplayNumber ? styles.disabledButton : styles.buttonStyle}
             onPress={() => this.changeIndexForward()}
             disabled = {this.state.index > this.props.MovieData.length - this.props.DisplayNumber ? true : false}
             activeOpacity={1.0}
             ref="touch"
             >
             <Text style = {styles.title}> ▶ </Text>
           </TouchableOpacity>
         </View>
         <Modal show={this.state.isOpen}
           onClose={this.toggleModal}
           data = {this.state.selectedItemData}
           selectedData = {this.props.selectedData}
           star = {this.props.star}
          />
       </View>
    );
  }
}

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
        <ScrollView style={styles.modalStyle}>
          <View style={styles.titleBar}>
            <Text style={styles.selectedTitle}>
            {this.props.data.title}
            </Text>
            { this.props.star ?
            <TouchableOpacity
             style={styles.starBox}
             onPress={() => this.props.selectedData(this.props.data)}
             disabled = {!this.props.star ? true : false}
             activeOpacity={1.0}
             >
            <Text style={this.props.data.isStarred ? styles.starPressed : styles.star}>★ </Text>
            </TouchableOpacity>
            : null }
          </View>

          <Text style={styles.title}>
          {"\n\nDirector: " + this.props.data.director + "\n\n"}
          {this.props.data.description}
          </Text>
        </ScrollView>
    );
  }
}

class MovieItem extends Carousel {

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.selectedItem(this.props.MovieData)} style={[styles.item, {width: 100/this.props.DisplayNumber+'%'}]}>
      <Image source={{uri: this.props.MovieData.poster}} style={styles.itemImage}/>
        <Text style={styles.title}>
        {this.props.MovieData.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const WishListStyles = StyleSheet.create({
  wishListIcon: {
    width: 50,
    height: 50,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    fontSize: 40,
    color: 'white',
    opacity: 0.8,
  },
  starPressed: {
    fontSize: 40,
    color: 'red',
    opacity: 0.8,
  },
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    flex: 1,
  },
  header: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  carouselContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  carousel: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  allItems: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 14,
    padding: 5,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderRadius: 4,
    opacity: 0.8,
    height: '100%',
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderRadius: 4,
    opacity: 0.2,
    height: '100%',
  },
  logo: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
  },
  item: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
  },
  modalStyle: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  selectedTitle: {
    fontSize: 40,
    color: 'white',
  },
  titleBar: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  starBox: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
  },
  star: {
    fontSize: 40,
    color: 'white',
    opacity: 0.8,
  },
  starPressed: {
    fontSize: 40,
    color: 'red',
    opacity: 0.8,
  },
});
