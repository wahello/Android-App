import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import * as act from '../actions/index';

export class AddBar extends Component {
    render() {
        let { name, machine } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrapBTN}>
                    <Button
                        onPress={() => this.onPressAdd()}
                        title="Thêm"
                        color="#0C1261"
                        accessibilityLabel="Bấm vào để thêm vào thiết bị"
                    />
                </View>
                {this.renderDetailMachine(name, machine)}
            </View>
        );
    }

    componentWillMount() {
        this.props.getListName();
    }

    componentDidUpdate() {
        if (this.props.machine[0] !== undefined)
            this.props.addCurrentID(this.props.machine[0]);
    }

    renderDetailMachine = (name, machine) => {
        var result = null;
        result = name.map((value, index) => {
            return (
                <View style={styles.wrapBTN} key={index}>
                    <Button
                        onPress={() => this.onPress(machine[index])}
                        title={value}
                        color="#060428"
                        accessibilityLabel="Bấm vào để điều khiển thiết bị"
                    />
                </View>
            );
        })
        return result;
    }

    onPressAdd = () => {
        this.props.onPressAdd();
    }

    onPress = (value) => {
        console.log(value);
        this.props.onPress(value);
        this.props.addCurrentID(value);
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    wrapBTN: {
        width: 100,
        height: 100,
        alignContent: 'center',
        justifyContent: 'flex-start',
    }
});

const mapStateToProps = state => {
    console.log(state);
    return {
        currentID: state.id,
        machine: state.machine,
        name: state.name
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addCurrentID: (id) => {
            dispatch(act.addCurrentID(id));
        },
        getListName: (arID) => {
            dispatch(act.getListName(arID));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBar);
