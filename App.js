
import React, { Component, useState } from 'react'
import {
  StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    Alert,
    Button
} from 'react-native'

import SortableGrid from 'react-native-sortable-grid'
const App=()=> {
    const [img, setimg] = useState([
        { id: '0', image: 'http://192.168.0.10:5000/getimg?id=1_01_01.png' },
        { id: '1', image: 'http://192.168.0.10:5000/getimg?id=1_01_02.png' },
        { id: '2', image: 'http://192.168.0.10:5000/getimg?id=1_01_03.png' },
        { id: '3', image: 'http://192.168.0.10:5000/getimg?id=1_02_01.png' },
        { id: '4', image: 'http://192.168.0.10:5000/getimg?id=1_02_02.png' },
        { id: '7', image: 'http://192.168.0.10:5000/getimg?id=1_03_02.png' },
        { id: '5', image: 'http://192.168.0.10:5000/getimg?id=1_02_03.png' },
        { id: '8', image: 'http://192.168.0.10:5000/getimg?id=1_03_03.png' },
        { id: '6', image: 'http://192.168.0.10:5000/getimg?id=1_03_01.png' },
    ]
    );

const { height, width } = Dimensions.get('window')
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
        //console.log(imageurls);
         const url = "http://192.168.0.10:5000/getimg?id=";
    let images = img.slice();
        console.log('fetching.....');
        await fetch("http://192.168.0.10:5000/tic")
            .then(response => response.json())
            .then(res => {
                imagejson = res;
                for (let i = 0; i < imagejson.length; i++) {
                    images[i]['image'] = url + imagejson[i];
                    images[i]['id'] = i;
                }
                setimg(images);
                console.log(img);
            })
            .catch(err => console.log(err));
         console.log(imagejson)
         
}
    const isSolved=(itemOrderArray)=> {
        let bo = true;
        console.log(img);
        for (let i = 0; i < itemOrderArray.length; i++) {
            
                if(!(i==img[itemOrderArray[i]['key']]['id'])){bo=false}
        
        }
        // itemOrderArray.forEach(function (item) {
        //     if (!((item["key"]) == item["order"]))
        //     {
        //        bo = false;
        //     }
            
        // });
        return bo;
}

const isWinner=(itemOrderArray) => {
        if (isSolved(itemOrderArray)) {
            Alert.alert( 'Congratulations!!',
                'Continue to the next puzzle?',
                [
                    { text: 'Yes', onPress: () => { fetching(); } },
                    { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },],
                { cancelable: false });
        }
    }
    
    
    

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
        justifyContent: 'center',
    }
});
    console.log(img);


    return (
        <>
            <SortableGrid
                blockTransitionDuration={50}
                activeBlockCenteringDuration={200}
                itemsPerRow={3}
                dragActivationTreshold={50}
                onDragRelease={(itemOrder) => { console.log("Drag was released, the blocks are in the following order: ", itemOrder); isWinner(itemOrder['itemOrder']); }}
                onDragStart={() => console.log("Some block is being dragged now!")}
            >
                {
                        shufflingArray(img).map((item,index) =>
                            <View key={index}  onTap={() => console.log(index)}>
                            <Image
                                style={{ height: 138, width: width / 3 }}
                                source={{ uri: item.image }} />
                        </View>

                    )
                }

            </SortableGrid>
        </>
    );

    
}
    
export default App;   
    
