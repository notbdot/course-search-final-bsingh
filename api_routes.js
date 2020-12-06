const express = require('express');
const router = express.Router();

const fs = require('fs')
let rawdata = fs.readFileSync('./courses.json');
let course = JSON.parse(rawdata);

//routes

router.get('/', (req, res) => {
    let outputJSON = {
        courses : course["courses"]
    }
    res.json(outputJSON);
})

router.get('/by_course_code/:qcode',(req, res) => {
    let query = req.params['qcode']
    filtered_codes = course["courses"].filter(q => q.course_code.includes(query))
    let outputJSON = {
        courses : filtered_codes
    }
    res.json(outputJSON);
})

router.get('/by_title/:qtitle',(req, res) => {
    let query = req.params['qtitle']
    filtered_titles = course["courses"].filter(q => q.title.includes(query))
    let outputJSON = {
        courses : filtered_titles
    }
    res.json(outputJSON);
})

router.get('/by_instructor/:qname',(req, res) => {
    let query = req.params['qname']
    filtered_instructors = course["courses"].filter(q => q.instructor.includes(query))
    let outputJSON = {
        courses : filtered_instructors
    }
    res.json(outputJSON);
})

router.get('/by_level/:qlevel',(req, res) => {
    filtered_levels = course["courses"].filter(q => {
        if(q.course_level.includes("graduate") && (!q.course_level.includes("under"))) {
            return true;
        }
        else{
        return false;
        }
    })
    let outputJSON = {
        courses : filtered_levels
    }
    res.json(outputJSON);
})

router.get('/combined_query/:qname/:qlevel',(req, res) => {
    let qname = req.params['qname']
    let qlevel = req.params['qlevel']
    filtered_levels = course["courses"].filter(
        q => {
            if (q.instructor.includes(qname) && q.course_level.includes(qlevel)) {
                return true;
            }
            return false;
        }
    );
    let outputJSON = {
        courses : filtered_levels
    }
    res.json(outputJSON);
})

module.exports = router;