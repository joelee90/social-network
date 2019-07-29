new terminal

node bundle-server.js

React.Component - C capital

- [x] logged in -> see logo upper left hand corner

determine whether user loggedin or not.

- [ ] react app - know whether user is loggedin or not

2 components

- [ ] registration(form, button)
- [ ]  welcome(main parent, logo, message)



Part 2 welcome#/login

- [ ] login 

  

url: /welcome#/ - loggedout

url : anything else - loggedin

start.js to look at the 'url' (check loggedin/not)

ajax -> server 

res.json 



- [x] app.js x
- [ ] start.js -welcome
- [ ] index.js 
- [ ] welcome.js - image, registration
- [ ] registration.js



db name : social

table name : information

sql name : info.sql

- [ ] crypt password
- [x] password type shows error
- [ ] register - btn -> direct to img

--------

middleware 

axios can read cookie, built in cookie parsing

ajax req to server —> compared password —> send json response(work/not work) —> login (no state, but class)

when successfully login —> image

react router - detect changes and response to them by running js code, changes screeen based on the url

two router - logged out(# route), logged in()

regi <—> login switch between in welcome

<db>

SELECT * FROM information WHERE email = 'bj@bj.com';

local lost 8080 —> 

/welcome GET 

1. server gets the request, it sends HTML as the response
2. HTML makes request for bundle.js (compile react js)
3. bundle js activates React
4. **ReactDOM.render renders a component onscreen.



rowCount > 1 —> email exists in db

- [ ] failed to login —> should show error message!!!
- [x] stay in same page, but with message error.
- [ ] after login, go back —> stay or login page?

-------------

<part 3>

logo, user's profile pic - on screen at all times when loggedin.

click —> upload the profile picture. available on everyscreen

3 components : profile, modal(uploader), wrapper component.

single component containing (logo, profile, uploader). —> app(loggedin)

new users - img, bio to be null. 

default user image from google -> for new users. need to show image even if the user didn't upload(use default image). do not put default image in db. leave in null, show default img unitl user uploads.

click on profile pic —> see uploader

x or upload to close the modal. ajax request - should be in upload component.

form data s3, from imageboard(same), after s3 is done, db change. update users row, to set the image of the loggedin user. uploader ajax req - > formdata -> (append the file only) . selects image and starts uploading. 

uploader 

app  - make a function --> uploader to false (x clicked, automatically close after uploaded)

- [ ] first, last hidden behind the default img
- [ ] 

- [ ] close btn
- [ ] modal css
- [ ] 

---------

<part5>

popstatevent - back/forward button 

history.pushState({}, '', '/disco/chicken')

replacement for hash. browser router will do this. 

react will know that the popstate was used and render the correct route. 

Must use link in react. 

page to stay, but only url to change. 

if using links, must be inside the browserouter. 

if user decides to use url to 

no matter what the url is, get the same index.html,

type in correct url to see other ppl' profile.

make component for otherprofile. — ajax request to get users information , id of the user it wants to show. render function, 

class, ajax request to get info of userinquestion. whoes id is in route. 

key forces react to throw 

- [ ] otherprofile.js
- [ ] index.js
- [ ] app.js

render otherprofile only to show(not edit) 

using url : /user/5 —> direct to see the other users profile. otherprofile.js should render profile pic, bio(only view) and ajax request to the corresponding id, which means db.query that gets other users' information to render.

Have to know I am logged in as user 1.

curry0@example.com

password: curry

 Stephanie Liu



***otherprofile.js componentDidMount axios.get url should not match index.js app.get(user)

-------

<Jest>

react test before part 7, 





































