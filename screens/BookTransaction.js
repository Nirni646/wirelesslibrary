import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import db from '../config.js';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission : null,
            scanned :false,
            scannedData : '',
            buttonState : 'normal',
            scannedBookId:'',
            scannedStudId:'',
        };

    }
    getCameraPermission=async(id)=>{
          const {status}=await Permissions.askAsync(Permissions.CAMERA);
          this.setState({
            hasCameraPermission : status==='granted',
            buttonState :id,
          })
    }
    handleBarCodeScan=async({type,data})=>{
        this.setState({
            scanned:true,
          scannedData : data,
          buttonState : 'normal',
          
        })
    }
    initiateBookissue=async()=>{
         //add a transactionMessage
         db.collection("transaction").add({
             'studId':this.state.scannedStudId,
             'bookId' : this.state.scannedBookId,
             'date':firebase.firestore.Timestamp.now().toDate(),
             'transactionType':'issue'
         })
         //change book statuses
         db.collection('books').doc(this.state.scannedBookId).update({
             'bookAvailabilty':false,

         })
         //change number of issued book for students
         db.collection('students').doc(this.state.scannedStudId).update({
             'No_of_bookissued':firebase.firestore.FieldValue.increment(1)
         })
         Alert.alert("book issued")
         this.setState({
             scannedBookId:'',
             scannedStudId:'',
         })
    }
    initiateBookreturn=async()=>{
        //add a transactionMessage
        db.collection("transaction").add({
            'studId':this.state.scannedStudId,
            'bookId' : this.state.scannedBookId,
            'date':firebase.firestore.Timestamp.now().toDate(),
            'transactionType':'issue'
        })
        //change book statuses
        db.collection('books').doc(this.state.scannedBookId).update({
            'bookAvailabilty':false,

        })
        //change number of issued book for students
        db.collection('students').doc(this.state.scannedStudId).update({
            'No_of_bookissued':firebase.firestore.FieldValue.increment(-1)
        })
        Alert.alert("book returned")
        this.setState({
            scannedBookId:'',
            scannedStudId:'',
        })
    }
    handleTransaction=async()=>{
        var transactionMessage
        db.collection('books').doc(this.state.scannedBookId).get()
        .then((doc)=>{
            var book=doc.data()
            if (book.bookAvailabilty){
                this.initiateBookissue()
                transactionMessage="Book issued"
            }
            else{
                this.initiateBookreturn()
                transactionMessage="book returned"
            }
        })
        this.setState({
            transactionMessage : transactionMessage,
        })
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermission
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

       if (buttonState !== 'normal' && hasCameraPermission){
           return(
              <BarCodeScanner
            onBarCodeScanned={scanned?undefined:this.handleBarCodeScan}
            style={StyleSheet.absoluteFillObject}
            /> 
           )
       }else if(buttonState==='normal'){

       

        return(
            <View style={styles.container}>
                <View style={styles.inputView} >
                    <TextInput style={styles.inputBox} placeholder="book id"
                    value={this.state.scannedBookId}
                    />
                    <TouchableOpacity styles={styles.scanButton}>
                        <Text style={styles.buttonText}>
                            Scan
                        </Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.inputView} >
                    <TextInput style={styles.inputBox} placeholder="student id"
                    value={this.state.scannedStudId}/>
                    <TouchableOpacity styles={styles.scanButton}>
                        <Text style={styles.buttonText}>
                            Scan
                        </Text>

                        </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={async()=>{this.handleTransaction}}> 
                <Text style={styles.buttonText}>
                            submitButton
                        </Text>

                </TouchableOpacity>
            </View>

        )
    }
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
    scanButton:{
        backgroundColor: 'blue',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0,
    },
    inputView: {
        flexDirection: 'row',
        margin:20,

    },
    buttonText:{
        fontSize:15,
        textAlign:'center',
        marginTop:10,

    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20,
    },
    submitButton:{
        backgroundColor: 'yellow',
        width:100,
        height:50,
    }
  });
