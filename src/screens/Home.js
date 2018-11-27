import React, { Component } from 'react';
import { ScrollView, Text, Linking, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {images.map(({ name, image, url, key }) => (
            <Card title={`CARD ${key}`} image={image} key={key}>
              <Text style={{ marginBottom: 10 }}>Photo by {name}.</Text>
              <Button
                backgroundColor="#03A9F4"
                title="VIEW NOW"
                onPress={() => Linking.openURL(url)}
              />
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Home;
export { Home };

const images = [
  {
    key: 1,
    name: 'Nathan Anderson',
    image: require('assets/images/foggyforest.jpg'),
    url: 'https://unsplash.com/photos/C9t94JC4_L8',
  },
  {
    key: 2,
    name: 'Jamison McAndie',
    image: require('assets/images/mountain.jpg'),
    url: 'https://unsplash.com/photos/waZEHLRP98s',
  },
  {
    key: 3,
    name: 'Alberto Restifo',
    image: require('assets/images/snowymountain.jpg'),
    url: 'https://unsplash.com/photos/cFplR9ZGnAk',
  },
  {
    key: 4,
    name: 'John Towner',
    image: require('assets/images/starrysky.jpg'),
    url: 'https://unsplash.com/photos/89PFnHKg8HE',
  },
];
