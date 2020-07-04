import React, { useState } from 'react';
import {
    Text, Alert,
} from 'react-native';

const GameTimer = (props) => {
    const [timer, settimer] = useState(props.timegiven);
    setTimeout(() => {
        if (timer === 0) { props.handlefinish(true);
        }
        settimer(timer - 1);
    }, 1000);
    return (<Text style={{alignContent:'center',fontSize:15}}>{timer}s</Text>);
}

export default  GameTimer;