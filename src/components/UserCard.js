import React from 'react';
import { connect } from 'react-redux';

import { Card, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


class UserCard extends React.Component {
    render() { 
        const { user } = this.props

        return (
            <Card style={{width: '400px', margin: '0 auto'}}>
                <div className='d-flex' style={{backgroundColor: '#E7EAED'}} >
                <Image style={{width: '55px'}} roundedCircle src={user.avatarURL} />
                <Card.Header as="h5" style={{backgroundColor: 'transparent'}}>{user.name}</Card.Header>
                </div>
                <Card.Body>
                    <Card.Text>
                        Total Score: {user.questions.length + Object.keys(user.answers).length}
                    </Card.Text>
                    <Card.Text>
                        Created Questions: {user.questions.length}
                    </Card.Text>
                    <Card.Text>
                        Answered Questions: {Object.keys(user.answers).length}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

function mapStateToProps ({ users }, { id }) {
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(UserCard);