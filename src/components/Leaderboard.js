import React from 'react';
import { connect } from 'react-redux';

import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import UserCard from './UserCard';


class Leaderboard extends React.Component {
    render() { 

		const { users } = this.props
		const sortUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

        return (
            <Card style={{width: '400px', margin: '0 auto'}}>
                {sortUsers.map((user) => (
					<UserCard key={user.id} id={user.id} />
				))}
            </Card>
        );
    }
}

function mapStateToProps ({ users }) {
	const listOfUsers = Object.values(users)

	listOfUsers.map((user) => user.totalScore = Object.keys(user.answers).length + user.questions.length)


	return {
		users: listOfUsers
	};
}

export default connect(mapStateToProps)(Leaderboard);