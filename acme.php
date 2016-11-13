<?php

if ( ! defined( 'MEDIAWIKI' ) ) die( "This is an extension to the MediaWiki package and cannot be run standalone." );

$wgExtensionCredits['skin'][] = array(
	'path'        => __FILE__,
	'name'        => 'acme',
	'url'         => 'https://shapebootstrap.net/item/1524925-acme-free-responsive-corporate-template/comments',
	'author'      => 'cosmic 원본, 김동동 수정, [https://github.com/2DU/acme/commits/master 기타]',
	'description' => 'acme 부트스트랩 테마를 미디어위키에 적용합니다.',
    'license-name' => "Free License",
    'version' => '16-11-13 일반',
);

$wgValidSkinNames['acme'] = 'Acme';
$wgAutoloadClasses['SkinAcme'] = __DIR__ . '/acme.skin.php';


$skinDirParts = explode( DIRECTORY_SEPARATOR, __DIR__ );
$skinDir = array_pop( $skinDirParts );

$wgResourceModules['skins.acme'] = array(
	'styles' => array(
		$skinDir . '/css/bootstrap.min.css'            => array( 'media' => 'all' ),
		$skinDir . '/css/theme.css'            => array( 'media' => 'all' ),
		$skinDir . '/css/bootstrap-reset.css'            => array( 'media' => 'all' ),
		$skinDir . '/css/style.css'            => array( 'media' => 'all' ),
		$skinDir . '/css/style-responsive.css'            => array( 'media' => 'all' ),
	),
	'scripts' => array(
		$skinDir . '/js/jquery.min.js',
		$skinDir . '/js/bootstrap.min.js',
		$skinDir . '/js/adsbygoogle.js',
		$skinDir . '/js/Gadget-ReferenceTooltips-ko.js',
	),
	'remoteBasePath' => &$GLOBALS['wgStylePath'],
	'localBasePath'  => &$GLOBALS['wgStyleDirectory'],
);
