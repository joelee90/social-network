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

- [x] test for part 7 / bio edit
- [ ] personal project outline(meetup & tripadvisor)
- [x] part 7 리뷰 accepted true/false 확인
- [x] 리액트읽어보기
- [x] bioedit -> edit/save btn should not be seen.

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

managing application's state -> dealing with state changes that occur as application is used. 

——————————————Part 8————————————————

1. Server

   1. 3 Routes are needed

      1. route to get the list of friends and wannabes

         1. should do one query to get  a combined list of friends and wannbes.

            ```sql
            SELECT user.id, firstname, lastname, url, accepted 
            FROM frienships
            JOIN information
            ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
            ```

            one list that combines - component use use selector, 

      2. routes for making a wannabe a friend (reuse)

      3. route for ending a friendship (reuse)

2. Client

   * Start.js

     - [ ] a ton of imports
       - [x] `"createStore`", "`applyMiddle`"(redux)
       - [x] "reduxPromise"(redux-promise)
       - [x] "provider"(react-redux)
       - [x] "composedWithDevTools" (redux-devtools-extentions)
       - [x] your reducer (./reducers.js)
     - [x] create the store with the redux promise middleware applied and redux devtools enabled
     - [ ] wrap your <App/> in <Provider> and pass that to "ReactDOM.render", pass the store you created as a prop <Provider> 

   * app.js

     - [x] import new friends component
     - [x] new route for friends component

   * friends.js(new)

     - [x] import 'useEffect'
     - [x] import 'useDispatch' and 'useSelector'
     - [ ] import three action creators
     - [x] export a function component
     - [ ] get a dispatch function by calling the "userDispatch" hook (exported by react-redux)
     - [ ] use the 'useSelector' hook exported by react-redux to get two diffrent list of users
       * one list  (friends) is the friends and wannabes from the redux state with all of the unaccepted friend requests filtered out
       * one list (wannabes) is the friends and wannabes from the redux state with all of the accepted friend requests filtered out
     - [ ] when the function mounts, (use 'useEffect' to know this) it should dispatch the action for getting the array of friends and wannabes.
     - [ ] map the friends obtained by calling 'useSelector' into an array of JSX elements to render
       * add a button or link with a click handler that dispatches the action for ending friendship
     - [ ] map the wannabes obtained by calling 'useSelector' into an array of JSX elements to render.
       * add a button or link with a click handler that dispatches the action for accepting  friend request

   * actions.js(new)

     * three action creaters are needed

       * - [ ] one that creates the action for retrieving the list of friends and wananbes

         * will have to attach the array retrieved from the server to the returned action so the reducer can put it into state

       * - [ ] one that accepts a friend request

         * after the ajax request, return a action that has the id of the user whose request was accepted attached

       * - [ ] one that ends a friendship

         * after the ajax request, return an action that has the id of the user whose friendship was ended attached

     * All three action creators need to return a promise that is resolved with the appropriate action object.

     ```javascript
     export async ajaxThenAction() {
       await axios.get('/some-route');
       return {
         type: 'SOME_ACTION'
       }
     }
     ```

   * reducers.js(new)

     * export single function that expects to receive two arguments, a state object and an action

       * use default argument syntax to make sure the state object is not undefined
       * make sure this function _always_ returns a state object.

     * the reducer needs three conditionals for three different action types

       * the action for receiving friends

         * create a new object that has all the same properties as the old state object except a new property is add (an array containing the list of friends and wannabes attached to the actions)

         * ```javascript
           if (action.type == 'RETRIEVE_FRIENDS_WANNABES') {
           	return (
           		...state,
           		friendsWannabes: action.friendsWannabes
           	)
           }
           ```

         * 

       * the action for accepting friend requests

         * create a new object that has all the same properties as the old state object except the array of friends and wannabes is replaced with a new array that contains all the same objects as the old array except one is replaced with a new object that has all the same properties as the old object except its accepted property is set to true

       * the action for unfriending

         * create a new object that has all the same properties as the old state object except that the array of friends and wannabes is replaced with a new array that does not include the object whose id matches the id attached to the action





const person = {
    name: "jon",
    age: "24"
}

const {name} = person;
const name = person.name;

-----------------------------------------socket io(server and client)-----------------------------------------

-----------------------------------------Additional Features-----------------------------------------

1. Img - delete the image at the time replacing the image. 

3. *new route chat/userid - chat with one user. or putting it into other person's profile. 

   find userid(socket.id) io.socket.socket. if offline? put msg on db, and show the message when online again. add column in chat. 

4. *wall post - leave msg on friend's wall. make people post other than text(img board), links - 

   cheerio npm - for sharing link and displaying small amount of the article.

5. *receiving notification when online, event that only happens when receives request. 

6. see list of friend's from friend's profile. see friends of friends. random friends. 

7. 

server: emit on  -> save in db. when bringing back to everyone -> reducer ->

emit - client

on - server



db saved . bring the chat so everyone can see. 

-  db query to get the chat message.
-  render it to the screen.
-  when server wants send so everyone can see -> 

server -> db -> socket.js -> action.js -> reducer.js -> redux -> chat.js

chat message - send

chat message - show

after new message, returns an emtpy message.  when saving in newMsg, the data is converted

db reading query -> should be able to include the new data

chats

id | sender_id | message | created_at

information

id | firstname | lastname | email | password | url | bio | created_at

-----------------------------------------To do-----------------------------------------

- [ ] created at - show time only
- [ ] chat room height
- [ ] gibberish search - search not found

























