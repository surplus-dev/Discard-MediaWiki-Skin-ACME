 '''WikiMiniAtlas'''
 Script to embed interactive maps into pages that have coordinate templates
 also check my user page [[UserDschwen]] for more tools

 Revision 16.10
 Source httpsmeta.wikimedia.orgwikiMediaWikiWikiminiatlas.js
 jshint laxcommatrue, smarttabstrue, quotmarksingle, curlyfalse, es3true, browsertrue 
 global mw,jQuery 
jQuery(function ($) {
  WMA config
 var wc = {
  width   600,
  height  400,
  timeout  5000,
  zoom  -1,
  enabled  true,
  onlytitle  false,
  flowTextTooltips (location.host==='en.wikipedia.org'),
  alwaysTooltips false,
  iframeurl  'wma.wmflabs.orgiframe.html',
  imgbase    'wma.wmflabs.orgtiles',
  buttonImage 'upload.wikimedia.orgwikipediacommonsthumb555WMA_button2b.png17px-WMA_button2b.png'
 },
 strings = {
  buttonTooltip  {
   af'Vertoon ligging op 'n interaktiwe kaart.',
   als'Ort uf dr interaktiva Charta zeiga',
   ar'???? ?????? ??? ??????? ?????????',
   ast'Ver el llugar nun mapa interactivu',
   az 'Yeri interaktiv bir x?rit?d? gost?r',
   bar'Ort af da interaktivn Kartn zoagn',
   'be-tarask''¬á¬Ñ¬Ü¬Ñ¬Ù¬Ñ¬è¬î ¬Þ¬Ö¬ã¬è¬Ñ¬Ù¬ß¬Ñ¬ç¬à¬Õ¬Ø¬Ñ¬ß¬î¬ß¬Ö ¬ß¬Ñ ?¬ß¬ä¬ï¬â¬Ñ¬Ü¬ä¬í?¬ß¬Ñ¬Û ¬Þ¬Ñ¬á¬Ö',
   'be-x-old''¬á¬Ñ¬Ü¬Ñ¬Ù¬Ñ¬è¬î ¬Þ¬Ö¬ã¬è¬Ñ¬Ù¬ß¬Ñ¬ç¬à¬Õ¬Ø¬Ñ¬ß¬î¬ß¬Ö ¬ß¬Ñ ?¬ß¬ä¬ï¬â¬Ñ¬Ü¬ä¬í?¬ß¬Ñ¬Û ¬Þ¬Ñ¬á¬Ö',
   bg'¬±¬à¬Ü¬Ñ¬Ø¬Ú ¬Þ¬Ö¬ã¬ä¬à¬á¬à¬Ý¬à¬Ø¬Ö¬ß¬Ú¬Ö¬ä¬à ¬ß¬Ñ ¬Ú¬ß¬ä¬Ö¬â¬Ñ¬Ü¬ä¬Ú¬Ó¬ß¬Ñ¬ä¬Ñ ¬Ü¬Ñ¬â¬ä¬Ñ',
   bpy'?????? ?????????? ?? ??????? ????????',
   br'diskouez al lec'hiadur war ur gartenn etrewezhiat',
   ca'Mostra la localitzacio en un mapa interactiu',
   cs'zobraz misto na interaktivni map?',
   da'vis beliggenhed pa interaktivt kort',
   de'Ort auf interaktiver Karte anzeigen',
   dsb'M?stno na interaktiwnej kor?e zwobrazni?',
   fa'????? ???? ?? ??????? ????',
   el'¥Å¥ì¥õ?¥í¥é¥ò¥ç ¥ó¥ï¥ð¥ï¥è¥å¥ò?¥á? ¥ò¥å ¥ä¥é¥á¥ä¥ñ¥á¥ò¥ó¥é¥ê? ¥ö?¥ñ¥ó¥ç',
   en'Show location on an interactive map',
   bn'??????? ????????? ??????? ??????? ????',
   eo'Montru lokigon sur interaktiva karto',
   eu'erakutsi kokalekua mapa interaktibo batean',
   es'Mostrar el lugar en un mapa interactivo',
   fr'Montrer la localisation sur une carte interactive',
   fur'mostre la localizazion suntune mape interative',
   fy'it plak op in oanpasbere kaart oanjaan',
   gl'Amosar o lugar nun mapa interactivo',
   he'???? ????? ???? ?????????????',
   hi'?????? ????? ?? ?????? ?? ????? ???????',
   hr'prika?i lokaciju na interaktivnom zemljovidu',
   hsb'M?stno na interaktiwnej kar?e zwobrazni?',
   hu'Mutasd a helyet egy interaktiv terkepen!',
   hy'????????? ????? ?????????? ??????? ???',
   id'Tunjukkan lokasi di peta interaktif',
   ilo'Ipakita ti lokasion iti interaktibo a mapa',
   is'syna sta©£setningu a gagnvirku korti',
   it'mostra la localita su una carta interattiva',
   ja'«¤«ó«¿«é«¯«Æ«£«Öò¢?ß¾ªËêÈöÇªòøúãÆ',
   kk'¬Ú¬ß¬ä¬Ö¬â¬Ñ¬Ü¬ä¬Ú¬Ó¬ä? ¬Ü¬Ñ¬â¬ä¬Ñ¬Õ¬Ñ¬ß ¬à¬â¬ß¬Ñ¬Ý¬Ñ¬ã¬å¬í¬ß ¬Ü?¬â¬ã¬Ö¬ä¬å',
   km'??????????????????????????????',
   kn'?????????? ????????? ??????',
   ko'ÀÎÅÍ·¢Æ¼ºê Áöµµ¿¡ À§Ä¡¸¦ Ç¥½Ã',
   lt'Rodyti viet? interaktyviame ?em?lapyje',
   lv'R?d?t atra?an?s vietu interakt?vaj? kart?',
   min'Tunjuakan lokasi pado peta',
   mk'¬á¬â¬Ú¬Ü¬Ñ¬Ø¬Ú ¬á¬à¬Ý¬à¬Ø¬Ò¬Ñ ¬ß¬Ñ ¬Ú¬ß¬ä¬Ö¬â¬Ñ¬Ü¬ä¬Ú¬Ó¬ß¬Ñ ¬Ü¬Ñ¬â¬ä¬Ñ',
   ms'Tunjukkan lokasi pada peta interaktif',
   my'?????????????? ????????????',
   nl'de locatie op een interactieve kaart tonen',
   no'vis beliggenhet pa interaktivt kart',
   nv'keyah t?aa dah si????? ?t?????? be?elyaaigii',
   pl'Poka? lokalizacj? na mapie interaktywnej',
   pt'mostrar a localidade num mapa interactivo',
   ro'Arat? loca?ia pe o hart? interactiv?',
   ru'¬á¬à¬Ü¬Ñ¬Ù¬Ñ¬ä¬î ¬á¬à¬Ý¬à¬Ø¬Ö¬ß¬Ú¬Ö ¬ß¬Ñ ¬Ú¬ß¬ä¬Ö¬â¬Ñ¬Ü¬ä¬Ú¬Ó¬ß¬à¬Û ¬Ü¬Ñ¬â¬ä¬Ö',
   sco'Shaw location on an interactive cairt',
   sk'zobraz miesto na interaktivnej mape',
   sl'Prika?i lego na interaktivnem zemljevidu',
   sr'¬±¬â¬Ú¬Ü¬Ñ¬Ø¬Ú ¬Ý¬à¬Ü¬Ñ¬è¬Ú?¬å ¬ß¬Ñ ¬Ú¬ß¬ä¬Ö¬â¬Ñ¬Ü¬ä¬Ú¬Ó¬ß¬à? ¬Þ¬Ñ¬á¬Ú',
   sq'trego vendndodhjen ne harte',
   fi'nayta paikka interaktiivisella kartalla',
   sv'visa platsen pa en interaktiv karta',
   tr'Yeri interaktif bir haritada goster',
   uk'¬á¬à¬Ü¬Ñ¬Ù¬Ñ¬ä¬Ú ¬á¬à¬Ý¬à¬Ø¬Ö¬ß¬ß¬ñ ¬ß¬Ñ ?¬ß¬ä¬Ö¬â¬Ñ¬Ü¬ä¬Ú¬Ó¬ß?¬Û ¬Þ¬Ñ¬á?',
   vi'xem v? tri nay tren b?n ©¢? t??ng tac',
   vo'Jonon topi su kaed itjafidik',
   zh'?ãÆ?ò¢î¤ò¢?ß¾îÜêÈöÇ',
   'zh-cn''?ãÆ?ò¢î¤ò¢?ß¾îÜêÈöÇ',
   'zh-sg''?ãÆ?ò¢î¤ò¢?ß¾îÜêÈöÇ',
   'zh-tw''úéãÆú±ò¢î¤ò¢Óñß¾îÜêÈöÇ',
   'zh-hk''úéãÆú±ò¢î¤ò¢Óñß¾îÜêÈöÇ'
  },
  map {
   ast'Mapa',
   az'X?rit?',
   bg'¬¬¬Ñ¬â¬ä¬Ñ',
   bn'????????',
   bs'Karta',
   ca'Mapa',
   de'Karte',
   el'¥Ö?¥ñ¥ó¥ç?',
   en'Map',
   es'Mapa',
   fa'????',
   fi'Kartalla',
   fr'Carte',
   gl'Mapa',
   hu'Terkep',
   id'peta',
   ilo'Mapa',
   ja'ò¢?',
   kn'?????',
   min'peta',
   mk'¬¬¬Ñ¬â¬ä¬Ñ',
   ms'Peta',
   my'????????????',
   nl'Kaart',
   pt'Mapa',
   ru'¬Ü¬Ñ¬â¬ä¬Ö',
   sco'Cairt',
   sv'Karta',
   uk'¬Þ¬Ñ¬á?',
   zh'ò¢Óñ',
   'zh-cn''ò¢?',
   'zh-sg''ò¢?',
   'zh-tw''ò¢Óñ',
   'zh-hk''ò¢Óñ'
  },
  close  {
   af'Sluit',
   als'Zua macha',
   ar'???',
   ast'zarrar',
   az'ba?la',
   'be-tarask''¬Ù¬Ñ¬Ü¬â¬í¬è¬î',
   'be-x-old''¬Ù¬Ñ¬Ü¬â¬í¬è¬î',
   bar'zuamachn',
   bg'¬©¬Ñ¬ä¬Ó¬à¬â¬Ú',
   bpy'????',
   br'serrin',
   bs'zatvori',
   ca'Tanca',
   cs'zav?it',
   da'luk',
   de'schlie©¬en',
   dsb'zacyni?',
   nv'doo yish??? nisin da',
   el'?¥î¥ï¥ä¥ï?',
   en'close',
   bn'???? ????',
   eo'fermu',
   eu'itxi',
   es'cerrar',
   fa'????',
   fr'Quitter',
   fur'siere',
   fy'ticht',
   gl'pechar',
   he'?????',
   hi'??? ????',
   hr'zatvori',
   hsb'za?ini?',
   hu'bezaras',
   hy'?????',
   id'tutup',
   ilo'irikep',
   is'loka',
   it'chiudi',
   ja'øÍª¸ªë',
   kk'¬Ø¬Ñ¬Ò¬å',
   km'???',
   kn'????????',
   ko'´Ý±â',
   lt'u?daryti',
   lv'aizv?rt',
   min'tutuik',
   mk'¬Ù¬Ñ¬ä¬Ó¬à¬â¬Ú',
   ms'tutup',
   my'???????',
   nl'sluiten',
   no'lukk',
   pl'zamknij',
   pt'fechar',
   ro'inchide',
   ru'¬Ù¬Ñ¬Ü¬â¬í¬ä¬î',
   sk'zatvori?',
   sl'zapri',
   sr'¬Ù¬Ñ¬ä¬Ó¬à¬â¬Ú',
   sq'mbylle',
   fi'sulje',
   sv'stang',
   tr'kapat',
   uk'¬Ù¬Ñ¬Ü¬â¬Ú¬ä¬Ú',
   vi'©¢ong',
   vo'farmukon',
   zh'??',
   'zh-cn''??',
   'zh-sg''??',
   'zh-tw''Î¼øÍ',
   'zh-hk''Î¼øÍ'
  },
  resize  {
   ar'????? ???',
   ast'redimensionar',
   az'olcul?ri d?yi?',
   bg'¬±¬â¬à¬Þ¬Ö¬ß¬Ú ¬Ô¬à¬Ý¬Ö¬Þ¬Ú¬ß¬Ñ',
   bn'??? ???????? ????',
   ca'Redimensiona',
   de'Gro©¬e andern',
   dk'©¡ndre st©ªrrelse',
   el'¥á¥ë¥ë¥á¥ã? ¥ì¥å¥ã?¥è¥ï¥ô?',
   en'resize',
   es'cambiar el tamano',
   fa'????? ??????',
   fi'muuta kokoa',
   fr'redimensionner',
   gl'cambiar o tamano',
   hu'atmeretezes',
   ilo'baliwan ti kadakkel',
   ja'«µ«¤«ºªò?ÌÚª¹ªë',
   kk'?¬Ý¬ê¬Ö¬Þ?¬ß ?¬Ù¬Ô¬Ö¬â¬ä¬å',
   kn'????? ??????',
   min'gadangan',
   mk'¬á¬â¬à¬Þ¬Ö¬ß¬Ú ¬Ô¬à¬Ý¬Ö¬Þ¬Ú¬ß¬Ñ',
   ms'ubah saiz',
   my'???????????????',
   nl'vergroten of verkleinen',
   no'endre st©ªrrelse',
   pt'alterar tamanho',
   ro'redimensionare',
   uk'¬Ù¬Þ?¬ß¬Ú¬ä¬Ú ¬â¬à¬Ù¬Þ?¬â',
   sl'spremeni velikost',
   sr'¬á¬â¬à¬Þ¬Ö¬ß¬Ú ¬Ó¬Ö¬Ý¬Ú¬é¬Ú¬ß¬å',
   sv'andra storlek',
   zh'?ïÚÓÞá³',
   'zh-cn''?ïÚÓÞá³',
   'zh-sg''?ïÚÓÞá³',
   'zh-tw''ðàïÚÓÞá³',
   'zh-hk''ðàïÚÓÞá³'
  }
 },
  domain of the WMA
 wma_domain = 'wma.wmflabs.org',

 language = '', site = '', awt='0', rtl = (^s)rtl(s$).test(document.body.className),

  Get a specific, localized string
 _msg = function(k) {
  return strings[k][language]  strings[k].en;
 },
 dbName = mw.config.get( 'wgDBname' ),

 iframe = { div null, iframe null, closebutton null, resizebutton null, resizehelper null, indom false },

 page_title = ( mw.config.get('wgNamespaceNumber')===0 )  encodeURIComponent(mw.config.get('wgTitle'))  '',

 bodyc,
 coord_filter = &params=([d.+-]+)_([d.+-])_([d.+-])_([NSZ])_([d.+-]+)_([d.+-])_([d.+-])_([EOW])([^&=]{0,250}),
 coord_list = [],
 coord_highlight = -1,

 kml = null,
 mes = null,
 initPromises = [];

  get position on page
 function yPos(el) {
  return $(el).offset().top + $(el).outerHeight();
 }

  show, move, and update iframe
 function showIFrame(e) {
  var wi = iframe, my = yPos(this),
      newurl = wc.iframeurl + 'wma=' + e.data.param + '&lang=' + site + '&page=' + page_title + '&awt=' + awt;

   insert iframe into DOM on demand (to preserve page caching)
  if (!wi.indom) {
   $('#content,#mw_content').prepend(wi.div);
   wi.indom = true;
  }

  if (wi.iframe.attr('src')!==newurl) {
   wi.iframe.attr( 'src', newurl );
  } else if( wi.div.css('display') !== 'none' ) {
   wi.div.hide();
   return false;
  }
  wi.div.css( 'top', my+'px' ).show();
  return false;
 }

 function highlight(i) {
  if (coord_highlight=0) {
   $(coord_list[coord_highlight].obj).css('background-color','').find('spanvisible').css('background-color','');
  }
  coord_highlight = i;
  if (coord_highlight=0) {
   $(coord_list[coord_highlight].obj).css('background-color','yellow').find('spanvisible').css('background-color','yellow');
  }
 }

 function messageHub(e) {
  var i, d, clist = { coords [] }
    , geoext = [], sx=0, sy=0, s
    , minlat = Infinity, maxlat = -Infinity, ineg = -1, ipos = -1;
  e = e.originalEvent;
  d = e.data.split(',');
  mes = e.source;
  switch(d[0]) {
   case 'request' 
     make a JSON encodable copy of coord_list (no HTML objects!)
     find center and extent
    for (i=0; icoord_list.length; ++i) {
     clist.coords[i] = {
      lat coord_list[i].lat,
      lon coord_list[i].lon,
      title coord_list[i].title.replace([+_]g,' ')
     };
     if (coord_list[i].latminlat) { minlat = coord_list[i].lat; }
     if (coord_list[i].latmaxlat) { maxlat = coord_list[i].lat; }
     geoext[i] = {
      x Math.cos(coord_list[i].lon180.0Math.PI),
      y Math.sin(coord_list[i].lon180.0Math.PI)
     };
     sx += geoext[i].x;
     sy += geoext[i].y;
    }
    clist.loncenter = Math.atan2(sy,sx)180.0Math.PI;
    clist.latmax = maxlat;
    clist.latmin = minlat;
     extent in longitude
    for (i=0; igeoext.length; ++i) {
     s = (geoext[i].xsy-geoext[i].ysx);
     geoext[i].z = (geoext[i].xsx+geoext[i].ysy);
     if (s0 && (ineg0  geoext[i].zgeoext[ineg].z)) { ineg=i; }
     if (s0 && (ipos0  geoext[i].zgeoext[ipos].z)) { ipos=i; }
    }
    if (ipos=0 && ineg=0) {
     clist.lonleft  = coord_list[ipos].lon;
     clist.lonright = coord_list[ineg].lon;
    }
    if ('JSON' in window) {
     mes.postMessage(JSON.stringify(clist), document.location.protocol + wma_domain);
     if (kml!==null) {
      mes.postMessage(JSON.stringify(kml), document.location.protocol + wma_domain);
     }
    }
    break;
   case 'unhighlight' 
    highlight(-1);
    break;
   case 'toggle' 
    coord_list[parseInt(d[1],10)].mb.click();
    break;
   case 'scroll' 
    $('htmlnot(animated),bodynot(animated)').animate({ scrollTop $(coord_list[parseInt(d[1],10)].obj).offset().top - 20 + parseInt(d[2]'0',10) }, 500 );
    iframe.div.css( { top yPos( coord_list[parseInt(d[1],10)].obj ) + 'px'} );
     make sure scroll target gets highlighted
    setTimeout(function () { highlight(parseInt(d[1],10)); }, 200);
    break;
   case 'highlight' 
    highlight(parseInt(d[1],10));
    break;
  }
 }

  parse url parameters into a hash
 function parseParams(url) {
  var map = {}, h, i, pair = url.substr(url.indexOf('')+1).split('&');
  for (i=0; ipair.length; ++i) {
   h = pair[i].split('=');
   map[h[0]] = h[1];
  }
  return map;
 }

  Insert the IFrame into the page.

 var wi = iframe,
     marker = { lat0, lon0 }, coordinates = null,
     links, key, startTime, mapbutton;

  apply settings
 if (typeof wma_settings==='object') {
  for (key in wma_settings) {
   if (typeof wma_settings[key]===typeof wc[key]) { wc[key] = wma_settings[key]; }
  }
 }

 if (wc.enabled===false) { return; }

 site = (dbName==='commonswiki')  'commons'  (mw.config.get('wgUserVariant')  mw.config.get('wgPageContentLanguage'));
 language = mw.config.get( 'wgUserLanguage' );

  remove icons from title coordinates
 $('#coordinates,#coordinates-title,#tpl_Coordinaten').find('a.image').detach();

 bodyc = $( wc.onlytitle  '#coordinates,#coordinates-title'  'html' );
 startTime = (new Date()).getTime();

 bodyc.find('a.external.text').each( function( key, link ) {
  var ws, coord_params, params, zoomlevel, globe='Earth';

   check for timeout (every 10 links only)
  if (key%10===9 && (new Date()).getTime()  startTime+wc.timeout) {
   return false;  break out of each
  }

  if (!('href' in link)  !coord_filter.exec(link.href)) {  invalid links do not contain href attribute in IE!
   return true;
  }
  marker.lat=(1.0RegExp.$1) + ((RegExp.$20)60.0) + ((RegExp.$30)3600.0);
  if (RegExp.$4!=='N') { marker.lat=-1; }
  marker.lon=(1.0RegExp.$5) + ((RegExp.$60)60.0) + ((RegExp.$70)3600.0);
  if (RegExp.$8==='W') { marker.lon=-1; }
  coord_params = RegExp.$9;

   Zoom based on coordinate NS precision
  var coord_digits = RegExp.$3  4  RegExp.$2  2  RegExp.$1.length - (RegExp.$1+'.').indexOf('.') - 1;
  zoomlevel = coord_digits  Math.log(10)Math.log(2);

   Find a sensible Zoom-level based on type
  if( _type(airportedupasslandmarkrailwaystation).test(coord_params) ) {
   zoomlevel = 8;
  } else if (_type(eventforestglacier).test(coord_params)) {
   zoomlevel = 6;
  } else if (_type(adm3rdcitymountainisleriverwaterbody).test(coord_params)) {
   zoomlevel = 4;
  }

   wma shows dim approx 4e7m at zoom 0 or 1.5e8 is the scale of zoomlevel 0
  if (_dim([d.+-]+)(kmm_$).exec(coord_params)) {
   zoomlevel = Math.log((RegExp.$2==='km'  4e4  4e7)  RegExp.$1)Math.log(2);
  }
  if (_scale(d+)(_$).exec(coord_params)) {
   zoomlevel = Math.log(1.5e8RegExp.$1)  Math.log(2);
  }

  if (wc.zoom!==-1) { zoomlevel = wc.zoom; }
  if( zoomlevel  12 ) { zoomlevel = 12; }
  if (zoomlevel0) { zoomlevel = 0; }

  function capitalize(s) { return s.substr(0,1).toUpperCase()+s.substr(1).toLowerCase(); }
  if (_globe([^_&]+).test(coord_params)) { globe = capitalize(RegExp.$1); }
  if ($.inArray(globe,['Earth','Moon','Mars','Venus','Mercury','Io','Titan'])  0 ) { return; }

   Test the unicode Symbol
  if (site==='de' && link.parentNode.id!=='coordinates') {
   mapbutton = $('span?span').css('color','blue');
  } else {
   mapbutton = $('img').attr('src', wc.buttonImage);
  }
  mapbutton.addClass('wmamapbutton').attr( {
   title _msg('buttonTooltip'),
   alt ''
  } )
  .hover(function (){ $(this).css('opacity', 0.75); }, function () { $(this).css('opacity', ''); })
  .addClass('noprint')
  .css('padding', rtl  '0px 0px 0px 3px'  '0px 3px 0px 0px' ).css('cursor', 'pointer');

  if (wc.alwaysTooltips  ( wc.flowTextTooltips && $(link).parents('li, table, #coordinates').length===0)) {
    insert tooltip rather than icon to improve text readability
   mapbutton = $('span').append(mapbutton).append('&nbsp;WikiMiniAtlas').css('cursor','pointer');
   var tooltip = $('div').css( {
    backgroundColor 'white', padding '0.2em', border '1px solid black',
    position 'absolute', top '1em', left '0em',
    display 'none', zIndex  15
   }).append(mapbutton);
   $(link).wrap(
    $('span')
     .css( { position 'relative', whiteSpace 'nowrap' } )
     .mouseleave(function () { tooltip.fadeOut(); })
    )
    .before(tooltip)
    .mouseenter(function () { tooltip.fadeIn(); });
  } else {
    insert icon directly
   ws = $(link).css('whiteSpace');
   if (site!=='de'  link.parentNode.id!=='coordinates') {
    $(link).wrap( $('span').css('whiteSpace', 'nowrap') ).css('whiteSpace', ws).before(mapbutton);
   } else {
    $('#coordinates').append('span class=noprint coordinates-separator  span').append(mapbutton);
   }
  }

  mapbutton.bind( 'click', { param
   marker.lat + '_' + marker.lon + '_' +
   wc.width + '_' + wc.height + '_' +
   site + '_' + zoomlevel + '_' + language + '&globe=' + globe }, showIFrame );

   store coordinates
  coordinates = link.href;
  params = parseParams(link.href);
  coord_list.push( { lat marker.lat, lon marker.lon, obj link, mb mapbutton, title params.title  params.pagename  '' } );
 } ); end each

 var titlebutton = false;

 function addTitleButton( alat, alon, zoomlevel ) {
  mapbutton = $('img')
   .hover(function (){ $(this).css('opacity', 0.75); }, function () { $(this).css('opacity', ''); })
   .css('padding', rtl  '0px 3px 0px 0px'  '0px 0px 0px 3px' ).css('cursor', 'pointer')
   .attr('src', wc.buttonImage).addClass('wmamapbutton').addClass('noprint')
   .bind( 'click', { param
    alat + '_' + alon + '_' +
    wc.width + '_' + wc.height + '_' +
    site + '_' + zoomlevel + '_' + language
   }, showIFrame );  zoomlevel!

  if (!titlebutton) {
   if ($('#coordinates').length) {
    $('#coordinates').find('img').detach();
    $('#coordinates').append(mapbutton);
   } else {
    $('span id=coordinatesspan').text(_msg('map')).append(mapbutton).appendTo('#bodyContent');
   }
   titlebutton = true;
  }
 }

  detect and load KML
  also insert globe even if no title coords are given
 (function () {
  var i, l = $('div.kmldata')
     ,alat = 0, alon = 0
     ,la1 = Infinity, la2 =- Infinity
     ,lo1 = Infinity, lo2 =- Infinity
     ,ex,ey, req;

  for (i=0; il.length; ++i) { TODO replace with .each
   coordinates = true;
   req = $.ajax({
    url 'wiki' + encodeURI(l.eq(i).attr('title')) + 'action=raw',
    dataType 'xml',
    success function (xml) {
     var zoomlevel;

     function processCoords(t) {
      var way = [], c, p = t.split(' '), i, lat, lon;
      for( i=0; ip.length; ++i ) {
       c=p[i].split(',');
       if( c.length = 2 ) {
        lat = parseFloat(c[1]);
        lon = parseFloat(c[0]);
        way.push( { lat lat, lon lon } );

         determine extent of way
        if (latla1) { la1=lat; }
        if (lonlo1) { lo1=lon; }
        if (latla2) { la2=lat; }
        if (lonlo2) { lo2=lon; }
       }
      }
      return way;
     }

      initialize transfer datastructure
     kml = { ways [], areas [] };

      ways
     $(xml).find('LineString  coordinates').each(function () {
      var way = processCoords( $(this).text() );
      if (way.length0) { kml.ways.push(way); }
     });

      areas
     $(xml).find('Polygon').each(function () {
      var area = { inner [], outer [] };

       outer boundary
      $(this).find('outerBoundaryIs  LinearRing  coordinates').each(function () {
       var way = processCoords($(this).text());
       if (way.length0) { area.outer.push(way); }
      });

       inner boundary (holes in the polygon)
      $(this).find('innerBoundaryIs  LinearRing  coordinates').each(function () {
       var way = processCoords($(this).text());
       if (way.length0) { area.inner.push(way); }
      });

       only add if we have an outer boundary
      if (area.outer.length0) { kml.areas.push(area); }
     });

      inset minmax extent
     kml.minlon = lo1;
     kml.maxlon = lo2;
     kml.minlat = la1;
     kml.maxlat = la2;

      already got a request message
     if (mes!==null && kml.ways.length0 && 'JSON' in window) {
      mes.postMessage(JSON.stringify(kml), document.location.protocol + wma_domain);
     }

      insert blue globe
     if (coord_list.length===0  (!$('#coordinates').find('.wmamapbutton').length)) {
       determine center
      alat = (la1+la2)2;
      alon = (lo1+lo2)2;

      determine zoomfactor
      ex = (lo2-lo1)180.0  3.0128;
      ey = (la2-la1)180.0  3.0128;  max extent in degrees, zoom0 has 3128180 pxdegree
      for (zoomlevel=0; zoomlevel12; ++zoomlevel) {
       if( exwc.width2  eywc.height2 ) break;
       ex = 2; ey = 2;
      }

       add mapbutton
      addTitleButton( alat, alon, zoomlevel );
     }
    }
   });
    Add request promise to init array, and cast any errors to success so that
    we don't abort init early when one of the requests failed. These are expected
    to fail for titles we can't find.
   initPromises.push(req.then(null, function () { return $.Deferred().resolve(); } ));
  }  end for
 })();

  detect All Coordinates
 links = $('#coordinatesspana');
 if (links.length && links[0].href.indexOf('httpwww.lenz-online.decgi-binwikiwiki-osm.pl') === 0) {
   addTitleButton( 0, 0, 1 );
   coordinates = true;
 }

  prepare iframe to house the map
 if (coordinates!==null) {
  wi.div = $('div').css( {
   width (wc.width+2)+'px', height (wc.height+2)+'px',
   margin '0px', padding '0px',
   backgroundColor  'white', border '1px solid gray',
   position 'absolute', top '1em', zIndex 13, boxShadow '3px 3px 25px rgba(0,0,0,0.3)'
  } ).css( rtl  'left'  'right', '2em' ).hide();

  var rbrtl = [ 'upload.wikimedia.orgwikipediacommonsbb5Button_resize.png',
                'upload.wikimedia.orgwikipediacommons330Button_resize_rtl.png' ];
  wi.resizebutton = $('img').attr( {
   title  _msg('resize'),
   src  rbrtl[rtl10]
  } ).hide().attr('ondragstart','return false');

   cover the iframe to prevent loosing the mouse to the iframe during resizing
  wi.resizehelper = $('div').css( { position 'absolute', top0, left0, zIndex 20 } ).hide();

  wi.closebutton = $('img').attr( {
   title  _msg('close'),
   src  'upload.wikimedia.orgwikipediacommonsdd4Button_hide.png'
  } ).css( {
   zIndex  15, position  'absolute', right  '11px', top  '9px', width  '18px', cursor  'pointer'
  } ).click( function(e) { wi.div.hide(); } );

  wi.iframe = $('iframe')
   .attr( { scrolling 'no', frameBorder  0 } )
   .css( {
    zIndex 14, position 'absolute', right '1px', top '1px',
    width (wc.width)+'px', height (wc.height)+'px',
    margin '0px', padding '0px'
   } );

  wi.div.append(wi.iframe);
  wi.div.append(wi.resizehelper);
  wi.div.append(wi.closebutton);
  (function () {
   var idle = true, dir = rtl-11;
   function adjusthelper() {
    wi.resizehelper.css( { width (wc.width+2)+'px', height (wc.height+2)+'px' } );
   }
   wi.div.append(
    $('div')
     .css( {
       zIndex  15, position  'absolute', bottom  '3px',
       width  '18px', height '18px', cursor  (rtl'se-resize''sw-resize'),
       'user-select' 'none', '-moz-user-select' 'none', '-ms-user-select' 'none'
      } ).css( (rtl'right''left'), '3px' )
     .mouseenter( function(e) { wi.resizebutton.fadeIn(); } )
     .mouseleave( function(e) { if( idle ) { wi.resizebutton.fadeOut(); } } )
     .mousedown( function(e) {
       if (idle) {
        var lastx = e.pageX, lasty = e.pageY;
        wi.resizehelper.show();
        adjusthelper();

        $('body')
         .bind('mouseup.wmaresize', function(e) {
          $('body').unbind('mousemove.wmaresize');
          $('body').unbind('mouseup.wmaresize');
          idle = true;
          wi.resizehelper.hide();
         } )
         .bind('mousemove.wmaresize', function(e) {
          wc.width -= dir(e.pageX-lastx);
          wc.height += (e.pageY-lasty);
          lastx = e.pageX; lasty = e.pageY;
          wi.div.css( { width (wc.width+2)+'px', height (wc.height+2)+'px' } );
          wi.iframe.css( { width wc.width+'px', height wc.height+'px' } );
          adjusthelper();
         } );

        idle = false;
       }
      } )
     .append(wi.resizebutton)
   );
  })();

  $(window).bind('message', messageHub);

   Fire event for other code to extend or integrate with WMA
  if (initPromises.length) {
    $.when.apply( null, initPromises ).then(function () {
      mw.hook('WikiMiniAtlas.load').fire();
    } );
  } else {
    mw.hook('WikiMiniAtlas.load').fire();
  }
 }
});

 nowiki