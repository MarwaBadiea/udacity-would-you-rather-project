import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

function RequireAuth({ children, authedUser }) {
    
    //const { authedUser } = props
    const location = useLocation()

    return ( authedUser
        ? children
        : <Navigate to="/"
        replace
        state={{ path: location.pathname }}
        />
        );
}

function mapStateToProps ({ users, authedUser }) {
    return {
        user: users[authedUser],
        authedUser,
    }
}

export default connect(mapStateToProps)(RequireAuth);