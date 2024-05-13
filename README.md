## Readius!
Readius is a book swapping app made with React-Native! Ths is my very first React-Native project and am currently still working on it. Below is a demo of the latest version I have and a TDO list of what I am still intending to do. I will be updating this README and repo constantly :)

https://github.com/ayadebbagh/Readius/assets/114888002/e551784a-a4cb-41b2-b44d-eabbc03cabda

## TODO:

- Fixes:
  - block navigation from manually going back to sign up unless user logs out ✅
  - find a way to store images uploaded to display them on any device instead of using the local path as uri (AWS3, Firestore...) ✅
  - clear email and password field after user logs in
  - unhandled rejections like if no banner/pfp are chosen
  - Manage email with useContext instead of passing it to every screen
- Features:
  - adding books and displaying them on each profile (make component for the diplay of the books) ✅
  - Book info screen:
    - User admin features:
      - Delete book from library
      - Change description, title, author
    - Other uses' features:
      - mark the book as wanting to swap with it
  - searching for books on the main menu (based on title, author...) - notify user that a seconf user wants to swap book
  - accept or deny swap request
  - if accept, user chooses which book they want to swap with
