# Hotel Booking App

Hi All, 
Have created the Todo list app which contains the following pages & features:

 1. Login Screen
 2. Registration Screen
 3. Forget Password
 4. Dashboard - Hotel Listing
    - User all hotel listing
    - Admin hotel booking request screen
 6. Hotel Details Screen
    - User's screen contain book and cancel button
    - Admin screen contain accept and reject booking button
 8. Custom Header shows following details:
    - Back button
    - Title
    - Cart icon for user if there is any booking info available
    - Logout

***Learned Here:*** 

 1. Screen Design / JSX.
 2. Flex-Box
 3. Stylesheet
 4. Auth Flow using REDUX
 5. State -- Props
 6. Async storage (insert, delete)
 7. Session handling (Once login, don't need to login again)
 8. Different reducer handling

```mermaid
graph LR
x((App Launch)) --> A(Redux Store) --> B((Is Logged In Session Available)) -- Available (Admin) --> C(Admin Dashboard Listing Screen)
B -- Available (User) --> G(User Dashboard Screen)
B -- Not Available --> D(Login Screen)
D -- No Account Available --> E(Signup Screen)
D -- Password Can't remember --> F(Reset Password Screen)
D -- is successful logged in then Store loged in session --> A
B -- is loged in type user asked to redux, show all hotel listing --> G
B -- is loged in type admin asked to redux, show all booking request listing --> C
G -- store add to cart info --> A
C -- store add to cart info --> A
```

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/1.png)
> Login Screen

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/2.png)
> Reset Password Screen

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/3.png)
> Signup Screen

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/4.png)
> Email validation on Login Screen

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/5.png)
> User's dashboard with list of hotel screens

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/6.png)
> User's hotel details screen

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/7.png)
> User's hotel details screen after booking
> - Booking button changed to cancel button
> - On header cart icon appeared along with item count

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/8.png)
> User's hotel hotel listing page after cart item added

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/11.png)
> Admin's dashboard contain list of booking request

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/12.png)
> Admin's hotel details screen along with following button:
> - Accept Booking
> - Reject Booking

![](https://github.com/reach2kaustavshee/OfficePOC/blob/main/project_screenshots/13.png)
> Details screen showing booking status, whether it is accepted or rejected










