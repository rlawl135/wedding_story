import { useRef, useEffect } from "react";
import ToastEditor from "../utils/ToastEditor";
import axios from "axios";



const WriteForm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const imgStyle = props.imgStyle;
  const setImgStyle = props.setImgStyle;
  const imageRef = useRef(null);

  // const conventionTitle = props.conventionTitle;
  // const setConventionTitle = props.setConventionTitle;
  const {
    conventionTitle,
    setConventionTitle,
    conventionStart,
    setConventionStart,
    conventionEnd,
    setConventionEnd,
    conventionContent,
    setConventionContent,
    // image,
    setImage,
    conventionImg,
    conventionPrice,
    setConventionPrice,
    conventionLimit,
    setConventionLimit,
    conventionStartTime,
    setConventionStartTime,
    conventionEndTime,
    setConventionEndTime,
    // conventionTime,
    // setConventionTime,
    showImage,
    setShowImage,
    titleRef,
    contentRef, 
    timeRef, 
    dateRef, 
    limitRef, 
    priceRef,
    imgRef,
    writeType,
  } = props;
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const changeImage = (e) => {
    const files = e.currentTarget.files;
    if(files.length !== 0 && files[0] !== 0){
      setImage(files[0]);
      // 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setShowImage(reader.result);
      }

    }
    else{
      setImage(null);
      setShowImage(null);
    }
  }


  
  return (
    
    <>
      <div className="convention-img">
        {showImage ? 
        <img src={showImage} ref={imgRef} onClick={() => {
          imageRef.current.click();
        }}/>
        :
        conventionImg ? 
        <img src={`${backServer}/convention/image/${conventionImg}`} ref={imgRef} onClick={() => {
          imageRef.current.click();
        }} />
        :
        // 나중에 수정할때 또 삼항연산자 써서 해줘야 함 (showImage 말고 db에서 가져온 src정보)
        <img src="/image/default_img.png" ref={imgRef} onClick={() => {
          imageRef.current.click();
        }}/>}
        
        <input type="file" ref={imageRef} accept="image/*" style={{display:"none"}} onChange={changeImage} />
      </div>
      <div className="convention-img-type">
        <button className={imgStyle === 2 ? "selected" : ""} onClick={() => {
          setImgStyle(2);
        }}>메인이미지 이미지로 변경</button>
        <button className={imgStyle === 2 ? "" : "selected"} onClick={() => {
          setImgStyle(1);
        }}>백그라운드 이미지로 변경</button>
      </div>


      <div className="convention-info-wrap">

        <div className="input-wrap">
          <div className="input-info">
            <span ref={titleRef}>박람회 제목</span>
          </div>
          <div className="input-zone">
            <div className="convention-input-container">
              <input type="text" value={conventionTitle} onChange={(e) => {
                setConventionTitle(e.target.value); 
              }} />
            </div>
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-info">
            <span ref={dateRef}>박람회 일정</span>
          </div>
          <div className="input-zone">
            <div className="convention-input-container">

              <div className="start-date-container convention-date-container">
                <input type="date" className="start-date" value={conventionStart} onChange={(e) => {
                  setConventionStart(e.target.value);
                }} />
              </div>

              <div className="mid-date-container">
                <span>~</span>
              </div>

              <div className="end-date-container convention-date-container">
                <input type="date" className="end-date" value={conventionEnd} onChange={(e) => {
                  setConventionEnd(e.target.value);
                }} />
              </div>
            </div>

          </div>
        </div>

        <div className="input-wrap">
          <div className="input-info">
            <span ref={timeRef}>박람회 시간</span>
          </div>
          <div className="input-zone">
            <div className="convention-input-container">
              <div className="start-date-container convention-date-container">
                <input type="time" value={conventionStartTime} onChange={(e) => {
                  setConventionStartTime(e.target.value); 
                  
                }} />
              </div>
              <div className="mid-date-container">
                <span>~</span>
              </div>
              <div className="end-date-container convention-date-container">
                <input type="time" value={conventionEndTime} onChange={(e) => {
                  setConventionEndTime(e.target.value); 
                }} />
              </div>
            </div>
          </div>
        </div>


        <div className="input-wrap">
          <div className="input-info">
            <span ref={limitRef}>박람회 정원</span>
          </div>
          <div className="input-zone">
            <div className="convention-input-container">
              <input type="type" value={conventionLimit} onChange={(e) => {
                if(!isNaN(e.target.value) ){
                  setConventionLimit(e.target.value); 
                }
              }} />
            </div>
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-info">
            <span ref={priceRef}>박람회 가격</span>
          </div>
          <div className="input-zone">
            <div className="convention-input-container">
              <input type="type" value={conventionPrice} onChange={(e) => {
                if(!isNaN(e.target.value) ){
                  setConventionPrice(e.target.value); 
                }
              }} />
            </div>
          </div>
        </div>

        <div className="input-msg">
          <span ref={contentRef}></span>
        </div>
        
        <ToastEditor boardContent={conventionContent} setBoardContent={setConventionContent} type={1} writeType={writeType} />
      </div>
        {/* type 1은 convention에서 작성이라는 뜻 (convention에서 textarea쓸 때는 파일이나 이런건 업로드 안 할거임) */}
      
    </>

    
  )
}




export default WriteForm