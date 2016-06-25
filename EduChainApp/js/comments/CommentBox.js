/**
 * Created by BK on 25/06/16.
 *
 * @flow
 */

 'use strict';

 import React, { Component } from 'react'
 import {
     View,
     StyleSheet,
     Text,
 } from 'react-native'
 import GlobalStyles from '../common/GlobalStyles'
 import CommentList from './CommentList'
 import CommentForm from './CommentForm'

export default class CommentBox extends Component {
    render() {
        return (
            <View>
                <Text style={GlobalStyles.sectionHeader}>Comments</Text>
                <CommentList />
                <CommentForm />
            </View>
        );
    }
}
