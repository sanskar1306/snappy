# Snappy

Snappy is a realtime chat application built usin React.js, Node.js, MongoDB and Sockets.

- This Repository only contains the frontend for CineCup. Do check the [Backend](https://github.com/sanskar1306/snappy).

![Home page](<https://github.com/Shikhar15606/CineCup/blob/main/screenshots/Screenshot%20(41).png?raw=true>)


## Main features

- Authentication using Facebook, Google or signup using email.
- Reset password and email verification using mails.
- Search among millions of movies by default search page will be showing the trending films.
- Share movie details through social media platforms like Whatsapp, Facebook and Twitter.
- Movies can be nominated and removed from Nominations whenever a contest is live.
- Not just one, the site can be used to hold multiple contests and store their rankings.
- Watch trailers and teasers of millions of movies.
- Rate and review movie.
- Leaderboard has a search bar which can be used to search for a movie quickly.
- The website is fully responsive
- Dark and Light mode toggling.
- Announcements on the home page, new announcements can be added by admin using his dashboard
- Email notifications will be sent to users' registered emails whenever a contest is started or ended, or the user's nominated movie is blacklisted.
- Blacklisting a movie, make other users admin just by one click (Only be done by admin on his dashboard).

## Tech Stack

- We have used **React** in the frontend.
- **Node js** for most the Backend and User Authentication.
- **MongoDB** as our database.

---

## How to Setup

```bash
git clone https://github.com/sanskar1306/snappy.git
cd CineCup
npm install
```


```JS
export const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
export const USERNAME = 'USERNAME';
export const PASSWORD = 'PASSWORD';
export const API = 'http://localhost:5000';
```

```bash
npm start
```

- This will start the server on port 3000

**To get admin access contact us at shikharshukla15606@gmail.com or sanskarkabra1306@gmail.com**

- Without admin access you can't blacklist or start or stop any contest
- Login with facebook will work only in the deployed version and not on localhost, as the app is in production mode

---

