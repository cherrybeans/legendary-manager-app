import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-elements';
import Image from 'react-native-scalable-image';

import TasksByPriority from 'containers/TasksByPriority';
import ColoredSectionHeader from 'components/ColoredSectionHeader';
import { CATEGORY_COLORS } from 'constants';
const width = Dimensions.get('window').width;

class Home extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ColoredSectionHeader
          title="Important & Urgent"
          color={CATEGORY_COLORS.default['IMPORTANTURGENT']}
        />
        <TasksByPriority priority="IMPORTANTURGENT" />

        <ColoredSectionHeader
          title="Not Important & Urgent"
          color={CATEGORY_COLORS.default['NOTIMPORTANTURGENT']}
        />
        <TasksByPriority priority="NOTIMPORTANTURGENT" />

        <ColoredSectionHeader
          title="Important & Not Urgent"
          color={CATEGORY_COLORS.default['IMPORTANTNOTURGENT']}
        />
        <TasksByPriority priority="IMPORTANTNOTURGENT" />

        <ColoredSectionHeader
          title="Not Important & Not Urgent"
          color={CATEGORY_COLORS.default['NOTIMPORTANTNOTURGENT']}
        />
        <TasksByPriority priority="NOTIMPORTANTNOTURGENT" />
      </ScrollView>
    );
  }
}

export default Home;
export { Home };
