import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import { Modal } from "react-native-modal";
import {
  Divider,
} from 'react-native-elements';
import { Todo } from '../components/Todo';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      todos: [],
      number: 0,
    };
  }

  onPresshandle = () => {
    if (!this.state.todo) {
      Alert.alert(
        'Warning',
        'Please Add a Task',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return;
    }
    let newTodos = [...this.state.todos, {task: this.state.todo, id: this.state.number}];
    this.setState({todo: '', todos: newTodos, number: this.state.number+1});
  }

  deleteTodo = (id) => {
    console.log(id);
    let newTodos = [...this.state.todos];
    newTodos = newTodos.filter((todo) => {
      return todo.id != id;
    });
    this.setState({todos: newTodos, number: this.state.number-1});
  }


  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>No todo now!!!</Text>
      </View>
    );
  };

  render() {
    // console.log(this.state.todos);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/todo_image.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputTask}
              onChangeText={(todo) => this.setState({todo})}
              value={this.state.todo}
              placeholder={'  add todo'}
            />
            <View>
              <Button
                onPress={this.onPresshandle}
                title="+"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>

          <View>
            <Divider style={{ backgroundColor: 'black', marginVertical: 20 }} />
          </View>
          <View>
            <FlatList
              data={this.state.todos}
              renderItem={({item}) => <Todo task={item.task} id={item.id} handleDelete={() => this.deleteTodo(item.id)}/>}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={this.ListEmpty}
              refreshing={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputTask: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 20,
    flex: 0.9
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
