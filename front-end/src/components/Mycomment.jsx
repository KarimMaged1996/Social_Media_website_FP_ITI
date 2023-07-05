import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../context'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../Constants'

export function Mycomment(props) {
  let user_id = 1;


  let { comment } = props;

  let profileimageurl = comment.author.avatar
  if (profileimageurl != null)
  {
      if(!profileimageurl.includes("http")){
        profileimageurl=BASE_URL+profileimageurl
      }
  }

  const [vote, setVote] = useState({ id: 0, user: 1, comment: 2, value: 0 });

  const [isLoading1, setIsLoading1] = useState(true);
  const [score, setScore] = useState(comment.score);
  const [techbin, setTechbin] = useState(comment.author.techbin);
  let DeleteAPIUrl = `${BASE_URL}/comment/delete/${comment.id}`;
  let didILikeitUrl = `${BASE_URL}/comment/like/check/${comment.id}/${user_id}`;

  let LikeCommentURL = `${BASE_URL}/comment/like/create/`;
  let LikeUpdateURL = `${BASE_URL}/comment/like/update/${vote.id}`;
  let LikeDeleteURL = `${BASE_URL}/comment/like/delete/${vote.id}`;

  let updatecommentUrl = `${BASE_URL}/comment/${comment.id}`;

  let navigate = useNavigate();

  useEffect(() => {
    // if(localStorage.getItem('access_token') === null){
    //     window.locatiLikeDeleteURLon.href = '/login'
    // }
    // else{

    // get the comment_vote
    axios
      .get(didILikeitUrl, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setVote(res.data);
          setIsLoading1(false);
        } else {
          console.log('Error: Response status is not 200');
          setIsLoading1(false);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });

    // };
  }, []);

  if (isLoading1) {
    return (
      <div className="d-flex jsutify-content-center m-5 align-items-center">
        <h1></h1>
      </div>
    );
  }

  console.log(vote);

  const sinceWhen = (created_at) => {
    const date = new Date(created_at);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffSeconds = Math.round(diff / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) {
      return 'Less than a minute ago';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };

  const deletecomment = () => {
    axios
      .delete(DeleteAPIUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        console.log('deleted');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // upvote
  const upvote = () => {
    if (vote.value == 1) {
      // remove the vote d
      axios
        .delete(LikeDeleteURL, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          setVote({});
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // decrease the score
      axios
        .patch(
          `${BASE_URL}/comment/update/${comment.id}`,
          { score: score - 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          setScore(score - 1);
          setTechbin(techbin - 1);
        })
        .catch((err) => {
          console.log(err);
        });

      // decrease the techbin of the user
      axios
        .patch(
          `${BASE_URL}/api/update/${comment.author.id}`,
          { techbin: techbin - 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    } else if (vote.value == -1) {
      // console.log("update the vote ")
      axios
        .patch(
          LikeUpdateURL,
          { value: 1 },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        )
        .then((res) => {
          setVote({
            ...vote,
            value: 1,
          });
          setScore(score + 2);
          setTechbin(techbin + 2);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // decrease the score
      axios
        .patch(
          `${BASE_URL}/comment/update/${comment.id}`,
          { score: score + 2 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

      // decrease the techbin of the user
      axios
        .patch(
          `${BASE_URL}/api/update/${comment.author.id}`,
          { techbin: techbin + 2 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('create the vote ');
      axios
        .post(
          LikeCommentURL,
          { user: user_id, comment: comment.id, value: 1 },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        )
        .then((res) => {
          setVote({ user: user_id, comment: comment.id, value: 1 });
          setScore(score + 1);
          setTechbin(techbin + 1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .patch(
          `${BASE_URL}/comment/update/${comment.id}`,
          { score: score + 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

      // decrease the techbin of the user
      axios
        .patch(
          `${BASE_URL}/api/update/${comment.author.id}`,
          { techbin: techbin + 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // downvote
  const downvote = () => {
    if (vote.value == -1) {
      // remove the vote d
      axios
        .delete(LikeDeleteURL, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          setVote({});
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // decrease the score
      axios
        .patch(
          `${BASE_URL}/comment/update/${comment.id}`,
          { score: score + 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          setScore(score + 1);
          setTechbin(techbin + 1);
        })
        .catch((err) => {
          console.log(err);
        });

      // decrease the techbin of the user
      axios
        .patch(
          `${BASE_URL}/api/update/${comment.author.id}`,
          { techbin: techbin + 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    } else if (vote.value == 1) {
      // console.log("update the vote ")
      axios
        .patch(
          LikeUpdateURL,
          { value: -1 },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        )
        .then((res) => {
          setVote({
            ...vote,
            value: -1,
          });
          setScore(score - 2);
          setTechbin(techbin - 2);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // decrease the score
      axios
        .patch(
          `${BASE_URL}/comment/update/${comment.id}`,
          { score: score - 2 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

      // decrease the techbin of the user
      axios
        .patch(
          `${BASE_URL}/api/update/${comment.author.id}`,
          { techbin: techbin - 2 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('create the vote ');
      //
      axios
        .post(
          LikeCommentURL,
          { user: user_id, comment: comment.id, value: -1 },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        )
        .then((res) => {
          setVote({ user: user_id, comment: comment.id, value: -1 });
          setScore(score - 1);
          setTechbin(techbin - 1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .patch(
          `${BASE_URL}/comment/update/${comment.id}`,
          { score: score - 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

      // decrease the techbin of the user
      axios
        .patch(
          `${BASE_URL}/api/update/${comment.author.id}`,
          { techbin: techbin - 1 },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="roomList container" style={{ width: '75vw' }}>
      <div class="roomListRoom ">
        <div class="roomListRoom__header">

          <a href={`/profile/${comment.author.id}`} class="roomListRoom__author">
            <div class="avatar avatar--small">
              <img
                src={profileimageurl}
                alt="pp"
              />
            </div>
              <span>@{comment.author.username}</span>
            <div> techbin:{techbin}</div>
          </a>

          <div class="roomListRoom__actions">
            <span>{sinceWhen(comment.created_at)}</span>
          </div>
          <div className="room__topRight">
            {/* edit button in the top right */}
            <a href={`/comment/edit/${comment.id}`}>
              <svg
                enable-background="new 0 0 24 24"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>edit</title>
                <g>
                  <path d="m23.5 22h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                </g>
                <g>
                  <g>
                    <path d="m2.5 22c-.131 0-.259-.052-.354-.146-.123-.123-.173-.3-.133-.468l1.09-4.625c.021-.09.067-.173.133-.239l14.143-14.143c.565-.566 1.554-.566 2.121 0l2.121 2.121c.283.283.439.66.439 1.061s-.156.778-.439 1.061l-14.142 14.141c-.065.066-.148.112-.239.133l-4.625 1.09c-.038.01-.077.014-.115.014zm1.544-4.873-.872 3.7 3.7-.872 14.042-14.041c.095-.095.146-.22.146-.354 0-.133-.052-.259-.146-.354l-2.121-2.121c-.19-.189-.518-.189-.707 0zm3.081 3.283h.01z" />
                  </g>
                  <g>
                    <path d="m17.889 10.146c-.128 0-.256-.049-.354-.146l-3.535-3.536c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.536 3.536c.195.195.195.512 0 .707-.098.098-.226.146-.354.146z" />
                  </g>
                </g>
              </svg>
            </a>

            {/* delete buttun in the top right */}
            <a href="" onClick={deletecomment}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
              >
                <title>remove</title>
                <path d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div class="roomListRoom__content">
          <p className="m-3">{comment.content}</p>
        </div>
        {/* up vote and down vote  */}
        <div className="d-flex justify-content-around ">score: {score}</div>
        <div className="d-flex justify-content-around">

          {/* upvote */}
          {vote.value == 1 ? (
            <div onClick={upvote}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-arrow-up-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
              </svg>
            </div>
          ) : (
            <div onClick={upvote}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-arrow-up-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
                />
              </svg>
            </div>
          )}
          {/* downvote */}
          {vote.value == -1 ? (
            <div onClick={downvote}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-arrow-down-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
              </svg>
            </div>
          ) : (
            <div onClick={downvote}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-arrow-down-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
