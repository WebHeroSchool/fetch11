let body = document.body;
let href = document.location.href;

let request = (href) => {
  let userName = href.split('=');
  if (userName[1]) {
    username = userName[1];
  } else {
    username = 'flutter'
  }
  return username;
}

fetch(`https://api.github.com/users/${request(href)}`)
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