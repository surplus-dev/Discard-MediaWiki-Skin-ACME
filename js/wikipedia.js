/**
 * 위키백과에서 가져왔습니다.
 *
 * 스크립트를 넣을 때는 충분한 설명, 출처를 넣어주세요! 이후 관리가 어려워집니다.
 **/

mw.loader.using( ['mediawiki.util', 'mediawiki.notify', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

/**
 * Map addPortletLink to mw.util 
 *
 * @deprecated: Use mw.util.addPortletLink instead.
 */
mw.log.deprecate( window, 'addPortletLink', mw.util.addPortletLink,
 'Use mw.util.addPortletLink instead' );
 
/**
 * Extract a URL parameter from the current URL
 *
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
mw.log.deprecate( window, 'getURLParamValue', mw.util.getParamValue, 'Use mw.util.getParamValue instead' );
 
/** 
 * Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
mw.log.deprecate( window, 'hasClass', function ( element, className ) {
    return $( element ).hasClass( className );
}, 'Use jQuery.hasClass() instead' );
 
/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 5
 */
// CSS
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}
 
// JS
var extraJS = mw.util.getParamValue( 'withJS' );
if ( extraJS ) {
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		importScript( extraJS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
	}
}
 

/**
 * Import more specific scripts if necessary
 */

if ( mw.config.get( 'wgNamespaceNumber' ) === 6 ) {
    /* file description page scripts */
    importScript( 'MediaWiki:Common.js/file.js' );
}

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[:en:Wikipedia:NavFrame]].
 *  Maintainers: [[:en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = '숨기기';
var expandCaption = '보이기';

window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;
    var i;

    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;

    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }

    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.className = 'collapseButton';  /* Styles are declared in Common.css */

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );

            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }

    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}

mw.hook( 'wikipage.content' ).add( createCollapseButtons );

/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[:en:Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;

    if ( !NavFrame || !NavToggle ) {
        return false;
    }

    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;

    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }

    event.preventDefault();
};

/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {

            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );

            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );

            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}

mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );

/***** 그림 정보 틀을 자동으로 불러옴 ********
 * Adds a link to subpages of current page
 * from commons.wikimedia.org
 *  Maintainers: [[User:Yonidebest]], [[User:Dschwen]]
 *  [[사용자:Kwj2772]]가 수정
 *  JSconfig items: bool 'loadAutoInformationTemplate'
 *                       (true=enabled (default), false=disabled)
 * JSConfig를 사용하지 않도록 수정함. --[[사용자:Klutzy|klutzy]] ([[사용자토론:Klutzy|토론]]) 2009년 9월 27일 (일) 20:33 (KST)
 ****/
if (mw.config.get('wgCanonicalSpecialPageName') == 'Upload') {
  importScript('MediaWiki:Upload.js');
}

/* 인터랙티브 지도. 영어 위키백과에서 가져옴. -- [[사용자:ChongDae]] 2010년 3월 28일 (일) 02:08 (KST) */
/**
 * WikiMiniAtlas
 *
 * Description: WikiMiniAtlas is a popup click and drag world map.
 *              This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
 *              The script itself is located on meta because it is used by many projects.
 *              See [[Meta:WikiMiniAtlas]] for more information. 
 * Maintainers: [[User:Dschwen]]
 */
( function () {
    var require_wikiminiatlas = false;
    var coord_filter = /geohack/;
    $( function () {
        $( 'a.external.text' ).each( function( key, link ) {
            if ( link.href && coord_filter.exec( link.href ) ) {
                require_wikiminiatlas = true;
                // break from loop
                return false;
            }
        } );
        if ( $( 'div.kmldata' ).length ) {
            require_wikiminiatlas = true;
        }
        if ( require_wikiminiatlas ) {
            mw.loader.load( '//meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript' );
        }
    } );
} )();

/*
  *스킨이 불러오지 않는 문제가 있어 아래 내용을 일단 긴급하게 추가.
  * 별도 수정이 필요할 수 있음. [[위키백과:사랑방_(기술)/2015년_8월#스킨 CSS 문제]]
  * [[사용자:Ykhwong]] 2015년 8월 31일
  */
var skin = mw.config.get('skin');
switch(skin) {
  case 'monobook':
    importStylesheet('미디어위키:Monobook.css'); break;
  case 'modern':
    importStylesheet('미디어위키:Modern.css'); break;
  case 'vector':
    importStylesheet('미디어위키:Vector.css');
    /* [[위키백과:사랑방 (기술)/2015년 9월#위키백과사전의 웹 페이지가 문제가 있습니다.]] 수정 [[사용자:Ykhwong]] 2015년 9월 6일 */
    if ( navigator.appVersion.indexOf("MSIE 9.")!=-1 ) {
        mw.util.addCSS ( 'html, body { padding-top: 2.5em; } ' );
    }
    break;
  case 'cologneblue':
    importStylesheet('미디어위키:Cologneblue.css'); break;
  default:
  break;
};

/* 보안 서버 링크 스크립트
 * 보안 서버에 있을 때 일반 링크를 보안 서버 링크로 변경하여 일반 서버 접속으로 전환되는 것을 최소화
 * [[미디어위키토론:Common.js#보안 서버용 스크립트]]
 * [[사용자:IRTC1015]] 2011년 1월 9일 (일) 23:06 (KST)
 */
if ( document.location && document.location.protocol === 'https:' ) {
    /* New secure servers */
    mw.loader.load('//en.wikipedia.org/w/index.php?title=MediaWiki:Common.js/secure new.js&action=raw&ctype=text/javascript');
}

/**
 * Fix for Windows XP Unicode font rendering
 */
if ( navigator.appVersion.search(/windows nt 5/i) !== -1 ) {
    mw.util.addCSS( '.IPA { font-family: "Lucida Sans Unicode", "Arial Unicode MS"; } ' + 
                '.Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; } ' );
}

/* End of mw.loader.using callback */
} );
/* DO NOT ADD CODE BELOW THIS LINE */
