# Applitools Hackathon Tests

## Part 1
### Regression bugs found between version V1 and V2 using cypress.io

- Login form has a header with 'Logout' text instead of 'Login'
- Icons next to username and password input fields are not displayed in V2
- V2 has a 'Pwd' label next to the password field, this is most likely a bug
- V2 has a 'ABC$*1@' placeholder instead of 'Enter your password' in V2. V1 version was much more user friendly
- LinkedIn button is missing in V2
- No validation text is displayed when user tries to login providing only username and no password (it's actually present in the DOM but it's not shown to the user)
- Sorting the table by amount **does not work** in V2, table rows are not sorted properly
- Only one Flash Sale GIF is displayed in V2 and its different than the one in V1

### Areas to investigate
- There's a different username placeholder in V2, to be clarified with the team
- There is a different error message when no username and password was provided, to be clarified with the team whether this is a bug

## Part 2

### Regression bugs found **only** by Applitools Eyes

- 'Remember me' label next to a checkbox on login page is shifted to the right, a visual regression
- A validation message when user provides only their password is shifted to the left, another visual regression
- Canvas Chart was straight up impossible to test with cypress. There's a bug between V1 and V2 - the 2018 values for January and June are different. The best part is - I was **UNABLE** to notice that with my own eyes, I'm really impressed
- It's not a bug so it's been ignored as such, but there's a different Flash Sale GIF displayed in V2

