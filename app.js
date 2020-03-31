var firebaseConfig = {
    apiKey: "AIzaSyAMu_JIQpYHQUhDT4_EnG7sdQqV6LrOW9E",
    authDomain: "favouritebook-5a724.firebaseapp.com",
    databaseURL: "https://favouritebook-5a724.firebaseio.com",
    projectId: "favouritebook-5a724",
    storageBucket: "favouritebook-5a724.appspot.com",
    messagingSenderId: "1064227546027",
    appId: "1:1064227546027:web:b3b8bda919ef7389ca28ee",
    measurementId: "G-LVVQ40N35G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const bookList = document.querySelector('#book-list');
const form = document.querySelector('#add-book');


function renderBook(doc){
    let li = document.createElement('li');
    let Name = document.createElement('span');
    let Surname = document.createElement('span');
    let Title = document.createElement('span');
    let Genre = document.createElement('span');
    let Published = document.createElement('span');
    let ISBN = document.createElement('span');

    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    Name.textContent = doc.data().Name;
    Surname.textContent = doc.data().Surname;
    Title.textContent = doc.data().Title;
    Genre.textContent = doc.data().Genre;
    Published.textContent = doc.data().Published;
    ISBN.textContent = doc.data().ISBN;
    cross.textContent = 'x';

    li.appendChild(Name);
    li.appendChild(Surname);
    li.appendChild(Title);
    li.appendChild(Genre);
    li.appendChild(Published);
    li.appendChild(ISBN);
    li.appendChild(cross);

    bookList.appendChild(li);

    //Delete Data
    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Books').doc(id).delete(); //Reference with ID
    })



}

//Save Data to DataBase
form.addEventListener('submit', (e)=> {
    e.preventDefault(); //Page doesnt refresh after submitting text
    db.collection('Books').add({
        Name: form.Name.value,
        Surname: form.Surname.value,
        Title: form.Title.value,
        Genre: form.Genre.value,
        Published: form.Published.value,
        ISBN: form.ISBN.value,
    })
    form.reset(); //full reset of items above after submitting
})
//Get Data from DataBase

// real-time listener
db.collection('Books').orderBy('Name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderBook(change.doc);
        } else if (change.type == 'removed'){
            let li = bookList.querySelector('[data-id=' + change.doc.id + ']');
            bookList.removeChild(li);
        }
    });
});
