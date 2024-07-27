import http from 'node:http';
import db from './db.js';
import { parse } from 'node:querystring';
import { usersListPage, userFormPage } from './views/index.js';

const contentTypes = {
  formUrlEncoded: 'application/x-www-form-urlencoded',
  formMultipart: 'multipart/form-data',
};

db.migrate();
db.seed();
// console.log(db.findAllUsers());

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // console.log(Object.keys(req));
  console.log(req.method, req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const urlParts = req.url.split('?');

  const urlPath = urlParts[0];
  
  let urlParams = '';
  if (urlParts.length > 1) {
    urlParams = urlParts[1];
  }
  console.log('URLPARAMS: ', urlParams);

  let params = [];
  if (urlParams) {
    params = urlParams.split('&').map(p => {
      const param = p.split('=');
      return param;
    });
  }

  console.log('params: ', params);

  
    if (urlPath === '/') {
      console.log("HOME");
      res.end(`<h1>Home<h1>`);
    }

    else if (urlPath === '/about') {
      console.log('ABOUT');
      res.end(`<h1>About<h1>`);
    }

    else if (urlPath === '/users') {
      res.end(usersListPage(db.findAllUsers()));

      // const allowedMethods = ['GET'];
      // if (allowedMethods.indexOf === -1) {
      //   res.statusCode = 405;
      //   res.end('<h1>Method not allowed</h1>');
      // }
      // else if (req.method === 'GET') {
      //   res.end(usersListPage(db.findAllUsers()));
      // } 
    }

    else if (urlPath === '/users/create') {
      if (req.method === 'GET') {
        res.end(userFormPage('create'));
      } 
      else if (req.method === 'POST') {
        if (req.method === 'POST') {
          getRequestData(req, (data) => {
            let birthday = 0;
            if (data?.birthday) {
              birthday = new Date(data.birthday).getTime();
            }
            const newUser = {
              firstName: data?.firstName || "",
              lastName: data?.lastName || "",
              birthday,
            };
            db.createUser(newUser);
            
            console.log({newUser});
            res.writeHead(307, {Location: '/users'}).end();
            // res.statusCode = 201;
            // res.setHeader('Content-Type', 'text/html');
            // res.end(usersListPage(db.findAllUsers())); 
          });
        }
      }
    }

    else if (urlPath.includes('/users/edit/')) {
      const parts = urlPath.split('/');
      const userId = parts[parts.length - 1];
      const user = db.findUserById(userId);
      if (!user) {
        res.statusCode = 404;
        res.end(`<h1>User not found</h1>`);
        return;
      } 

      if (req.method === 'GET') {
        res.end(userFormPage('edit', user));
      }
      else if (req.method === 'POST') {
        getRequestData(req, (data) => {
          const mUser = {...user};
          mUser.firstName = data.firstName;
          mUser.lastName = data.lastName;
          mUser.birthday = 0;// new Date(user.birthday).getTime();
          db.updateUser(mUser);
          res.writeHead(307, {Location: '/users'}).end();
        })
      }
    }

    else {
      console.log("NOT FOUND 404");
      res.statusCode = 404;
      res.end(`<h1>NOT FOUND 404</h1>`);
    }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// function paramExists(key) {
//   const param = params.find
// }

function getRequestData(req, callback) {
  switch(req.headers['content-type']) {
    case contentTypes.formUrlEncoded:
      console.log(req.headers['content-type']);
      let body = [];
      req
        .on('data', chunk => { body.push(chunk); })
        .on('end', () => { 
          body = Buffer.concat(body).toString(); 
          callback(parse(body)); 
        });
      break;
    case contentTypes.formMultipart:
      // do nothing for now
      break;
  }
}

