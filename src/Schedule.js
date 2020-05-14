import schedule from 'node-schedule';

function Schedule(hour, alarm, firebase) {
    schedule.scheduleJob(hour, function () {
        // access the node child_process in case you need to kill it on demand
        //alarm.playTheMusic();
        firebase.changeToPlayMusic();
    });
}

export default Schedule;