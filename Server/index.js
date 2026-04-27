const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');

const pool = new Pool({
    user: 'Abdulkader',
    password: '0000',
    host: 'localhost',
    database: 'PN2',
    port: 5432
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    pool.query('SELECT * FROM auth', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});
app.get('/appliers/:jid', (req, res) => {
    const jid = req.params.jid;
    if (!jid) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('SELECT func5($1)', [jid], (error, results) => {
        if (error) {
            throw error;
        }
        
        if (results.rows.length == 0 || results.rows[0].func5 == null) {
            return res.status(200).json([]);
        }
        console.log(results.rows[0].func5);
        const split = results.rows[0].func5.split('=');
        const stringWithoutBraces = split[1].slice(2, -2); 
        const splitStrings = stringWithoutBraces.split('","');
        
        
        const arrayOfObjects = splitStrings.map(str => {
            str = str.slice(1,-1); 
            str = str.replace(/\\/g, '');
            const [fname,lname,phone] = str.split(',')
            return { fname,lname,phone };
        });
        console.log(arrayOfObjects);
        res.status(200).json(arrayOfObjects);
    });

    
});
app.get('/applied/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('SELECT * from getApplied($1)', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length == 0 || results.rows[0].getapplied == null) {
            return res.status(200).json([]);
        }
        const stringWithoutBraces = results.rows[0].getapplied.slice(2, -2); 
        const splitStrings = stringWithoutBraces.split('","');
        console.log(splitStrings);
        const arrayOfObjects = splitStrings.map(str => {
            str = str.slice(3,-1); 
            str = str.replace(/\\/g, '');
            const [jobtitle, company] = str.split('",')
            return { jobtitle, company };
        });

        res.status(200).json(arrayOfObjects);
    });
    
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('SELECT * FROM users WHERE uID = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
    
});

app.get('/apply/:id/:job', (req, res) => {
    const { id, job } = req.params;
    console.log("HELLO");
    console.log(id,job);
    if (!id || !job) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('SELECT * FROM applied_to WHERE job_id = $1 and user_id = $2', [job,id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length == 0) {
            pool.query('SELECT * FROM applyForJob($1,$2)', [id, job], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
            });
        }
        else {
            pool.query('SELECT COUNT(*) FROM applied_to WHERE job_id = $1', [job], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
            });   
        }
    });
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('DELETE FROM auth WHERE idno = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json('DELETED');
    });
});

app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('SELECT * FROM job WHERE comid = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    }
    );
});

app.put('/company/:id', (req, res) => {
    const id = req.params.id;
    const { cname, address} = req.body;
    
    if (!id || !cname || !address) {
        return res.status(400).send("Please enter all fields");
    }
    console.log(id,cname,address);
    pool.query('select * from updateCompany($1,$2,$3)', [id,cname,address], (error, results) => {
        if (error) 
            throw error;
        res.status(200).json('UPDATED');
    });
    
});

app.get('/company/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('SELECT * FROM company WHERE cid = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
    
});



