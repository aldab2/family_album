import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        // Start very small and increase gradually
        // { duration: '2m', target: 30 },  // Ramp up to 10 users over 1 minute
        // { duration: '1m', target: 30 },  // Stay at 10 users for 2 minutes
        // { duration: '2m', target: 40 },  // Increase to 20 users over 1 minute
        // { duration: '1m', target: 40 },  // Stay at 20 users for 2 minutes
        // { duration: '2m', target: 50 },  // Increase to 30 users over 1 minute
        // { duration: '2m', target: 50 },  // Stay at 30 users for 2 minutes
        { duration: '2m', target: 500 },  // Ramp up to 10 users over 1 minute
        { duration: '1m', target: 500 },  // Stay at 10 users for 2 minutes
        { duration: '2m', target: 1000 },  // Increase to 20 users over 1 minute
        { duration: '1m', target: 1000 },  // Stay at 20 users for 2 minutes
        { duration: '2m', target: 2000 },  // Increase to 30 users over 1 minute
        { duration: '2m', target: 2000 },  // Stay at 30 users for 2 minutes
        // Add more stages as needed, increasing the target gradually
    ],
    thresholds: {
        //'http_req_duration': ['p(95)<500'], // 95% of requests should complete below 500ms
        'http_req_failed': ['rate<0.05'], // Less than 5% of requests should fail
    },
};

//const BASE_URL = 'http://34.159.197.114:5000';
const BASE_URL = 'http://139.162.135.162';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZhMGNmM2JmMmZmN2Q0ZDU2MDllNGMiLCJpYXQiOjE3MTA5MzY5NDMsImV4cCI6MTcxMzUyODk0M30.QPVSjCRUBXiHXdwt4NuKPd_7BaEZUK_jf7Xn9_EHB4M';

// Load the file content once during the init stage
var fileData = http.file(open('./test.png', 'b'), 'test.png');

const performPostTest = ()=>{
    const content = `test post #${__VU}-${__ITER}`;
    //const body = createMultipartBody(fileContent, fileName, fileMimeType, boundary, content);

    var payload = {
        'content': content, // Example of another form field
        'file': fileData,
    };

    const params = {
        headers: {
            //'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Cookie': `jwt=${JWT_TOKEN}`,
        },
    };
    let res = http.post(`${BASE_URL}/api/post`, payload, params);
    check(res, { 'post created': (r) => r.status === 200 });


    const post = JSON.parse(res.body)

    if(res.status !==200){
        console.log(`VU ${__VU} Iteration ${__ITER}, Post reuqest failed  Status: ${res.status}, Error: ${res.error}`)

    }
    else{
        //console.log(`VU ${__VU} Iteration ${__ITER}, Post Res ${res.body}`)

    }

    sleep(5)

    if (post._id) {

        let deleteRes = http.del(`${BASE_URL}/api/post`, { id: post._id }, params);

        if (deleteRes.status !== 200) {
            console.error(`VU ${__VU} Iteration ${__ITER}, DELETE request failed. Status: ${deleteRes.status}, Error: ${deleteRes.error}`);
        } else {
            //console.log(`VU ${__VU} Iteration ${__ITER}, Delete Res ${deleteRes.body}`);
            
        }
        check(deleteRes, { 'post deleted': (r) => r.status === 200 });
        //console.log(JSON.stringify(deleteRes.body));



    }
    sleep(5)
}

const performRegularTest = ()=>{
    const content = `test post #${__VU}-${__ITER}`;
    //const body = createMultipartBody(fileContent, fileName, fileMimeType, boundary, content);

    var payload = {
        'content': content, // Example of another form field
        'file': fileData,
    };

    const params = {
        headers: {
            //'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Cookie': `jwt=${JWT_TOKEN}`,
        },
    };

    let res = http.get(`${BASE_URL}/api/auth/user`, params);
    check(res, { 'user retreived': (r) => r.status === 200 });


    const post = JSON.parse(res.body)

    if(res.status !==200){
        console.log(`VU ${__VU} Iteration ${__ITER}, Post reuqest failed  Status: ${res.status}, Error: ${res.error}`)

    }
    else{
        //console.log(`VU ${__VU} Iteration ${__ITER}, Post Res ${res.body}`)

    }

    sleep(2)

}
export default function () {


    
    //performPostTest()
    performRegularTest()
   
    

}


