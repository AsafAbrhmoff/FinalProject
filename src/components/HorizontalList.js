import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card } from 'react-native-paper';

const data = [
    {
      imageUrl: 'http://petra.rest.co.il/img/0260/957.jpg',
      title: 'something'
    },
    {
      imageUrl: 'http://petra.rest.co.il/img/0260/989.jpg',
      title: 'something two'
    },
    {
      imageUrl: 'http://www.petra.co.il/wp-content/uploads/2016/07/IMG_7219.jpg',
      title: 'something three'
    },
    {
      imageUrl: 'http://www.petra.co.il/wp-content/uploads/2016/07/IMG_7213.jpg',
      title: 'something four'
    },
    {
      imageUrl: 'http://www.petra.co.il/wp-content/uploads/2016/07/IMG_7220.jpg',
      title: 'something five'
    },
    {
        imageUrl: 'http://www.petra.co.il/wp-content/uploads/2016/07/IMG_7218.jpg',
        title: 'something six'
    }
  ];
  

class HorizontalList extends Component {
    state ={ newData: data }
    render() {
        return (
          <FlatList
            horizontal
            data={this.state.newData}
            renderItem={({ item: rowData }) => {
              return (
                <View style={{ height: 120 }}>
                    <Card style={{ padding: 0, width: 120 }}>
                        <Card.Cover source={{ uri: rowData.imageUrl }} resizeMode="stretch" />
                    </Card>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        );
      }
}

export default HorizontalList;
