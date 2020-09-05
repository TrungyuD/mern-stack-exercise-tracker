import React, { Component, useState } from 'react';
import axios from 'axios';
const CreateUser = (props) => {
    const [username, setUsername] = useState('');
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/add', {username})
              .then(res => console.log(res.data))
              .then(()=>{
                  setUsername('');
              })
              .then(props.history.push('/exercise'))
    }
    return(
        <div>
        <h3>Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}
export default CreateUser;