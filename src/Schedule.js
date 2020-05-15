import schedule from 'node-schedule';

function Schedule(hour, alarm, firebase) {
     let cron = schedule.scheduleJob(hour, function () {
        // access the node child_process in case you need to kill it on demand
        //alarm.playTheMusic();
        firebase.changeToPlayMusic();
    });
    return cron;
}

export default Schedule;