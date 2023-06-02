const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
//const { default: Notices } = require("../client/src/Pages/Notices");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "bams",
  multipleStatements: true
});

app.post("/create", (req, res) => {

  const fname = req.body.fname;
  const lname = req.body.lname;
  const age = req.body.age;
  const gender = req.body.gender;
  const pswd = req.body.pswd;  
  const subject = req.body.subject;
  const department = req.body.department;
  const add = req.body.add;
  const city = req.body.city;
  const email = req.body.email;
  const contact = req.body.contact;
  const status = req.body.status;
  

  db.query(
    'INSERT INTO professors (first_name, last_name, age, gender, password, subject, department, address, city, email, contact, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    [fname, lname, age, gender, pswd, subject, department, add, city, email, contact, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/professor", (req, res) => {
  db.query("SELECT * FROM professors", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/proupdate/:id", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const age = req.body.age;
  const gender = req.body.gender;
  const pswd = req.body.pswd;  
  const subject = req.body.subject;
  const department = req.body.department;
  const add = req.body.add;
  const city = req.body.city;
  const email = req.body.email;
  const contact = req.body.contact;
  const id = req.body.id;
  
  db.query(
    "UPDATE professors SET first_name = ?, last_name = ?, age = ?, gender = ?, password = ?, subject = ?, department = ?, address = ?, city = ?, email = ?, contact = ? WHERE id = ?",
    [fname, lname, age, gender, pswd, subject, department, add, city, email, contact, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/professordelete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM `professors` WHERE id = ?", id, 
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.post("/creape", (req, res) => {

  
 
  const email = req.body.email;
  const timeIn = req.body.timeIn;
  const timeOut = req.body.timeOut;
 
   db.query(
      `INSERT INTO info (email, timeIn, timeOut) VALUES (?, ?, ?)`,
     [email, timeIn, timeOut],
     (err, result) => {
       if (err) {
         console.log(err);
       } else {
         res.send("Values Inserted");
       }
     }
   );
 });
 
 



app.post("/createschedule", (req, res) => {

  const name = req.body.name;
  const classs = req.body.classs;
  const section = req.body.section;
  const session = req.body.session;
  const semester = req.body.semester;  
  const subject = req.body.subject;
  const room = req.body.room;
  const stime = req.body.stime;
  const ftime = req.body.ftime;
 
  

  db.query(
    'INSERT INTO schedule (name, class, section, session, semester, subject, roomID, Start_time, end_time) VALUES (?,?,?,?,?,?,?,?,?)',
    [name, classs, section, session, semester, subject, room, stime, ftime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/schedule", (req, res) => {
  db.query("SELECT * FROM schedule", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.get("/report", (req, res) => {
  db.query("SELECT * FROM report", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.delete("/reportdelete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM `report` WHERE id = ?", id, 
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});




app.get("/attendance", (req, res) => {
  db.query("SELECT * FROM attandance", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.delete("/attendancedelete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM `attandance` WHERE id = ?", id, 
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});





app.post("/generatenotice", (req, res) => {

  const heading = req.body.heading;
  const notice1 = req.body.notice1;

  db.query(
    'INSERT INTO notices (heading, notices) VALUES (?,?)',
    [heading, notice1],
   (err, result) => {
      if (err) {
       console.log(err);
     } else {
       res.send("Values Inserted");
      }
    }
  );
});




app.get("/noticeboard1", (req, res) => {
  db.query("SELECT * FROM noticeboard", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});





{
//  app.get("/biometric1", (req, res) => {
 //  db.query("SELECT * FROM biometric", (err, result) => {
  //   if (err) {
   //    console.log(err);
   //  } else {
   //    res.send(result);
   //  }
  // });
// });
}

app.post("/biometric1", (req, res) => {

  const professor_id = req.body.professor_id;

  db.query(
    'SELECT * FROM biometric WHERE professor_id = ?',
    [professor_id],
    (err, result) => {
      if (err) {
        req.setEncoding({err: err});
      } else {
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "wrong ID"});
        }
      }
    }
  );
});


app.post("/adddevice", (req, res) => {

  const dname = req.body.dname;
  const ipadd = req.body.ipadd;
  const deviceid = req.body.deviceid;
  const commenkey = req.body.commenkey;
  const portadd = req.body.portadd;  
  

  db.query(
    'INSERT INTO devicedetail (device_name, IP_address, device_id, commen_key, port_address) VALUES (?,?,?,?,?)',
    [dname, ipadd, deviceid, commenkey, portadd],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.delete("/devicesetupdelete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM `devicedetail` WHERE id = ?", id, 
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/devicesetup", (req, res) => {
  db.query("SELECT * FROM devicedetail", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.post("/registeradmin", (req, res) => {

  const email = req.body.email;
  const username = req.body.username;
  const pswd = req.body.pswd;

  db.query(
    'INSERT INTO admin (username, password, email) VALUES (?,?,?)',
    [username, pswd, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/loginadmin", (req, res) => {

  const username = req.body.username;
  const pswd = req.body.pswd;

  db.query(
    'SELECT * FROM admin WHERE username = ? AND password = ?',
    [username, pswd],
    (err, result) => {
      if (err) {
        req.setEncoding({err: err});
      } else {
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "wrong name or pswd"});
        }
      }
    }
  );
});
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})



app.post("/dummy", (req, res) => {

  const name = req.body.name;
  const pin = req.body.pin;

  db.query(
    'SELECT * FROM users WHERE name = ? AND pin = ?',
    [name, pin],
    (err, result) => {
      if (err) {
        req.setEncoding({err: err});
      } else {
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "wrong name or pswd"});
        }
      }
    }
  );
});

app.post("/dummyu", (req, res) => {

  const email = req.body.email;

  db.query(
    'SELECT * FROM info WHERE email = ?',
    [email],
    (err, result) => {
      if (err) {
        req.setEncoding({err: err});
      } else {
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "wrong ID"});
        }
      }
    }
  );
});





app.post("/timeinprofessor", (req, res) => {

  const name = req.body.name;
  const password = req.body.password;

  db.query(
    'SELECT * FROM professors WHERE first_name = ? AND password = ?',
    [name, password],
    (err, result) => {
      if (err) {
        req.setEncoding({err: err});
      } else {
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "wrong name or pswd"});
        }
      }
    }
  );
});

app.post("/timeinschedule", (req, res) => {

  const name = req.body.name;
  const room = req.body.room;


  db.query(
    'SELECT * FROM schedule WHERE name = ? AND roomID = ?',
    [name, room],
    (err, result) => {
      if (err) {
        req.setEncoding({err: err});
      } else {
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "wrong ID"});
        }
      }
    }
  );
});


app.post("/timeinattendance", (req, res) => {

  const name = req.body.name;
  const section = req.bodysection; 
  const semester = req.body.semester;
  const subject = req.body.subject; 
  const stime = req.body.stime;
  

  db.query(
    'INSERT INTO attandance( professor_name, subject, section, semester, start_time) VALUES (?,?,?,?,?)',
    [name, subject, section, semester, stime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


/*


app.post("/timeinattendance", (req, res) => {
  // Get the data from the request body
  const name = req.body.name;

  const section = req.bodysection;
  
  const semester = req.body.semester;
  const subject = req.body.subject;
  
  const stime = req.body.stime;
 
  // Add the data to the database table `attendance`
  const sql = `
  INSERT INTO attandance( professor_name, subject, section, semester, start_time) 
  VALUES (?,?,?,?,?)
  `;


  db.query(sql, [name, subject, section, semester, stime], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});
*/

app.post('/api/timeout', async (req, res) => {
  const name = req.body.name;
  const timeout = req.body.timeout;

  // Check that the value of `timeout` is not empty.
  if (timeout === '') {
    res.status(400).send('Please enter a value for timeout');
    return;
  }

  // Change the value of `status` to `end`.
  const updateStatus = async () => {
    try {
      const response = await fetch(`/api/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'end' }),
      });
      const data = await response.json();
      return data.status;
    } catch (error) {
      return null;
    }
  };

  // Update the value of the `timeout` column in the database.
  const updateTimeout = async () => {
    try {
      const response = await fetch(`/api/timeout/${name}`, {
        method: 'PUT',
        body: JSON.stringify({ timeout }),
      });
      const data = await response.json();
      return data.timeout;
    } catch (error) {
      return null;
    }
  };

  const status = await updateStatus();
   timeout = await updateTimeout();

  // Display an alert.
  if (status === null || timeout === null) {
    res.status(400).send('Please enter a value for timeout');
  } else {
    res.status(200).send({ status, timeout });
  }
});










app.listen(8080, () => {
  console.log("Yey, your server is running on port 8080");
});



//let sql = `DELETE FROM student WHERE id =${req.params.id}`; 
//let query = db.query(sql, (err, result) =>{
  // if (err) throw err;
   //console.log("result");
   //res.send("post deleted");
//});