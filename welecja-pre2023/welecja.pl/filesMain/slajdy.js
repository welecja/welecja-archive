var slides_slajdDivId = '#slajdy';
var slides_czasZmiany = 8;
var slides_szerokoscZdjecia = 655;
var slides_wysokoscZdjecia = 234;
var slides_slideShow = new Array();

var slides_aktualnieLadowany = -1;
var slides_zaladowaneZdjecia = new Array();
var slides_aktPokazywane = 0;
var slides_firstTurn = true;
var slides_pozostalyCzas = slides_czasZmiany;
var slides_zdjecieAnimowane;

function slideShowNext() {
   if (slides_pozostalyCzas>0) {
      return;
   }
   
   //zmiana zdjecia
   
   //jesli nastepne nie zaladowane to czekamy
   
   if (slides_aktPokazywane+1>=slides_zaladowaneZdjecia.length && slides_zaladowaneZdjecia.length<slides_slideShow.length)
      return;
     
   var doPokazania;
   //jesli jest to jedziemy
   if (slides_aktPokazywane+1 == slides_zaladowaneZdjecia.length)
      doPokazania = 0;
   else
      doPokazania = slides_aktPokazywane+1;
      
   if (slides_aktPokazywane==0 && slides_firstTurn) {
      aktPokazywane = $('#firstSlide');
      slides_firstTurn = false;
   }
   else
      aktPokazywane = slides_zaladowaneZdjecia[slides_aktPokazywane];
      
   zdjecieDoPokazania = slides_zaladowaneZdjecia[doPokazania];
   //ustawienie cssa
   $(slides_slajdDivId).append(zdjecieDoPokazania);
   $(zdjecieDoPokazania).hide();
   $(zdjecieDoPokazania).css({'position':'relative','top':-slides_wysokoscZdjecia});
   $(zdjecieDoPokazania).fadeIn(1400);
   
   $(zdjecieDoPokazania).children('p').css({'top':slides_wysokoscZdjecia-$(zdjecieDoPokazania).children('p').outerHeight()});
   //alert();
   $(aktPokazywane).fadeOut(1400, function () {
      $(aktPokazywane).remove();
      $(zdjecieDoPokazania).css({'position':'relative','top':0});
      slides_aktPokazywane = doPokazania;
   });
   
   //od nowa liczniki
   slides_pozostalyCzas = slides_czasZmiany;
   if (slides_slideShow.length>1)
      slideShowTimer();
   //slideShowTimer();
}

      
function slideShowzaladowanoZdjecie(nr) {
   //ladowanie pierwszego zdjecia
   if (nr==1) {
      
      /*
      $(slides_zaladowaneZdjecia[nr]).hide();
      $(slides_slajdDivId).append(slides_zaladowaneZdjecia[nr]);
      $(slides_zaladowaneZdjecia[nr]).fadeIn('slow');
      slides_aktPokazywane = nr;
      if (slides_slideShow.length>1)
         slideShowTimer();
      */
      slides_pozostalyCzas = slides_czasZmiany;
      slideShowTimer();
   }
   
   //slideShowNext();
}
      
function slideShowTimer() {
   if (slides_pozostalyCzas>0) {
      
      slides_pozostalyCzas--;
      setTimeout('slideShowTimer()', 1000);
      
      return;
   }
   else
      slideShowNext();
}
      
function slideShowladujSlajdy() {
   
   slides_aktualnieLadowany++;
   
   if (slides_aktualnieLadowany>=slides_slideShow.length)
      return;
   
   var img = new Image();
   
   $(img)
    // once the image has loaded, execute this code
    .load(function () {
      // set the image hidden by default    
      var myA=document.createElement("A");
      var url = slides_Links[slides_aktualnieLadowany];
      myA.setAttribute("href",url);
      myA.setAttribute("class","slajd");
      $(myA).css({'background':'url('+slides_slideShow[slides_aktualnieLadowany]+')'});
      
      var myP=document.createElement("P");
      var oText = document.createTextNode(slides_Texts[slides_aktualnieLadowany]);
      myP.appendChild(oText);
      myA.appendChild(myP);
      
      
      slides_zaladowaneZdjecia[slides_zaladowaneZdjecia.length] = myA;
      slideShowzaladowanoZdjecie(slides_zaladowaneZdjecia.length-1);
      
      slideShowladujSlajdy();
    })
    
    // if there was an error loading the image, react accordingly
    .error(function () {
      // notify the user that the image could not be loaded
    })
    
    // *finally*, set the src attribute of the new image to our image
    .attr({
       src: slides_slideShow[slides_aktualnieLadowany],
       id: 'slajd_'+slides_aktualnieLadowany,
       width: slides_szerokoscZdjecia,
       height: slides_wysokoscZdjecia,
       'class': 'slajd'
    });
    
}
