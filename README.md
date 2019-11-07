# Applitools Hackathon Tests

## Regression bugs found between version V1 and V2 using cypress.io

- Login form has a header with 'Logout' text instead of 'Login'
- Icons next to username and password input fields are not displayed in V2
- V2 has a 'Pwd' label next to the password field, this is most likely a bug
- V2 has a 'ABC$*1@' placeholder instead of 'Enter your password' in V2. V1 version was much more user friendly
- LinkedIn button is missing in V2
- No validation text is displayed when user tries to login providing only username and no password
- Sorting the table by amount **does not work** in V2, table rows are not sorted properly
- Only one Flash Sale GIF is displayed in V2 and its different than the one in V1

## Areas to investigate
- There's a different username placeholder in V2, to be clarified with the team
- There is a different error message when no username and password was provided, to be clarified with the team whether this is a bug
