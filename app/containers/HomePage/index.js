/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import axios from 'axios';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props){
    super(props);
    this.state = {news:[]};
  }

  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    axios.get('https://appsroket.herokuapp.com/api/News')
    .then(response => {
      this.setState({ news: response.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: '68vw'
    };
    const imgStyle = {
      width: '100%',
      display: 'block',
      padding: '12px 11px'
    }
    const spanStyle = {
      display: 'block',
      background: '#c2bebe none repeat scroll 0% 0%',
      color: 'white',
      height: '38%',
      padding: '5%'
    }
    return (
      <article style={containerStyle}>
        {this.state.news.map(function(itemResult){                                 
            if(itemResult.picture.length > 7){
              var itemStyle = {
                background : itemResult.tint,
                width: '24%',
                height: '30%',
                margin: '5px 0'
              } 
              return (<div style={itemStyle}><img style={imgStyle} src={itemResult.picture}/><span style={spanStyle}>{itemResult.title}</span></div>);
            }else{
              var itemStyle2 = {
                background : itemResult.tint,
                width: '24%',
                height: '15%',
                padding: '16px 14px',
                margin: '5px 0',
                boxShadow: '0px 0px 0px 2px #c8c8c8'
              } 
              return (<div style={itemStyle2}>{itemResult.title}</div>);
            }
        }
        )}
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
