import axios from "axios";
import "./conventionComment.css";
import { useRecoilState } from "recoil";
import React, { Fragment, useState } from "react";

const ConventionComment = (props) => {

  // const [memberNoState, setMemberNoState] = useRecoilState();
  const [memberNoState, setMemberNoState] = useState(1);
  
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    convention,
    comment,
    setComment,
    commentContent,
    setCommentContent,
    addedComment,
    setAddedComment,
  } = props;


const writeCheck = () => {

    const commentRegex = /^.{1,1300}$/;
    
    if(commentContent.trim() === ""){
      console.log("비어있음");
      return false;
    }
    else if(!commentRegex.test(commentContent)){
      console.log("너무 큼");
      return false;
    }
    return true;
  }



  const writeComment = () => {
    const checkType = writeCheck();
    if(!checkType) return;
    const form = new FormData();
    form.append("conventionNo",convention.conventionNo);
    form.append("conventionCommentContent", commentContent);
    form.append("memberNo", memberNoState);
    
    axios.post(`${backServer}/convention/comment`,form)
    .then(res => {
      // console.log(res);
      if(res.data){
        setAddedComment(!addedComment);
        setCommentContent("");
      }
    })
    .catch(err => {
      console.error(err); 
    })
  }

  const [isOpenReComment, setIsOpenReComment] = useState({});

  const getReComment = (e) => {
    setIsOpenReComment((prev) => ({...prev, [e]: !prev[e]}))
  }
  

  return (
    <div className="convention-comment-wrap">
      <div className="convention-comment-write-wrap">
        <div className="convention-comment-input-wrap">
          <input type="text" value={commentContent} onChange={(e) => {
            setCommentContent(e.target.value);
          }} spellCheck={false} placeholder="댓글을 작성해주세요" />
        </div>

        <div className="convention-comment-write-btn-zone">
          <button onClick={writeComment}>작성</button>
        </div>
      </div>

      <div className="convention-comment-list-wrap">
        <div className="convention-comment-show">
          {/* c는 comment고 rc는 reComment */}
          {comment.commentList?.map((c,index) => {
            return (
              <div className="convention-comment-list-zone" key={"comment"+index}>
                <Comment c={c} comment={comment} index={index} getReComment={getReComment} isOpenReComment={isOpenReComment} />
                
                {/* {c.reCommentList?.map((rc, index) => {
                  console.log("dssdsd"+c);
                  console.log(rc);
                  return (
                    // {comment.conventionCommentNo === reComment.conventionCommentRef ?  : ""}
                    <div key={"reComment"+index} className="convention-reComment">
                      {rc.conventionCommentContent}
                    </div>
                  )
                })} */}
              </div>
            )
          })}
        </div>
      </div>
      
    </div>
  )
}

const Comment = (props) => {
  const{
    c,
    comment,
    index,
    getReComment,
    isOpenReComment,
  } = props;

  return (
    <div className="convention-comment">
      <div className="convention-comment-header-zone-container">

        <div className="convention-comment-header-zone-child1">
          <div className="convention-comment-writer">
            <span>{c.memberId}</span>
          </div>

          <div className="convention-comment-date">
            <span>{c.conventionCommentDate}</span>
          </div>
        </div>

        <div className="convention-comment-header-zone-child2">
          <div className="convention-comment-reply">
            <button>답글</button>
          </div>
        </div>
      </div>

      <div className="convention-comment-content-zone-container">
        <span>{c.conventionCommentContent}</span>
      </div>

      {c.reCommentCount !== 0 ? 
      <div className="convention-comment-more-btn-zone">
        <span style={{cursor:"pointer"}} onClick={() => {getReComment(index)}}  >답글 {c.reCommentCount}개 {isOpenReComment[index] ? "더보기" : "그만보기"}</span>
        <div className="convention-reComment-container" style={{display : isOpenReComment[index] ? "block" : "none"}}>
          <ReComment comment={comment} c={c} />
        </div>
      </div>
      : 
      ""}
        


      
    </div>
  )
}

const ReComment = (props) => {

  const {
    comment,
    c,
  } = props;
  

  return (
    <>
      {comment.reCommentList?.map((rc,index) => {

        return (
          <Fragment key={"reComment"+index}>
            {c.conventionCommentNo === rc.conventionCommentRef ? 
            <div className="convention-reComment">
              <span>{rc.conventionCommentContent}</span>
            </div>
            : 
            ""
            }
          </Fragment>
        )
      })}
    </>
  )
}


export default ConventionComment