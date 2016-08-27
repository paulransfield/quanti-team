/**
 * Created by BK on 23/06/16.
 *
 * @flow
 */

 'use strict';

 import React, { Component } from 'react';
 import {
     View,
 } from 'react-native'
 import Header from '../../common/Header'

 export default class TeamView extends Component {
     render() {
         return(
             <View>
                 <Header title="Team"
                     rightItem={{
                         title: "Add Member",
                         layout: "title",
                         icon: "ios-add",
                         onPress: () => this.props.navigator.push({id: "addMember"})
                     }}
                 />
             </View>
         );
     }
 }
