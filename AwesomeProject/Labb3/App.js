import React, {Component} from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink, ApolloLink, gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import {Button,SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Picker} from 'react-native';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { Query } from 'react-apollo';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer GITHUBTOKEN`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache : new InMemoryCache(),
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      codeLanguage: "All",
    };

    this.handleChange = this.handleChange.bind(this);
    this.getDate = this.getDate.bind(this);

  }

  handleChange(language){
      this.setState({codeLanguage: language});
  }

  getDate() {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    let dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    return dateString;
  }

  render() {

  var VARIABLES = {  "first": 25,
    "query":"created:>" + this.getDate() + " sort:stars-desc language:" + this.state.codeLanguage,
    "type": "REPOSITORY"
  }

//Added number of commits, braches and license
  const GET_GITHUBDATA = gql`
  query($first: Int, $query: String!, $type: SearchType!)
  {
    search(first: $first, query: $query, type: $type) {
      edges {
        node {
          ... on Repository {
            refs(first: 0, refPrefix: "refs/heads/") {
              totalCount
            }
            object(expression: "master") {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
            name
            owner {
              login
            }
            description
            stargazers {
              totalCount
            }
            primaryLanguage {
              name
            }
            licenseInfo {
              name
            }
          }
        }
      }
    }
  }
  `;

  return (
    <ApolloProvider client={client}>
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.header}>Top 25 trending github repos last week ✨</Text>
      <LanguagePicker handleChange = {this.handleChange} language={this.state.codeLanguage} />
    </SafeAreaView>
    <SafeAreaView>
      <ScrollView>
        <DisplayGithubData query={GET_GITHUBDATA} variables={VARIABLES}/>
      </ScrollView>
    </SafeAreaView>
    </ApolloProvider>
  );
  }
};

class LanguagePicker extends App {

  render() {
    var language = "All";
    return <Picker selectedValue={this.props.language}
           onValueChange={(itemValue, itemIndex) => {this.props.handleChange(itemValue)}}
           mode={'dialog'}>
           <Picker.Item label="All" value="All" />
           <Picker.Item label="JavaScript" value="JavaScript" />
           <Picker.Item label="Python" value="Python" />
           <Picker.Item label="C++" value="C++" />
           <Picker.Item label="C#" value="C#" />
           <Picker.Item label="TypeScript" value="TypeScript" />
           <Picker.Item label="CSS" value="CSS" />
           <Picker.Item label="PHP" value="PHP" />
           <Picker.Item label="Swift" value="Swift" />
      </Picker>
  }
}

class DisplayGithubData extends App {

  render() {
    return <Query query={this.props.query} variables={this.props.variables}>
     {({ loading, error, data }) => {

       if (loading) return <Text style={styles.description}>Fetching data...</Text>
       if (error) return <Text style={styles.description}>Error... :'(</Text>

       const renderData = data.search.edges;
       var namesList = renderData.map(function(name) {

         var language =  "Unknown language";
         var license =  "Unknown license";
         if(name.node.primaryLanguage && name.node.primaryLanguage.name) {
           language = name.node.primaryLanguage.name;
         }
         if(name.node.licenseInfo && name.node.licenseInfo.name) {
           license = name.node.licenseInfo.name;
         }

         return <ProjectListItem
                title={name.node.name}
                language={language}
                stars={name.node.stargazers.totalCount}
                text={name.node.description}
                license={license}
                noOfCommits={name.node.object.history.totalCount}
                noOfBranches = {name.node.refs.totalCount}
                />
       })

       return (
           <View>
              {namesList}
           </View>
       )}
     }
    </Query>;
  }
}

//Shows extra information when pressed
class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
        <View className="modal" style={styles.modalStyle}>
          <Text style={styles.description}>{this.props.children}</Text>
        </View>
    );
  }
}

//Changed to a component
class ProjectListItem extends App {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
      <View style={styles.item}>
         <View >
           <Text style={styles.title}>
           {this.props.title}
           </Text>
           <Text  style={styles.stars}>
           {this.props.language}
           </Text>
         </View>
         <Text style={styles.stars}>
         {this.props.stars} stargazers
         </Text>
         <Text style={styles.description}>
         {this.props.text}
         </Text>
          <Modal show={this.state.isOpen}
            onClose={this.toggleModal}>
            <Text>{"License: " + this.props.license}
            {"\nNumber of commits: " + this.props.noOfCommits}
            {"\nNumber of branches: " + this.props.noOfBranches}
            </Text>
          </Modal>
          <Button
           onPress={this.toggleModal}
           title= {this.state.isOpen ? "Close" : "See More"}
           />
       </View>
    )
  }
}

const styles = {
  headerView: {
    backgroundColor: 'pink',
    marginBottom: 0,
  },
  header: {
    fontSize: 30,
    color: 'white',
    padding: 40,
    paddingBottom: 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontFamily: 'calibri',
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
  title: {
    fontSize: 30,
    padding: 5,
  },
  stars: {
    fontSize: 15,
    padding: 5,
  },
  description: {
    padding: 5,
  },
  // The gray background
  /*
  backdropStyle: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
  },
  modalStyle : {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    padding: 30
  },
 */
};
