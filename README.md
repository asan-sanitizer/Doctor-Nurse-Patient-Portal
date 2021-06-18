# React , Express API 

![image](https://user-images.githubusercontent.com/15072510/122599108-cf082f00-d03b-11eb-898d-1c19b298a9b4.png)

## Project Specification 

### HP(High Priority) , LP(Low Priority) , MP(Medium Prirority)

- User registration/login
- If user is a nurse:
    - Allow user to input vital signs: body temp, heart rate etc. *[HP]*
    - allow user to access info from prev visit. (ie patient should have a history of prev records ) *[HP]*
    - allows them to send motivational tips to patient  (broadcast messgae to patient ) *[LP]*

- If a user is patient:
    - allow user to create and send emergency alert to first responders. (need to store it in a collection)* [MP]*
    - allow user to run motivational video / games (i have no idea how to go about this) *[LP]*{for now }
    - allow user to enter daily info such (pulse rate, weight, temp, respiratory rate) *[HP]*
    - allow user to use checklist of common signs and symptoms.  *[MP]*


## Database Design [Needs Redesign]
- ### User 
    - firstName : String
    - lastName : String
    - category : String (??)
        - `Nurse`
        - `Patient`
    - email : String
    - password : String
    - ID  : ObjectId

- ### Nurse 
    - Patients : List<Patient> 
    - currentPatientId : ObjectId
    - Alerts: List<Alerts>

- ### Patient 
    - BP: String
    - temp: String
    - heart_rate : String
    - Symptoms : List<String> 

- ### Alert 
    - sentBy : Patient  
    - message : String
    
#### Note: ID in `User` collection refer to other collections namely Nurse and Patient 
