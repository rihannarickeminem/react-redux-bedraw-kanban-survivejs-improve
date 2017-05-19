import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../actions/user';
import classNames from 'classnames';

const UserInfo = ({user, fetchUser, message, messageText}) => {
  const Message = message => {
    // let text = message.get('text');
    // let status = message.get('status');
    let text = message[ 'text' ];
    let status = message[ 'status' ];
    let messClass = classNames({
      'message': true,
      'show': text && text.length > 0,
      'success': status === 'SUCCESS',
      'error-message': status === 'ERROR'
    });

    return (
      <div className={messClass}>
        {text}
      </div>
    )
  }

	const FetchUserField = (props) => {
		return (
			<div>
				<form onSubmit={props.fetchUserData}>
					<input
						type="text"
						placeholder="please, enter user ID"
						onChange={(event) => props.onUserIdChange(event)}
					/>
					<input
						className="button get-user-info"
						type="submit"
						value="Get User info" />
				</form>
			</div>
		);
	};

	let userIdValue = user[ 'userId' ];
	
	const onUserIdChange = (event) => {
		userIdValue = event.target.value;
	}

	const fetchUserData = (event) => {
		event.preventDefault();
		fetchUser({id: userIdValue});
	}

	return (
		<div className="user-info">
			<FetchUserField fetchUserData={fetchUserData} onUserIdChange={onUserIdChange}/>
			<div>
        {messageText == undefined ? null : Message(message)}
        {
          userIdValue === 'default' ?
            'there is no current user' :
            'Current User UUID: ' + userIdValue
        }
			</div>
		</div>
	);
}

export default 
	connect((state, props) => ({
		user: state.user,
		message: state.user['message'],
		messageText: state.user["message"]['text'],
	}), {
    ...userActions
  })(UserInfo);
