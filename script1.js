function CheckAfterSchool() {

    if (hour > 16) {

        day = day + 1

        EndTime = " 09:00:00"

        document.getElementById("text").innerHTML = "'TILL SCHOOL";

    } else {

        if (min >= 50) {

            day = day + 1

            EndTime = " 09:00:00"

            document.getElementById("text").innerHTML = "'TILL SCHOOL"

        } else {

            EndTime = " 16:50:00"
            document.getElementById("text").innerHTML = "PERIOD 4"

        }
    }
}

function CheckAfterLunch() {

    if (hour < 14) {


        if (min >= 30) {

            EndTime = " 15:00:00"
            document.getElementById("text").innerHTML = "PERIOD 3"

            var starttime = " 13:30:00";
            var startday = 0;

        } else {

            EndTime = " 13:30:00"
            document.getElementById("text").innerHTML = "LUNCH BREAK"

        }

    } else {

        EndTime = " 15:00:00"
        document.getElementById("text").innerHTML = "PERIOD 3"

    }

}

function CheckAfterThirdLesson() {

    if (hour = 15) {

        if (min > 20) {

            EndTime = " 16:50:00"
            document.getElementById("text").innerHTML = "PERIOD 4"
            var starttime = " 15:20:00";
            var startday = 0;

        } else {

            EndTime = " 15:20:00"
            document.getElementById("text").innerHTML = "BREAK 2"

            var starttime = " 15:00:00";
            var startday = 0;

        }

    } else {

        EndTime = " 16:50:00"
        document.getElementById("text").innerHTML = "PERIOD 4"

        var starttime = " 15:20:00";
        var startday = 0;

    }

}

function CheckBeforeLunch() {

    if (hour = 12) {

        if (min >= 20) {

            EndTime = " 13:30:00"
            document.getElementById("text").innerHTML = "LUNCH BREAK"

            var starttime = " 12:20:00";
            var startday = 0;



        } else {

            EndTime = " 12:20:00"
            document.getElementById("text").innerHTML = "PERIOD 2"

            var starttime = " 10:50:00";
            var startday = 0;

        }

    } else {

        EndTime = " 13:30:00"
        document.getElementById("text").innerHTML = "LUNCH BREAK"

        var starttime = " 12:20:00";
        var startday = 0;

    }

}

function CheckSecondPeriod() {

    if (hour = 10) {

        if (min >= 50) {

            EndTime = " 12:20:00"
            document.getElementById("text").innerHTML = "PERIOD 2"
            var starttime = " 10:30:00";
            var startday = 0;

        } else {

            if (min >= 30) {

                EndTime = " 10:50:00"
                document.getElementById("text").innerHTML = "BREAK 1"
                var starttime = " 09:00:00";
                var startday = 0;

            } else {

                EndTime = " 10:30:00"
                document.getElementById("text").innerHTML = "PERIOD 1"

                var starttime = " 09:00:00";
                var startday = 0;

            }

        }

    } else {

        EndTime = " 12:20:00"
        document.getElementById("text").innerHTML = "PERIOD 2"

        var starttime = " 10:30:00";
        var startday = 0;

    }

}



function CheckWeekendDay() {


    if (week == 0) {

        day = day + 1

        EndTime = " 09:00:00"
        document.getElementById("text").innerHTML = "WEEKEND"

    } else {

        if (week == 6) {

            day = day + 2

            EndTime = " 09:00:00"
            document.getElementById("text").innerHTML = "WEEKEND"

        } else {

            if (hour <= 16) {

                if (min <= 50) {

                    EndTime = " 16:50:00"
                    document.getElementById("text").innerHTML = "PERIOD 4"

                } else {

                    day = day + 3

                    EndTime = " 09:00:00"
                    document.getElementById("text").innerHTML = "WEEKEND"

                }

            } else {

                day = day + 3

                EndTime = " 09:00:00"
                document.getElementById("text").innerHTML = "WEEKEND"

            }


        }

    } 

}