app.get('/jobs', (req, res) => {
    const { field, job_type,search } = req.query;

    let query = 'SELECT * FROM lastJOBS ';
    if (field != '' && field != 'all') {
        query += `INTERSECT SELECT * FROM lastJOBS WHERE field = '${field}'`;
    }
    if (job_type != '' && job_type != 'all') {
        query += `INTERSECT SELECT * FROM lastJOBS WHERE job_type = '${job_type}'`;
    }
    if (search != '' ) {
        query += `INTERSECT SELECT * FROM lastJOBS WHERE title LIKE '%${search}%'`;
    }
    query += 'except  \
    SELECT jid,comid,title,description,field,job_type,publish_date \
    FROM lastJOBS join applied_to on (jid = job_id) \
    group by jid,comid,title,description,field,job_type,publish_date\
    having count(*) > 100'
    pool.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

app.post('/job/add', (req, res) => {
    const {comID,title,description,field,job_type} = req.body;
    const publish_date = new Date();
    
    if (!comID || !title || !description || !field || !job_type) {
        return res.status(400).send("Please enter all fields");
    }
    pool.query('INSERT INTO job (comID,title,description,field,job_type,publish_date) values ($1,$2,$3,$4,$5,$6)', 
    [comID,title,description,field,job_type,publish_date], (error, results) => {
        if (error) {
            console.log(error)
            return res.status(400).send("Something went wrong");
        }
        return res.status(200).json(results.rows[0]);
    });
});

app.post('/login', (req, res) => {
    const {email , passw} = req.body;
    if (!email || !passw) {
        return res.status(400).send("Please enter all fields");
    }
    if (passw.length < 5) {
        return res.status(400).send("Password must be at least 5 digits");
    }
    pool.query('SELECT * FROM auth WHERE email = $1 AND passw = $2', [email, passw], (error, results) => {
        if (error) {
            console.log(error)
            return res.status(400).send("Something went wrong");
        }
        else if (results.rowCount === 0) {
            return res.status(400).send("Wrong email or password");
        }
        return res.status(200).json(results.rows[0]);
    });
});

app.post('/user/register', (req, res) => {
    const {fname,lname ,age,phone,address,email,passw} = req.body
    const isUser = true;

    if (!fname || !lname || !age || !phone || !address || !email || !passw){
        return res.status(400).send("Please enter all fields");
    }   
    if (passw.length < 5) {
        return res.status(400).send("Password must be at least 5 digits");
    }

    pool.query('INSERT INTO auth (email,passw,isUser) values ($1,$2,$3) returning idNO', [email, passw,isUser], (error, results) => {
        if (error) {
            if (error.constraint === 'auth_email_key')
                return res.status(400).send("The email is already exist");
            return res.status(400).send("Something went wrong");
        }
        const idNO = results.rows[0].idno;
        
        console.log(results.rows[0])
        console.log(idNO)
        pool.query('INSERT INTO users (fname,lname,age,phone,address,uID ) values ($1,$2,$3,$4,$5,$6)', [fname,lname,age,phone,address,idNO], (error, results) => {
            if (error) {
                pool.query('DELETE FROM auth WHERE idNO = $1', [idNO], (error, results) => {
                    if (error) {
                        console.log(error)
                        return res.status(400).send("Something went wrong");
                    }
                });
                if (error.constraint === 'users_phone_key')
                    return res.status(400).send("The phone is already exist");
                return res.status(400).send(error.message);
                
            }
            else{
                return res.status(200).json(results.rows[0]);
            }
        });
    });
});

app.post('/company/register', (req, res) => {
    const {email, passw ,cName,phone,address} = req.body
    const isUser = false;
    if (!email || !passw || !cName || !phone || !address){
        return res.status(400).send("Please enter all fields");
    }
    if (passw.length < 5) {
        return res.status(400).send("Password must be at least 5 digits");
    }
    pool.query('INSERT INTO auth (email,passw,isUser) values ($1,$2,$3) returning idNO', [email, passw,isUser], (error, results) => {
        if (error) {
            if (error.constraint === 'auth_email_key')
                return res.status(400).send("The email is already exist");
            return res.status(400).send("Something went wrong");
        }
        const idNO = results.rows[0].idno;
        pool.query('INSERT INTO company (cName,phone,address,cID ) values ($1,$2,$3,$4)', [cName,phone,address,idNO], (error, results) => {
            if (error) {
                console.log(error)
                pool.query('DELETE FROM auth WHERE idNO = $1', [idNO], (error, results) => {
                    if (error) {
                        console.log(error)
                        return res.status(400).send("Something went wrong");
                    }
                });
                if (error.constraint === 'company_phone_key')
                    return res.status(400).send("The phone is already exist");
                return res.status(400).send("Something went wrong");
            }
            return res.status(200).json(results.rows[0]);
        });
    });
});
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
