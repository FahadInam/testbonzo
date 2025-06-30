import React, { Component } from 'react';
import { Numbers } from 'Utils';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { min, sec, totalTime } = this.props;
    this.timer = null;
    this.min = parseInt(min, 10);
    this.sec = parseInt(sec, 10);
    this.totalMin = parseInt(totalTime / 60, 10);
    this.totalSec = totalTime % 60;
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const { min, sec } = this.props;
    let seconds = (min ? parseInt(min, 10) : 0) * 60;
    seconds += sec ? parseInt(sec, 10) : 0;
    this.setState({ count: seconds });
  }

  shouldComponentUpdate(p) {
    const { start } = this.props;
    if (p.start && !start) {
      this.startTimer();
    } else if (!p.start && start) {
      this.stopTimer();
    }
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    const { pause } = this.props;
    const { count } = this.state;
    if (pause) return;
    this.setState({ count: count + 1 });
    this.min = parseInt(count / 60, 10);
    this.sec = parseInt(count % 60, 10);
    this.forceUpdate();
    this.timerCallbackUpdater();
  };

  startTimer = () => {
    const { min, sec } = this.props;
    clearInterval(this.timer);
    this.min = parseInt(min, 10);
    this.sec = parseInt(sec, 10);

    this.setState({ count: this.min * 60 + this.sec });
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  timerCallbackUpdater = (msg = 'timer') => {
    const { callback, totalTime } = this.props;
    const ticks = this.min * 60 + this.sec;
    const completed = totalTime ? this.min * 60 + this.sec >= totalTime : false;
    if (completed) clearInterval(this.timer);
    if (callback) callback(completed ? 'completed' : msg, { min: this.min, sec: this.sec, ticks });
  };

  render() {
    const { totalTime } = this.props;
    const remainingTicks = totalTime - (this.min * 60 + this.sec);
    const minShow = parseInt(remainingTicks / 60, 10);
    const secShow = remainingTicks % 60;
    return <span>{`${Numbers.ZeroPad(minShow)}:${Numbers.ZeroPad(secShow)}`}</span>;
  }
}

export default Timer;
