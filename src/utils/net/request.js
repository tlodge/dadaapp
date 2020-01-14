import request from 'superagent';

export function put(url="", data={}){
    return new Promise((resolve, reject) => {
      request
        .put(url)
        .send(data)
        .timeout(4000)
        .set('Accept', 'application/json')
        .set('Bearer', `${token}`)
        .then((res={})=>{
          resolve(res.body);
        }, (err) => {
            Alert.alert("Network issue", 'Please check you are connected to the Internet');
            reject();
          
        });
    });
}


export function get(url, query, accept="*/*"){
  return new Promise((resolve, reject) => {
   
    request.get(url)
        .query(query)
        .set('Accept', accept)
        .then((res)=>{
           

          if (res.type === "text/html"){
            resolve({value:res.text});
          }
          else if (res.type==="application/json"){
            resolve(res.body);
          }
          else{
            console.log("have res");
            console.log(res.xhr._response);
            resolve(res.xhr._response);
          }
        }, (err) => {
          console.log(err);
          reject();
        });
    });
}


export function post(url, data, accept="*/*"){
  return new Promise((resolve, reject) => {
    request.post(url)
        .send(data)
        .timeout(4000)
        .set('Accept', accept)
        .then((res)=>{
          resolve(res.body);
        }, (err) => {
          console.log(err);
          reject();
        });
    });
}

