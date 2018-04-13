import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './GroupDetails.css';
import ReactSwipe from 'react-swipe';

class GroupDetails extends Component {
    constructor(){
        super();

        this.state = {
            groupDetails:[],
            groupMembers:[],
            isGroupAdmin:false,
        }

        this.dis
    }
    componentDidMount() {
        axios.get(`/api/getGroupMembers/${this.props.location.state.e.group_id}`)
            .then(res=> this.setState({groupDetails:this.props.location.state.e,groupMembers:res.data,isGroupAdmin:this.props.location.state.e.group_admin == this.props.state.user_id},()=>console.log(this.state)))
            .catch(err=>console.log(err));

            console.log(this.state)
    }

    displayDetails(){
        if(this.state.groupDetails){
            let e = this.state.groupDetails;
            return(
                <ReactSwipe className="carousel" swipeOptions={{ continuous: false }}>
                <div className="groupContainer absHeader">
                <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
                  <div className="groupTitle">{e.group_title}</div>
                  <div className="groupPurpose">{e.group_purpose}</div>
                  <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
                </div>
                <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                  <img className="groupPicture" src={e.picture} />
                </div>
              </div>
              
              <div className="absHeader2">
                  {this.state.isGroupAdmin ? 
                        <div><button onClick={()=>this.deleteGroup()}>Delete Group</button></div>
                    :
                        <div><button onClick={()=>this.leaveGroup()}>Leave Group</button></div> }
              
              </div>
              </ReactSwipe>
            )
        }
    }

    displayGroupMembers(){
        let timer = 0;
        let style = {};
        if(this.state.groupMembers){
            return this.state.groupMembers.map((e,i)=>{
                timer = i;
                style = { animationDelay: `${timer/20}s` }
                return(
                    <ReactSwipe className="carousel" swipeOptions={{ continuous: false }}>
                    <div style={style} className="groupContainer groupMemberContainer">
                        <div className="groupTitle">{e.name}</div>
                        <img src={e.picture}/>
                    </div>
                    {this.state.isGroupAdmin ? 
                    //some use for possible conditional admin rendering 
                            <div className="groupMemberContainerRight"><button className="groupContainerButton" onClick={()=>this.removeUser(e.auto_id)}>Remove User</button></div>
                        :
                            ''
                    }
                    </ReactSwipe>
                )
            })
        }
    }
    render() {
        return (
            <div className="mainGroupDetailsContainer">
                {this.displayDetails()}
                <div className="mainGroupMembersContainer">
                {this.displayGroupMembers()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        state:state,
    }
}

export default connect(mapStateToProps)(GroupDetails)