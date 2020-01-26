import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const API_INVOKE_URL = 'https://ukh2ss7ewl.execute-api.us-east-1.amazonaws.com/prod';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { blogs: [], loading: true };
    fetch(API_INVOKE_URL + '/myblog')
      .then(response => response.json())
      .then(data => {
        //   console.log(data);
        this.setState({ blogs: data, loading: false });
      });
  }

  renderBlogsTable(blogs) {
    return (
      <table  className="table">
        <thead>

        </thead>
        <tbody>
          {this.state.blogs.map(blog =>
            <tr key={blog.blogid}>
              <td>{blog.blogid}</td>
              <td><Link to={{ pathname: '/detail', state: { blog: blog, auth: this.props.auth.isAuth } }}>{blog.title}</Link></td>
              <td>{blog.subtitle}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading || !this.props.auth.isAuth
      ? <p><em>Loading...</em></p>
      : this.renderBlogsTable(this.state.blogs);
    // console.log(this.props.auth.isAuth);
    return (
      <div className="container">
        <h1>My Blogs</h1>
        {contents}
      </div>
    );
  }
}
export default Home;