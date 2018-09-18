import React, { Component } from 'react';
import './App.css';
import logo from '../../assets/images/logo.jpg'
import { MUSIC_LIST } from '../../assets/dataConfig/musicConfig.js';
import PubSub from 'pubsub-js';
let curIndex = 0, musicLength = 0;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curMusic: MUSIC_LIST[curIndex],
      musicList: MUSIC_LIST,
    }
  }
  componentDidMount() {
    musicLength=MUSIC_LIST.length;
    PubSub.subscribe('DEL_MUSIC', (msg, musicItem) => {
      const musicList = this.state.musicList.filter(item => {
        return item !== musicItem;
      })
      this.setState({
        musicList: musicList
      })
    })
    // 通过选择 音乐列表 改变当前播放
    PubSub.subscribe('CHANGE_MUSIC_ITEM', (msg, musicItem) => {
      this.setState({
        curMusic: musicItem
      })
    })
    // 通过 操作按钮 改变当前播放
    PubSub.subscribe('PRE_MUSIC', () => {
      if (curIndex === 0) {
        curIndex = musicLength;
      }
      curIndex = curIndex - 1;
      this.setState({
        curMusic: MUSIC_LIST[curIndex]
      })
    });
    PubSub.subscribe('NEXR_MUSIC', () => {
      if (curIndex ===musicLength-1) {
        curIndex = -1;
      }
      curIndex = curIndex + 1;
      this.setState({
        curMusic: MUSIC_LIST[curIndex]
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe('DEL_MUSIC')
    PubSub.unsubscribe('CHANGE_MUSIC_ITEM')
    PubSub.unsubscribe('NEXR_MUSIC')
    PubSub.unsubscribe('PRE_MUSIC')
  }
  render() {
    return (
      <div className="App">
        <header className='music-head'>
          <img src={logo} alt='logo' />
          <span>欢迎来到 MUSIC 峡谷！</span>
        </header>
        <div className='music-body'>
          {React.cloneElement(this.props.children, { ...this.state, curIndex: curIndex })}
        </div>
      </div>
    );
  }
}

export default App;
