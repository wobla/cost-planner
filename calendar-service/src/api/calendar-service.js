'use strict'
const status = require('http-status')
const months = require('months')
const month = require('month')
const year = require('year')
const days = require('days')
const calendar = require('node-calendar')
const repeat = require('repeat-string');

module.exports = (app, options) => {
    app.get('/calendar/:year', (req, res, next) =>{        
        var result = new Array();
        
        for(var i=0; i<months.length; i++){
            var cal = new calendar.Calendar().monthdayscalendar(req.params.year, (i+1))
            
            var monthNum = repeat('0', 2 - String(month(months[i])).length) + month(months[i]);
            var monthRange = calendar.monthrange(req.params.year, i+1)
            var startMonth = new Date(Date.UTC(req.params.year, i, 1, 0, 0, 0)) //new Date(req.params.year, (i+1), 1)
            var endMonth = new Date(Date.UTC(req.params.year, i, monthRange[1], 23, 59, 59, 999))
            
            var monthDays = new Array()
            for (var k=0; k<cal.length; k++){
                for(var ki=0; ki<cal[k].length; ki++){
                    if (cal[k][ki] !== 0){
                        var id = new Date(req.params.year, i, cal[k][ki])
                        
                        var idYear = id.getFullYear();
                        var idMonth = monthNum;
                        var idDay = repeat('0', 2 - String(id.getDate()).length) + id.getDate();
                        
                        monthDays.push({
                            id: idYear + '-' + idMonth + '-' + idDay,
                            day: cal[k][ki],
                            title: days[id.getDay()],
                            isWeekend: (id.getDay() == 0 || id.getDay() == 6)
                        })
                    }
                }
            }
            
            var item = {
                id: req.params.year + '-' + monthNum,
                year: req.params.year,
                month: month(months[i]),
                title: month(i+1),
                from: startMonth,
                until: endMonth,
                lastDay: monthRange[1],
                days: monthDays
            }
            
            result.push(item)
        }

        
        //console.log(result)
        
        res.status(status.OK).json(result)
    })
}