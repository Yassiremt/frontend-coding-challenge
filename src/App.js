import React from 'react';
import axios from 'axios';
import './App.css';
import {Container, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import RepoRow from './Components/RepoRow';

class App extends React.Component {
  state = {
    RepositoriesList: [],
    page: 0
  }

  componentDidMount() {
    this.fetchRepos();
  }

  getPreviousMonthDate() {

    let today = new Date();
    today.setMonth(today.getMonth() - 1);
    return (today.toISOString().slice(0, 10));
  }

  fetchRepos = (page) => {

    const link = 'https://api.github.com/search/repositories?q=created:>' + this.getPreviousMonthDate() + '&sort=stars&order=desc&page=' + page;

    axios.get(link).then((response) => {
      // handle success
      this.setState({RepositoriesList: response.data.items});
    }).catch((error) => {
      // handle error
      console.log(error);
    })
  }

  renderRepositories = () => {
    return this.state.RepositoriesList.map((repo) =><RepoRow key={repo.id} repo={repo} />)
  }
  renderPagination = () => {

    /* Pagination Component */
    return (
      (this.state.RepositoriesList.length > 0)
      ? (<Pagination aria-label="Page navigation example">
        <PaginationItem disabled={(
            this.state.page === 0
            ? "disabled"
            : "")}>
          <PaginationLink first="first" onClick={() => {
              this.setState({page: 0});
              this.fetchRepos(0);
            }}/>
        </PaginationItem>
        <PaginationItem disabled={(
            this.state.page === 0
            ? "disabled"
            : "")}>
          <PaginationLink previous="previous" onClick={() => {
              let currentpage = this.state.page - 1;
              this.setState({
                page: this.state.page - 1
              });
              this.fetchRepos(currentpage);
            }}/>
        </PaginationItem>
        <PaginationItem active="active">
          <PaginationLink>
            {this.state.page + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => {
              let currentpage = this.state.page + 1;
              this.setState({
                page: this.state.page + 1
              });
              this.fetchRepos(currentpage);
            }}>
            {this.state.page + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => {
              let currentpage = this.state.page + 2;
              this.setState({
                page: this.state.page + 2
              });
              this.fetchRepos(currentpage);
            }}>
            {this.state.page + 3}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next="next" onClick={() => {
              let currentpage = this.state.page + 1;
              this.setState({
                page: this.state.page + 1
              });
              this.fetchRepos(currentpage);
            }}/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last="last" onClick={() => {
              this.setState({page: 34});
              this.fetchRepos(34);
            }}/>
        </PaginationItem>
      </Pagination>)
      : <h3>Loading ...</h3>);
  }

  render() {
    return (<Container className="my-4">
      <div id="Repositories">
        <h3 className="text-center">Front Coding Challenge</h3>
        {this.renderRepositories()}
      </div>
      <div id="Pagination">
        {this.renderPagination()}
      </div>

    </Container>);
  }
}
export default App;
