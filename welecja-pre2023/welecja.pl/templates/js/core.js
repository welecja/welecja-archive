var _pokazPomoc = "";

$(document).ready(function() {
   /*
   $("a.iframe").fancybox({'width':690,'height':590});
   
   */
   $("a.galeria").fancybox({
      'titlePosition':'over',
      'transitionIn':'elastic',
      'transitionOut':'none'
   });
   
   $('#firstField').focus();
   $('.firstField').focus();
   
   $('#lastField').keyup(function(e) {
      if (e.keyCode == 13) {
         $(this).parents('form').submit();  
         
      }
   });
   
   $('.highlightingRow').bind('mouseenter',function() {
      $(this).addClass('highlight');
   }).bind('mouseleave',function() {
      $(this).removeClass('highlight');
   });;
   

   $('#content img').each(function(index) {
      if ($(this).attr('align')=="left")
         $(this).css({'margin-right':10,'margin-top':5,'margin-bottom':5});
      else if ($(this).attr('align')=="right")
         $(this).css({'margin-left':10,'margin-top':5,'margin-bottom':5});
   });
   
   //poprawka overlaya na pierwszym slajdzie
   $('#firstSlide').children('span').css({'top':234-$('#firstSlide').children('span').outerHeight()});
});


