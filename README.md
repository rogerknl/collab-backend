<p align="center">
  <img src="https://image.ibb.co/fcLZWd/collab_wallet_logo.png" width="500px" />
</p>

> A Bitcoin shared wallet app, designed to rapidly agree and execute group expenses through unanimous voting.

## The idea


## Screenshots
<p align="center">
  <img src="https://preview.ibb.co/fpu5CT/Screen_Shot_2018_07_09_at_13_28_27.png" />
</p>  

## Getting started
Previous installation of redis, mysql and rabbitmq is required. 
Install them with brew and run them one by one with command 'brew services start ______'

1. Clone the repo

```
$ git clone https://github.com/rogerknl/collab-backend.git
$ cd collab-backend
```

2. Install dependencies
```
$ npm install
```

3. Set all  environment variables in .env ( look .env.example )
4. Set all parameters of db in /config/config.json
5. Generate all content of the DB

```
$ npm run migrate
```

6. Start backend development server

```
$ npm run dev
```

7. Start queue consumer's process

```
$ cd queue
$ node index.js
```



##### *** This app requires its frontEnd you can find it [here](https://github.com/YourParmenides/collab-frontend/tree/MVP) ***



## FAQ



### How do I start?

First, you’ll need to create a new account providing username, password and the Bitcoin public key of your wallet. Once you’ve validated your email address and logged in you’ll be able to: a) create new shared wallets and add other users to join it, and b) get invited to previously existing wallets.



### How do I open a new wallet?

Pick a name describing the purpose of it, and Collab will create a new Bitcoin wallet with an exclusive public key. Now you’ll be able to invite other users to be part of your Collab wallet.



### How do create a new operation?

You make a proposal (i.e. spend 0.05 Bitcoins on renting a terrace for Richard’s birthday party) and an e-mail will be sent to all participants of your wallet. When all of them have voted, if the decision is unanimously positive, the action gets executed and the money gets wired to the beneficiary’s account.



### What happens if someone doesn’t agree on proceeding with the action?

If a single user of the wallet votes NO to a particular proposal, the operation won’t proceed and it will get discarded. Everyone involved will receive an e-mail notifying them that the operation has been canceled. Also, a log will be created for consultation purposes.



### Does the transaction destinatary need to be a wallet member?

Not necessarily, you can transfer the money directly to another third party by introducing its wallet public key.



### Who else is in my wallet?

Once inside a wallet of yours, a list with the current members will be displayed. 



### What rights do I have as a wallet user?

All the members of a particular wallet have equal voting rights. No one will be able to execute an action, withdraw funds or add another user without the consent of the rest.



### Can I add other users to an existing wallet?

Any member of a particular wallet can invite another user to join in, but it needs approval of the rest of the existing members. The process will be the same as with the vote on a new transaction:  a new email notification asking if you want that new user added, and, should everyone agree, that user will now be a full member of the wallet with the same privileges as the rest.



### How does money gets transfered into every wallet?

With the public key anyone is able to make inbound transactions to any wallet. 



### Can I be part of multiple wallets at once?

Yes, you could have a myriad of different wallets depending on the purpose (putting together a specific event happening a set date -a neighbourhood BBQ- or a continuous collaboration -a rehearsal space with a few other musicians-) or the people involved (friends, colleagues, family).



### Can I see how much money I have in every wallet I’m in?

You’ll be able to consult in real time the current balance of every wallet, along with its history through time.



### Can I check if there’s any pending operation waiting for me to vote on?

Besides an email notification asking you to vote on everytime a new operation gets proposed, you be able to check your pending ones for every wallet inside the app.


## Built with

* [KOA ](https://koajs.com/)- Framework for node js
* [Redis](https://redis.io/) - ElasticCache
* [MySQL](https://www.mysql.com/) - DataBase
* [RabbitMQ](https://www.rabbitmq.com/) - Open Source Message Broker
* [Bitcore](https://bitcore.io/) - Api for manage bitcoins
* [Nodemailer](https://nodemailer.com/) - Module for nodejs to allow easy as cake email sending
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Library to help you hash passwords


## Contributing

Any contribution is welcome, just fork the repository and do your thing. Then submit a pull request pointing to this repo.


## Authors

- Doruk Akpek - [GitHub](https://github.com/dakpek) [LinkedIn](https://www.linkedin.com/in/dakpek/)

- Roger Canela - [GitHub](https://github.com/rogerknl) [LinkedIn](https://www.linkedin.com/in/roger-canela-2a085826/)

- Xavi Guasch - [GitHub](https://github.com/xaviguasch) [LinkedIn](https://www.linkedin.com/in/xavi-guasch/)

- Carlos Parera - [GitHub](https://github.com/YourParmenides) [LinkedIn](https://www.linkedin.com/in/carlos-parera-alvarez-844ba3123/)

- Jon Portella - [GitHub](https://github.com/jportella93) [LinkedIn](https://linkedin.com/in/jonportella)


## License

This project is licensed under the MIT License.
