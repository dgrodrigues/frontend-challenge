/* Load Dependencies */
import React from 'react';

/* Load Images */
import magnifier from '../../media/icon-magnifier.svg';


class SearchInput extends React.Component {
    render() {
        return (
            <div className="search-input">
                <div className="search-icon">
                    <img src={magnifier} alt="search" />
                </div>
                <input type="text" placeholder="Search movies..." onInput={(e) => this.props.typeAction(e.target.value)}/>   
            </div>
        );
    }
}

export default SearchInput;
