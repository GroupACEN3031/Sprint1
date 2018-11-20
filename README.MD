1. npm run installDeps
2. npm start
    - It should open the browser at http://localhost:3000/ with the initial Application
    

# REST endpoints : 

1. Create project
      URL : POST http://localhost:90/api/projects
      
      Example Request : 
        
        {
        "name": "Project3", 
        "description": "Project 4 Example"
        }

2. List Projects
  
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
   
3. Delete project
  URL : DELETE http://localhost:90/api/projects
  Example : 
        
        {
        	
        	  "id": "5bf395cf1e53214ea0b80616" // This is automatically assigned when the project is created
        }
