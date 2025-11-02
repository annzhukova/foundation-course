// local reviews data
const reviews = [
    {
      id: 1,
      name: 'susan smith',
      job: 'web developer',
      img: 'https://images2.imgbox.com/e0/57/qI5bbwvg_o.jpeg',
      text: "Twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: 'anna johnson',
      job: 'web designer',
      img: 'https://images2.imgbox.com/2e/6e/JAMvTZ56_o.jpeg',
      text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
      id: 3,
      name: 'peter jones',
      job: 'intern',
      img: 'https://images2.imgbox.com/56/88/oJvFN3l5_o.jpeg',
      text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
    },
    {
      id: 4,
      name: 'bill anderson',
      job: 'the boss',
      img: 'https://images2.imgbox.com/8b/1c/vwWNTsCd_o.jpeg',
      text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
  ];

  const reviewAuthor = document.getElementById("reviewAuthor");
  const job = document.getElementById("job");
  const comment = document.getElementById("comment");
  const personImage = document.getElementById("person-img");

  const showReview = (id) => {
    reviewAuthor.textContent = reviews[id].name;
    job.textContent = reviews[id].job;
    comment.textContent = reviews[id].text;
    personImage.src = reviews[id].img;
  }

  //showReview(3);

  clickRandomReview = document.querySelector(".random-btn");
  clickLeftReview = document.querySelector(".fa-chevron-left");
  clickRightReview = document.querySelector(".fa-chevron-right");
 
clickRandomReview.addEventListener('click', ()=>{
  let randomIndex = Math.floor(Math.random()*reviews.length);
   showReview(randomIndex);
});

clickRightReview.addEventListener('click', showNextReview);
clickLeftReview.addEventListener('click', showPrevReview);

function showNextReview() {
    let currIndex = getCurrIndex();
    let nextIndex = 0;
    if (currIndex >= reviews.length-1) {
      nextIndex = 0;
    } else {
      nextIndex = currIndex + 1;
    }
    showReview(nextIndex);
}

function showPrevReview() {
  
    let currIndex = getCurrIndex();
    let prevIndex = 0;
    if (currIndex === 0) {
      prevIndex = reviews.length-1;
    } else {
      prevIndex = currIndex - 1;
    }
    showReview(prevIndex);
}

function getCurrIndex(){
  let currIndex = 0;
  let currAuthorName=reviewAuthor.textContent;
  for (let i=0;i<reviews.length; i++) {
    if (reviews[i].name === currAuthorName){
      currIndex = i;
    }
  }
  return currIndex;
}

//Hw add prev and next functionality (disable or cycle it)

