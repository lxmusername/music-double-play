import React, { Component } from 'react';
import MusicItem from './MusicItem';

//列表控件
export default class MusicList extends Component {
  render() {
    let itemDom = this.props.musicList.map((item) => {
      return (
        <MusicItem item={item} key={item.id} />
      );
    })
    return (
      <div>
        {itemDom}
      </div>
    );
  }
}
