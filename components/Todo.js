import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      id: this.props.id
    };
  }

  handleDelete = () => {
    this.props.handleDelete(this.state.id);
  }

  render() {
    return (
      <View style={styles.todo}>
        <View style={styles.trashIcon}>
          <Icon
            name="dot-circle-o"
            size={16}
          />
        </View>
        <View style={styles.task}>
          <Text>
            {this.state.task}
          </Text>
        </View>
        <TouchableOpacity onPress={this.handleDelete} style={styles.trashIcon}>
          <Icon
            name="trash"
            size={16}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todo: {
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    backgroundColor: '#406E9F',
  },
  trashIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  task: {
    flex: 0.8,
    marginLeft: 10,
    justifyContent: 'center'
  }
});
