import React from 'react';
import { 
    Input, 
} from 'antd';
import 'antd/dist/antd.css';
const { Search } = Input;
const SearchBox = ({searchHandler}) => {
    return (
      
                <Search
                    placeholder="search"
                    size='small'
                    onSearch={value => searchHandler(value)}
                />
        
    )
}

export default SearchBox ;