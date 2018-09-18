import React, { Component } from 'react';
import { Link } from 'react-router';
import Progress from '../common/progress';
import './player.css';
import PubSub from 'pubsub-js'

//播放控件
const $ = window.$;
let progressDuration = 0;
let dataFormate = (time) => {
  time = Math.ceil(time);
  let min = Math.floor(time / 60);
  let sec = time % 60;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  return min + ':' + sec;
}
export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0.2,
      curProgress: 0,
      isPlay: false,
    }
    this.changeProgress = this.changeProgress.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }
  // 手动改变播放进度
  changeProgress(curProgress) {
    $('#player').jPlayer('play', progressDuration * curProgress)
  }
  // 手动改变 播放音量
  changeVolume(curProgress) {
    $('#player').jPlayer('volume', curProgress);
  }
  // 播放 当前音乐
  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');
    this.setState({
      musicItem: musicItem,
    })
  }
  // 控制 是否播放音乐
  playPause() {
    this.state.isPlay && $('#player').jPlayer('pause')
    !this.state.isPlay && $('#player').jPlayer('play')
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  // 控制 播放 上一首 下一首
  changeMusicPlay(toward = 'next') {
    let musicList = this.props.musicList;
    let curIndex = this.props.curIndex;
    let musicLength = this.props.musicList.length;
    if (toward === 'pre') {
      if (curIndex === 0) {
        curIndex = musicLength;
      }
      curIndex = curIndex - 1;
      this.playMusic(musicList[curIndex]);
      PubSub.publish('PRE_MUSIC');
    }
    if (toward === 'next') {
      if (curIndex === musicLength - 1) {
        curIndex = -1;
      }
      curIndex = curIndex + 1;
      this.playMusic(musicList[curIndex]);
      PubSub.publish('NEXR_MUSIC');
    }
    this.setState({
      isPlay: true
    })
  }
  componentDidMount() {
    console.log(this.props)
    let playUrl = this.props.curMusic;
    this.playMusic(playUrl);
    //初始化 jplayer插件
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true
    });
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      progressDuration = e.jPlayer.status.duration;
      this.setState({
        volume: e.jPlayer.options.volume,
        curProgress: e.jPlayer.status.currentTime
      });
    });

    PubSub.subscribe('CHANGE_MUSIC_ITEM', (msg, musicItem) => {
      this.playMusic(musicItem);
      this.setState({
        isPlay: true
      })
    })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
    PubSub.unsubscribe('CHANGE_MUSIC_ITEM')
  }
  render() {
    let time=progressDuration-this.state.curProgress;
    return (
      <div>
        <Link to='/MusicList'>欢迎进入音乐时空...</Link>
        <ul className='cur-music-detail'>
          <li className='cover'>
            <img
              className={this.state.isPlay ? 'imgRotate' : ''}
              src={this.props.curMusic.cover}
              style={{ float: 'right' }}
              alt='music-logo' />
            <div>
              <h5>歌曲: {this.props.curMusic.title} </h5>
              <p>歌手:{this.props.curMusic.artist}</p>
            </div>
          </li>
          <li className='time-volume'>
            <p>--{dataFormate(time)}</p>
            <div className='music-volume'>
              <span>音量</span>
              <Progress
                curProgress={this.state.volume}
                progressDuration={1}
                changeProgress={this.changeVolume}
              />
            </div>
          </li>
          <li className='play-progress'>
            <Progress
              curProgress={this.state.curProgress}
              progressDuration={progressDuration}
              changeProgress={this.changeProgress} />
          </li>
          <li className='play-ctr'>
            <span onClick={() => this.changeMusicPlay('pre')}>《</span>
            <span onClick={() => this.playPause()}>
              {this.state.isPlay ? '||' : '>'}
            </span>
            <span onClick={() => this.changeMusicPlay('next')}>》</span>
          </li>
        </ul>
      </div >
    );
  }
}
