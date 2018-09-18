import React, { Component } from 'react';
import { Link } from 'react-router';
import './musicItem.css';
import PubSub from 'pubsub-js';


//音乐 控件
export default class MusicItem extends Component {
  delMusic(musicItem, ev) {
    ev.stopPropagation();
    PubSub.publish('DEL_MUSIC',musicItem)
  }
  changePlayerItem(musicItem){
    PubSub.publish('CHANGE_MUSIC_ITEM',musicItem)
  }
  render() {
    const item = this.props.item;
    return (
      <p className='item-list'>
        <Link to='/' onClick={()=>this.changePlayerItem(item)}>
          <span> 《{item.title}》</span>
          <span> --{item.artist}</span>
        </Link>
        <span>
          <Link to={'/MusicDetail/' + item.id}>查看详情</Link>
        </span>
        <s className='item-del' onClick={(e)=>this.delMusic(item,e)}>x</s>
      </p>
    );
  }
}
