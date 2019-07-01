/* Load Dependencies */
import React from 'react';

class InitialPlaceholder extends React.Component {
    render() {
        let title = 'Don’t know what to search?';
        let subtitle = 'Here’s an offer you can’t refuse';
        if(this.props.error) {
            title = 'Upps... An error occurred!';
            subtitle = this.props.error;
        }

        return (
            <div className="initial-placeholder">
                <div className="illustration-empty" />
                <h1>{ title }</h1>
                <h2>{ subtitle }</h2>
            </div>
        );
    }
}

export default InitialPlaceholder;
