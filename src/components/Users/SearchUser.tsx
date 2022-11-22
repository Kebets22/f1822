import React, { useState } from 'react'
import { useSearch } from '../../hooks/useSearch';
import { IUser } from './interfaces';

const SearchUser = ({users}:{users: IUser[]}) => {
    const [search, setSearch] = useState<string>('');
    const searchedUsers = useSearch(users, search, 'name');
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Search</span>
                <input type="text"
                    className="form-control"
                    placeholder="Input Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(event) => setSearch(event.target.value)} />
    </div>
  )
}

export default SearchUser;
