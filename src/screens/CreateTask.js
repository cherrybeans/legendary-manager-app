import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

class CreateTask extends Component {
  static navigationOptions = {
    title: 'Create a new task',
  };

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Description</FormLabel>
          <FormInput placeholder="Eat a peach..." />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="Create"
            onPress={this._signInAsync}
          />
        </Card>
      </View>
    );
  }

  _createTaskAsync = async () => {
    await AsyncStorage.setItem('task', 'abc123');
    this.props.navigation.navigate('Home');
  };
}

export default CreateTask;
export { CreateTask };
