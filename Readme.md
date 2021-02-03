# Discord Website Notifier

Script will run every 1 minute. It loops over the websites on the websites.json and checks if there were any changes on that website.  If there were changes, it sends a notification through a discord webhook saying that there were some changes, and a link to the website.

To get going:

1. Go to **websites-default.json** and renameit to **websites.json**. Fill it out with your desired data
2. Run npm install, and run your index.js file
```bash 
npm install
node index.js # run the node server
```

