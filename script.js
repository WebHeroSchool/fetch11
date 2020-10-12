let body = document.body;
let href = document.location.href;

let now = new Date();

let request = (href) => {
  let userName = href.split('=');
  if (userName[1]) {
    username = userName[1];
  } else {
    username = 'flutter'
  }
  return username;
}

const getName = new Promise((resolve, reject) => {
  setTimeout (() => request ? resolve(request) : reject('Имя не найдено'), 2000);
})

const getDate = new Promise ((resolve, reject) => {
  setTimeout (() => now ? resolve(now) : reject('Дата не найдена'), 2000);
})


Promise.all([getName, getDate])
  .then ((now) => {
    const time = document.createElement('p');
    time.innerHTML = now;
  })
  .then ((request) => fetch(`https://api.github.com/users/${request(href)}`)
  .then(rep => rep.json())
  .then(json => {
  	const name = document.createElement('a');
  	if (json.name != null) {
      name.innerHTML = json.name;
      name.href = json.html_url;
  	} else {
  		name.innerHTML = 'Информация о пользователе не доступна'
  	}
  	  body.append(name);

  	const img = document.createElement('img');
  	if (json.avatar_url != null) {
      img.src = json.avatar_url;
  	} else {
  		img.src = 'Информация о пользователе не доступна'
  	}
  	  body.append(img);

  	const bio = document.createElement('p');
  	if (json.bio != null) {
      bio.innerHTML = json.bio;
  	} else {
  		bio.innerHTML = 'Информация о пользователе не доступна'
  	}
  	  body.append(bio);
  })
  .catch(err => console.log(err));