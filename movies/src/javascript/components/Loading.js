/* Load Dependencies */
import React from 'react';

/* Load Styles */
import '../../styles/loading.scss';

class Loading extends React.Component {

    render() {
        return (
            <div className="loading">
                <div className="grid">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

}


export default Loading;
