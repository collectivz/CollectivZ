import { UserStatus } from 'meteor/mizzao:user-status'

Tracker.autorun(c => {
  try {
    UserStatus.startMonitor({
      treshold: 30000,
      interval: 1000,
      idleOnBlur: true
    })
    console.log('montoring started')
    c.stop()
  } catch(err) {
    console.log(err)
  }
})
