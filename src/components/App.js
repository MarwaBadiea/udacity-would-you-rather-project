import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { connect } from 'react-redux'
import { Container } from 'react-bootstrap';

import { handleInitialData } from './../actions/shared';

import NavBar from './Navbar';
import QuestionDetails from './QuestionDetails';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';
import RequireAuth from './RequireAuth';
import Login1 from './Login1';

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() { 
    return (
      <Router>
          <Container>
            <NavBar />
            <div>
              <Routes>

                {/* <Route path="/dashboard" element={<Dashboard /> } />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/questions/:id" element={<QuestionDetails />} />
                <Route path="/add" element={<NewQuestion />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/" element={<Login1 />} /> */}

                <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
                <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
                <Route path="/questions/:id" element={<RequireAuth><QuestionDetails /></RequireAuth>} />
                <Route path="/add" element={<RequireAuth><NewQuestion /></RequireAuth>} />
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Login1 />} />
                
              </Routes>
            </div>
          </Container>
        </Router>
    );
  }
}

/* function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
} */

export default connect()(App);
