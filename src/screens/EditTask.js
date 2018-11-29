import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

class EditTask extends Component {
  state = {
    id: this.props.navigation.getParam('id', 'NO-ID'),
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
            onPress={this._editTask}
          />
        </Card>
      </View>
    );
  }

  _editTask = async () => {
    this.props.navigation.navigate('Home');
  };
}

export default EditTask;
export { EditTask };
