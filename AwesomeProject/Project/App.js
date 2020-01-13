
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
  TouchableOpacity,
  Modal
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
      starred: [],
    };
    this.selectedData = this.selectedData.bind(this);
  }

  selectedData(selectedElement) {
    var i = selectedElement.index;
    //Remove element from starred & double check that the array contains i
    if (this.state.data[i].isStarred && this.state.starred.indexOf(selectedElement) !== -1) {
      this.setState({starred: this.state.starred.filter((j) => j.index !== selectedElement.index)}) //Remove the index that is equals to i
    }
    else {  //Add element to starred
     this.setState({starred: [...this.state.starred, selectedElement]});
    }
    this.state.data[i].isStarred = !this.state.data[i].isStarred;
  }

  render() {

    const logo = require('./images/netflix.png');

    return (
        <SafeAreaView style={CarouselStyle.container}>
          <View style={CarouselStyle.header}>
           <Image source={logo} style={CarouselStyle.logo}/>
           <WishList starred={this.state.starred} selectedData={this.selectedData}/>
          </View>
          <Carousel data = {this.state.data} displayNumber = {4} star={true} selectedData={this.selectedData}/>
        </SafeAreaView>

    );
  }
};

class WishList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowIsOpen: false,
    };
    this.toggleWindow = this.toggleWindow.bind(this);
  }

  toggleWindow() {
   this.setState({windowIsOpen: !this.state.windowIsOpen})
  }

  render() {
   var selectedData = this.props.selectedData;
   var displayData = this.props.starred.map(function(item) {
    return <WishItem item={item} selectedData ={selectedData}/>
   });
    return(
     <View>
       <View style={WishListStyles.wishListIcon}>
       <StarButton isPressed={this.state.windowIsOpen} onPressFunction={this.toggleWindow}/>
       </View>
       <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.windowIsOpen}
          onRequestClose={() => {
          }}
          >
        <View style={WishListStyles.background}>
         <SafeAreaView style={WishListStyles.background}>
          <View style={WishListStyles.headerView}>
           <Text style={WishListStyles.header}>Favourites</Text>
           <View style = {WishListStyles.wishListIcon}>
            <StarButton isPressed={this.state.windowIsOpen} onPressFunction={this.toggleWindow}/>
           </View>
          </View>
          <ScrollView style={WishListStyles.list}>
          {displayData}
          </ScrollView>
         </SafeAreaView>
        </View>
       </Modal>
     </View>
    );
  }
}

class WishItem extends WishList {

  render () {
    return (
      <View>
          <View style = {WishListStyles.item}>
           <Image source={{uri: this.props.item.poster}} style={WishListStyles.itemImage}/>
           <Text style={WishListStyles.itemText}>{this.props.item.title}</Text>
           <StarButton isPressed = {true} onPressFunction={() => this.props.selectedData(this.props.item)}/>
          </View>
          <View style={WishListStyles.bottomBorder}/>
      </View>
    );
  }
}

class StarButton extends Component {
 render() {
  return (
   <View style={WishListStyles.wishListIcon}>
   <TouchableOpacity
    onPress={this.props.onPressFunction}
    activeOpacity={0.6}
    ref="star"
    >
     <Text style={this.props.isPressed ? WishListStyles.starPressed : WishListStyles.star}>★</Text>
    </TouchableOpacity>
   </View>
  );
 }
}

