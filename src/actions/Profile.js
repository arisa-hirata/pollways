import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Settings from "./Settings";

import {connect} from "react-redux";
import {SaveProfile} from "../redux/actions";

class Profile extends React.Component {
  
  //these are variable 
  //Tip: names --> it's a variable within this file not global!! 그냥 이해하기쉬우려고 구분함
  names="";
  email="";
  phone="";
  avatarURL="";
  
	handleSubmit=()=>{
       //이건 섭밋하면 그 벨류를 global variable 로 만드는거 
		this.props.dispatch(SaveProfile(this.names,this.email,this.phone,this.avatarURL))
	}
	
    //the "val" is what ever you type in, "type" is stating which variable you are sending it to
	handleTextInput=(val, type)=>{
      
      if(type === "name"){
        //여기서 name은 이 파일안에서의variable
        this.names = val;
      }
      if(type === "email"){
        this.email = val;
      }
      if(type === "phone"){
        this.phone = val;
      }
      if(type === "avatarURL"){
        this.avatarURL = val;
      }
	}
	
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontWeight:'bold', fontSize:20}}>User Info</Text>
        <TextInput
			style={{width:200, borderWidth:1, padding: 10,marginBottom: 5, marginTop:10}}
			placeholder="Username"
			onChangeText={(val)=>this.handleTextInput(val, "name")}
		/> 
		<TextInput
			style={{width:200, borderWidth:1, padding: 10,marginBottom: 5}}
			placeholder="Email Address"
			onChangeText={(val)=>this.handleTextInput(val, "email")}
		/>
		<TextInput
			style={{width:200, borderWidth:1, padding: 10,marginBottom: 5}}
			placeholder="Phone Number"
			onChangeText={(val)=>this.handleTextInput(val, "phone")}	
		/>
		<TextInput
			style={{width:200, borderWidth:1, padding: 10,marginBottom: 5}}
			placeholder="Avatar URL"
			onChangeText={(val)=>this.handleTextInput(val, "avatarURL")}	
		/>
			
		<Button
			title="Submit"
			onPress={this.handleSubmit}
		/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
});

function mapStateToProps(state) {
	return {
		//SaveProfile:state.Profile.SaveProfile
	}
}

export default connect(mapStateToProps)(Profile);
