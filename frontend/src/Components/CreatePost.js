import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import M from 'materialize-css';
const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = ()=>{
    const data = new FormData();
    data.append('file',image)
    data.append('upload_preset',"upload")
    data.append('cloud_name',"ravisharma")
    fetch("https://api.cloudinary.com/v1_1/ravisharma/image/upload",{
      method:'post',
      body:data
    }).then((res)=> res.json())
      .then(data=>{
        //console.log(data);
      setUrl(data.url)
    }).catch((err)=> console.log(err));
    
       
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          photo:url
        })
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if(data.error){
            M.toast({html:data.error, classes:"#e57373 red lighten-2"})
          } else{
            M.toast({html:'Upload Successful', classes:'#81c784 green lighten-2'})
            navigate('/')
          }
        })
        .catch(err=>{
          console.log(err)
        })
  }
  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #4fc3f7 light-blue lighten-2">
          <span>Choose a File</span>
          <input type="file" onChange={(e)=> setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light #4fc3f7 light-blue lighten-2"
        onClick={()=> postDetails()}
      >
        Submit post
      </button>
    </div>
  );
};

export default CreatePost;