1. npm run installDeps
2. npm start
    - It should open the browser at http://localhost:3000/ with the initial Application
    

# REST endpoints : 

# Projects

## Create
      URL : POST http://localhost:90/api/projects
      
      Example Request : 
        
        {
        "name": "Project3", 
        "description": "Project 4 Example"
        }

## List
  
URL : GET http://localhost:90/api/projects
    
    Example Response : 
        
       [
           {
               "_id": "5bf3959b1e53214ea0b80613",
               "name": "Project1",
               "description": "Project 1 Example",
               "__v": 0
           },
           {
               "_id": "5bf395c21e53214ea0b80614",
               "name": "Project2",
               "description": "Project 2 Example",
               "__v": 0
           },
           {
               "_id": "5bf395c91e53214ea0b80615",
               "name": "Project3",
               "description": "Project 3 Example",
               "__v": 0
           }
       ]

## Get Project by ID
  
URL : GET http://localhost:90/api/projects/{id}
    
    Example Response : 
        
       {
           "_id": "5bf3959b1e53214ea0b80613",
           "name": "Project1",
           "description": "Project 1 Example",
           "__v": 0
       }


## Delete project
 
 URL : DELETE http://localhost:90/api/projects
 
  Example : 
        
        {
        	
        	  "id": "5bf395cf1e53214ea0b80616" 
        }


# Users

Unique key : email

## Create 

- URL : PUT http://localhost:90/api/users
      
      Example Request : 
        
        {
           	"firstName": "Peter", 
              "lastName": "Parker",
              "email" : "peter@hotmail.com",
              "password" : "hello123",
              "photo" : "https://i.imgur.com/rzPz4qG.jpg",
              "skills" : "javascript,java,html,nodejs"
        }

## List  
-   URL : GET http://localhost:90/api/users
    
   Example Response : 
            
           [
               {
                   "_id": "5bfe26b1b509011b709f6501",
                   "firstName": "Peter",
                   "lastName": "helloWorld",
                   "email": "peter@hotmail.com",
                   "password": "EdTdw1fggilo2/0ia24cKqwBjQdqVNpPZeHcgYBoSsM=",
                   "photo": "https://i.imgur.com/rzPz4qG.jpg",
                   "skills": "javascript,java,html,go",
                   "__v": 0
               }
           ]


Get User by ID
  
URL : GET http://localhost:90/api/users/{id}
    
    Example Response : 
        
       {
           "_id": "5bfe26b1b509011b709f6501",
           "firstName": "Peter",
           "lastName": "helloWorld",
           "email": "peter@hotmail.com",
           "password": "EdTdw1fggilo2/0ia24cKqwBjQdqVNpPZeHcgYBoSsM=",
           "photo": "https://i.imgur.com/rzPz4qG.jpg",
           "skills": "javascript,java,html,go",
           "__v": 0,
           "teamID": "5bfe2be542c48127fc5d5e6f"
       }


## Update  
  
-   URL : POST http://localhost:90/api/users
     
      Example : 
            
            {
                
                  "firstName": "Peter", 
                  "lastName": "Parker",
                  "email" : "peter@hotmail.com",
                  "password" : "helloWorld",
                  "photo" : "https://i.imgur.com/rzPz4qG.jpg",
                  "skills" : "javascript,java,html,go",
                  "teamID": "5bfe2be542c48127fc5d5e6f"
            }


   
## Delete
 
  URL : DELETE http://localhost:90/api/users
  Example : 
        
        {
        	
        	  "id": "5bfe26b1b509011b709f6501" 
        }


# Teams

Unique key : name

## Create 

- URL : PUT http://localhost:90/api/teams
      
      Example Request : 
        
        {
        	  "name": "Team A", 
              "skills" : "javascript,java,html,nodejs",
              "members" : "member1,member2,member3"
        }

## List
  
-   URL : GET http://localhost:90/api/teams
    
    Example Response : 
        
        [
           {
               "_id": "5bfe2be542c48127fc5d5e6f",
               "name": "Team A",
               "skills": "javascript,java,html,nodejs",
               "members": "member1,member2,member3",
               "__v": 0
           }
       ]


## Get Team by ID
  
URL : GET http://localhost:90/api/teams/{id}
    
    Example Response : 
        
       {
           "_id": "5bff676f700139209c52e93e",
           "name": "Team B",
           "skills": "javascript,java,html,nodejs",
           "members": "member1,member2,member3",
           "__v": 0
       }

## Update

-   URL : POST http://localhost:90/api/teams
  
  Example : 
        
        {
        	  "name": "Team A", 
              "skills" : "javascript,java,html,nodejs",
              "members" : "member1,member2,member3,member4"
        }


## Delete 
 
- URL : DELETE http://localhost:90/api/teams
 
  Example : 
        
        {
        	
        	  "id": "5bfe26b1b509011b709f6501" // This is automatically assigned when the project is created
        }
# Bids

Any team member can Bid but only one bid is accepted per Team. Teams should coordinate to make their selection and then any team member can send the vote. 

## List
  
-   URL : GET http://localhost:90/api/bids
    
    Example Response : 
        
        [
            {
                "_id": "5bff51fdbcec4035144372be",
                "projectID": "5bf395c91e53214ea0b80615",
                "teamID": "5bfe2be542c48127fc5d5e6f",
                "__v": 0
            }
        ]


## Get Bid by ID
URL : GET http://localhost:90/api/bids/{id}
    
    Example Response : 
        
       {
           "_id": "5bff51fdbcec4035144372be",
           "projectID": "5bf395c91e53214ea0b80615",
           "teamID": "5bfe2be542c48127fc5d5e6f",
           "__v": 0
       }


## Create
  
-   URL : PUT http://localhost:90/api/bids
    
    Example Request : 
        
        {
        	  "projectID": "5bf395c91e53214ea0b80615", 
              "teamID" : "5bfe2be542c48127fc5d5e6f"
        }


## Delete 
 
- URL : DELETE http://localhost:90/api/bids
 
  Example Request : 
        
        {
        	
        	  "id": "5bfe26b1b509011b709f6501" 
        }
