import './home.scss';

import React, { Component, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Row, Col, Alert, Button, Table } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import VideoApp from '../home/videoapp';
import { VideoPlayer } from 'react-video-js-player';
import {VideosUser} from 'app/entities/videos-user/videos-user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { TextFormat, openFile, byteSize } from 'react-jhipster';
import { getEntities } from 'app/entities/videos/videos.reducer';


export const Home = (ReactElement) => {
  const account = useAppSelector(state => state.authentication.account);
  const videosList = useAppSelector(state => state.videos.entities);
  const loading = useAppSelector(state => state.videos.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  // const { match } = props;

  // const VideoUser = (props: RouteComponentProps<{ url: string }>) => {
  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <p>
        </p>
        <h2>Welcome, NYCEtube!</h2>
        <p className="lead">NYCE to see you ^_^</p>
        {account?.login ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
          </div>
        ) : (
          <div>
          </div>
        )}
         <div>
        <VideoApp/>
      </div>
      <div>
      
        {/* <VideosUser {...props} /> */}
        
      </div>
      <div>
      <h2 id="videos-heading" data-cy="VideosHeading">
        Videos
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/videos/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Videos
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {videosList && videosList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Video</th>
                <th>Categories</th>
                <th>User</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {videosList.map((videos, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/videos/${videos.id}`} color="link" size="sm">
                      {videos.id}
                    </Button>
                  </td>
                  <td>{videos.name}</td>
                  <td>{videos.date ? <TextFormat type="date" value={videos.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {videos.video ? (
                      <div>
                        {videos.videoContentType ? <a onClick={openFile(videos.videoContentType, videos.video)}>Open &nbsp;</a> : null}
                        <span>
                          {videos.videoContentType}, {byteSize(videos.video)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{videos.categories}</td>
                  <td>{videos.user ? videos.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/videos/${videos.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/videos/${videos.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/videos/${videos.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Videos found</div>
        )}
      </div>
    </div>
      </Col>
    </Row>
  );
};
// }

export default Home;