class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      carouselModalIsOpen: false,
      selectedItemData: {},
    };
    this.loadData = this.loadData.bind(this);
    this.toggleCarouselModal = this.toggleCarouselModal.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
  }

  loadData(index) {
    let data =[];

    if(this.props.data.length >= this.props.displayNumber + index) {
      for(let i = index; i < this.props.displayNumber + index; i++) {
        data.push(this.props.data[i]);
      }
      return data;
    }
  }

  changeIndexBackwards(){
    var newIndex = this.state.index - this.props.displayNumber;
      this.setState({index: newIndex})
  }

  changeIndexForward(){
    this.refs.touch.setOpacityTo(0.8, 1);
    var newIndex = this.state.index + this.props.displayNumber;
      this.setState({index: newIndex})
  }

  toggleCarouselModal() {
    this.setState({isOpen: !this.state.isOpen});
  }

  selectedItem(data) {

    if(Object.entries(this.state.selectedItemData).length === 0) {
      this.setState({selectedItemData: data});
      this.toggleCarouselModal();
    }
    else if(this.state.selectedItemData === data) {
      this.toggleCarouselModal();
      this.setState({selectedItemData: {}});
    }
    else {
      this.setState({selectedItemData: data});
    }
  }

  render() {
    var numberOfElements = this.props.displayNumber;  //To make sure elements won't appear too small
    var selectedItem = this.selectedItem;
    var displayData = (numberOfElements > 8 || numberOfElements < 3) ?
    <Text style = {CarouselStyle.title}>Use a display number between 3 and 8! Your display number was: {numberOfElements}</Text>
    : this.loadData(this.state.index).map(function(item) {
      return <CarouselItem data = {item} displayNumber = {numberOfElements} selectedItem = {selectedItem}/>
      });
    return (
        <View style={CarouselStyle.carouselContainer}>
          <View style={CarouselStyle.carousel} >
            <TouchableOpacity
             style={this.state.index == 0 ? CarouselStyle.disabledButton : CarouselStyle.buttonStyle}
             onPress={() => this.changeIndexBackwards()}
             disabled = {this.state.index == 0 ? true : false}
             activeOpacity={1.0}
             ref="touch"
             >
             <Text style = {CarouselStyle.buttonArrow}> ◀ </Text>
           </TouchableOpacity>
            <View style={CarouselStyle.allItems}>
               {displayData}
            </View>
            <TouchableOpacity
             style={this.state.index > this.props.data.length - this.props.displayNumber ? CarouselStyle.disabledButton : CarouselStyle.buttonStyle}
             onPress={() => this.changeIndexForward()}
             disabled = {this.state.index > this.props.data.length - this.props.displayNumber ? true : false}
             activeOpacity={1.0}
             ref="touch"
             >
             <Text style = {CarouselStyle.buttonArrow}> ▶ </Text>
           </TouchableOpacity>
         </View>
         <CarouselModal show={this.state.isOpen}
           onClose={this.toggleCarouselModal}
           data = {this.state.selectedItemData}
           selectedData = {this.props.selectedData}
           star = {this.props.star}
          />
       </View>
    );
  }
}

class CarouselModal extends Carousel {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
        <ScrollView style={CarouselStyle.carouselModalStyle}>
          <View style={CarouselStyle.titleBar}>
            <Text style={CarouselStyle.selectedTitle}>
            {this.props.data.title}
            </Text>
            { this.props.star ?
            <StarButton onPressFunction={() => this.props.selectedData(this.props.data)} isPressed={this.props.data.isStarred} />
            : null }
          </View>

          <Text style={CarouselStyle.title}>
          {"\n\nDirector: " + this.props.data.director + "\n\n"}
          {this.props.data.description}
          </Text>
        </ScrollView>
    );
  }
}

class CarouselItem extends Carousel {

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.selectedItem(this.props.data)} style={[CarouselStyle.item, {width: 100/this.props.displayNumber+'%'}]}>
      <Image source={{uri: this.props.data.poster}} style={CarouselStyle.itemImage}/>
        <Text style={CarouselStyle.title}>
        {this.props.data.title}
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
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
  },
  list: {
   color: 'white',
   backgroundColor: 'black',
  },
  header: {
   color: 'white',
   fontSize: 50,
   margin: 40,
  },
  headerView: {
   width: '100%',
   height: '20%',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
  },
  item: {
   flexDirection: 'row',
   height: 150,
   width: '100%',
   alignItems: 'center',
   padding: 0,
  },
  bottomBorder: {
   height: 1,
   width: '100%',
   backgroundColor: '#434343',
  },
  itemText: {
   flex: 1,
   color: 'white',
   fontSize: 20,
   paddingLeft: 15,
   flexWrap: 'wrap',

  },
  itemImage: {
   height: '100%',
   width: '20%',
   resizeMode: 'contain',
  }
});

const CarouselStyle = StyleSheet.create({
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
    flex: 1,
    color: 'white',
    fontSize: 14,
    padding: 5,
    flexWrap: 'wrap',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderRadius: 4,
    opacity: 0.8,
    height: '100%',
  },
  buttonArrow: {
   color: 'white',
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
  carouselModalStyle: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  selectedTitle: {
    flex:1,
    fontSize: 40,
    color: 'white',
    flexWrap: 'wrap',
  },
  titleBar: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
