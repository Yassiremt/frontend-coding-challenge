import React from 'react';
import './RepoRowStyle.css';
import {Media, Row} from 'reactstrap';

const kFormatter = (num) => {
  // Converting 1000 to 1k
  return Math.abs(num) > 999
    ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k'
    : Math.sign(num) * Math.abs(num)
}

const DifferenceInDays = (CreationDate) => {

  // Difference between the creation of the repository day and today

  let today = new Date().toISOString().slice(0, 10);
  let Crday = CreationDate.slice(0, 10);
  let startDate = Date.parse(Crday);
  let endDate = Date.parse(today);
  return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
}

const RepoRow = (props) => {
  const {avatar_url, login} = props.repo.owner;
  const {name, description, forks, open_issues_count, created_at} = props.repo;

  return (<Row className="repoStyle m-2 p-4">
    <Media>
      <Media left="left" href="#">
        <img className="avatarStyle" src={avatar_url} alt=""/>
      </Media>
      <Media className="px-3" body="body">
        <Media heading="heading">
          {name}
        </Media>
        <p>{description}</p>
        <p className="mb-0">
          <span className="border px-2 mr-2 bg-primary text-white text-nowrap">Stars {kFormatter(forks)}</span>
          <span className="border px-2 mr-2 bg-danger text-white text-nowrap">Issues {kFormatter(open_issues_count)}</span>
          Submitted {DifferenceInDays(created_at) + " "}
          days ago by
          <span className="font-weight-bold">{" " + login}</span>
        </p>
      </Media>
    </Media>
  </Row>);
}

export default RepoRow;
