import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-elements';
import Image from 'react-native-scalable-image';

import TasksByPriority from 'containers/TasksByPriority';
import { CATEGORY_COLORS } from 'constants';
const width = Dimensions.get('window').width;

class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Tasks</Text>

        <Text style={{ color: CATEGORY_COLORS.default['IMPORTANTURGENT'] }}>
          Important & Urgent
        </Text>
        <TasksByPriority priority="IMPORTANTURGENT" />

        <Text style={{ color: CATEGORY_COLORS.default['NOTIMPORTANTURGENT'] }}>
          Not Important & Urgent
        </Text>
        <TasksByPriority priority="NOTIMPORTANTURGENT" />

        <Text style={{ color: CATEGORY_COLORS.default['IMPORTANTNOTURGENT'] }}>
          Important & Not Urgent
        </Text>
        <TasksByPriority priority="IMPORTANTNOTURGENT" />

        <Text
          style={{ color: CATEGORY_COLORS.default['NOTIMPORTANTNOTURGENT'] }}
        >
          Not Important & Not Urgent
        </Text>
        <TasksByPriority priority="NOTIMPORTANTNOTURGENT" />
      </View>
    );
  }
}

export default Home;
export { Home };
