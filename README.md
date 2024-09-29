# Readius

Readius is a book swapping app built with React Native. It's my very first project using this framework!

## Installation

1. Clone the repository:
```git clone https://github.com/ayadebbagh/Readius.git```
```cd Readius```
3. Install dependencies:
```npm install```
4. Download the Expo app on your phone.

5. Start the development server:
```npx expo start --tunnel```
6. Scan the generated QR code with your phone's camera.

7. When prompted, enter the app password: **ReadiusApp**

## How it works

In this first version of Readius, you can:

- Upload books to your personal library
- Explore books on the Explore page by searching for:
- Titles
- Authors
- Usernames of book uploaders

When you find a book you like:

1. Click on it to view its description
2. The uploader's username is displayed
3. Click on the username to be redirected to their Instagram profile
4. Message them to arrange a swap

The other user can then:

1. Search for your username in the Explore page
2. Browse your library to pick a book they'd like in return

If you're the owner of a book, you can edit or delete your listing directly from the book description page.

Happy swapping!

## Todo

- [ ] Implement dark mode for better night-time viewing
- [ ] Improve image quality while maintaining efficient database storage
- [ ] Enhance error handling, particularly for cases when users don't add an information to book listings
- [ ] Add user authentication and profiles to replace Instagram messaging
- [ ] Implement in-app messaging system

## Known Issues

- Book images are currently of lower quality to save space in the database. We're working on a solution to improve this without significantly increasing storage requirements.
- Error handling is still basic. In some cases, like when a user doesn't add an image to a book listing, the app may not provide clear feedback. We're actively working on improving this.
