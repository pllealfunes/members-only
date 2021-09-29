# Members Only
This project was created using Node, Express, Mongoose, and MongoDB Atlas. The purpose of the project is to practice applying authentication to a node app. The project idea comes from the Odin Project Node.js Curriculum. The description of the project is as follows "In this project you’ll be building an exclusive clubhouse where your members can write anonymous posts. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it."

## To Do
* DB Models
	* Full Name
	* Usernames or use email
	* Passwords
	* Membership Status

* Users
	* Create meassages
	* Not membesr automatically
	* Only see message & timestamp

* Messages
	* Title
	* Timestamp
	* Text

* Sign-up Form
	* Sanitize & Vlaidate form fields
	* Secure Passwords with bcrypt
	* confrimPawssword field & valaidte using using custom 	validator

* Page to become a member
	* Enter secret passcode correctly to upgrade memebership status
	* Upgrade member status
	* Members should see author

* Logn-Form
	* Use Passport
	* If logged in show link to create new message
	* Create create message form

* Home
	* Display all messages

* Optional Field: Admin
	* Add ability to become an Admin
	* Show Admin status
		* Passcode or checkbox in sign up form
	* Able to delete messages & see delted messages
		* admin == true

## Final Product Goal
By this point, anyone who comes to the site should be able to see a list of all messages, with the author’s name hidden. Users should be able to sign-up and create messages, but ONLY users that are members should be able to see the author of each message. Finally, you should have an Admin user that is able to see everything and also has the ability to delete messages.