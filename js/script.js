// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];


// I
const mainEl = document.querySelector("main");

mainEl.style.backgroundColor = 'var(--main-bg)';

mainEl.innerHTML = " <h1>SEI Rocks!</h1>"

mainEl.classList.add("flex-ctr")


// II
const topMenuEl = document.getElementById("top-menu")
topMenuEl.style.height = '100%'
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
topMenuEl.classList.add('flex-around')

// III
for ( let link of menuLinks ) {
    let a = document.createElement('a')
    a.setAttribute('href', link.href)
    a.innerHTML = link.text
    topMenuEl.appendChild( a )
}


  // IV
const subMenuEl = document.getElementById('sub-menu')
subMenuEl.style.height = '100%'
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'
subMenuEl.classList.add('flex-around')
subMenuEl.style.position = 'absolute'
subMenuEl.style.top = '0'


// V
const topMenuLinks = topMenuEl.querySelectorAll('a')
console.log(topMenuLinks)
let showingSubMenu = false;

//Saving the "link" object in a variable will come in handy for passing its subLinksarray



topMenuEl.addEventListener('click', function(event){
  event.preventDefault()
  //this if statement is returning if the element clicked was not an <a>element, else it's logging the content of a clicked <a> element

  if (event.target.matches("a")){
    console.log(event.target.innerHTML)
    

     // if the clicked <a>link has a class of active, remove it
     
     if (event.target.matches(".active")){
     
      event.target.classList.remove("active") 
      showingSubMenu = false
      subMenuEl.style.top = 0
      return
     }

      for(let link of topMenuLinks) {
        link.classList.remove("active") 
      }
      
      event.target.classList.add("active")
      
      //-------------------------------
    
      // subLink's array  variable
      const subLink = []

           // parsing the subLinks array of the clicked event.target and pushing it to subLink array 
      for (let link of menuLinks) {
          if (link.text === event.target.text) {
              subLink.push(link.subLinks) 
            }
        }

      //Code the buildSubMenu function
      function buildSubMenu(array) {
        //clear the content of subMenuEl
       subMenuEl.innerHTML = ""
    
       //iterating over the subLink array and creating <a></a> elements with hrefs for each item
        for (let link of array) {
         let a = document.createElement('a')
          a.setAttribute('href', link.href)
          a.innerHTML = link.text
          subMenuEl.appendChild( a )
          }
        }

      //excluding the ABOUT section that has no sublinks
      if(event.target.text !== "about") {
        showingSubMenu = true
        buildSubMenu(subLink[0]) 
        subMenuEl.style.top = '100%'
      } else {
          //Task 6.4
          mainEl.querySelector("h1").innerText = event.target.innerText
      
        showingSubMenu = false
        subMenuEl.style.top = '0'
      }

      
  } 
  else {
   return
  }

})


// VI

subMenuEl.addEventListener("click", function(event) {
  event.preventDefault()
  if(!event.target.matches("a")){
    return
  }
  console.log(event.target.innerHTML)

  showingSubMenu = false
  subMenuEl.style.top = '0'
  for(let link of topMenuLinks){
    link.classList.remove('active')

  }
  
  mainEl.querySelector("h1").innerText = event.target.innerText
})



