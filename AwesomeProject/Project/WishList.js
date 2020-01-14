
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
import {StarButton} from "./StarButton.js";

export class WishList extends Component {

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
    return <WishItem key={item.index} item={item} selectedData ={selectedData}/>
   });
    return(
     <View>

       <StarButton isPressed={this.state.windowIsOpen} onPressFunction={this.toggleWindow}/>

       <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.windowIsOpen}
          onRequestClose={() => {
          }}
          >
        <View style={WishListStyle.background}>
         <SafeAreaView style={WishListStyle.background}>
          <View style={WishListStyle.headerView}>
           <Text style={WishListStyle.header}>Favourites</Text>

            <StarButton isPressed={this.state.windowIsOpen} onPressFunction={this.toggleWindow}/>

          </View>
          <ScrollView style={WishListStyle.list}>
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
          <View style = {WishListStyle.item}>
           <Image source={{uri: this.props.item.image}} style={WishListStyle.itemImage}/>
           <Text style={WishListStyle.itemText}>{this.props.item.title}</Text>
           <StarButton isPressed = {true} onPressFunction={() => this.props.selectedData(this.props.item)}/>
          </View>
          <View style={WishListStyle.bottomBorder}/>
      </View>
    );
  }
}

const WishListStyle = StyleSheet.create({
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
