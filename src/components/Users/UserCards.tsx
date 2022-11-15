import React, {useState}from 'react';
import {USERS} from './users';

const UserCards = () => {
    const [users, setUsers] = useState(USERS);
    const [search, setSearch] = useState('');
    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    }
    const searchedUsers = () =>{
        if(search){
            return users.filter(user => user.username.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return users;
    };
    console.log(searchedUsers())
    return(
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            <h1 className='text-center w-100'>User cards</h1>
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Search</span>
            <input type="text" 
            className="form-control" 
            placeholder="Input Username" 
            aria-label="Username" 
            aria-describedby="basic-addon1"
            onChange={(event) =>  setSearch(event.target.value)}
            />
            </div>
            {users.map(user => <div className="col" key={user.id}>
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Number: {user.phone}</p>
                        <p>Website: {user.website}</p>
                    </p>
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-dark"
                  onClick={() => deleteUser(user.id)} >Delete this user</button>
                </div>
            </div>
            </div>
            )}
            
        </div>
    );
};

export default UserCards;
