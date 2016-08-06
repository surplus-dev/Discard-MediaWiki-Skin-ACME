/* 성적인 문서 광고 제거 */
$(document).ready(function(){
  if($("#no-ad").length >0 ){
    $('.adsbygoogle').css('display', 'none').empty();
  }
});
/* 출처 리브레 위키 */