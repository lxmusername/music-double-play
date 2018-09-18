import React, { Component } from 'react';
import './progress.css';

//播放控件
export default class Progress extends Component {
    constructor(props){
        super(props)
        this.changeProgress=this.changeProgress.bind(this)
    }
    changeProgress(e){
        let progressBar=this.refs.progressBar;
        let curProgress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        this.props.changeProgress(curProgress)
    }
    render() {
        const progress=Math.ceil(this.props.curProgress/this.props.progressDuration*100);
        return (
            <div className='progress'
                onClick={this.changeProgress}
                ref='progressBar'
                >
                <div style={{width:`${progress}%`}}></div>
            </div>
        );
    }
}
