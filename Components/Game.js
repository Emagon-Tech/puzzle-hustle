
import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Alert,
    Text,
    ImageBackground,
    TouchableHighlight
} from 'react-native';

import SortableGrid from 'react-native-sortable-grid';
let stepsCount = 0;
let timeTaken = 0;
let gridsize = 0;
let blockheight = 0;
const Game = ({ route, navigation }) => {
    const { level } = route.params;
    switch (level) {
        case 'Easy': gridsize = 3; blockheight = 138;
            break;
        case 'Medium': gridsize = 4;blockheight = 104;
            break;
        case 'Hard': gridsize = 5;blockheight= 84;
            break;
    
        default:
            console.log('Some in route props'+level);
            break;
    }
    useEffect(() => {
        fetching();
        
    }, []);
    
    console.log(gridsize);
    
    let range = [...Array(gridsize * gridsize).keys()];
    
    const [img, setimg] = useState(range.map((item, index) => { return ({ id: '' + index, image: '' }) }));
    
    const { height, width } = Dimensions.get('window');
    
    const shufflingArray=(images) =>{
        console.log("images");
        console.log(images);
        let randindex = 2;
        let tmp = {}
        for (var i = images.length - 1; i > 0; i--) {
        randindex = Math.floor(Math.random() * (i + 1));
         tmp = images[i];
        images[i] = images[randindex];
        images[randindex] = tmp;
        }
        console.log("shuffled images");
        console.log(images);
        return images;   
    }
    const fetching= async () =>   {
         const url = "http://192.168.0.10:5000/getimg?id=";
    let images = img.slice();
        console.log('fetching.....');
        await fetch("http://192.168.0.10:5000/tic?gs="+gridsize)
            .then(response => response.json())
            .then(res => {
                console.log('response from fetch');
                console.log(res);
             let imagejson = res;
                for (let i = 0; i < imagejson.length; i++) {
                    images[i]['image'] = url + imagejson[i];
                    images[i]['id'] = i;
                }
                setimg(images);
                console.log(img);
            })
            .catch(err => console.log(err));
         
}
    const isSolved=(itemOrderArray)=> {
        let bo = true;
        console.log(img);
        for (let i = 0; i < itemOrderArray.length; i++) {
            
                if(!(i==img[itemOrderArray[i]['key']]['id'])){bo=false}
        
        }
        return bo;
}

const isWinner=(itemOrderArray) => {
    if (isSolved(itemOrderArray)) {
        //stepsCount = 0;
        setModalVisible(true);
            // Alert.alert( 'Congratulations!Continue to the next puzzle?',
            //     'Number of Counts: ' + stepsCount+' Time Taken: '+timeTaken,
            //     [
            //         { text: 'Yes', onPress: () => { fetching(); } },
            //         { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },],
            //     { cancelable: false });
        }
    }
    
    
    

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
    console.log(img);


    return (
        <>
            <ImageBackground
                style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
                        }}
                source={require('../img/background.png')}
            >

            <SortableGrid
                    blockTransitionDuration={50}
                    activeBlockCenteringDuration={200}
                    itemsPerRow={gridsize}
                    dragActivationTreshold={50}
                    onDragRelease={(itemOrder) => {
                        stepsCount = stepsCount + 1;
                        isWinner(itemOrder['itemOrder']);
                    }}
                    onDragStart={() => console.log("Some block is being dragged now!")}
            >
                {
                        shufflingArray(img).map((item,index) =>
                            <View key={index}  onTap={() => console.log(index)}>
                            <Image
                                style={{ height:blockheight, width: width / gridsize }}
                                source={{ uri: item.image }} />
                        </View>

                    )
                }

            </SortableGrid>
            </ImageBackground>
        </>
    );

    
}
    
export default Game;   
    
//height:84, width: width / gs ==> grid size:5
//height:138, width: width / 3 ==> gs:3
//height:103, width: width / gridsize ==> gs:4