class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timerValue: 0
    }
    this.timer = null

    // necessary bindings
    this.handleStartOfTimer = this.handleStartOfTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.clearTimer = this.clearTimer.bind(this)
  }

  handleStartOfTimer(value) {
    return () => {
      console.debug('button clicked with value', value)

      // clear current timer
      this.clearTimer()

      // set state back to value
      this.setState({timerValue: value})

      // set new timer
      this.timer = setInterval(() => {
        this.countDown()
      }, 1000)
    }
  }

  countDown() {
    if (this.state.timerValue > 0) {
      this.setState({timerValue: this.state.timerValue - 1})
    }
    else {
      this.clearTimer()
    }
  }

  clearTimer() {
    if (this.timer) {
      clearInterval((this.timer))
    }
  }

  componentWillUnmount() {
    console.debug("unmounting...")
    this.clearTimer()
  }

  render() {
    return (
      <div>
        <h1>Timer</h1>
        <Button label="5 seconds" onClick={this.handleStartOfTimer(5)}/>
        <Button label="10 seconds" onClick={this.handleStartOfTimer(10)}/>
        <Button label="15 seconds" onClick={this.handleStartOfTimer(15)}/>
        <Timer label={this.state.timerValue + ' secs left'} />
      </div>
    )
  }
}