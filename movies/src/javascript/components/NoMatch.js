/* Load Dependencies */
import React from 'react';

/* Load Styles */
import '../../styles/nomatch.scss';

class NoMatch extends React.Component {
    render() {
        return (
            <div className="nomatch-page">
                <div>
                    <h1>Upss!!!</h1>
                    <h2>The page you're looking could not be found.</h2>
                </div>
            </div>
        );
    }
}

export default NoMatch;
