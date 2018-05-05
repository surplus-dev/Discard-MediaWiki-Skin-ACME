<?php
    if (!defined('MEDIAWIKI')) {
        die("This is an extension to the MediaWiki package and cannot be run standalone.");
    }

    $wgExtensionCredits['skin'][] = array(
        'path'        => __FILE__,
        'name'        => 'acme',
        'url'         => 'https://shapebootstrap.net/item/1524925-acme-free-responsive-corporate-template/comments',
        'author'      => 'cosmic 원본, 김동동 수정, [https://github.com/2DU/acme/graphs/contributors 기타]',
        'description' => 'acme 부트스트랩 테마를 미디어위키에 적용합니다.',
        'license-name' => "Free License",
        'version' => '16-12-05 일반',
    );

    $wgValidSkinNames['acme'] = 'Acme';
    $wgAutoloadClasses['SkinAcme'] = __DIR__ . '/acme.skin.php';
?>