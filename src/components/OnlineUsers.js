import {useState} from 'react'
//styles
import "./OnlineUsers.css";
//hooks
import { useCollection } from "../hooks/useCollection";
//components
import Avatar from "./Avatar";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");
  const [show, setShow] = useState("")

  function handleOnClick(){
    if(show === "block"){
      setShow('none')
    }else{
      setShow("block")
    }

  }
  console.log(show)

  return (
    <div className="user-list">
      <button className="user-list-button btn" onClick={handleOnClick}>SHOW USER LIST</button> 
      <div className="user-list-content" style={{display:`${show}`}}>
        <h2>All Users</h2>
        {error && <div>{error}</div>}
        {documents &&
          documents.map((user) => (
            <div key={user.id} className="user-list-item">
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          ))}
      </div>
    </div>
  );
}
