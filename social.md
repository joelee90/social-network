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

---------

Hooks

'state'-when data changes, display updates. 'lifecycle' methods-

useState-

useeffect-hook into component life cycle, ex)componentdidmount. 

 hook should begin with "use". cannot be used in class component. highest level in the function. (top level)

<part 6>

new route - find people.js,  route: /users/

function component, useState, useEffect, 

first time mount - > ajaz req get 3 recently registered users, db query  SELECT * order by id descedning limit 3, textfield, afjax req get users they typed and render on screen. click to go their porfile. id, profile pic, first, last (different queryfor search - pattern matching, ILIKE case insensitive, ). useState- 2 things, users-update the display, array of users, array of users in state in find people. 

- [ ] findpeople.js
- [ ] index.js ajax req
- [ ] app.js axiom

if user goes to users, they should be able to see new 5 register people. index.js make a ajax req and in findpeople.js axios to get the data from db and render back to the browser.

- [x] click photo —> link to the person's bio

  ---

  

<making your own hooks >

To share functionality. ex) login and register. 

<part 7>

otherprofile.js : 

<friendButton otherProfileId={this.props.matchparams.id} />

Profile Owner

Profile Viewer

Click bnt -> change state

Once become friends, both have 'end friendship' button. 

4 states: 4 possible actions.

Only "accept friend request" , no refusing.

db represenation between users —> new table(friendship)

Make a query to the 'friendships' table. If the rows are empty, viewer and receiver are not friends. If it is in pending state, able to cancel or accept the request.

viewer is a receiver who accepts friend request.

query - viewer owner have both ids in it(if no row)
if yes row - 

based on the db, click handler to the button

btn - ajax - data from db - figure what to show - figure what to do

queries : 4

initial query - ajax req - (friends or not?) -

-SELECT * FROM friendships WHERE (sender_id = $1  AND  receiver_id = $2) 
OR (sender_id = $2 AND receiver_id = $1)

-INSERT - making friend

-UPDATE - accepting friend

-DELETE - Cancel/end friend

what to render based on the data. 

no of routes : 2 -> get(), post()
1 - making INSERT
2 - accepting UPDATE
3 -unfriend DELETE

1 click handler - post - what to do depending on current state.

look at the table, drop frequently, 

testing -using two browsers.

---------

check to see if friends or not -> add friend btn -> ajax req -> INSERT 

check to see if friends or not -> if pending -> update(accept)

check to see if friends or not -> if friends -> DELETE



componentDidMount - check the relation between the two people. 

and then decide whether to show "add button" or "cancel button"

---------

- [ ] test for part 7 / bio edit
- [ ] personal project outline(meetup & tripadvisor)
- [ ] part 7 리뷰 accepted true/false 확인
- [ ] 리액트읽어보기
- [ ] bioedit -> edit/save btn should not be seen.

——————————————Redux————————————————

state: instance(0bject) - put anything want to keep track of. every component has its state. local state-component, global state-redux is keeping track of. 

updatebio 

reducers - functions that make the change to the state that happen. one function that can get big. one big function. when called(entire state object, action) figure what changes need to be made, returns a new object/state (needs to be new). reducers - pure function, may receive argument, returns output. does not dipend outside. predicatable. cannot mutate any object. replace the old state object with the new state object. 

object.assign copies the properties of the object. 

reduce

Store : 

edit/save btn should disappear when texture apprears(editing: true)

editing:flase 

kristen curry2@example.com

avalon curry3@example.com



"cancel" only show when both parties are on pending state of friendships

"remove" should show on both parties when "accepted:true"

problem : even when both parties are friends, showing "cancel" instead should show "remove"

fixed it by index.js app.get by replacing the buttonText in else to "cancel friend"





























