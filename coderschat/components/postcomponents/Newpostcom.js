import { set } from "mongoose";
import { useRef } from "react";
import { useState } from "react";
import Card from "../Card";
import classes from "./Newpostcom.module.css";
import flash from 'next-flash'; 

function Newpostcom(props) {
  const [imageSrc, setImageSrc] = useState([]);
  const [curimg, setcurimg] = useState("");
  const [checkbox, setcheckboc] = useState(false);
  const [btn, setbtn] = useState(false);
  const [filedata, setfiledata] = useState([]);
  const relateref = useRef();
  const captionInputRef = useRef();
  const [pos, setpos] = useState(0);
  function OnChangehandler(changeEvent) {
    const reader = new FileReader();
    //    for( let f of changeEvent.target.files){
    reader.onload = function (onLoadEvent) {
      //  console.log(onLoadEvent)
      setImageSrc((prev) => [...prev, onLoadEvent.target.result]);
      setcurimg(onLoadEvent.target.result);
      setfiledata((prev) => [...prev, changeEvent.target.files[0]]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    // }
  }
  function delpic(){
   
       if(imageSrc.length===1)
       {
         setImageSrc([]);
        setcurimg("")
        setfiledata([])
       }
       else{
         const newis=[];const newfiledata=[];
         for( let i in imageSrc){
        
           if(i!=pos)
           {
            console.log(pos)
             newis.push(imageSrc[i]);
             
           }
         }
         for(let i in  filedata){
          

               if(i!=pos){
                console.log(i)
                 newfiledata.push(filedata[i]);
               }
         }
         if(pos!==imageSrc.length-1){
          setcurimg(imageSrc[pos+1])
          }
          else{
            setcurimg(imageSrc[imageSrc.length-2])
            setpos(pos-1)
          }
         setImageSrc(newis)
         setfiledata(newfiledata)
        
       console.log(newis);
       console.log(newfiledata)
        }
  
       
        
   }
   

  
  async function submitHandler(event) {
    setbtn(true);
    event.preventDefault();
    const form = event.currentTarget;
    console.log(filedata)
   
    const imgurlarr = [];
    for (const file of filedata) {
      const formdata = new FormData();
      console.log(file);
      formdata.append("file", file);
      formdata.append("upload_preset", "my-post");
      try{
      const imagedata = await fetch(
        "https://api.cloudinary.com/v1_1/coderschat/image/upload",
        {
          method: "POST",
          body: formdata,
        }
      ).then((response) => response.json());
      const imgin={
        url:imagedata.url,
        id:imagedata.public_id
      }
      imgurlarr.push(imgin);
     
    }catch(e){
      flash.set({ info: '500 | Server Error Try again' })
      return
    }
      //console.log(imagedata, imagedata.url)
    }

    let enteredDescription = "";
    if (captionInputRef.current)
      enteredDescription = captionInputRef.current.value;

    const postData = {
      username: props.user.username,
      image: imgurlarr,
      caption: enteredDescription,
      comments: [],
      public: checkbox,
      time: new Date(),
    };
    const sendrelate = checkbox ? relateref.current.value : "";
    props.onaddpost(postData, sendrelate);
    
  }
  function goleft() {
    console.log(imageSrc);
    if (pos > 0) {
      setcurimg(imageSrc[pos - 1]);
      setpos(pos - 1);
    }
    if (pos === 0) {
      setcurimg(imageSrc[imageSrc.length - 1]);
      setpos(imageSrc.length - 1);
    }

    console.log(pos);
  }
  function goright() {
    if (pos < imageSrc.length - 1) {
      setcurimg(imageSrc[pos + 1]);
      setpos(pos + 1);
    } else if (pos === imageSrc.length - 1) {
      setcurimg(imageSrc[0]);
      setpos(0);
    }

    console.log(pos);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <p className={classes.center}>
            {imageSrc.length > 0 ? (
              <label for="image" className={classes.customfileupload}>
                {" "}
                <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/20/000000/external-upload-ui-essential-kmg-design-flat-kmg-design.png" />{" "}
                <span>upload more images</span>
              </label>
            ) : (
              <label for="image" className={classes.customfileupload}>
                {" "}
                <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/20/000000/external-upload-ui-essential-kmg-design-flat-kmg-design.png" />{" "}
                <span>upload your image</span>
              </label>
            )}
            <input
              type="file"
              name="file"
              id="image"
              style={{
                display: "none",
              }}
              onChange={OnChangehandler}
            />
          </p>

          <div className={classes.slideshowcontainer}>
            <div className={classes.fade}>
            {imageSrc.length > 1 && (
                    <div className={classes.numbertext}>
                      {pos+1}/{imageSrc.length}
                    </div>
                  )}
              <img src={curimg} className={classes.image} />
            </div>
            {imageSrc.length > 0 && (
              <>
            <span className={classes.commenu}>
                  <img
                    className={classes.commenu}
                    onClick={delpic}
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTAiIGhlaWdodD0iNTAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTMxLjQ5NzUsMjEuNzE1bC05Ljc4MjUsOS43ODI1bDU0LjUwMjUsNTQuNTAyNWwtNTQuODI1LDU0LjkzMjVsOS42NzUsOS42NzVsNTQuOTMyNSwtNTQuODI1bDU0LjgyNSw1NC44MjVsOS43ODI1LC05Ljc4MjVsLTU0LjgyNSwtNTQuODI1bDU0LjUwMjUsLTU0LjUwMjVsLTkuNzgyNSwtOS43ODI1bC01NC41MDI1LDU0LjUwMjV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                  />
                </span>
                </>
            )}
            {imageSrc.length > 1 && (
              <>
                
                <a className={classes.prev} onClick={goleft}>
                  &#10094;
                </a>
                <a className={classes.next} onClick={goright}>
                  &#10095;
                </a>
              </>
            )}
          </div>
        </div>

        <div className={classes.control}>
          <div className={classes.pocontrol}>
            <span>Set public</span>
            <label className={classes.switch}>
              <input
                onChange={(e) => setcheckboc(e.target.checked)}
                defaultChecked={checkbox}
                className={classes.inputt}
                type="checkbox"
              />
              <span className={classes.slider}></span>
            </label>
          </div>
          {checkbox && (
            <>
              <label htmlFor="related">
                Related to(use space to seperate words)
              </label>
              <input
                id="related"
                maxLength="100"
                ref={relateref}
                className={classes.input}
                type="text"
              ></input>
            </>
          )}
          <label htmlFor="description">Post Caption</label>
          <textarea
            id="caption"
            required
            rows="5"
            ref={captionInputRef}
            className={classes.input}
          ></textarea>
          <div className={classes.actions}>
            <button disabled={btn}>
              <img src="https://img.icons8.com/external-bearicons-blue-bearicons/30/000000/external-Share-social-media-bearicons-blue-bearicons.png" />
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default Newpostcom;
