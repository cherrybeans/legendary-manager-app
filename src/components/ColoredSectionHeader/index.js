import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { FONTS, FONT_SIZE } from 'constants';

const ColoredSectionHeader = ({ color, title }) => {
  return (
    <View style={{ backgroundColor: color, padding: 10 }}>
      <Text
        style={{
          fontSize: FONT_SIZE.sm,
          color: 'white',
          fontFamily: FONTS.LIBREBOLD,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default ColoredSectionHeader;
export { ColoredSectionHeader };
