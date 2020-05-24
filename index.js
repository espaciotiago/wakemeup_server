import FirebaseManager from './src/FirebaseManager';
import Schedule from './src/Schedule';
import Alarm from './src/Alarm';

const firebase = new FirebaseManager();
const alarm = new Alarm();

//Cron job to execute the alarm
//Schedule('10 06 * * *', alarm, firebase);
//Schedule('15 06 * * *', alarm, firebase);

//----------------------------------------
//CREATE THE FIREBASE SERVER
//----------------------------------------
let cron;
firebase.createListener(function (doc) {
    const data = doc.data();
    if (data) {
        console.log("----------------------------------");
        //Check for the alarm to play
        if (data.status === "play") {
            console.log("play...", new Date());
            firebase.turnOn();
            alarm.playTheMusic();
        } else {
            console.log("stop...", new Date());
            //firebase.turnOff();
            alarm.stopTheMusic();
        }
        //Check for the hour to be scheduled
        if (data.hour) {
            if (cron) {
                console.log("Canceling previous cron...")
                cron.cancel();
            }
            const settedTime = new Date(data.hour.toDate());
            
            if(settedTime){
                let minutes = settedTime.getMinutes().toString()
                let hours = settedTime.getHours().toString()
                if(minutes.length <= 1){
                    minutes = `0${minutes}`
                }
                if(hours.length <= 1){
                    hours = `0${hours}`
                }

                console.log("Setting new cron at:", `${hours}: ${minutes}`);
                cron = Schedule(`${minutes} ${hours} * * *`, alarm, firebase);
            }
        }
    }
});

//Service to kill the process that sounds
/*
app.get('/kill', function (req, res) {
    const stopped = alarm.stopTheMusic();
    const obj = {
        error: stopped,
        message: 'The music has been stoped!'
    }
    res.send(obj);
});

//Service to start the process that sounds
app.get('/start', function (req, res) {
    alarm.playTheMusic();
    res.send('Lets rock and rool');
});

//----------------------------------------
//CREATE THE SERVER
//----------------------------------------
/*
http.createServer(app).listen(8001, () => {
    console.log('\n........................................\n' +
        'WAKE ME UP!! \n' +
        'Server started at http://localhost:8001' +
        '\n........................................\n');
});
*/
