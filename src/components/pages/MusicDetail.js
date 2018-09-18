import React, { Component } from 'react';
import { Link } from 'react-router';

//音乐详情控件
export default class MusicDetail extends Component {


  render() {
    let currMusic=this.props.curMusic;
    return (
      <div>
        <img src={currMusic.cover} alt={currMusic.cover}/>
        <p>{currMusic.title}</p>
        <p>{currMusic.artist}</p>
        <Link to='/'>返回播放控件</Link>
      </div>
    );
  }
}