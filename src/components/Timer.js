import { useEffect, useState } from 'react'
import '../Css/Timer.css'

export default function Timer() {

    const [time, setTime] = useState(0);
    const [min, setmin] = useState(0);
    const [sec, setsec] = useState(0);
    const [tongle, settongle] = useState(0);
    const [btnname, setbtnname] = useState('Start');
    const [minute, setminute] = useState('00')
    const [second, setsecond] = useState(['00'])



    function singlevalue(minutes, sec1) {
        if (sec1 < 10) {
            setsecond('0' + sec1);
        }
        else {
            setsecond(sec1);
        }

        if (minutes < 10) {
            setminute('0' + minutes);
        }
        else {
            setminute(minutes)
        }
    }

    useEffect(() => {
        let interval = null
        if (tongle) {
            interval = setInterval(count, 1000)
        }
        else {
            clearInterval(interval);
            setTime(0);
        }
        function count() {
            if (time > 0) {
                setTime(prevTime => prevTime - 1);
                var minutes = parseInt((time - 1) / 60)
                var sec1 = (time - 1) % 60;
                singlevalue(minutes, sec1)
            }
            else {
                alert('Time over')
                clearInterval(interval)

            }
        }

        return (() => {
            clearInterval(interval);
        })
    }, [tongle, time]);



    useEffect(() => {
        var minutes = 0;
        if (time !== 0) {
            minutes = time / 60;
        }
    }, [time])

    const taskstart = () => {
        if (parseInt(min) >= 0 && parseInt(sec) >= 0 && parseInt(sec) <= 60) {
            let actualtime = parseInt(min) * 60 + parseInt(sec);
            setTime(actualtime);

            let minutes = parseInt(actualtime / 60)
            let sec1 = actualtime % 60;
            singlevalue(minutes, sec1);
            settongle(!tongle)
            if (btnname === 'Start') {
                setbtnname('Reset');
                document.getElementById('sec').readOnly = true;
                document.getElementById('min').readOnly = true;
            }
            else {
                setbtnname('Start');
                document.getElementById('sec').readOnly = false;
                document.getElementById('min').readOnly = false;
                setsecond('00');
                setminute('00')

            }
        }

        else {
            alert('check the time once again')
        }
    }


    return (
        <div className="count">
            <div className="countdown-area">

                <h1> count Down</h1>
                <div className="countdown-set">
                    <h1 className="text">Min:</h1>
                    <input id="min" onChange={(e) => setmin(e.target.value)} className="inputfield" type="number" max="60" min="0"></input>
                    <h1 className="text">Second:</h1>
                    <input id="sec" onChange={(e) => setsec(e.target.value)} className="inputfield" type="number" max="60" min="0"></input>
                    <button onClick={taskstart} id="button" className="button">{btnname}</button>
                </div>
                <h1 className="timer">{minute}:{second}</h1>
            </div>
        </div>
    );
}
