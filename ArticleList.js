import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';

export default ArticleList = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('https://conduit.productionready.io/api/articles')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, margin: 5}}>
      {isLoading ? <Text style={{color:'#ffffff',textAlign:'center',marginTop:200}}>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', fontWeight:'bold'}}>DC</Text>
          <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', paddingBottom: 10, fontWeight:'500'}}>Articles</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.articles}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{backgroundColor:'#080808',padding:5,borderRadius:5,marginTop:5,marginBottom:5,elevation:5}}>
                <Text style={{color:'#ffffff',textAlign:'center',fontWeight:'bold',fontSize:20}}>{item.title}</Text>
                <Text style={{backgroundColor:'#101010',color:'yellow',fontSize:14,marginTop:10,paddingHorizontal:20}}>{item.body}</Text>
                <View style={{flexDirection:'row',marginTop:10,marginLeft:5,marginBottom:5}}>
                  <Image
                    style={{width: 30,height: 30, borderRadius: 50}}
                    source={{
                      uri: item.author.image,
                    }}
                  />
                  <View style={{marginLeft:10,marginTop:4}}>
                    <Text style={{color:'#ffffff',fontWeight:'bold',fontSize:10}}>{item.author.username}</Text>
                    <Text style={{color:'#ffffff',fontSize:8}}>{item.createdAt.split('T')[0]}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};